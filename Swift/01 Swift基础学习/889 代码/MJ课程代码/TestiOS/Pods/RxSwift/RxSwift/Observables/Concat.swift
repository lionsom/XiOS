//
//  Concat.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 3/21/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Concatenates the second observable sequence to `self` upon successful termination of `self`.

     - seealso: [concat operator on reactivex.io](http://reactivex.io/documentation/operators/concat.html)

     - parameter second: Second observable sequence.
     - returns: An observable sequence that contains the elements of `self`, followed by those of the second sequence.
     */
    func concat<Source: ObservableConvertibleType>(_ second: Source) -> Observable<Element> where Source.Element == Element {
        return Observable.concat([asObservable(), second.asObservable()])
    }
}

public extension ObservableType {
    /**
     Concatenates all observable sequences in the given sequence, as long as the previous observable sequence terminated successfully.

     This operator has tail recursive optimizations that will prevent stack overflow.

     Optimizations will be performed in cases equivalent to following:

     [1, [2, [3, .....].concat()].concat].concat()

     - seealso: [concat operator on reactivex.io](http://reactivex.io/documentation/operators/concat.html)

     - returns: An observable sequence that contains the elements of each given sequence, in sequential order.
     */
    static func concat<Sequence: Swift.Sequence>(_ sequence: Sequence) -> Observable<Element>
        where Sequence.Element == Observable<Element>
    {
        return Concat(sources: sequence, count: nil)
    }

    /**
     Concatenates all observable sequences in the given collection, as long as the previous observable sequence terminated successfully.

     This operator has tail recursive optimizations that will prevent stack overflow.

     Optimizations will be performed in cases equivalent to following:

     [1, [2, [3, .....].concat()].concat].concat()

     - seealso: [concat operator on reactivex.io](http://reactivex.io/documentation/operators/concat.html)

     - returns: An observable sequence that contains the elements of each given sequence, in sequential order.
     */
    static func concat<Collection: Swift.Collection>(_ collection: Collection) -> Observable<Element>
        where Collection.Element == Observable<Element>
    {
        return Concat(sources: collection, count: Int64(collection.count))
    }

    /**
     Concatenates all observable sequences in the given collection, as long as the previous observable sequence terminated successfully.

     This operator has tail recursive optimizations that will prevent stack overflow.

     Optimizations will be performed in cases equivalent to following:

     [1, [2, [3, .....].concat()].concat].concat()

     - seealso: [concat operator on reactivex.io](http://reactivex.io/documentation/operators/concat.html)

     - returns: An observable sequence that contains the elements of each given sequence, in sequential order.
     */
    static func concat(_ sources: Observable<Element> ...) -> Observable<Element> {
        return Concat(sources: sources, count: Int64(sources.count))
    }
}

private final class ConcatSink<Sequence: Swift.Sequence, Observer: ObserverType>:
    TailRecursiveSink<Sequence, Observer>,
    ObserverType where Sequence.Element: ObservableConvertibleType, Sequence.Element.Element == Observer.Element
{
    typealias Element = Observer.Element

    override init(observer: Observer, cancel: Cancelable) {
        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<Element>) {
        switch event {
        case .next:
            forwardOn(event)
        case .error:
            forwardOn(event)
            dispose()
        case .completed:
            schedule(.moveNext)
        }
    }

    override func subscribeToNext(_ source: Observable<Element>) -> Disposable {
        return source.subscribe(self)
    }

    override func extract(_ observable: Observable<Element>) -> SequenceGenerator? {
        if let source = observable as? Concat<Sequence> {
            return (source._sources.makeIterator(), source._count)
        } else {
            return nil
        }
    }
}

private final class Concat<Sequence: Swift.Sequence>: Producer<Sequence.Element.Element> where Sequence.Element: ObservableConvertibleType {
    typealias Element = Sequence.Element.Element

    fileprivate let _sources: Sequence
    fileprivate let _count: IntMax?

    init(sources: Sequence, count: IntMax?) {
        _sources = sources
        _count = count
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = ConcatSink<Sequence, Observer>(observer: observer, cancel: cancel)
        let subscription = sink.run((_sources.makeIterator(), _count))
        return (sink: sink, subscription: subscription)
    }
}
