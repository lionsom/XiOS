//
//  Do.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 2/21/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Invokes an action for each event in the observable sequence, and propagates all observer messages through the result sequence.

     - seealso: [do operator on reactivex.io](http://reactivex.io/documentation/operators/do.html)

     - parameter onNext: Action to invoke for each element in the observable sequence.
     - parameter afterNext: Action to invoke for each element after the observable has passed an onNext event along to its downstream.
     - parameter onError: Action to invoke upon errored termination of the observable sequence.
     - parameter afterError: Action to invoke after errored termination of the observable sequence.
     - parameter onCompleted: Action to invoke upon graceful termination of the observable sequence.
     - parameter afterCompleted: Action to invoke after graceful termination of the observable sequence.
     - parameter onSubscribe: Action to invoke before subscribing to source observable sequence.
     - parameter onSubscribed: Action to invoke after subscribing to source observable sequence.
     - parameter onDispose: Action to invoke after subscription to source observable has been disposed for any reason. It can be either because sequence terminates for some reason or observer subscription being disposed.
     - returns: The source sequence with the side-effecting behavior applied.
     */
    func `do`(onNext: ((Element) throws -> Void)? = nil, afterNext: ((Element) throws -> Void)? = nil, onError: ((Swift.Error) throws -> Void)? = nil, afterError: ((Swift.Error) throws -> Void)? = nil, onCompleted: (() throws -> Void)? = nil, afterCompleted: (() throws -> Void)? = nil, onSubscribe: (() -> Void)? = nil, onSubscribed: (() -> Void)? = nil, onDispose: (() -> Void)? = nil)
        -> Observable<Element>
    {
        return Do(source: asObservable(), eventHandler: { e in
            switch e {
            case let .next(element):
                try onNext?(element)
            case let .error(e):
                try onError?(e)
            case .completed:
                try onCompleted?()
            }
        }, afterEventHandler: { e in
            switch e {
            case let .next(element):
                try afterNext?(element)
            case let .error(e):
                try afterError?(e)
            case .completed:
                try afterCompleted?()
            }
        }, onSubscribe: onSubscribe, onSubscribed: onSubscribed, onDispose: onDispose)
    }
}

private final class DoSink<Observer: ObserverType>: Sink<Observer>, ObserverType {
    typealias Element = Observer.Element
    typealias EventHandler = (Event<Element>) throws -> Void
    typealias AfterEventHandler = (Event<Element>) throws -> Void

    private let _eventHandler: EventHandler
    private let _afterEventHandler: AfterEventHandler

    init(eventHandler: @escaping EventHandler, afterEventHandler: @escaping AfterEventHandler, observer: Observer, cancel: Cancelable) {
        _eventHandler = eventHandler
        _afterEventHandler = afterEventHandler
        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<Element>) {
        do {
            try _eventHandler(event)
            forwardOn(event)
            try _afterEventHandler(event)
            if event.isStopEvent {
                dispose()
            }
        } catch {
            forwardOn(.error(error))
            dispose()
        }
    }
}

private final class Do<Element>: Producer<Element> {
    typealias EventHandler = (Event<Element>) throws -> Void
    typealias AfterEventHandler = (Event<Element>) throws -> Void

    fileprivate let _source: Observable<Element>
    fileprivate let _eventHandler: EventHandler
    fileprivate let _afterEventHandler: AfterEventHandler
    fileprivate let _onSubscribe: (() -> Void)?
    fileprivate let _onSubscribed: (() -> Void)?
    fileprivate let _onDispose: (() -> Void)?

    init(source: Observable<Element>, eventHandler: @escaping EventHandler, afterEventHandler: @escaping AfterEventHandler, onSubscribe: (() -> Void)?, onSubscribed: (() -> Void)?, onDispose: (() -> Void)?) {
        _source = source
        _eventHandler = eventHandler
        _afterEventHandler = afterEventHandler
        _onSubscribe = onSubscribe
        _onSubscribed = onSubscribed
        _onDispose = onDispose
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        _onSubscribe?()
        let sink = DoSink(eventHandler: _eventHandler, afterEventHandler: _afterEventHandler, observer: observer, cancel: cancel)
        let subscription = _source.subscribe(sink)
        _onSubscribed?()
        let onDispose = _onDispose
        let allSubscriptions = Disposables.create {
            subscription.dispose()
            onDispose?()
        }
        return (sink: sink, subscription: allSubscriptions)
    }
}
