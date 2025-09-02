//
//  Buffer.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 9/13/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Projects each element of an observable sequence into a buffer that's sent out when either it's full or a given amount of time has elapsed, using the specified scheduler to run timers.

     A useful real-world analogy of this overload is the behavior of a ferry leaving the dock when all seats are taken, or at the scheduled time of departure, whichever event occurs first.

     - seealso: [buffer operator on reactivex.io](http://reactivex.io/documentation/operators/buffer.html)

     - parameter timeSpan: Maximum time length of a buffer.
     - parameter count: Maximum element count of a buffer.
     - parameter scheduler: Scheduler to run buffering timers on.
     - returns: An observable sequence of buffers.
     */
    func buffer(timeSpan: RxTimeInterval, count: Int, scheduler: SchedulerType)
        -> Observable<[Element]>
    {
        return BufferTimeCount(source: asObservable(), timeSpan: timeSpan, count: count, scheduler: scheduler)
    }
}

private final class BufferTimeCount<Element>: Producer<[Element]> {
    fileprivate let _timeSpan: RxTimeInterval
    fileprivate let _count: Int
    fileprivate let _scheduler: SchedulerType
    fileprivate let _source: Observable<Element>

    init(source: Observable<Element>, timeSpan: RxTimeInterval, count: Int, scheduler: SchedulerType) {
        _source = source
        _timeSpan = timeSpan
        _count = count
        _scheduler = scheduler
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == [Element] {
        let sink = BufferTimeCountSink(parent: self, observer: observer, cancel: cancel)
        let subscription = sink.run()
        return (sink: sink, subscription: subscription)
    }
}

private final class BufferTimeCountSink<Element, Observer: ObserverType>:
    Sink<Observer>,
    LockOwnerType,
    ObserverType,
    SynchronizedOnType where Observer.Element == [Element]
{
    typealias Parent = BufferTimeCount<Element>

    private let _parent: Parent

    let _lock = RecursiveLock()

    // state
    private let _timerD = SerialDisposable()
    private var _buffer = [Element]()
    private var _windowID = 0

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        super.init(observer: observer, cancel: cancel)
    }

    func run() -> Disposable {
        createTimer(_windowID)
        return Disposables.create(_timerD, _parent._source.subscribe(self))
    }

    func startNewWindowAndSendCurrentOne() {
        _windowID = _windowID &+ 1
        let windowID = _windowID

        let buffer = _buffer
        _buffer = []
        forwardOn(.next(buffer))

        createTimer(windowID)
    }

    func on(_ event: Event<Element>) {
        synchronizedOn(event)
    }

    func _synchronized_on(_ event: Event<Element>) {
        switch event {
        case let .next(element):
            _buffer.append(element)

            if _buffer.count == _parent._count {
                startNewWindowAndSendCurrentOne()
            }

        case let .error(error):
            _buffer = []
            forwardOn(.error(error))
            dispose()
        case .completed:
            forwardOn(.next(_buffer))
            forwardOn(.completed)
            dispose()
        }
    }

    func createTimer(_ windowID: Int) {
        if _timerD.isDisposed {
            return
        }

        if _windowID != windowID {
            return
        }

        let nextTimer = SingleAssignmentDisposable()

        _timerD.disposable = nextTimer

        let disposable = _parent._scheduler.scheduleRelative(windowID, dueTime: _parent._timeSpan) { previousWindowID in
            self._lock.performLocked {
                if previousWindowID != self._windowID {
                    return
                }

                self.startNewWindowAndSendCurrentOne()
            }

            return Disposables.create()
        }

        nextTimer.setDisposable(disposable)
    }
}
