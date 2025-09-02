//
//  Reduce.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 4/1/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Applies an `accumulator` function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified `seed` value is used as the initial accumulator value.

     For aggregation behavior with incremental intermediate results, see `scan`.

     - seealso: [reduce operator on reactivex.io](http://reactivex.io/documentation/operators/reduce.html)

     - parameter seed: The initial accumulator value.
     - parameter accumulator: A accumulator function to be invoked on each element.
     - parameter mapResult: A function to transform the final accumulator value into the result value.
     - returns: An observable sequence containing a single element with the final accumulator value.
     */
    func reduce<A, Result>(_ seed: A, accumulator: @escaping (A, Element) throws -> A, mapResult: @escaping (A) throws -> Result)
        -> Observable<Result>
    {
        return Reduce(source: asObservable(), seed: seed, accumulator: accumulator, mapResult: mapResult)
    }

    /**
     Applies an `accumulator` function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified `seed` value is used as the initial accumulator value.

     For aggregation behavior with incremental intermediate results, see `scan`.

     - seealso: [reduce operator on reactivex.io](http://reactivex.io/documentation/operators/reduce.html)

     - parameter seed: The initial accumulator value.
     - parameter accumulator: A accumulator function to be invoked on each element.
     - returns: An observable sequence containing a single element with the final accumulator value.
     */
    func reduce<A>(_ seed: A, accumulator: @escaping (A, Element) throws -> A)
        -> Observable<A>
    {
        return Reduce(source: asObservable(), seed: seed, accumulator: accumulator, mapResult: { $0 })
    }
}

private final class ReduceSink<SourceType, AccumulateType, Observer: ObserverType>: Sink<Observer>, ObserverType {
    typealias ResultType = Observer.Element
    typealias Parent = Reduce<SourceType, AccumulateType, ResultType>

    private let _parent: Parent
    private var _accumulation: AccumulateType

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        _accumulation = parent._seed

        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<SourceType>) {
        switch event {
        case let .next(value):
            do {
                _accumulation = try _parent._accumulator(_accumulation, value)
            } catch let e {
                self.forwardOn(.error(e))
                self.dispose()
            }
        case let .error(e):
            forwardOn(.error(e))
            dispose()
        case .completed:
            do {
                let result = try _parent._mapResult(_accumulation)
                forwardOn(.next(result))
                forwardOn(.completed)
                dispose()
            } catch let e {
                self.forwardOn(.error(e))
                self.dispose()
            }
        }
    }
}

private final class Reduce<SourceType, AccumulateType, ResultType>: Producer<ResultType> {
    typealias AccumulatorType = (AccumulateType, SourceType) throws -> AccumulateType
    typealias ResultSelectorType = (AccumulateType) throws -> ResultType

    fileprivate let _source: Observable<SourceType>
    fileprivate let _seed: AccumulateType
    fileprivate let _accumulator: AccumulatorType
    fileprivate let _mapResult: ResultSelectorType

    init(source: Observable<SourceType>, seed: AccumulateType, accumulator: @escaping AccumulatorType, mapResult: @escaping ResultSelectorType) {
        _source = source
        _seed = seed
        _accumulator = accumulator
        _mapResult = mapResult
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == ResultType {
        let sink = ReduceSink(parent: self, observer: observer, cancel: cancel)
        let subscription = _source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }
}
