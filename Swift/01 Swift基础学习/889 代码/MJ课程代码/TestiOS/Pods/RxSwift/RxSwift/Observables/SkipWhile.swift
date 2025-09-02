//
//  SkipWhile.swift
//  RxSwift
//
//  Created by Yury Korolev on 10/9/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Bypasses elements in an observable sequence as long as a specified condition is true and then returns the remaining elements.

     - seealso: [skipWhile operator on reactivex.io](http://reactivex.io/documentation/operators/skipwhile.html)

     - parameter predicate: A function to test each element for a condition.
     - returns: An observable sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
     */
    func skipWhile(_ predicate: @escaping (Element) throws -> Bool) -> Observable<Element> {
        return SkipWhile(source: asObservable(), predicate: predicate)
    }
}

private final class SkipWhileSink<Observer: ObserverType>: Sink<Observer>, ObserverType {
    typealias Element = Observer.Element
    typealias Parent = SkipWhile<Element>

    fileprivate let _parent: Parent
    fileprivate var _running = false

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<Element>) {
        switch event {
        case let .next(value):
            if !_running {
                do {
                    _running = try !_parent._predicate(value)
                } catch let e {
                    self.forwardOn(.error(e))
                    self.dispose()
                    return
                }
            }

            if _running {
                forwardOn(.next(value))
            }
        case .error, .completed:
            forwardOn(event)
            dispose()
        }
    }
}

private final class SkipWhile<Element>: Producer<Element> {
    typealias Predicate = (Element) throws -> Bool

    fileprivate let _source: Observable<Element>
    fileprivate let _predicate: Predicate

    init(source: Observable<Element>, predicate: @escaping Predicate) {
        _source = source
        _predicate = predicate
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = SkipWhileSink(parent: self, observer: observer, cancel: cancel)
        let subscription = _source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }
}
