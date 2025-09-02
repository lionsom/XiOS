//
//  Timeout.swift
//  RxSwift
//
//  Created by Tomi Koskinen on 13/11/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Applies a timeout policy for each element in the observable sequence. If the next element isn't received within the specified timeout duration starting from its predecessor, a TimeoutError is propagated to the observer.

     - seealso: [timeout operator on reactivex.io](http://reactivex.io/documentation/operators/timeout.html)

     - parameter dueTime: Maximum duration between values before a timeout occurs.
     - parameter scheduler: Scheduler to run the timeout timer on.
     - returns: An observable sequence with a `RxError.timeout` in case of a timeout.
     */
    func timeout(_ dueTime: RxTimeInterval, scheduler: SchedulerType)
        -> Observable<Element>
    {
        return Timeout(source: asObservable(), dueTime: dueTime, other: Observable.error(RxError.timeout), scheduler: scheduler)
    }

    /**
     Applies a timeout policy for each element in the observable sequence, using the specified scheduler to run timeout timers. If the next element isn't received within the specified timeout duration starting from its predecessor, the other observable sequence is used to produce future messages from that point on.

     - seealso: [timeout operator on reactivex.io](http://reactivex.io/documentation/operators/timeout.html)

     - parameter dueTime: Maximum duration between values before a timeout occurs.
     - parameter other: Sequence to return in case of a timeout.
     - parameter scheduler: Scheduler to run the timeout timer on.
     - returns: The source sequence switching to the other sequence in case of a timeout.
     */
    func timeout<Source: ObservableConvertibleType>(_ dueTime: RxTimeInterval, other: Source, scheduler: SchedulerType)
        -> Observable<Element> where Element == Source.Element
    {
        return Timeout(source: asObservable(), dueTime: dueTime, other: other.asObservable(), scheduler: scheduler)
    }
}

private final class TimeoutSink<Observer: ObserverType>: Sink<Observer>, LockOwnerType, ObserverType {
    typealias Element = Observer.Element
    typealias Parent = Timeout<Element>

    private let _parent: Parent

    let _lock = RecursiveLock()

    private let _timerD = SerialDisposable()
    private let _subscription = SerialDisposable()

    private var _id = 0
    private var _switched = false

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        super.init(observer: observer, cancel: cancel)
    }

    func run() -> Disposable {
        let original = SingleAssignmentDisposable()
        _subscription.disposable = original

        _createTimeoutTimer()

        original.setDisposable(_parent._source.subscribe(self))

        return Disposables.create(_subscription, _timerD)
    }

    func on(_ event: Event<Element>) {
        switch event {
        case .next:
            var onNextWins = false

            _lock.performLocked {
                onNextWins = !self._switched
                if onNextWins {
                    self._id = self._id &+ 1
                }
            }

            if onNextWins {
                forwardOn(event)
                _createTimeoutTimer()
            }
        case .error, .completed:
            var onEventWins = false

            _lock.performLocked {
                onEventWins = !self._switched
                if onEventWins {
                    self._id = self._id &+ 1
                }
            }

            if onEventWins {
                forwardOn(event)
                dispose()
            }
        }
    }

    private func _createTimeoutTimer() {
        if _timerD.isDisposed {
            return
        }

        let nextTimer = SingleAssignmentDisposable()
        _timerD.disposable = nextTimer

        let disposeSchedule = _parent._scheduler.scheduleRelative(_id, dueTime: _parent._dueTime) { state in

            var timerWins = false

            self._lock.performLocked {
                self._switched = (state == self._id)
                timerWins = self._switched
            }

            if timerWins {
                self._subscription.disposable = self._parent._other.subscribe(self.forwarder())
            }

            return Disposables.create()
        }

        nextTimer.setDisposable(disposeSchedule)
    }
}

private final class Timeout<Element>: Producer<Element> {
    fileprivate let _source: Observable<Element>
    fileprivate let _dueTime: RxTimeInterval
    fileprivate let _other: Observable<Element>
    fileprivate let _scheduler: SchedulerType

    init(source: Observable<Element>, dueTime: RxTimeInterval, other: Observable<Element>, scheduler: SchedulerType) {
        _source = source
        _dueTime = dueTime
        _other = other
        _scheduler = scheduler
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = TimeoutSink(parent: self, observer: observer, cancel: cancel)
        let subscription = sink.run()
        return (sink: sink, subscription: subscription)
    }
}
