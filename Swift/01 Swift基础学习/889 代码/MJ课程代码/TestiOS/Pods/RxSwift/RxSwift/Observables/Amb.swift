//
//  Amb.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 6/14/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Propagates the observable sequence that reacts first.

     - seealso: [amb operator on reactivex.io](http://reactivex.io/documentation/operators/amb.html)

     - returns: An observable sequence that surfaces any of the given sequences, whichever reacted first.
     */
    static func amb<Sequence: Swift.Sequence>(_ sequence: Sequence) -> Observable<Element>
        where Sequence.Element == Observable<Element>
    {
        return sequence.reduce(Observable<Sequence.Element.Element>.never()) { a, o in
            a.amb(o.asObservable())
        }
    }
}

public extension ObservableType {
    /**
     Propagates the observable sequence that reacts first.

     - seealso: [amb operator on reactivex.io](http://reactivex.io/documentation/operators/amb.html)

     - parameter right: Second observable sequence.
     - returns: An observable sequence that surfaces either of the given sequences, whichever reacted first.
     */
    func amb<O2: ObservableType>
    (_ right: O2)
        -> Observable<Element> where O2.Element == Element
    {
        return Amb(left: asObservable(), right: right.asObservable())
    }
}

private enum AmbState {
    case neither
    case left
    case right
}

private final class AmbObserver<Observer: ObserverType>: ObserverType {
    typealias Element = Observer.Element
    typealias Parent = AmbSink<Observer>
    typealias This = AmbObserver<Observer>
    typealias Sink = (This, Event<Element>) -> Void

    fileprivate let _parent: Parent
    fileprivate var _sink: Sink
    fileprivate var _cancel: Disposable

    init(parent: Parent, cancel: Disposable, sink: @escaping Sink) {
        #if TRACE_RESOURCES
            _ = Resources.incrementTotal()
        #endif

        _parent = parent
        _sink = sink
        _cancel = cancel
    }

    func on(_ event: Event<Element>) {
        _sink(self, event)
        if event.isStopEvent {
            _cancel.dispose()
        }
    }

    deinit {
        #if TRACE_RESOURCES
            _ = Resources.decrementTotal()
        #endif
    }
}

private final class AmbSink<Observer: ObserverType>: Sink<Observer> {
    typealias Element = Observer.Element
    typealias Parent = Amb<Element>
    typealias AmbObserverType = AmbObserver<Observer>

    private let _parent: Parent

    private let _lock = RecursiveLock()
    // state
    private var _choice = AmbState.neither

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        super.init(observer: observer, cancel: cancel)
    }

    func run() -> Disposable {
        let subscription1 = SingleAssignmentDisposable()
        let subscription2 = SingleAssignmentDisposable()
        let disposeAll = Disposables.create(subscription1, subscription2)

        let forwardEvent = { (_: AmbObserverType, event: Event<Element>) in
            self.forwardOn(event)
            if event.isStopEvent {
                self.dispose()
            }
        }

        let decide = { (o: AmbObserverType, event: Event<Element>, me: AmbState, otherSubscription: Disposable) in
            self._lock.performLocked {
                if self._choice == .neither {
                    self._choice = me
                    o._sink = forwardEvent
                    o._cancel = disposeAll
                    otherSubscription.dispose()
                }

                if self._choice == me {
                    self.forwardOn(event)
                    if event.isStopEvent {
                        self.dispose()
                    }
                }
            }
        }

        let sink1 = AmbObserver(parent: self, cancel: subscription1) { o, e in
            decide(o, e, .left, subscription2)
        }

        let sink2 = AmbObserver(parent: self, cancel: subscription1) { o, e in
            decide(o, e, .right, subscription1)
        }

        subscription1.setDisposable(_parent._left.subscribe(sink1))
        subscription2.setDisposable(_parent._right.subscribe(sink2))

        return disposeAll
    }
}

private final class Amb<Element>: Producer<Element> {
    fileprivate let _left: Observable<Element>
    fileprivate let _right: Observable<Element>

    init(left: Observable<Element>, right: Observable<Element>) {
        _left = left
        _right = right
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = AmbSink(parent: self, observer: observer, cancel: cancel)
        let subscription = sink.run()
        return (sink: sink, subscription: subscription)
    }
}
