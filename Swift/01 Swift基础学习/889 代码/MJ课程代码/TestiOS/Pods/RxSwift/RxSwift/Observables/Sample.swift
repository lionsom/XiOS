//
//  Sample.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 5/1/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension ObservableType {
    /**
     Samples the source observable sequence using a sampler observable sequence producing sampling ticks.

     Upon each sampling tick, the latest element (if any) in the source sequence during the last sampling interval is sent to the resulting sequence.

     **In case there were no new elements between sampler ticks, no element is sent to the resulting sequence.**

     - seealso: [sample operator on reactivex.io](http://reactivex.io/documentation/operators/sample.html)

     - parameter sampler: Sampling tick sequence.
     - returns: Sampled observable sequence.
     */
    func sample<Source: ObservableType>(_ sampler: Source)
        -> Observable<Element>
    {
        return Sample(source: asObservable(), sampler: sampler.asObservable())
    }
}

private final class SamplerSink<Observer: ObserverType, SampleType>:
    ObserverType,
    LockOwnerType,
    SynchronizedOnType
{
    typealias Element = SampleType

    typealias Parent = SampleSequenceSink<Observer, SampleType>

    fileprivate let _parent: Parent

    var _lock: RecursiveLock {
        return _parent._lock
    }

    init(parent: Parent) {
        _parent = parent
    }

    func on(_ event: Event<Element>) {
        synchronizedOn(event)
    }

    func _synchronized_on(_ event: Event<Element>) {
        switch event {
        case .next, .completed:
            if let element = _parent._element {
                _parent._element = nil
                _parent.forwardOn(.next(element))
            }

            if _parent._atEnd {
                _parent.forwardOn(.completed)
                _parent.dispose()
            }
        case let .error(e):
            _parent.forwardOn(.error(e))
            _parent.dispose()
        }
    }
}

private final class SampleSequenceSink<Observer: ObserverType, SampleType>:
    Sink<Observer>,
    ObserverType,
    LockOwnerType,
    SynchronizedOnType
{
    typealias Element = Observer.Element
    typealias Parent = Sample<Element, SampleType>

    fileprivate let _parent: Parent

    let _lock = RecursiveLock()

    // state
    fileprivate var _element = nil as Element?
    fileprivate var _atEnd = false

    fileprivate let _sourceSubscription = SingleAssignmentDisposable()

    init(parent: Parent, observer: Observer, cancel: Cancelable) {
        _parent = parent
        super.init(observer: observer, cancel: cancel)
    }

    func run() -> Disposable {
        _sourceSubscription.setDisposable(_parent._source.subscribe(self))
        let samplerSubscription = _parent._sampler.subscribe(SamplerSink(parent: self))

        return Disposables.create(_sourceSubscription, samplerSubscription)
    }

    func on(_ event: Event<Element>) {
        synchronizedOn(event)
    }

    func _synchronized_on(_ event: Event<Element>) {
        switch event {
        case let .next(element):
            _element = element
        case .error:
            forwardOn(event)
            dispose()
        case .completed:
            _atEnd = true
            _sourceSubscription.dispose()
        }
    }
}

private final class Sample<Element, SampleType>: Producer<Element> {
    fileprivate let _source: Observable<Element>
    fileprivate let _sampler: Observable<SampleType>

    init(source: Observable<Element>, sampler: Observable<SampleType>) {
        _source = source
        _sampler = sampler
    }

    override func run<Observer: ObserverType>(_ observer: Observer, cancel: Cancelable) -> (sink: Disposable, subscription: Disposable) where Observer.Element == Element {
        let sink = SampleSequenceSink(parent: self, observer: observer, cancel: cancel)
        let subscription = sink.run()
        return (sink: sink, subscription: subscription)
    }
}
