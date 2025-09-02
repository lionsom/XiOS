//
//  AsMaybe.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 3/12/17.
//  Copyright © 2017 Krunoslav Zaher. All rights reserved.
//

private final class AsMaybeSink<Observer: ObserverType>: Sink<Observer>, ObserverType {
    typealias Element = Observer.Element

    private var element: Event<Element>?

    func on(_ event: Event<Element>) {
        switch event {
        case .next:
            if element != nil {
                forwardOn(.error(RxError.moreThanOneElement))
                dispose()
            }

            element = event
        case .error:
            forwardOn(event)
            dispose()
        case .completed:
            if let element = element {
                forwardOn(element)
            }
            forwardOn(.completed)
            dispose()
        }
    }
}

final class AsMaybe<Element>: Producer<Element> {
    private let source: Observable<Element>

    init(source: Observable<Element>) {
        self.source = source
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = AsMaybeSink(observer: observer, cancel: cancel)
        let subscription = source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }
}
