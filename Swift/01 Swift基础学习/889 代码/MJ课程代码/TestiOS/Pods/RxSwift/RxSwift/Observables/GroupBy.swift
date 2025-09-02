//
//  GroupBy.swift
//  RxSwift
//
//  Created by Tomi Koskinen on 01/12/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /*
     Groups the elements of an observable sequence according to a specified key selector function.

     - seealso: [groupBy operator on reactivex.io](http://reactivex.io/documentation/operators/groupby.html)

     - parameter keySelector: A function to extract the key for each element.
     - returns: A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.
     */
    func groupBy<Key: Hashable>(keySelector: @escaping (Element) throws -> Key)
        -> Observable<GroupedObservable<Key, Element>>
    {
        return GroupBy(source: asObservable(), selector: keySelector)
    }
}

private final class GroupedObservableImpl<Element>: Observable<Element> {
    private var _subject: PublishSubject<Element>
    private var _refCount: RefCountDisposable

    init(subject: PublishSubject<Element>, refCount: RefCountDisposable) {
        _subject = subject
        _refCount = refCount
    }

    override public func subscribe<Observer: ObserverType>(_ observer: Observer) -> Disposable where Observer.Element == Element {
        let release = _refCount.retain()
        let subscription = _subject.subscribe(observer)
        return Disposables.create(release, subscription)
    }
}

private final class GroupBySink<Key: Hashable, Element, Observer: ObserverType>:
    Sink<Observer>,
    ObserverType where Observer.Element == GroupedObservable<Key, Element>
{
    typealias ResultType = Observer.Element
    typealias Parent = GroupBy<Key, Element>

    private let _parent: Parent
    private let _subscription = SingleAssignmentDisposable()
    private var _refCountDisposable: RefCountDisposable!
    private var _groupedSubjectTable: [Key: PublishSubject<Element>]

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        _groupedSubjectTable = [Key: PublishSubject<Element>]()
        super.init(observer: observer, cancel: cancel)
    }

    func run() -> Disposable {
        _refCountDisposable = RefCountDisposable(disposable: _subscription)

        _subscription.setDisposable(_parent._source.subscribe(self))

        return _refCountDisposable
    }

    private func onGroupEvent(key: Key, value: Element) {
        if let writer = _groupedSubjectTable[key] {
            writer.on(.next(value))
        } else {
            let writer = PublishSubject<Element>()
            _groupedSubjectTable[key] = writer

            let group = GroupedObservable(
                key: key,
                source: GroupedObservableImpl(subject: writer, refCount: _refCountDisposable)
            )

            forwardOn(.next(group))
            writer.on(.next(value))
        }
    }

    final func on(_ event: Event<Element>) {
        switch event {
        case let .next(value):
            do {
                let groupKey = try _parent._selector(value)
                onGroupEvent(key: groupKey, value: value)
            } catch let e {
                self.error(e)
                return
            }
        case let .error(e):
            error(e)
        case .completed:
            forwardOnGroups(event: .completed)
            forwardOn(.completed)
            _subscription.dispose()
            dispose()
        }
    }

    final func error(_ error: Swift.Error) {
        forwardOnGroups(event: .error(error))
        forwardOn(.error(error))
        _subscription.dispose()
        dispose()
    }

    final func forwardOnGroups(event: Event<Element>) {
        for writer in _groupedSubjectTable.values {
            writer.on(event)
        }
    }
}

private final class GroupBy<Key: Hashable, Element>: Producer<GroupedObservable<Key, Element>> {
    typealias KeySelector = (Element) throws -> Key

    fileprivate let _source: Observable<Element>
    fileprivate let _selector: KeySelector

    init(source: Observable<Element>, selector: @escaping KeySelector) {
        _source = source
        _selector = selector
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == GroupedObservable<Key, Element> {
        let sink = GroupBySink(parent: self, observer: observer, cancel: cancel)
        return (sink: sink, subscription: sink.run())
    }
}
