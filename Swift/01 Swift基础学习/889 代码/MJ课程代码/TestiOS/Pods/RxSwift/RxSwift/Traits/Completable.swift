//
//  Completable.swift
//  RxSwift
//
//  Created by sergdort on 19/08/2017.
//  Copyright © 2017 Krunoslav Zaher. All rights reserved.
//

#if DEBUG
    import Foundation
#endif

/// Sequence containing 0 elements
public enum CompletableTrait {}
/// Represents a push style sequence containing 0 elements.
public typealias Completable = PrimitiveSequence<CompletableTrait, Swift.Never>

public enum CompletableEvent {
    /// Sequence terminated with an error. (underlying observable sequence emits: `.error(Error)`)
    case error(Swift.Error)

    /// Sequence completed successfully.
    case completed
}

public extension PrimitiveSequenceType where Trait == CompletableTrait, Element == Swift.Never {
    typealias CompletableObserver = (CompletableEvent) -> Void

    /**
     Creates an observable sequence from a specified subscribe method implementation.

     - seealso: [create operator on reactivex.io](http://reactivex.io/documentation/operators/create.html)

     - parameter subscribe: Implementation of the resulting observable sequence's `subscribe` method.
     - returns: The observable sequence with the specified implementation for the `subscribe` method.
     */
    static func create(subscribe: @escaping (@escaping CompletableObserver) -> Disposable) -> PrimitiveSequence<Trait, Element> {
        let source = Observable<Element>.create { observer in
            subscribe { event in
                switch event {
                case let .error(error):
                    observer.on(.error(error))
                case .completed:
                    observer.on(.completed)
                }
            }
        }

        return PrimitiveSequence(raw: source)
    }

    /**
     Subscribes `observer` to receive events for this sequence.

     - returns: Subscription for `observer` that can be used to cancel production of sequence elements and free resources.
     */
    func subscribe(_ observer: @escaping (CompletableEvent) -> Void) -> Disposable {
        var stopped = false
        return primitiveSequence.asObservable().subscribe { event in
            if stopped { return }
            stopped = true

            switch event {
            case .next:
                rxFatalError("Completables can't emit values")
            case let .error(error):
                observer(.error(error))
            case .completed:
                observer(.completed)
            }
        }
    }

    /**
     Subscribes a completion handler and an error handler for this sequence.

     - parameter onCompleted: Action to invoke upon graceful termination of the observable sequence.
     - parameter onError: Action to invoke upon errored termination of the observable sequence.
     - returns: Subscription object used to unsubscribe from the observable sequence.
     */
    func subscribe(onCompleted: (() -> Void)? = nil, onError: ((Swift.Error) -> Void)? = nil) -> Disposable {
        #if DEBUG
            let callStack = Hooks.recordCallStackOnError ? Thread.callStackSymbols : []
        #else
            let callStack = [String]()
        #endif

        return primitiveSequence.subscribe { event in
            switch event {
            case let .error(error):
                if let onError = onError {
                    onError(error)
                } else {
                    Hooks.defaultErrorHandler(callStack, error)
                }
            case .completed:
                onCompleted?()
            }
        }
    }
}

public extension PrimitiveSequenceType where Trait == CompletableTrait, Element == Swift.Never {
    /**
     Returns an observable sequence that terminates with an `error`.

     - seealso: [throw operator on reactivex.io](http://reactivex.io/documentation/operators/empty-never-throw.html)

     - returns: The observable sequence that terminates with specified error.
     */
    static func error(_ error: Swift.Error) -> Completable {
        return PrimitiveSequence(raw: Observable.error(error))
    }

    /**
     Returns a non-terminating observable sequence, which can be used to denote an infinite duration.

     - seealso: [never operator on reactivex.io](http://reactivex.io/documentation/operators/empty-never-throw.html)

     - returns: An observable sequence whose observers will never get called.
     */
    static func never() -> Completable {
        return PrimitiveSequence(raw: Observable.never())
    }

    /**
     Returns an empty observable sequence, using the specified scheduler to send out the single `Completed` message.

     - seealso: [empty operator on reactivex.io](http://reactivex.io/documentation/operators/empty-never-throw.html)

     - returns: An observable sequence with no elements.
     */
    static func empty() -> Completable {
        return Completable(raw: Observable.empty())
    }
}

public extension PrimitiveSequenceType where Trait == CompletableTrait, Element == Swift.Never {
    /**
     Invokes an action for each event in the observable sequence, and propagates all observer messages through the result sequence.

     - seealso: [do operator on reactivex.io](http://reactivex.io/documentation/operators/do.html)

     - parameter onNext: Action to invoke for each element in the observable sequence.
     - parameter onError: Action to invoke upon errored termination of the observable sequence.
     - parameter afterError: Action to invoke after errored termination of the observable sequence.
     - parameter onCompleted: Action to invoke upon graceful termination of the observable sequence.
     - parameter afterCompleted: Action to invoke after graceful termination of the observable sequence.
     - parameter onSubscribe: Action to invoke before subscribing to source observable sequence.
     - parameter onSubscribed: Action to invoke after subscribing to source observable sequence.
     - parameter onDispose: Action to invoke after subscription to source observable has been disposed for any reason. It can be either because sequence terminates for some reason or observer subscription being disposed.
     - returns: The source sequence with the side-effecting behavior applied.
     */
    func `do`(onError: ((Swift.Error) throws -> Void)? = nil,
              afterError: ((Swift.Error) throws -> Void)? = nil,
              onCompleted: (() throws -> Void)? = nil,
              afterCompleted: (() throws -> Void)? = nil,
              onSubscribe: (() -> Void)? = nil,
              onSubscribed: (() -> Void)? = nil,
              onDispose: (() -> Void)? = nil)
        -> Completable
    {
        return Completable(raw: primitiveSequence.source.do(
            onError: onError,
            afterError: afterError,
            onCompleted: onCompleted,
            afterCompleted: afterCompleted,
            onSubscribe: onSubscribe,
            onSubscribed: onSubscribed,
            onDispose: onDispose
        )
        )
    }

    /**
     Concatenates the second observable sequence to `self` upon successful termination of `self`.

     - seealso: [concat operator on reactivex.io](http://reactivex.io/documentation/operators/concat.html)

     - parameter second: Second observable sequence.
     - returns: An observable sequence that contains the elements of `self`, followed by those of the second sequence.
     */
    func concat(_ second: Completable) -> Completable {
        return Completable.concat(primitiveSequence, second)
    }

    /**
     Concatenates all observable sequences in the given sequence, as long as the previous observable sequence terminated successfully.

     - seealso: [concat operator on reactivex.io](http://reactivex.io/documentation/operators/concat.html)

     - returns: An observable sequence that contains the elements of each given sequence, in sequential order.
     */
    static func concat<Sequence: Swift.Sequence>(_ sequence: Sequence) -> Completable
        where Sequence.Element == Completable
    {
        let source = Observable.concat(sequence.lazy.map { $0.asObservable() })
        return Completable(raw: source)
    }

    /**
     Concatenates all observable sequences in the given sequence, as long as the previous observable sequence terminated successfully.

     - seealso: [concat operator on reactivex.io](http://reactivex.io/documentation/operators/concat.html)

     - returns: An observable sequence that contains the elements of each given sequence, in sequential order.
     */
    static func concat<Collection: Swift.Collection>(_ collection: Collection) -> Completable
        where Collection.Element == Completable
    {
        let source = Observable.concat(collection.map { $0.asObservable() })
        return Completable(raw: source)
    }

    /**
     Concatenates all observable sequences in the given sequence, as long as the previous observable sequence terminated successfully.

     - seealso: [concat operator on reactivex.io](http://reactivex.io/documentation/operators/concat.html)

     - returns: An observable sequence that contains the elements of each given sequence, in sequential order.
     */
    static func concat(_ sources: Completable ...) -> Completable {
        let source = Observable.concat(sources.map { $0.asObservable() })
        return Completable(raw: source)
    }

    /**
     Merges the completion of all Completables from a collection into a single Completable.

     - seealso: [merge operator on reactivex.io](http://reactivex.io/documentation/operators/merge.html)
     - note: For `Completable`, `zip` is an alias for `merge`.

     - parameter sources: Collection of Completables to merge.
     - returns: A Completable that merges the completion of all Completables.
     */
    static func zip<Collection: Swift.Collection>(_ sources: Collection) -> Completable
        where Collection.Element == Completable
    {
        let source = Observable.merge(sources.map { $0.asObservable() })
        return Completable(raw: source)
    }

    /**
     Merges the completion of all Completables from an array into a single Completable.

     - seealso: [merge operator on reactivex.io](http://reactivex.io/documentation/operators/merge.html)
     - note: For `Completable`, `zip` is an alias for `merge`.

     - parameter sources: Array of observable sequences to merge.
     - returns: A Completable that merges the completion of all Completables.
     */
    static func zip(_ sources: [Completable]) -> Completable {
        let source = Observable.merge(sources.map { $0.asObservable() })
        return Completable(raw: source)
    }

    /**
     Merges the completion of all Completables into a single Completable.

     - seealso: [merge operator on reactivex.io](http://reactivex.io/documentation/operators/merge.html)
     - note: For `Completable`, `zip` is an alias for `merge`.

     - parameter sources: Collection of observable sequences to merge.
     - returns: The observable sequence that merges the elements of the observable sequences.
     */
    static func zip(_ sources: Completable...) -> Completable {
        let source = Observable.merge(sources.map { $0.asObservable() })
        return Completable(raw: source)
    }
}
