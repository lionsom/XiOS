//
//  AsMaybe.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 3/12/17.
//  Copyright © 2017 Krunoslav Zaher. All rights reserved.
//

private final class AsMaybeSink<Observer: ObserverType>: Sink<Observer>, ObserverType {
    typealias Element = Observer.Element

    private var _element: Event<Element>?

    func on(_ event: Event<Element>) {
        switch event {
        case .next:
            if _element != nil {
                forwardOn(.error(RxError.moreThanOneElement))
                dispose()
            }

            _element = event
        case .error:
            forwardOn(event)
            dispose()
        case .completed:
            if let element = _element {
                forwardOn(element)
            }
            forwardOn(.completed)
            dispose()
        }
    }
}

final class AsMaybe<Element>: Producer<Element> {
    fileprivate let _source: Observable<Element>

    init(source: Observable<Element>) {
        _source = source
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = AsMaybeSink(observer: observer, cancel: cancel)
        let subscription = _source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }
}
