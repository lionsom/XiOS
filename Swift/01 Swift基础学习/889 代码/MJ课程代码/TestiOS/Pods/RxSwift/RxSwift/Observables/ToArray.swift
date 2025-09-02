//
//  ToArray.swift
//  RxSwift
//
//  Created by Junior B. on 20/10/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Converts an Observable into a Single that emits the whole sequence as a single array and then terminates.

     For aggregation behavior see `reduce`.

     - seealso: [toArray operator on reactivex.io](http://reactivex.io/documentation/operators/to.html)

     - returns: A Single sequence containing all the emitted elements as array.
     */
    func toArray()
        -> Single<[Element]>
    {
        return PrimitiveSequence(raw: ToArray(source: asObservable()))
    }
}

private final class ToArraySink<SourceType, Observer: ObserverType>: Sink<Observer>, ObserverType where Observer.Element == [SourceType] {
    typealias Parent = ToArray<SourceType>

    let _parent: Parent
    var _list = [SourceType]()

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent

        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<SourceType>) {
        switch event {
        case let .next(value):
            _list.append(value)
        case let .error(e):
            forwardOn(.error(e))
            dispose()
        case .completed:
            forwardOn(.next(_list))
            forwardOn(.completed)
            dispose()
        }
    }
}

private final class ToArray<SourceType>: Producer<[SourceType]> {
    let _source: Observable<SourceType>

    init(source: Observable<SourceType>) {
        _source = source
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == [SourceType] {
        let sink = ToArraySink(parent: self, observer: observer, cancel: cancel)
        let subscription = _source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }
}
