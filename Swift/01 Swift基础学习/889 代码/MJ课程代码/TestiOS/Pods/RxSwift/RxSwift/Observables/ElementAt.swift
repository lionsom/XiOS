//
//  ElementAt.swift
//  RxSwift
//
//  Created by Junior B. on 21/10/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Returns a sequence emitting only element _n_ emitted by an Observable

     - seealso: [elementAt operator on reactivex.io](http://reactivex.io/documentation/operators/elementat.html)

     - parameter index: The index of the required element (starting from 0).
     - returns: An observable sequence that emits the desired element as its own sole emission.
     */
    func elementAt(_ index: Int)
        -> Observable<Element>
    {
        return ElementAt(source: asObservable(), index: index, throwOnEmpty: true)
    }
}

private final class ElementAtSink<Observer: ObserverType>: Sink<Observer>, ObserverType {
    typealias SourceType = Observer.Element
    typealias Parent = ElementAt<SourceType>

    let _parent: Parent
    var _i: Int

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        _i = parent._index

        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<SourceType>) {
        switch event {
        case .next:

            if _i == 0 {
                forwardOn(event)
                forwardOn(.completed)
                dispose()
            }

            do {
                _ = try decrementChecked(&_i)
            } catch let e {
                self.forwardOn(.error(e))
                self.dispose()
                return
            }

        case let .error(e):
            forwardOn(.error(e))
            dispose()
        case .completed:
            if _parent._throwOnEmpty {
                forwardOn(.error(RxError.argumentOutOfRange))
            } else {
                forwardOn(.completed)
            }

            dispose()
        }
    }
}

private final class ElementAt<SourceType>: Producer<SourceType> {
    let _source: Observable<SourceType>
    let _throwOnEmpty: Bool
    let _index: Int

    init(source: Observable<SourceType>, index: Int, throwOnEmpty: Bool) {
        if index < 0 {
            rxFatalError("index can't be negative")
        }

        _source = source
        _index = index
        _throwOnEmpty = throwOnEmpty
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == SourceType {
        let sink = ElementAtSink(parent: self, observer: observer, cancel: cancel)
        let subscription = _source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }
}
