//
//  Catch.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 4/19/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Continues an observable sequence that is terminated by an error with the observable sequence produced by the handler.

     - seealso: [catch operator on reactivex.io](http://reactivex.io/documentation/operators/catch.html)

     - parameter handler: Error handler function, producing another observable sequence.
     - returns: An observable sequence containing the source sequence's elements, followed by the elements produced by the handler's resulting observable sequence in case an error occurred.
     */
    func catchError(_ handler: @escaping (Swift.Error) throws -> Observable<Element>)
        -> Observable<Element>
    {
        return Catch(source: asObservable(), handler: handler)
    }

    /**
     Continues an observable sequence that is terminated by an error with a single element.

     - seealso: [catch operator on reactivex.io](http://reactivex.io/documentation/operators/catch.html)

     - parameter element: Last element in an observable sequence in case error occurs.
     - returns: An observable sequence containing the source sequence's elements, followed by the `element` in case an error occurred.
     */
    func catchErrorJustReturn(_ element: Element)
        -> Observable<Element>
    {
        return Catch(source: asObservable(), handler: { _ in Observable.just(element) })
    }
}

public extension ObservableType {
    /**
     Continues an observable sequence that is terminated by an error with the next observable sequence.

     - seealso: [catch operator on reactivex.io](http://reactivex.io/documentation/operators/catch.html)

     - returns: An observable sequence containing elements from consecutive source sequences until a source sequence terminates successfully.
     */
    static func catchError<Sequence: Swift.Sequence>(_ sequence: Sequence) -> Observable<Element>
        where Sequence.Element == Observable<Element>
    {
        return CatchSequence(sources: sequence)
    }
}

public extension ObservableType {
    /**
     Repeats the source observable sequence until it successfully terminates.

     **This could potentially create an infinite sequence.**

     - seealso: [retry operator on reactivex.io](http://reactivex.io/documentation/operators/retry.html)

     - returns: Observable sequence to repeat until it successfully terminates.
     */
    func retry() -> Observable<Element> {
        return CatchSequence(sources: InfiniteSequence(repeatedValue: asObservable()))
    }

    /**
     Repeats the source observable sequence the specified number of times in case of an error or until it successfully terminates.

     If you encounter an error and want it to retry once, then you must use `retry(2)`

     - seealso: [retry operator on reactivex.io](http://reactivex.io/documentation/operators/retry.html)

     - parameter maxAttemptCount: Maximum number of times to repeat the sequence.
     - returns: An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
     */
    func retry(_ maxAttemptCount: Int)
        -> Observable<Element>
    {
        return CatchSequence(sources: Swift.repeatElement(asObservable(), count: maxAttemptCount))
    }
}

// catch with callback

private final class CatchSinkProxy<Observer: ObserverType>: ObserverType {
    typealias Element = Observer.Element
    typealias Parent = CatchSink<Observer>

    private let _parent: Parent

    init(parent: Parent) {
        _parent = parent
    }

    func on(_ event: Event<Element>) {
        _parent.forwardOn(event)

        switch event {
        case .next:
            break
        case .error, .completed:
            _parent.dispose()
        }
    }
}

private final class CatchSink<Observer: ObserverType>: Sink<Observer>, ObserverType {
    typealias Element = Observer.Element
    typealias Parent = Catch<Element>

    private let _parent: Parent
    private let _subscription = SerialDisposable()

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        super.init(observer: observer, cancel: cancel)
    }

    func run() -> Disposable {
        let d1 = SingleAssignmentDisposable()
        _subscription.disposable = d1
        d1.setDisposable(_parent._source.subscribe(self))

        return _subscription
    }

    func on(_ event: Event<Element>) {
        switch event {
        case .next:
            forwardOn(event)
        case .completed:
            forwardOn(event)
            dispose()
        case let .error(error):
            do {
                let catchSequence = try _parent._handler(error)

                let observer = CatchSinkProxy(parent: self)

                _subscription.disposable = catchSequence.subscribe(observer)
            } catch let e {
                self.forwardOn(.error(e))
                self.dispose()
            }
        }
    }
}

private final class Catch<Element>: Producer<Element> {
    typealias Handler = (Swift.Error) throws -> Observable<Element>

    fileprivate let _source: Observable<Element>
    fileprivate let _handler: Handler

    init(source: Observable<Element>, handler: @escaping Handler) {
        _source = source
        _handler = handler
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = CatchSink(parent: self, observer: observer, cancel: cancel)
        let subscription = sink.run()
        return (sink: sink, subscription: subscription)
    }
}

// catch enumerable

private final class CatchSequenceSink<Sequence: Swift.Sequence, Observer: ObserverType>:
    TailRecursiveSink<Sequence, Observer>,
    ObserverType where Sequence.Element: ObservableConvertibleType, Sequence.Element.Element == Observer.Element
{
    typealias Element = Observer.Element
    typealias Parent = CatchSequence<Sequence>

    private var _lastError: Swift.Error?

    override init(observer: Observer, cancel: Cancelable) {
        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<Element>) {
        switch event {
        case .next:
            forwardOn(event)
        case let .error(error):
            _lastError = error
            schedule(.moveNext)
        case .completed:
            forwardOn(event)
            dispose()
        }
    }

    override func subscribeToNext(_ source: Observable<Element>) -> Disposable {
        return source.subscribe(self)
    }

    override func done() {
        if let lastError = _lastError {
            forwardOn(.error(lastError))
        } else {
            forwardOn(.completed)
        }

        dispose()
    }

    override func extract(_ observable: Observable<Element>) -> SequenceGenerator? {
        if let onError = observable as? CatchSequence<Sequence> {
            return (onError.sources.makeIterator(), nil)
        } else {
            return nil
        }
    }
}

private final class CatchSequence<Sequence: Swift.Sequence>: Producer<Sequence.Element.Element> where Sequence.Element: ObservableConvertibleType {
    typealias Element = Sequence.Element.Element

    let sources: Sequence

    init(sources: Sequence) {
        self.sources = sources
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = CatchSequenceSink<Sequence, Observer>(observer: observer, cancel: cancel)
        let subscription = sink.run((sources.makeIterator(), nil))
        return (sink: sink, subscription: subscription)
    }
}
