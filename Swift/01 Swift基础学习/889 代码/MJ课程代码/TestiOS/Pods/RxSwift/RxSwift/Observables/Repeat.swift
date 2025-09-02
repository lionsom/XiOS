//
//  Repeat.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 9/13/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Generates an observable sequence that repeats the given element infinitely, using the specified scheduler to send out observer messages.

     - seealso: [repeat operator on reactivex.io](http://reactivex.io/documentation/operators/repeat.html)

     - parameter element: Element to repeat.
     - parameter scheduler: Scheduler to run the producer loop on.
     - returns: An observable sequence that repeats the given element infinitely.
     */
    static func repeatElement(_ element: Element, scheduler: ImmediateSchedulerType = CurrentThreadScheduler.instance) -> Observable<Element> {
        return RepeatElement(element: element, scheduler: scheduler)
    }
}

private final class RepeatElement<Element>: Producer<Element> {
    fileprivate let _element: Element
    fileprivate let _scheduler: ImmediateSchedulerType

    init(element: Element, scheduler: ImmediateSchedulerType) {
        _element = element
        _scheduler = scheduler
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = RepeatElementSink(parent: self, observer: observer, cancel: cancel)
        let subscription = sink.run()

        return (sink: sink, subscription: subscription)
    }
}

private final class RepeatElementSink<Observer: ObserverType>: Sink<Observer> {
    typealias Parent = RepeatElement<Observer.Element>

    private let _parent: Parent

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        super.init(observer: observer, cancel: cancel)
    }

    func run() -> Disposable {
        return _parent._scheduler.scheduleRecursive(_parent._element) { e, recurse in
            self.forwardOn(.next(e))
            recurse(e)
        }
    }
}
