//
//  Merge.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 3/28/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.

     - seealso: [flatMap operator on reactivex.io](http://reactivex.io/documentation/operators/flatmap.html)

     - parameter selector: A transform function to apply to each element.
     - returns: An observable sequence whose elements are the result of invoking the one-to-many transform function on each element of the input sequence.
     */
    func flatMap<Source: ObservableConvertibleType>(_ selector: @escaping (Element) throws -> Source)
        -> Observable<Source.Element>
    {
        return FlatMap(source: asObservable(), selector: selector)
    }
}

public extension ObservableType {
    /**
     Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
     If element is received while there is some projected observable sequence being merged it will simply be ignored.

     - seealso: [flatMapFirst operator on reactivex.io](http://reactivex.io/documentation/operators/flatmap.html)

     - parameter selector: A transform function to apply to element that was observed while no observable is executing in parallel.
     - returns: An observable sequence whose elements are the result of invoking the one-to-many transform function on each element of the input sequence that was received while no other sequence was being calculated.
     */
    func flatMapFirst<Source: ObservableConvertibleType>(_ selector: @escaping (Element) throws -> Source)
        -> Observable<Source.Element>
    {
        return FlatMapFirst(source: asObservable(), selector: selector)
    }
}

public extension ObservableType where Element: ObservableConvertibleType {
    /**
     Merges elements from all observable sequences in the given enumerable sequence into a single observable sequence.

     - seealso: [merge operator on reactivex.io](http://reactivex.io/documentation/operators/merge.html)

     - returns: The observable sequence that merges the elements of the observable sequences.
     */
    func merge() -> Observable<Element.Element> {
        return Merge(source: asObservable())
    }

    /**
     Merges elements from all inner observable sequences into a single observable sequence, limiting the number of concurrent subscriptions to inner sequences.

     - seealso: [merge operator on reactivex.io](http://reactivex.io/documentation/operators/merge.html)

     - parameter maxConcurrent: Maximum number of inner observable sequences being subscribed to concurrently.
     - returns: The observable sequence that merges the elements of the inner sequences.
     */
    func merge(maxConcurrent: Int)
        -> Observable<Element.Element>
    {
        return MergeLimited(source: asObservable(), maxConcurrent: maxConcurrent)
    }
}

public extension ObservableType where Element: ObservableConvertibleType {
    /**
     Concatenates all inner observable sequences, as long as the previous observable sequence terminated successfully.

     - seealso: [concat operator on reactivex.io](http://reactivex.io/documentation/operators/concat.html)

     - returns: An observable sequence that contains the elements of each observed inner sequence, in sequential order.
     */
    func concat() -> Observable<Element.Element> {
        return merge(maxConcurrent: 1)
    }
}

public extension ObservableType {
    /**
     Merges elements from all observable sequences from collection into a single observable sequence.

     - seealso: [merge operator on reactivex.io](http://reactivex.io/documentation/operators/merge.html)

     - parameter sources: Collection of observable sequences to merge.
     - returns: The observable sequence that merges the elements of the observable sequences.
     */
    static func merge<Collection: Swift.Collection>(_ sources: Collection) -> Observable<Element> where Collection.Element == Observable<Element> {
        return MergeArray(sources: Array(sources))
    }

    /**
     Merges elements from all observable sequences from array into a single observable sequence.

     - seealso: [merge operator on reactivex.io](http://reactivex.io/documentation/operators/merge.html)

     - parameter sources: Array of observable sequences to merge.
     - returns: The observable sequence that merges the elements of the observable sequences.
     */
    static func merge(_ sources: [Observable<Element>]) -> Observable<Element> {
        return MergeArray(sources: sources)
    }

    /**
     Merges elements from all observable sequences into a single observable sequence.

     - seealso: [merge operator on reactivex.io](http://reactivex.io/documentation/operators/merge.html)

     - parameter sources: Collection of observable sequences to merge.
     - returns: The observable sequence that merges the elements of the observable sequences.
     */
    static func merge(_ sources: Observable<Element>...) -> Observable<Element> {
        return MergeArray(sources: sources)
    }
}

// MARK: concatMap

public extension ObservableType {
    /**
     Projects each element of an observable sequence to an observable sequence and concatenates the resulting observable sequences into one observable sequence.

     - seealso: [concat operator on reactivex.io](http://reactivex.io/documentation/operators/concat.html)

     - returns: An observable sequence that contains the elements of each observed inner sequence, in sequential order.
     */

    func concatMap<Source: ObservableConvertibleType>(_ selector: @escaping (Element) throws -> Source)
        -> Observable<Source.Element>
    {
        return ConcatMap(source: asObservable(), selector: selector)
    }
}

private final class MergeLimitedSinkIter<SourceElement, SourceSequence: ObservableConvertibleType, Observer: ObserverType>:
    ObserverType,
    LockOwnerType,
    SynchronizedOnType where SourceSequence.Element == Observer.Element
{
    typealias Element = Observer.Element
    typealias DisposeKey = CompositeDisposable.DisposeKey
    typealias Parent = MergeLimitedSink<SourceElement, SourceSequence, Observer>

    private let _parent: Parent
    private let _disposeKey: DisposeKey

    var _lock: RecursiveLock {
        return _parent._lock
    }

    init(parent: Parent, disposeKey: DisposeKey) {
        _parent = parent
        _disposeKey = disposeKey
    }

    func on(_ event: Event<Element>) {
        synchronizedOn(event)
    }

    func _synchronized_on(_ event: Event<Element>) {
        switch event {
        case .next:
            _parent.forwardOn(event)
        case .error:
            _parent.forwardOn(event)
            _parent.dispose()
        case .completed:
            _parent._group.remove(for: _disposeKey)
            if let next = _parent._queue.dequeue() {
                _parent.subscribe(next, group: _parent._group)
            } else {
                _parent._activeCount -= 1

                if _parent._stopped && _parent._activeCount == 0 {
                    _parent.forwardOn(.completed)
                    _parent.dispose()
                }
            }
        }
    }
}

private final class ConcatMapSink<SourceElement, SourceSequence: ObservableConvertibleType, Observer: ObserverType>: MergeLimitedSink<SourceElement, SourceSequence, Observer> where Observer.Element == SourceSequence.Element {
    typealias Selector = (SourceElement) throws -> SourceSequence

    private let _selector: Selector

    init(selector: @escaping Selector, observer: Observer, cancel: Cancelable) {
        _selector = selector
        super.init(maxConcurrent: 1, observer: observer, cancel: cancel)
    }

    override func performMap(_ element: SourceElement) throws -> SourceSequence {
        return try _selector(element)
    }
}

private final class MergeLimitedBasicSink<SourceSequence: ObservableConvertibleType, Observer: ObserverType>: MergeLimitedSink<SourceSequence, SourceSequence, Observer> where Observer.Element == SourceSequence.Element {
    override func performMap(_ element: SourceSequence) throws -> SourceSequence {
        return element
    }
}

private class MergeLimitedSink<SourceElement, SourceSequence: ObservableConvertibleType, Observer: ObserverType>:
    Sink<Observer>,
    ObserverType where Observer.Element == SourceSequence.Element
{
    typealias QueueType = Queue<SourceSequence>

    let _maxConcurrent: Int

    let _lock = RecursiveLock()

    // state
    var _stopped = false
    var _activeCount = 0
    var _queue = QueueType(capacity: 2)

    let _sourceSubscription = SingleAssignmentDisposable()
    let _group = CompositeDisposable()

    init(maxConcurrent: Int, observer: Observer, cancel: Cancelable) {
        _maxConcurrent = maxConcurrent
        super.init(observer: observer, cancel: cancel)
    }

    func run(_ source: Observable<SourceElement>) -> Disposable {
        _ = _group.insert(_sourceSubscription)

        let disposable = source.subscribe(self)
        _sourceSubscription.setDisposable(disposable)
        return _group
    }

    func subscribe(_ innerSource: SourceSequence, group: CompositeDisposable) {
        let subscription = SingleAssignmentDisposable()

        let key = group.insert(subscription)

        if let key = key {
            let observer = MergeLimitedSinkIter(parent: self, disposeKey: key)

            let disposable = innerSource.asObservable().subscribe(observer)
            subscription.setDisposable(disposable)
        }
    }

    func performMap(_: SourceElement) throws -> SourceSequence {
        rxAbstractMethod()
    }

    @inline(__always)
    private final func nextElementArrived(element: SourceElement) -> SourceSequence? {
        _lock.lock(); defer { self._lock.unlock() } // {
        let subscribe: Bool
        if _activeCount < _maxConcurrent {
            _activeCount += 1
            subscribe = true
        } else {
            do {
                let value = try performMap(element)
                _queue.enqueue(value)
            } catch {
                forwardOn(.error(error))
                dispose()
            }
            subscribe = false
        }

        if subscribe {
            do {
                return try performMap(element)
            } catch {
                forwardOn(.error(error))
                dispose()
            }
        }

        return nil
        // }
    }

    func on(_ event: Event<SourceElement>) {
        switch event {
        case let .next(element):
            if let sequence = nextElementArrived(element: element) {
                subscribe(sequence, group: _group)
            }
        case let .error(error):
            _lock.lock(); defer { self._lock.unlock() }

            forwardOn(.error(error))
            dispose()
        case .completed:
            _lock.lock(); defer { self._lock.unlock() }

            if _activeCount == 0 {
                forwardOn(.completed)
                dispose()
            } else {
                _sourceSubscription.dispose()
            }

            _stopped = true
        }
    }
}

private final class MergeLimited<SourceSequence: ObservableConvertibleType>: Producer<SourceSequence.Element> {
    private let _source: Observable<SourceSequence>
    private let _maxConcurrent: Int

    init(source: Observable<SourceSequence>, maxConcurrent: Int) {
        _source = source
        _maxConcurrent = maxConcurrent
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == SourceSequence.Element {
        let sink = MergeLimitedBasicSink<SourceSequence, Observer>(maxConcurrent: _maxConcurrent, observer: observer, cancel: cancel)
        let subscription = sink.run(_source)
        return (sink: sink, subscription: subscription)
    }
}

// MARK: Merge

private final class MergeBasicSink<Source: ObservableConvertibleType, Observer: ObserverType>: MergeSink<Source, Source, Observer> where Observer.Element == Source.Element {
    override func performMap(_ element: Source) throws -> Source {
        return element
    }
}

// MARK: flatMap

private final class FlatMapSink<SourceElement, SourceSequence: ObservableConvertibleType, Observer: ObserverType>: MergeSink<SourceElement, SourceSequence, Observer> where Observer.Element == SourceSequence.Element {
    typealias Selector = (SourceElement) throws -> SourceSequence

    private let _selector: Selector

    init(selector: @escaping Selector, observer: Observer, cancel: Cancelable) {
        _selector = selector
        super.init(observer: observer, cancel: cancel)
    }

    override func performMap(_ element: SourceElement) throws -> SourceSequence {
        return try _selector(element)
    }
}

// MARK: FlatMapFirst

private final class FlatMapFirstSink<SourceElement, SourceSequence: ObservableConvertibleType, Observer: ObserverType>: MergeSink<SourceElement, SourceSequence, Observer> where Observer.Element == SourceSequence.Element {
    typealias Selector = (SourceElement) throws -> SourceSequence

    private let _selector: Selector

    override var subscribeNext: Bool {
        return _activeCount == 0
    }

    init(selector: @escaping Selector, observer: Observer, cancel: Cancelable) {
        _selector = selector
        super.init(observer: observer, cancel: cancel)
    }

    override func performMap(_ element: SourceElement) throws -> SourceSequence {
        return try _selector(element)
    }
}

private final class MergeSinkIter<SourceElement, SourceSequence: ObservableConvertibleType, Observer: ObserverType>: ObserverType where Observer.Element == SourceSequence.Element {
    typealias Parent = MergeSink<SourceElement, SourceSequence, Observer>
    typealias DisposeKey = CompositeDisposable.DisposeKey
    typealias Element = Observer.Element

    private let _parent: Parent
    private let _disposeKey: DisposeKey

    init(parent: Parent, disposeKey: DisposeKey) {
        _parent = parent
        _disposeKey = disposeKey
    }

    func on(_ event: Event<Element>) {
        _parent._lock.lock(); defer { self._parent._lock.unlock() } // lock {
        switch event {
        case let .next(value):
            _parent.forwardOn(.next(value))
        case let .error(error):
            _parent.forwardOn(.error(error))
            _parent.dispose()
        case .completed:
            _parent._group.remove(for: _disposeKey)
            _parent._activeCount -= 1
            _parent.checkCompleted()
        }
        // }
    }
}

private class MergeSink<SourceElement, SourceSequence: ObservableConvertibleType, Observer: ObserverType>:
    Sink<Observer>,
    ObserverType where Observer.Element == SourceSequence.Element
{
    typealias ResultType = Observer.Element
    typealias Element = SourceElement

    let _lock = RecursiveLock()

    var subscribeNext: Bool {
        return true
    }

    // state
    let _group = CompositeDisposable()
    let _sourceSubscription = SingleAssignmentDisposable()

    var _activeCount = 0
    var _stopped = false

    override init(observer: Observer, cancel: Cancelable) {
        super.init(observer: observer, cancel: cancel)
    }

    func performMap(_: SourceElement) throws -> SourceSequence {
        rxAbstractMethod()
    }

    @inline(__always)
    private final func nextElementArrived(element: SourceElement) -> SourceSequence? {
        _lock.lock(); defer { self._lock.unlock() } // {
        if !subscribeNext {
            return nil
        }

        do {
            let value = try performMap(element)
            _activeCount += 1
            return value
        } catch let e {
            self.forwardOn(.error(e))
            self.dispose()
            return nil
        }
        // }
    }

    func on(_ event: Event<SourceElement>) {
        switch event {
        case let .next(element):
            if let value = nextElementArrived(element: element) {
                subscribeInner(value.asObservable())
            }
        case let .error(error):
            _lock.lock(); defer { self._lock.unlock() }
            forwardOn(.error(error))
            dispose()
        case .completed:
            _lock.lock(); defer { self._lock.unlock() }
            _stopped = true
            _sourceSubscription.dispose()
            checkCompleted()
        }
    }

    func subscribeInner(_ source: Observable<Observer.Element>) {
        let iterDisposable = SingleAssignmentDisposable()
        if let disposeKey = _group.insert(iterDisposable) {
            let iter = MergeSinkIter(parent: self, disposeKey: disposeKey)
            let subscription = source.subscribe(iter)
            iterDisposable.setDisposable(subscription)
        }
    }

    func run(_ sources: [Observable<Observer.Element>]) -> Disposable {
        _activeCount += sources.count

        for source in sources {
            subscribeInner(source)
        }

        _stopped = true

        checkCompleted()

        return _group
    }

    @inline(__always)
    func checkCompleted() {
        if _stopped && _activeCount == 0 {
            forwardOn(.completed)
            dispose()
        }
    }

    func run(_ source: Observable<SourceElement>) -> Disposable {
        _ = _group.insert(_sourceSubscription)

        let subscription = source.subscribe(self)
        _sourceSubscription.setDisposable(subscription)

        return _group
    }
}

// MARK: Producers

private final class FlatMap<SourceElement, SourceSequence: ObservableConvertibleType>: Producer<SourceSequence.Element> {
    typealias Selector = (SourceElement) throws -> SourceSequence

    private let _source: Observable<SourceElement>

    private let _selector: Selector

    init(source: Observable<SourceElement>, selector: @escaping Selector) {
        _source = source
        _selector = selector
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == SourceSequence.Element {
        let sink = FlatMapSink(selector: _selector, observer: observer, cancel: cancel)
        let subscription = sink.run(_source)
        return (sink: sink, subscription: subscription)
    }
}

private final class FlatMapFirst<SourceElement, SourceSequence: ObservableConvertibleType>: Producer<SourceSequence.Element> {
    typealias Selector = (SourceElement) throws -> SourceSequence

    private let _source: Observable<SourceElement>

    private let _selector: Selector

    init(source: Observable<SourceElement>, selector: @escaping Selector) {
        _source = source
        _selector = selector
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == SourceSequence.Element {
        let sink = FlatMapFirstSink<SourceElement, SourceSequence, Observer>(selector: _selector, observer: observer, cancel: cancel)
        let subscription = sink.run(_source)
        return (sink: sink, subscription: subscription)
    }
}

final class ConcatMap<SourceElement, SourceSequence: ObservableConvertibleType>: Producer<SourceSequence.Element> {
    typealias Selector = (SourceElement) throws -> SourceSequence

    private let _source: Observable<SourceElement>
    private let _selector: Selector

    init(source: Observable<SourceElement>, selector: @escaping Selector) {
        _source = source
        _selector = selector
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == SourceSequence.Element {
        let sink = ConcatMapSink<SourceElement, SourceSequence, Observer>(selector: _selector, observer: observer, cancel: cancel)
        let subscription = sink.run(_source)
        return (sink: sink, subscription: subscription)
    }
}

final class Merge<SourceSequence: ObservableConvertibleType>: Producer<SourceSequence.Element> {
    private let _source: Observable<SourceSequence>

    init(source: Observable<SourceSequence>) {
        _source = source
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == SourceSequence.Element {
        let sink = MergeBasicSink<SourceSequence, Observer>(observer: observer, cancel: cancel)
        let subscription = sink.run(_source)
        return (sink: sink, subscription: subscription)
    }
}

private final class MergeArray<Element>: Producer<Element> {
    private let _sources: [Observable<Element>]

    init(sources: [Observable<Element>]) {
        _sources = sources
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = MergeBasicSink<Observable<Element>, Observer>(observer: observer, cancel: cancel)
        let subscription = sink.run(_sources)
        return (sink: sink, subscription: subscription)
    }
}
