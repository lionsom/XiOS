//
//  CombineLatest+Collection.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 8/29/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences produces an element.

     - seealso: [combinelatest operator on reactivex.io](http://reactivex.io/documentation/operators/combinelatest.html)

     - parameter resultSelector: Function to invoke whenever any of the sources produces an element.
     - returns: An observable sequence containing the result of combining elements of the sources using the specified result selector function.
     */
    static func combineLatest<Collection: Swift.Collection>(_ collection: Collection, resultSelector: @escaping ([Collection.Element.Element]) throws -> Element) -> Observable<Element>
        where Collection.Element: ObservableType
    {
        return CombineLatestCollectionType(sources: collection, resultSelector: resultSelector)
    }

    /**
     Merges the specified observable sequences into one observable sequence whenever any of the observable sequences produces an element.

     - seealso: [combinelatest operator on reactivex.io](http://reactivex.io/documentation/operators/combinelatest.html)

     - returns: An observable sequence containing the result of combining elements of the sources.
     */
    static func combineLatest<Collection: Swift.Collection>(_ collection: Collection) -> Observable<[Element]>
        where Collection.Element: ObservableType, Collection.Element.Element == Element
    {
        return CombineLatestCollectionType(sources: collection, resultSelector: { $0 })
    }
}

private final class CombineLatestCollectionTypeSink<Collection: Swift.Collection, Observer: ObserverType>:
    Sink<Observer> where Collection.Element: ObservableConvertibleType
{
    typealias Result = Observer.Element
    typealias Parent = CombineLatestCollectionType<Collection, Result>
    typealias SourceElement = Collection.Element.Element

    let _parent: Parent

    let _lock = RecursiveLock()

    // state
    var _numberOfValues = 0
    var _values: [SourceElement?]
    var _isDone: [Bool]
    var _numberOfDone = 0
    var _subscriptions: [SingleAssignmentDisposable]

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        _values = [SourceElement?](repeating: nil, count: parent._count)
        _isDone = [Bool](repeating: false, count: parent._count)
        _subscriptions = [SingleAssignmentDisposable]()
        _subscriptions.reserveCapacity(parent._count)

        for _ in 0 ..< parent._count {
            _subscriptions.append(SingleAssignmentDisposable())
        }

        super.init(observer: observer, cancel: cancel)
    }

    func on(_ event: Event<SourceElement>, atIndex: Int) {
        _lock.lock(); defer { self._lock.unlock() } // {
        switch event {
        case let .next(element):
            if _values[atIndex] == nil {
                _numberOfValues += 1
            }

            _values[atIndex] = element

            if _numberOfValues < _parent._count {
                let numberOfOthersThatAreDone = _numberOfDone - (_isDone[atIndex] ? 1 : 0)
                if numberOfOthersThatAreDone == _parent._count - 1 {
                    forwardOn(.completed)
                    dispose()
                }
                return
            }

            do {
                let result = try _parent._resultSelector(_values.map { $0! })
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

            if _numberOfDone == _parent._count {
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
        for i in _parent._sources {
            let index = j
            let source = i.asObservable()
            let disposable = source.subscribe(AnyObserver { event in
                self.on(event, atIndex: index)
            })

            _subscriptions[j].setDisposable(disposable)

            j += 1
        }

        if _parent._sources.isEmpty {
            do {
                let result = try _parent._resultSelector([])
                forwardOn(.next(result))
                forwardOn(.completed)
                dispose()
            } catch {
                forwardOn(.error(error))
                dispose()
            }
        }

        return Disposables.create(_subscriptions)
    }
}

private final class CombineLatestCollectionType<Collection: Swift.Collection, Result>: Producer<Result> where Collection.Element: ObservableConvertibleType {
    typealias ResultSelector = ([Collection.Element.Element]) throws -> Result

    let _sources: Collection
    let _resultSelector: ResultSelector
    let _count: Int

    init(sources: Collection, resultSelector: @escaping ResultSelector) {
        _sources = sources
        _resultSelector = resultSelector
        _count = _sources.count
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Result {
        let sink = CombineLatestCollectionTypeSink(parent: self, observer: observer, cancel: cancel)
        let subscription = sink.run()
        return (sink: sink, subscription: subscription)
    }
}
