//
//  SingleAssignmentDisposable.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 2/15/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

/**
 Represents a disposable resource which only allows a single assignment of its underlying disposable resource.

 If an underlying disposable resource has already been set, future attempts to set the underlying disposable resource will throw an exception.
 */
public final class SingleAssignmentDisposable: DisposeBase, Cancelable {
    fileprivate enum DisposeState: Int32 {
        case disposed = 1
        case disposableSet = 2
    }

    // state
    private let _state = AtomicInt(0)
    private var _disposable = nil as Disposable?

    /// - returns: A value that indicates whether the object is disposed.
    public var isDisposed: Bool {
        return isFlagSet(self._state, DisposeState.disposed.rawValue)
    }

    /// Initializes a new instance of the `SingleAssignmentDisposable`.
    override public init() {
        super.init()
    }

    /// Gets or sets the underlying disposable. After disposal, the result of getting this property is undefined.
    ///
    /// **Throws exception if the `SingleAssignmentDisposable` has already been assigned to.**
    public func setDisposable(_ disposable: Disposable) {
        _disposable = disposable

        let previousState = fetchOr(_state, DisposeState.disposableSet.rawValue)

        if (previousState & DisposeState.disposableSet.rawValue) != 0 {
            rxFatalError("oldState.disposable != nil")
        }

        if (previousState & DisposeState.disposed.rawValue) != 0 {
            disposable.dispose()
            _disposable = nil
        }
    }

    /// Disposes the underlying disposable.
    public func dispose() {
        let previousState = fetchOr(_state, DisposeState.disposed.rawValue)

        if (previousState & DisposeState.disposed.rawValue) != 0 {
            return
        }

        if (previousState & DisposeState.disposableSet.rawValue) != 0 {
            guard let disposable = _disposable else {
                rxFatalError("Disposable not set")
            }
            disposable.dispose()
            _disposable = nil
        }
    }
}
