//
//  RetryWhen.swift
//  RxSwift
//
//  Created by Junior B. on 06/10/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Repeats the source observable sequence on error when the notifier emits a next value.
     If the source observable errors and the notifier completes, it will complete the source sequence.

     - seealso: [retry operator on reactivex.io](http://reactivex.io/documentation/operators/retry.html)

     - parameter notificationHandler: A handler that is passed an observable sequence of errors raised by the source observable and returns and observable that either continues, completes or errors. This behavior is then applied to the source observable.
     - returns: An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully or is notified to error or complete.
     */
    func retryWhen<TriggerObservable: ObservableType, Error: Swift.Error>(_ notificationHandler: @escaping (Observable<Error>) -> TriggerObservable)
        -> Observable<Element>
    {
        return RetryWhenSequence(sources: InfiniteSequence(repeatedValue: asObservable()), notificationHandler: notificationHandler)
    }

    /**
     Repeats the source observable sequence on error when the notifier emits a next value.
     If the source observable errors and the notifier completes, it will complete the source sequence.

     - seealso: [retry operator on reactivex.io](http://reactivex.io/documentation/operators/retry.html)

     - parameter notificationHandler: A handler that is passed an observable sequence of errors raised by the source observable and returns and observable that either continues, completes or errors. This behavior is then applied to the source observable.
     - returns: An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully or is notified to error or complete.
     */
    func retryWhen<TriggerObservable: ObservableType>(_ notificationHandler: @escaping (Observable<Swift.Error>) -> TriggerObservable)
        -> Observable<Element>
    {
        return RetryWhenSequence(sources: InfiniteSequence(repeatedValue: asObservable()), notificationHandler: notificationHandler)
    }
}

private final class RetryTriggerSink<Sequence: Swift.Sequence, Observer: ObserverType, TriggerObservable: ObservableType, Error>:
    ObserverType where Sequence.Element: ObservableType, Sequence.Element.Element == Observer.Element
{
    typealias Element = TriggerObservable.Element

    typealias Parent = RetryWhenSequenceSinkIter<Sequence, Observer, TriggerObservable, Error>

    fileprivate let _parent: Parent

    init(parent: Parent) {
        _parent = parent
    }

    func on(_ event: Event<Element>) {
        switch event {
        case .next:
            _parent._parent._lastError = nil
            _parent._parent.schedule(.moveNext)
        case let .error(e):
            _parent._parent.forwardOn(.error(e))
            _parent._parent.dispose()
        case .completed:
            _parent._parent.forwardOn(.completed)
            _parent._parent.dispose()
        }
    }
}

private final class RetryWhenSequenceSinkIter<Sequence: Swift.Sequence, Observer: ObserverType, TriggerObservable: ObservableType, Error>:
    ObserverType,
    Disposable where Sequence.Element: ObservableType, Sequence.Element.Element == Observer.Element
{
    typealias Element = Observer.Element
    typealias Parent = RetryWhenSequenceSink<Sequence, Observer, TriggerObservable, Error>

    fileprivate let _parent: Parent
    fileprivate let _errorHandlerSubscription = SingleAssignmentDisposable()
    fileprivate let _subscription: Disposable

    init(parent: Parent, subscription: Disposable) {
        _parent = parent
        _subscription = subscription
    }

    func on(_ event: Event<Element>) {
        switch event {
        case .next:
            _parent.forwardOn(event)
        case let .error(error):
            _parent._lastError = error

            if let failedWith = error as? Error {
                // dispose current subscription
                _subscription.dispose()

                let errorHandlerSubscription = _parent._notifier.subscribe(RetryTriggerSink(parent: self))
                _errorHandlerSubscription.setDisposable(errorHandlerSubscription)
                _parent._errorSubject.on(.next(failedWith))
            } else {
                _parent.forwardOn(.error(error))
                _parent.dispose()
            }
        case .completed:
            _parent.forwardOn(event)
            _parent.dispose()
        }
    }

    final func dispose() {
        _subscription.dispose()
        _errorHandlerSubscription.dispose()
    }
}

private final class RetryWhenSequenceSink<Sequence: Swift.Sequence, Observer: ObserverType, TriggerObservable: ObservableType, Error>:
    TailRecursiveSink<Sequence, Observer> where Sequence.Element: ObservableType, Sequence.Element.Element == Observer.Element
{
    typealias Element = Observer.Element
    typealias Parent = RetryWhenSequence<Sequence, TriggerObservable, Error>

    let _lock = RecursiveLock()

    fileprivate let _parent: Parent

    fileprivate var _lastError: Swift.Error?
    fileprivate let _errorSubject = PublishSubject<Error>()
    fileprivate let _handler: Observable<TriggerObservable.Element>
    fileprivate let _notifier = PublishSubject<TriggerObservable.Element>()

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        _handler = parent._notificationHandler(_errorSubject).asObservable()
        super.init(observer: observer, cancel: cancel)
    }

    override func done() {
        if let lastError = _lastError {
            forwardOn(.error(lastError))
            _lastError = nil
        } else {
            forwardOn(.completed)
        }

        dispose()
    }

    override func extract(_: Observable<Element>) -> SequenceGenerator? {
        // It is important to always return `nil` here because there are sideffects in the `run` method
        // that are dependant on particular `retryWhen` operator so single operator stack can't be reused in this
        // case.
        return nil
    }

    override func subscribeToNext(_ source: Observable<Element>) -> Disposable {
        let subscription = SingleAssignmentDisposable()
        let iter = RetryWhenSequenceSinkIter(parent: self, subscription: subscription)
        subscription.setDisposable(source.subscribe(iter))
        return iter
    }

    override func run(_ sources: SequenceGenerator) -> Disposable {
        let triggerSubscription = _handler.subscribe(_notifier.asObserver())
        let superSubscription = super.run(sources)
        return Disposables.create(superSubscription, triggerSubscription)
    }
}

private final class RetryWhenSequence<Sequence: Swift.Sequence, TriggerObservable: ObservableType, Error>: Producer<Sequence.Element.Element> where Sequence.Element: ObservableType {
    typealias Element = Sequence.Element.Element

    fileprivate let _sources: Sequence
    fileprivate let _notificationHandler: (Observable<Error>) -> TriggerObservable

    init(sources: Sequence, notificationHandler: @escaping (Observable<Error>) -> TriggerObservable) {
        _sources = sources
        _notificationHandler = notificationHandler
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = RetryWhenSequenceSink<Sequence, Observer, TriggerObservable, Error>(parent: self, observer: observer, cancel: cancel)
        let subscription = sink.run((_sources.makeIterator(), nil))
        return (sink: sink, subscription: subscription)
    }
}
