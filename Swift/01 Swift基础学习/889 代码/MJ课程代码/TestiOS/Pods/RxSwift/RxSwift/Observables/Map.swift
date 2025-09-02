//
//  Map.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 3/15/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Projects each element of an observable sequence into a new form.

     - seealso: [map operator on reactivex.io](http://reactivex.io/documentation/operators/map.html)

     - parameter transform: A transform function to apply to each source element.
     - returns: An observable sequence whose elements are the result of invoking the transform function on each element of source.

     */
    func map<Result>(_ transform: @escaping (Element) throws -> Result)
        -> Observable<Result>
    {
        return asObservable().composeMap(transform)
    }
}

private final class MapSink<SourceType, Observer: ObserverType>: Sink<Observer>, ObserverType {
    typealias Transform = (SourceType) throws -> ResultType

    typealias ResultType = Observer.Element
    typealias Element = SourceType

    private let _transform: Transform

    init(transform: @escaping Transform, observer: Observer, cancel: Cancelable) {
        _transform = transform
        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<SourceType>) {
        switch event {
        case let .next(element):
            do {
                let mappedElement = try _transform(element)
                forwardOn(.next(mappedElement))
            } catch let e {
                self.forwardOn(.error(e))
                self.dispose()
            }
        case let .error(error):
            forwardOn(.error(error))
            dispose()
        case .completed:
            forwardOn(.completed)
            dispose()
        }
    }
}

#if TRACE_RESOURCES
    fileprivate let _numberOfMapOperators = AtomicInt(0)
    public extension Resources {
        static var numberOfMapOperators: Int32 {
            return load(_numberOfMapOperators)
        }
    }
#endif

internal func _map<Element, Result>(source: Observable<Element>, transform: @escaping (Element) throws -> Result) -> Observable<Result> {
    return Map(source: source, transform: transform)
}

private final class Map<SourceType, ResultType>: Producer<ResultType> {
    typealias Transform = (SourceType) throws -> ResultType

    private let _source: Observable<SourceType>

    private let _transform: Transform

    init(source: Observable<SourceType>, transform: @escaping Transform) {
        _source = source
        _transform = transform

        #if TRACE_RESOURCES
            _ = increment(_numberOfMapOperators)
        #endif
    }

    override func composeMap<Result>(_ selector: @escaping (ResultType) throws -> Result) -> Observable<Result> {
        let originalSelector = _transform
        return Map<SourceType, Result>(source: _source, transform: { (s: SourceType) throws -> Result in
            let r: ResultType = try originalSelector(s)
            return try selector(r)
        })
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == ResultType {
        let sink = MapSink(transform: _transform, observer: observer, cancel: cancel)
        let subscription = _source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }

    #if TRACE_RESOURCES
        deinit {
            _ = decrement(_numberOfMapOperators)
        }
    #endif
}
