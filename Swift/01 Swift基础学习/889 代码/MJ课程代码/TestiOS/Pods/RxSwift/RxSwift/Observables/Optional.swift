//
//  Optional.swift
//  RxSwift
//
//  Created by tarunon on 2016/12/13.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Converts a optional to an observable sequence.

     - seealso: [from operator on reactivex.io](http://reactivex.io/documentation/operators/from.html)

     - parameter optional: Optional element in the resulting observable sequence.
     - returns: An observable sequence containing the wrapped value or not from given optional.
     */
    static func from(optional: Element?) -> Observable<Element> {
        return ObservableOptional(optional: optional)
    }

    /**
     Converts a optional to an observable sequence.

     - seealso: [from operator on reactivex.io](http://reactivex.io/documentation/operators/from.html)

     - parameter optional: Optional element in the resulting observable sequence.
     - parameter scheduler: Scheduler to send the optional element on.
     - returns: An observable sequence containing the wrapped value or not from given optional.
     */
    static func from(optional: Element?, scheduler: ImmediateSchedulerType) -> Observable<Element> {
        return ObservableOptionalScheduled(optional: optional, scheduler: scheduler)
    }
}

private final class ObservableOptionalScheduledSink<Observer: ObserverType>: Sink<Observer> {
    typealias Element = Observer.Element
    typealias Parent = ObservableOptionalScheduled<Element>

    private let _parent: Parent

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        super.init(observer: observer, cancel: cancel)
    }

    func run() -> Disposable {
        return _parent._scheduler.schedule(_parent._optional) { (optional: Element?) -> Disposable in
            if let next = optional {
                self.forwardOn(.next(next))
                return self._parent._scheduler.schedule(()) { _ in
                    self.forwardOn(.completed)
                    self.dispose()
                    return Disposables.create()
                }
            } else {
                self.forwardOn(.completed)
                self.dispose()
                return Disposables.create()
            }
        }
    }
}

private final class ObservableOptionalScheduled<Element>: Producer<Element> {
    fileprivate let _optional: Element?
    fileprivate let _scheduler: ImmediateSchedulerType

    init(optional: Element?, scheduler: ImmediateSchedulerType) {
        _optional = optional
        _scheduler = scheduler
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = ObservableOptionalScheduledSink(parent: self, observer: observer, cancel: cancel)
        let subscription = sink.run()
        return (sink: sink, subscription: subscription)
    }
}

private final class ObservableOptional<Element>: Producer<Element> {
    private let _optional: Element?

    init(optional: Element?) {
        _optional = optional
    }

    override func subscribe<Observer: ObserverType>(_ observer: Observer) -> Disposable where Observer.Element == Element {
        if let element = _optional {
            observer.on(.next(element))
        }
        observer.on(.completed)
        return Disposables.create()
    }
}
