//
//  Deferred.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 4/19/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Returns an observable sequence that invokes the specified factory function whenever a new observer subscribes.

     - seealso: [defer operator on reactivex.io](http://reactivex.io/documentation/operators/defer.html)

     - parameter observableFactory: Observable factory function to invoke for each observer that subscribes to the resulting sequence.
     - returns: An observable sequence whose observers trigger an invocation of the given observable factory function.
     */
    static func deferred(_ observableFactory: @escaping () throws -> Observable<Element>)
        -> Observable<Element>
    {
        return Deferred(observableFactory: observableFactory)
    }
}

private final class DeferredSink<Source: ObservableType, Observer: ObserverType>: Sink<Observer>, ObserverType where Source.Element == Observer.Element {
    typealias Element = Observer.Element

    private let _observableFactory: () throws -> Source

    init(observableFactory: @escaping () throws -> Source, observer: Observer, cancel: Cancelable) {
        _observableFactory = observableFactory
        super.init(observer: observer, cancel: cancel)
    }

    func run() -> Disposable {
        do {
            let result = try _observableFactory()
            return result.subscribe(self)
        } catch let e {
            self.forwardOn(.error(e))
            self.dispose()
            return Disposables.create()
        }
    }

    func on(_ event: Event<Element>) {
        forwardOn(event)

        switch event {
        case .next:
            break
        case .error:
            dispose()
        case .completed:
            dispose()
        }
    }
}

private final class Deferred<Source: ObservableType>: Producer<Source.Element> {
    typealias Factory = () throws -> Source

    private let _observableFactory: Factory

    init(observableFactory: @escaping Factory) {
        _observableFactory = observableFactory
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable)
        where Observer.Element == Source.Element
    {
        let sink = DeferredSink(observableFactory: _observableFactory, observer: observer, cancel: cancel)
        let subscription = sink.run()
        return (sink: sink, subscription: subscription)
    }
}
