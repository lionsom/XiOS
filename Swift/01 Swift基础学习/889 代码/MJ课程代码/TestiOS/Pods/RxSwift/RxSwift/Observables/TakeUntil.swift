//
//  TakeUntil.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 6/7/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Returns the elements from the source observable sequence until the other observable sequence produces an element.

     - seealso: [takeUntil operator on reactivex.io](http://reactivex.io/documentation/operators/takeuntil.html)

     - parameter other: Observable sequence that terminates propagation of elements of the source sequence.
     - returns: An observable sequence containing the elements of the source sequence up to the point the other sequence interrupted further propagation.
     */
    func takeUntil<Source: ObservableType>(_ other: Source)
        -> Observable<Element>
    {
        return TakeUntil(source: asObservable(), other: other.asObservable())
    }

    /**
     Returns elements from an observable sequence until the specified condition is true.

     - seealso: [takeUntil operator on reactivex.io](http://reactivex.io/documentation/operators/takeuntil.html)

     - parameter behavior: Whether or not to include the last element matching the predicate.
     - parameter predicate: A function to test each element for a condition.
     - returns: An observable sequence that contains the elements from the input sequence that occur before the element at which the test passes.
     */
    func takeUntil(_ behavior: TakeUntilBehavior,
                   predicate: @escaping (Element) throws -> Bool)
        -> Observable<Element>
    {
        return TakeUntilPredicate(source: asObservable(),
                                  behavior: behavior,
                                  predicate: predicate)
    }
}

/// Behaviors for the `takeUntil(_ behavior:predicate:)` operator.
public enum TakeUntilBehavior {
    /// Include the last element matching the predicate.
    case inclusive

    /// Exclude the last element matching the predicate.
    case exclusive
}

// MARK: - TakeUntil Observable

private final class TakeUntilSinkOther<Other, Observer: ObserverType>:
    ObserverType,
    LockOwnerType,
    SynchronizedOnType
{
    typealias Parent = TakeUntilSink<Other, Observer>
    typealias Element = Other

    fileprivate let _parent: Parent

    var _lock: RecursiveLock {
        return _parent._lock
    }

    fileprivate let _subscription = SingleAssignmentDisposable()

    init(parent: Parent) {
        _parent = parent
        #if TRACE_RESOURCES
            _ = Resources.incrementTotal()
        #endif
    }

    func on(_ event: Event<Element>) {
        synchronizedOn(event)
    }

    func _synchronized_on(_ event: Event<Element>) {
        switch event {
        case .next:
            _parent.forwardOn(.completed)
            _parent.dispose()
        case let .error(e):
            _parent.forwardOn(.error(e))
            _parent.dispose()
        case .completed:
            _subscription.dispose()
        }
    }

    #if TRACE_RESOURCES
        deinit {
            _ = Resources.decrementTotal()
        }
    #endif
}

private final class TakeUntilSink<Other, Observer: ObserverType>:
    Sink<Observer>,
    LockOwnerType,
    ObserverType,
    SynchronizedOnType
{
    typealias Element = Observer.Element
    typealias Parent = TakeUntil<Element, Other>

    fileprivate let _parent: Parent

    let _lock = RecursiveLock()

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<Element>) {
        synchronizedOn(event)
    }

    func _synchronized_on(_ event: Event<Element>) {
        switch event {
        case .next:
            forwardOn(event)
        case .error:
            forwardOn(event)
            dispose()
        case .completed:
            forwardOn(event)
            dispose()
        }
    }

    func run() -> Disposable {
        let otherObserver = TakeUntilSinkOther(parent: self)
        let otherSubscription = _parent._other.subscribe(otherObserver)
        otherObserver._subscription.setDisposable(otherSubscription)
        let sourceSubscription = _parent._source.subscribe(self)

        return Disposables.create(sourceSubscription, otherObserver._subscription)
    }
}

private final class TakeUntil<Element, Other>: Producer<Element> {
    fileprivate let _source: Observable<Element>
    fileprivate let _other: Observable<Other>

    init(source: Observable<Element>, other: Observable<Other>) {
        _source = source
        _other = other
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = TakeUntilSink(parent: self, observer: observer, cancel: cancel)
        let subscription = sink.run()
        return (sink: sink, subscription: subscription)
    }
}

// MARK: - TakeUntil Predicate

private final class TakeUntilPredicateSink<Observer: ObserverType>:
    Sink<Observer>, ObserverType
{
    typealias Element = Observer.Element
    typealias Parent = TakeUntilPredicate<Element>

    fileprivate let _parent: Parent
    fileprivate var _running = true

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<Element>) {
        switch event {
        case let .next(value):
            if !_running {
                return
            }

            do {
                _running = try !_parent._predicate(value)
            } catch let e {
                self.forwardOn(.error(e))
                self.dispose()
                return
            }

            if _running {
                forwardOn(.next(value))
            } else {
                if _parent._behavior == .inclusive {
                    forwardOn(.next(value))
                }

                forwardOn(.completed)
                dispose()
            }
        case .error, .completed:
            forwardOn(event)
            dispose()
        }
    }
}

private final class TakeUntilPredicate<Element>: Producer<Element> {
    typealias Predicate = (Element) throws -> Bool

    fileprivate let _source: Observable<Element>
    fileprivate let _predicate: Predicate
    fileprivate let _behavior: TakeUntilBehavior

    init(source: Observable<Element>,
         behavior: TakeUntilBehavior,
         predicate: @escaping Predicate)
    {
        _source = source
        _behavior = behavior
        _predicate = predicate
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = TakeUntilPredicateSink(parent: self, observer: observer, cancel: cancel)
        let subscription = _source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }
}
