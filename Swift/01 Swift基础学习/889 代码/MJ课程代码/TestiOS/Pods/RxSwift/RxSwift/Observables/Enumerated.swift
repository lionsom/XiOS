//
//  Enumerated.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 8/6/17.
//  Copyright © 2017 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Enumerates the elements of an observable sequence.

     - seealso: [map operator on reactivex.io](http://reactivex.io/documentation/operators/map.html)

     - returns: An observable sequence that contains tuples of source sequence elements and their indexes.
     */
    func enumerated()
        -> Observable<(index: Int, element: Element)>
    {
        return Enumerated(source: asObservable())
    }
}

private final class EnumeratedSink<Element, Observer: ObserverType>: Sink<Observer>, ObserverType where Observer.Element == (index: Int, element: Element) {
    var index = 0

    func on(_ event: Event<Element>) {
        switch event {
        case let .next(value):
            do {
                let nextIndex = try incrementChecked(&index)
                let next = (index: nextIndex, element: value)
                forwardOn(.next(next))
            } catch let e {
                self.forwardOn(.error(e))
                self.dispose()
            }
        case .completed:
            forwardOn(.completed)
            dispose()
        case let .error(error):
            forwardOn(.error(error))
            dispose()
        }
    }
}

private final class Enumerated<Element>: Producer<(index: Int, element: Element)> {
    private let _source: Observable<Element>

    init(source: Observable<Element>) {
        _source = source
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == (index: Int, element: Element) {
        let sink = EnumeratedSink<Element, Observer>(observer: observer, cancel: cancel)
        let subscription = _source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }
}
