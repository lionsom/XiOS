//
//  DistinctUntilChanged.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 3/15/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType where Element: Equatable {
    /**
     Returns an observable sequence that contains only distinct contiguous elements according to equality operator.

     - seealso: [distinct operator on reactivex.io](http://reactivex.io/documentation/operators/distinct.html)

     - returns: An observable sequence only containing the distinct contiguous elements, based on equality operator, from the source sequence.
     */
    func distinctUntilChanged()
        -> Observable<Element>
    {
        return distinctUntilChanged({ $0 }, comparer: { $0 == $1 })
    }
}

public extension ObservableType {
    /**
     Returns an observable sequence that contains only distinct contiguous elements according to the `keySelector`.

     - seealso: [distinct operator on reactivex.io](http://reactivex.io/documentation/operators/distinct.html)

     - parameter keySelector: A function to compute the comparison key for each element.
     - returns: An observable sequence only containing the distinct contiguous elements, based on a computed key value, from the source sequence.
     */
    func distinctUntilChanged<Key: Equatable>(_ keySelector: @escaping (Element) throws -> Key)
        -> Observable<Element>
    {
        return distinctUntilChanged(keySelector, comparer: { $0 == $1 })
    }

    /**
     Returns an observable sequence that contains only distinct contiguous elements according to the `comparer`.

     - seealso: [distinct operator on reactivex.io](http://reactivex.io/documentation/operators/distinct.html)

     - parameter comparer: Equality comparer for computed key values.
     - returns: An observable sequence only containing the distinct contiguous elements, based on `comparer`, from the source sequence.
     */
    func distinctUntilChanged(_ comparer: @escaping (Element, Element) throws -> Bool)
        -> Observable<Element>
    {
        return distinctUntilChanged({ $0 }, comparer: comparer)
    }

    /**
     Returns an observable sequence that contains only distinct contiguous elements according to the keySelector and the comparer.

     - seealso: [distinct operator on reactivex.io](http://reactivex.io/documentation/operators/distinct.html)

     - parameter keySelector: A function to compute the comparison key for each element.
     - parameter comparer: Equality comparer for computed key values.
     - returns: An observable sequence only containing the distinct contiguous elements, based on a computed key value and the comparer, from the source sequence.
     */
    func distinctUntilChanged<K>(_ keySelector: @escaping (Element) throws -> K, comparer: @escaping (K, K) throws -> Bool)
        -> Observable<Element>
    {
        return DistinctUntilChanged(source: asObservable(), selector: keySelector, comparer: comparer)
    }
}

private final class DistinctUntilChangedSink<Observer: ObserverType, Key>: Sink<Observer>, ObserverType {
    typealias Element = Observer.Element

    private let _parent: DistinctUntilChanged<Element, Key>
    private var _currentKey: Key?

    init(parent: DistinctUntilChanged<Element, Key>, observer: Observer, cancel: Cancelable) {
        _parent = parent
        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<Element>) {
        switch event {
        case let .next(value):
            do {
                let key = try _parent._selector(value)
                var areEqual = false
                if let currentKey = _currentKey {
                    areEqual = try _parent._comparer(currentKey, key)
                }

                if areEqual {
                    return
                }

                _currentKey = key

                forwardOn(event)
            } catch {
                forwardOn(.error(error))
                dispose()
            }
        case .error, .completed:
            forwardOn(event)
            dispose()
        }
    }
}

private final class DistinctUntilChanged<Element, Key>: Producer<Element> {
    typealias KeySelector = (Element) throws -> Key
    typealias EqualityComparer = (Key, Key) throws -> Bool

    fileprivate let _source: Observable<Element>
    fileprivate let _selector: KeySelector
    fileprivate let _comparer: EqualityComparer

    init(source: Observable<Element>, selector: @escaping KeySelector, comparer: @escaping EqualityComparer) {
        _source = source
        _selector = selector
        _comparer = comparer
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = DistinctUntilChangedSink(parent: self, observer: observer, cancel: cancel)
        let subscription = _source.subscribe(sink)
        return (sink: sink, subscription: subscription)
    }
}
