//
//  Sink.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 2/19/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

class Sink<Observer: ObserverType>: Disposable {
    fileprivate let _observer: Observer
    fileprivate let _cancel: Cancelable
    fileprivate let _disposed = AtomicInt(0)

    #if DEBUG
        fileprivate let _synchronizationTracker = SynchronizationTracker()
    #endif

    init(observer: Observer, cancel: Cancelable) {
        #if TRACE_RESOURCES
            _ = Resources.incrementTotal()
        #endif
        _observer = observer
        _cancel = cancel
    }

    final func forwardOn(_ event: Event<Observer.Element>) {
        #if DEBUG
            _synchronizationTracker.register(synchronizationErrorMessage: .default)
            defer { self._synchronizationTracker.unregister() }
        #endif
        if isFlagSet(_disposed, 1) {
            return
        }
        _observer.on(event)
    }

    final func forwarder() -> SinkForward<Observer> {
        return SinkForward(forward: self)
    }

    final var disposed: Bool {
        return isFlagSet(_disposed, 1)
    }

    func dispose() {
        fetchOr(_disposed, 1)
        _cancel.dispose()
    }

    deinit {
        #if TRACE_RESOURCES
            _ = Resources.decrementTotal()
        #endif
    }
}

final class SinkForward<Observer: ObserverType>: ObserverType {
    typealias Element = Observer.Element

    private let _forward: Sink<Observer>

    init(forward: Sink<Observer>) {
        _forward = forward
    }

    final func on(_ event: Event<Element>) {
        switch event {
        case .next:
            _forward._observer.on(event)
        case .error, .completed:
            _forward._observer.on(event)
            _forward._cancel.dispose()
        }
    }
}
