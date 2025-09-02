//
//  Zip+Collection.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 8/30/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences have produced an element at a corresponding index.

     - seealso: [zip operator on reactivex.io](http://reactivex.io/documentation/operators/zip.html)

     - parameter resultSelector: Function to invoke for each series of elements at corresponding indexes in the sources.
     - returns: An observable sequence containing the result of combining elements of the sources using the specified result selector function.
     */
    static func zip<Collection: Swift.Collection>(_ collection: Collection, resultSelector: @escaping ([Collection.Element.Element]) throws -> Element) -> Observable<Element>
        where Collection.Element: ObservableType
    {
        return ZipCollectionType(sources: collection, resultSelector: resultSelector)
    }

    /**
     Merges the specified observable sequences into one observable sequence whenever all of the observable sequences have produced an element at a corresponding index.

     - seealso: [zip operator on reactivex.io](http://reactivex.io/documentation/operators/zip.html)

     - returns: An observable sequence containing the result of combining elements of the sources.
     */
    static func zip<Collection: Swift.Collection>(_ collection: Collection) -> Observable<[Element]>
        where Collection.Element: ObservableType, Collection.Element.Element == Element
    {
        return ZipCollectionType(sources: collection, resultSelector: { $0 })
    }
}

private final class ZipCollectionTypeSink<Collection: Swift.Collection, Observer: ObserverType>:
    Sink<Observer> where Collection.Element: ObservableConvertibleType
{
    typealias Result = Observer.Element
    typealias Parent = ZipCollectionType<Collection, Result>
    typealias SourceElement = Collection.Element.Element

    private let _parent: Parent

    private let _lock = RecursiveLock()

    // state
    private var _numberOfValues = 0
    private var _values: [Queue<SourceElement>]
    private var _isDone: [Bool]
    private var _numberOfDone = 0
    private var _subscriptions: [SingleAssignmentDisposable]

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        _values = [Queue<SourceElement>](repeating: Queue(capacity: 4), count: parent.count)
        _isDone = [Bool](repeating: false, count: parent.count)
        _subscriptions = [SingleAssignmentDisposable]()
        _subscriptions.reserveCapacity(parent.count)

        for _ in 0 ..< parent.count {
            _subscriptions.append(SingleAssignmentDisposable())
        }

        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<SourceElement>, atIndex: Int) {
        _lock.lock(); defer { self._lock.unlock() } // {
        switch event {
        case let .next(element):
            _values[atIndex].enqueue(element)

            if _values[atIndex].count == 1 {
                _numberOfValues += 1
            }

            if _numberOfValues < _parent.count {
                if _numberOfDone == _parent.count - 1 {
                    forwardOn(.completed)
                    dispose()
                }
                return
            }

            do {
                var arguments = [SourceElement]()
                arguments.reserveCapacity(_parent.count)

                // recalculate number of values
                _numberOfValues = 0

                for i in 0 ..< _values.count {
                    arguments.append(_values[i].dequeue()!)
                    if !_values[i].isEmpty {
                        _numberOfValues += 1
                    }
                }

                let result = try _parent.resultSelector(arguments)
                forwardOn(.next(result))
            } catch {
                forwardOn(.error(error))
                dispose()
            }

        case let .error(error):
            forwardOn(.error(error))
            dispose()
        case .completed:
            if _isDone[atIndex] {
                return
            }

            _isDone[atIndex] = true
            _numberOfDone += 1

            if _numberOfDone == _parent.count {
                forwardOn(.completed)
                dispose()
            } else {
                _subscriptions[atIndex].dispose()
            }
        }
        // }
    }

    func run() -> Disposable {
        var j = 0
        for i in _parent.sources {
            let index = j
            let source = i.asObservable()

            let disposable = source.subscribe(AnyObserver { event in
                self.on(event, atIndex: index)
            })
            _subscriptions[j].setDisposable(disposable)
            j += 1
        }

        if _parent.sources.isEmpty {
            forwardOn(.completed)
        }

        return Disposables.create(_subscriptions)
    }
}

private final class ZipCollectionType<Collection: Swift.Collection, Result>: Producer<Result> where Collection.Element: ObservableConvertibleType {
    typealias ResultSelector = ([Collection.Element.Element]) throws -> Result

    let sources: Collection
    let resultSelector: ResultSelector
    let count: Int

    init(sources: Collection, resultSelector: @escaping ResultSelector) {
        self.sources = sources
        self.resultSelector = resultSelector
        count = self.sources.count
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Result {
        let sink = ZipCollectionTypeSink(parent: self, observer: observer, cancel: cancel)
        let subscription = sink.run()
        return (sink: sink, subscription: subscription)
    }
}
