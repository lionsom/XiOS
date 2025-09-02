//
//  Create.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 2/8/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    // MARK: create

    /**
     Creates an observable sequence from a specified subscribe method implementation.

     - seealso: [create operator on reactivex.io](http://reactivex.io/documentation/operators/create.html)

     - parameter subscribe: Implementation of the resulting observable sequence's `subscribe` method.
     - returns: The observable sequence with the specified implementation for the `subscribe` method.
     */
    static func create(_ subscribe: @escaping (AnyObserver<Element>) -> Disposable) -> Observable<Element> {
        return AnonymousObservable(subscribe)
    }
}

private final class AnonymousObservableSink<Observer: ObserverType>: Sink<Observer>, ObserverType {
    typealias Element = Observer.Element
    typealias Parent = AnonymousObservable<Element>

    // state
    private let _isStopped = AtomicInt(0)

    #if DEBUG
        fileprivate let _synchronizationTracker = SynchronizationTracker()
    #endif

    override init(observer: Observer, cancel: Cancelable) {
        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<Element>) {
        #if DEBUG
            _synchronizationTracker.register(synchronizationErrorMessage: .default)
            defer { self._synchronizationTracker.unregister() }
        #endif
        switch event {
        case .next:
            if load(_isStopped) == 1 {
                return
            }
            forwardOn(event)
        case .error, .completed:
            if fetchOr(_isStopped, 1) == 0 {
                forwardOn(event)
                dispose()
            }
        }
    }

    func run(_ parent: Parent) -> Disposable {
        return parent._subscribeHandler(AnyObserver(self))
    }
}

private final class AnonymousObservable<Element>: Producer<Element> {
    typealias SubscribeHandler = (AnyObserver<Element>) -> Disposable

    let _subscribeHandler: SubscribeHandler

    init(_ subscribeHandler: @escaping SubscribeHandler) {
        _subscribeHandler = subscribeHandler
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = AnonymousObservableSink(observer: observer, cancel: cancel)
        let subscription = sink.run(self)
        return (sink: sink, subscription: subscription)
    }
}
