//
//  SwitchIfEmpty.swift
//  RxSwift
//
//  Created by sergdort on 23/12/2016.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Returns the elements of the specified sequence or `switchTo` sequence if the sequence is empty.

     - seealso: [DefaultIfEmpty operator on reactivex.io](http://reactivex.io/documentation/operators/defaultifempty.html)

     - parameter switchTo: Observable sequence being returned when source sequence is empty.
     - returns: Observable sequence that contains elements from switchTo sequence if source is empty, otherwise returns source sequence elements.
     */
    func ifEmpty(switchTo other: Observable<Element>) -> Observable<Element> {
        return SwitchIfEmpty(source: asObservable(), ifEmpty: other)
    }
}

private final class SwitchIfEmpty<Element>: Producer<Element> {
    private let _source: Observable<Element>
    private let _ifEmpty: Observable<Element>

    init(source: Observable<Element>, ifEmpty: Observable<Element>) {
        _source = source
        _ifEmpty = ifEmpty
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = SwitchIfEmptySink(ifEmpty: _ifEmpty,
                                     observer: observer,
                                     cancel: cancel)
        let subscription = sink.run(_source.asObservable())

        return (sink: sink, subscription: subscription)
    }
}

private final class SwitchIfEmptySink<Observer: ObserverType>: Sink<Observer>,
    ObserverType
{
    typealias Element = Observer.Element

    private let _ifEmpty: Observable<Element>
    private var _isEmpty = true
    private let _ifEmptySubscription = SingleAssignmentDisposable()

    init(ifEmpty: Observable<Element>, observer: Observer, cancel: Cancelable) {
        _ifEmpty = ifEmpty
        super.init(observer: observer, cancel: cancel)
    }

    func run(_ source: Observable<Observer.Element>) -> Disposable {
        let subscription = source.subscribe(self)
        return Disposables.create(subscription, _ifEmptySubscription)
    }

    func on(_ event: Event<Element>) {
        switch event {
        case .next:
            _isEmpty = false
            forwardOn(event)
        case .error:
            forwardOn(event)
            dispose()
        case .completed:
            guard _isEmpty else {
                forwardOn(.completed)
                dispose()
                return
            }
            let ifEmptySink = SwitchIfEmptySinkIter(parent: self)
            _ifEmptySubscription.setDisposable(_ifEmpty.subscribe(ifEmptySink))
        }
    }
}

private final class SwitchIfEmptySinkIter<Observer: ObserverType>:
    ObserverType
{
    typealias Element = Observer.Element
    typealias Parent = SwitchIfEmptySink<Observer>

    private let _parent: Parent

    init(parent: Parent) {
        _parent = parent
    }

    func on(_ event: Event<Element>) {
        switch event {
        case .next:
            _parent.forwardOn(event)
        case .error:
            _parent.forwardOn(event)
            _parent.dispose()
        case .completed:
            _parent.forwardOn(event)
            _parent.dispose()
        }
    }
}
