//
//  Switch.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 3/12/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Projects each element of an observable sequence into a new sequence of observable sequences and then
     transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.

     It is a combination of `map` + `switchLatest` operator

     - seealso: [flatMapLatest operator on reactivex.io](http://reactivex.io/documentation/operators/flatmap.html)

     - parameter selector: A transform function to apply to each element.
     - returns: An observable sequence whose elements are the result of invoking the transform function on each element of source producing an
     Observable of Observable sequences and that at any point in time produces the elements of the most recent inner observable sequence that has been received.
     */
    func flatMapLatest<Source: ObservableConvertibleType>(_ selector: @escaping (Element) throws -> Source)
        -> Observable<Source.Element>
    {
        return FlatMapLatest(source: asObservable(), selector: selector)
    }
}

public extension ObservableType where Element: ObservableConvertibleType {
    /**
     Transforms an observable sequence of observable sequences into an observable sequence
     producing values only from the most recent observable sequence.

     Each time a new inner observable sequence is received, unsubscribe from the
     previous inner observable sequence.

     - seealso: [switch operator on reactivex.io](http://reactivex.io/documentation/operators/switch.html)

     - returns: The observable sequence that at any point in time produces the elements of the most recent inner observable sequence that has been received.
     */
    func switchLatest() -> Observable<Element.Element> {
        return Switch(source: asObservable())
    }
}

private class SwitchSink<SourceType, Source: ObservableConvertibleType, Observer: ObserverType>:
    Sink<Observer>,
    ObserverType where Source.Element == Observer.Element
{
    typealias Element = SourceType

    fileprivate let _subscriptions: SingleAssignmentDisposable = .init()
    fileprivate let _innerSubscription: SerialDisposable = .init()

    let _lock = RecursiveLock()

    // state
    fileprivate var _stopped = false
    fileprivate var _latest = 0
    fileprivate var _hasLatest = false

    override init(observer: Observer, cancel: Cancelable) {
        super.init(observer: observer, cancel: cancel)
    }

    func run(_ source: Observable<SourceType>) -> Disposable {
        let subscription = source.subscribe(self)
        _subscriptions.setDisposable(subscription)
        return Disposables.create(_subscriptions, _innerSubscription)
    }

    func performMap(_: SourceType) throws -> Source {
        rxAbstractMethod()
    }

    @inline(__always)
    private final func nextElementArrived(element: Element) -> (Int, Observable<Source.Element>)? {
        _lock.lock(); defer { self._lock.unlock() } // {
        do {
            let observable = try performMap(element).asObservable()
            _hasLatest = true
            _latest = _latest &+ 1
            return (_latest, observable)
        } catch {
            forwardOn(.error(error))
            dispose()
        }

        return nil
        // }
    }

    func on(_ event: Event<Element>) {
        switch event {
        case let .next(element):
            if let (latest, observable) = nextElementArrived(element: element) {
                let d = SingleAssignmentDisposable()
                _innerSubscription.disposable = d

                let observer = SwitchSinkIter(parent: self, id: latest, _self: d)
                let disposable = observable.subscribe(observer)
                d.setDisposable(disposable)
            }
        case let .error(error):
            _lock.lock(); defer { self._lock.unlock() }
            forwardOn(.error(error))
            dispose()
        case .completed:
            _lock.lock(); defer { self._lock.unlock() }
            _stopped = true

            _subscriptions.dispose()

            if !_hasLatest {
                forwardOn(.completed)
                dispose()
            }
        }
    }
}

private final class SwitchSinkIter<SourceType, Source: ObservableConvertibleType, Observer: ObserverType>:
    ObserverType,
    LockOwnerType,
    SynchronizedOnType where Source.Element == Observer.Element
{
    typealias Element = Source.Element
    typealias Parent = SwitchSink<SourceType, Source, Observer>

    fileprivate let _parent: Parent
    fileprivate let _id: Int
    fileprivate let _self: Disposable

    var _lock: RecursiveLock {
        return _parent._lock
    }

    init(parent: Parent, id: Int, _self: Disposable) {
        _parent = parent
        _id = id
        self._self = _self
    }

    func on(_ event: Event<Element>) {
        synchronizedOn(event)
    }

    func _synchronized_on(_ event: Event<Element>) {
        switch event {
        case .next: break
        case .error, .completed:
            _self.dispose()
        }

        if _parent._latest != _id {
            return
        }

        switch event {
        case .next:
            _parent.forwardOn(event)
        case .error:
            _parent.forwardOn(event)
            _parent.dispose()
        case .completed:
            _parent._hasLatest = false
            if _parent._stopped {
                _parent.forwardOn(event)
                _parent.dispose()
            }
        }
    }
}

// MARK: Specializations

private final class SwitchIdentitySink<Source: ObservableConvertibleType, Observer: ObserverType>: SwitchSink<Source, Source, Observer>
    where Observer.Element == Source.Element
{
    override init(observer: Observer, cancel: Cancelable) {
        super.init(observer: observer, cancel: cancel)
    }

    override func performMap(_ element: Source) throws -> Source {
        return element
    }
}

private final class MapSwitchSink<SourceType, Source: ObservableConvertibleType, Observer: ObserverType>: SwitchSink<SourceType, Source, Observer> where Observer.Element == Source.Element {
    typealias Selector = (SourceType) throws -> Source

    fileprivate let _selector: Selector

    init(selector: @escaping Selector, observer: Observer, cancel: Cancelable) {
        _selector = selector
        super.init(observer: observer, cancel: cancel)
    }

    override func performMap(_ element: SourceType) throws -> Source {
        return try _selector(element)
    }
}

// MARK: Producers

private final class Switch<Source: ObservableConvertibleType>: Producer<Source.Element> {
    fileprivate let _source: Observable<Source>

    init(source: Observable<Source>) {
        _source = source
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Source.Element {
        let sink = SwitchIdentitySink<Source, Observer>(observer: observer, cancel: cancel)
        let subscription = sink.run(_source)
        return (sink: sink, subscription: subscription)
    }
}

private final class FlatMapLatest<SourceType, Source: ObservableConvertibleType>: Producer<Source.Element> {
    typealias Selector = (SourceType) throws -> Source

    fileprivate let _source: Observable<SourceType>
    fileprivate let _selector: Selector

    init(source: Observable<SourceType>, selector: @escaping Selector) {
        _source = source
        _selector = selector
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Source.Element {
        let sink = MapSwitchSink<SourceType, Source, Observer>(selector: _selector, observer: observer, cancel: cancel)
        let subscription = sink.run(_source)
        return (sink: sink, subscription: subscription)
    }
}
