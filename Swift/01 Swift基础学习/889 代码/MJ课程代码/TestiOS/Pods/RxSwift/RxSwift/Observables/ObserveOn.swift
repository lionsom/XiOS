//
//  ObserveOn.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 7/25/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Wraps the source sequence in order to run its observer callbacks on the specified scheduler.

     This only invokes observer callbacks on a `scheduler`. In case the subscription and/or unsubscription
     actions have side-effects that require to be run on a scheduler, use `subscribeOn`.

     - seealso: [observeOn operator on reactivex.io](http://reactivex.io/documentation/operators/observeon.html)

     - parameter scheduler: Scheduler to notify observers on.
     - returns: The source sequence whose observations happen on the specified scheduler.
     */
    func observeOn(_ scheduler: ImmediateSchedulerType)
        -> Observable<Element>
    {
        if let scheduler = scheduler as? SerialDispatchQueueScheduler {
            return ObserveOnSerialDispatchQueue(source: asObservable(), scheduler: scheduler)
        } else {
            return ObserveOn(source: asObservable(), scheduler: scheduler)
        }
    }
}

private final class ObserveOn<Element>: Producer<Element> {
    let scheduler: ImmediateSchedulerType
    let source: Observable<Element>

    init(source: Observable<Element>, scheduler: ImmediateSchedulerType) {
        self.scheduler = scheduler
        self.source = source

        #if TRACE_RESOURCES
            _ = Resources.incrementTotal()
        #endif
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = ObserveOnSink(scheduler: scheduler, observer: observer, cancel: cancel)
        let subscription = source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }

    #if TRACE_RESOURCES
        deinit {
            _ = Resources.decrementTotal()
        }
    #endif
}

enum ObserveOnState: Int32 {
    // pump is not running
    case stopped = 0
    // pump is running
    case running = 1
}

private final class ObserveOnSink<Observer: ObserverType>: ObserverBase<Observer.Element> {
    typealias Element = Observer.Element

    let _scheduler: ImmediateSchedulerType

    var _lock = SpinLock()
    let _observer: Observer

    // state
    var _state = ObserveOnState.stopped
    var _queue = Queue<Event<Element>>(capacity: 10)

    let _scheduleDisposable = SerialDisposable()
    let _cancel: Cancelable

    init(scheduler: ImmediateSchedulerType, observer: Observer, cancel: Cancelable) {
        _scheduler = scheduler
        _observer = observer
        _cancel = cancel
    }

    override func onCore(_ event: Event<Element>) {
        let shouldStart = _lock.calculateLocked { () -> Bool in
            self._queue.enqueue(event)

            switch self._state {
            case .stopped:
                self._state = .running
                return true
            case .running:
                return false
            }
        }

        if shouldStart {
            _scheduleDisposable.disposable = _scheduler.scheduleRecursive((), action: run)
        }
    }

    func run(_: (), _ recurse: (()) -> Void) {
        let (nextEvent, observer) = _lock.calculateLocked { () -> (Event<Element>?, Observer) in
            if !self._queue.isEmpty {
                return (self._queue.dequeue(), self._observer)
            } else {
                self._state = .stopped
                return (nil, self._observer)
            }
        }

        if let nextEvent = nextEvent, !self._cancel.isDisposed {
            observer.on(nextEvent)
            if nextEvent.isStopEvent {
                dispose()
            }
        } else {
            return
        }

        let shouldContinue = _shouldContinue_synchronized()

        if shouldContinue {
            recurse(())
        }
    }

    func _shouldContinue_synchronized() -> Bool {
        _lock.lock(); defer { self._lock.unlock() } // {
        if !_queue.isEmpty {
            return true
        } else {
            _state = .stopped
            return false
        }
        // }
    }

    override func dispose() {
        super.dispose()

        _cancel.dispose()
        _scheduleDisposable.dispose()
    }
}

#if TRACE_RESOURCES
    fileprivate let _numberOfSerialDispatchQueueObservables = AtomicInt(0)
    public extension Resources {
        /**
         Counts number of `SerialDispatchQueueObservables`.

         Purposed for unit tests.
         */
        static var numberOfSerialDispatchQueueObservables: Int32 {
            return load(_numberOfSerialDispatchQueueObservables)
        }
    }
#endif

private final class ObserveOnSerialDispatchQueueSink<Observer: ObserverType>: ObserverBase<Observer.Element> {
    let scheduler: SerialDispatchQueueScheduler
    let observer: Observer

    let cancel: Cancelable

    var cachedScheduleLambda: (((sink: ObserveOnSerialDispatchQueueSink<Observer>, event: Event<Element>)) -> Disposable)!

    init(scheduler: SerialDispatchQueueScheduler, observer: Observer, cancel: Cancelable) {
        self.scheduler = scheduler
        self.observer = observer
        self.cancel = cancel
        super.init()

        cachedScheduleLambda = { pair in
            guard !cancel.isDisposed else { return Disposables.create() }

            pair.sink.observer.on(pair.event)

            if pair.event.isStopEvent {
                pair.sink.dispose()
            }

            return Disposables.create()
        }
    }

    override func onCore(_ event: Event<Element>) {
        _ = scheduler.schedule((self, event), action: cachedScheduleLambda!)
    }

    override func dispose() {
        super.dispose()

        cancel.dispose()
    }
}

private final class ObserveOnSerialDispatchQueue<Element>: Producer<Element> {
    let scheduler: SerialDispatchQueueScheduler
    let source: Observable<Element>

    init(source: Observable<Element>, scheduler: SerialDispatchQueueScheduler) {
        self.scheduler = scheduler
        self.source = source

        #if TRACE_RESOURCES
            _ = Resources.incrementTotal()
            _ = increment(_numberOfSerialDispatchQueueObservables)
        #endif
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = ObserveOnSerialDispatchQueueSink(scheduler: scheduler, observer: observer, cancel: cancel)
        let subscription = source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }

    #if TRACE_RESOURCES
        deinit {
            _ = Resources.decrementTotal()
            _ = decrement(_numberOfSerialDispatchQueueObservables)
        }
    #endif
}
