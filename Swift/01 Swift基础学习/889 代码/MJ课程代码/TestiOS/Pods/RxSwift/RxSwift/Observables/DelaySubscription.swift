//
//  DelaySubscription.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 6/14/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Time shifts the observable sequence by delaying the subscription with the specified relative time duration, using the specified scheduler to run timers.

     - seealso: [delay operator on reactivex.io](http://reactivex.io/documentation/operators/delay.html)

     - parameter dueTime: Relative time shift of the subscription.
     - parameter scheduler: Scheduler to run the subscription delay timer on.
     - returns: Time-shifted sequence.
     */
    func delaySubscription(_ dueTime: RxTimeInterval, scheduler: SchedulerType)
        -> Observable<Element>
    {
        return DelaySubscription(source: asObservable(), dueTime: dueTime, scheduler: scheduler)
    }
}

private final class DelaySubscriptionSink<Observer: ObserverType>:
    Sink<Observer>, ObserverType
{
    typealias Element = Observer.Element

    func on(_ event: Event<Element>) {
        forwardOn(event)
        if event.isStopEvent {
            dispose()
        }
    }
}

private final class DelaySubscription<Element>: Producer<Element> {
    private let _source: Observable<Element>
    private let _dueTime: RxTimeInterval
    private let _scheduler: SchedulerType

    init(source: Observable<Element>, dueTime: RxTimeInterval, scheduler: SchedulerType) {
        _source = source
        _dueTime = dueTime
        _scheduler = scheduler
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = DelaySubscriptionSink(observer: observer, cancel: cancel)
        let subscription = _scheduler.scheduleRelative((), dueTime: _dueTime) { _ in
            self._source.subscribe(sink)
        }

        return (sink: sink, subscription: subscription)
    }
}
