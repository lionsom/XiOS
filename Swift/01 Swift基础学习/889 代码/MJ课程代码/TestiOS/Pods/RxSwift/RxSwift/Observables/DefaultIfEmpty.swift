//
//  DefaultIfEmpty.swift
//  RxSwift
//
//  Created by sergdort on 23/12/2016.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Emits elements from the source observable sequence, or a default element if the source observable sequence is empty.

     - seealso: [DefaultIfEmpty operator on reactivex.io](http://reactivex.io/documentation/operators/defaultifempty.html)

     - parameter default: Default element to be sent if the source does not emit any elements
     - returns: An observable sequence which emits default element end completes in case the original sequence is empty
     */
    func ifEmpty(default: Element) -> Observable<Element> {
        return DefaultIfEmpty(source: asObservable(), default: `default`)
    }
}

private final class DefaultIfEmptySink<Observer: ObserverType>: Sink<Observer>, ObserverType {
    typealias Element = Observer.Element
    private let _default: Element
    private var _isEmpty = true

    init(default: Element, observer: Observer, cancel: Cancelable) {
        _default = `default`
        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<Element>) {
        switch event {
        case .next:
            _isEmpty = false
            forwardOn(event)
        case .error:
            forwardOn(event)
            dispose()
        case .completed:
            if _isEmpty {
                forwardOn(.next(_default))
            }
            forwardOn(.completed)
            dispose()
        }
    }
}

private final class DefaultIfEmpty<SourceType>: Producer<SourceType> {
    private let _source: Observable<SourceType>
    private let _default: SourceType

    init(source: Observable<SourceType>, default: SourceType) {
        _source = source
        _default = `default`
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == SourceType {
        let sink = DefaultIfEmptySink(default: _default, observer: observer, cancel: cancel)
        let subscription = _source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }
}
