//
//  CompositeDisposable.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 2/20/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

/// Represents a group of disposable resources that are disposed together.
public final class CompositeDisposable: DisposeBase, Cancelable {
    /// Key used to remove disposable from composite disposable
    public struct DisposeKey {
        fileprivate let key: BagKey
        fileprivate init(key: BagKey) {
            self.key = key
        }
    }

    private var _lock = SpinLock()

    // state
    private var _disposables: Bag<Disposable>? = Bag()

    public var isDisposed: Bool {
        self._lock.lock(); defer { self._lock.unlock() }
        return self._disposables == nil
    }

    override public init() {}

    /// Initializes a new instance of composite disposable with the specified number of disposables.
    public init(_ disposable1: Disposable, _ disposable2: Disposable) {
        // This overload is here to make sure we are using optimized version up to 4 arguments.
        _ = _disposables!.insert(disposable1)
        _ = _disposables!.insert(disposable2)
    }

    /// Initializes a new instance of composite disposable with the specified number of disposables.
    public init(_ disposable1: Disposable, _ disposable2: Disposable, _ disposable3: Disposable) {
        // This overload is here to make sure we are using optimized version up to 4 arguments.
        _ = _disposables!.insert(disposable1)
        _ = _disposables!.insert(disposable2)
        _ = _disposables!.insert(disposable3)
    }

    /// Initializes a new instance of composite disposable with the specified number of disposables.
    public init(_ disposable1: Disposable, _ disposable2: Disposable, _ disposable3: Disposable, _ disposable4: Disposable, _ disposables: Disposable...) {
        // This overload is here to make sure we are using optimized version up to 4 arguments.
        _ = _disposables!.insert(disposable1)
        _ = _disposables!.insert(disposable2)
        _ = _disposables!.insert(disposable3)
        _ = _disposables!.insert(disposable4)

        for disposable in disposables {
            _ = _disposables!.insert(disposable)
        }
    }

    /// Initializes a new instance of composite disposable with the specified number of disposables.
    public init(disposables: [Disposable]) {
        for disposable in disposables {
            _ = _disposables!.insert(disposable)
        }
    }

    /**
     Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.

     - parameter disposable: Disposable to add.
     - returns: Key that can be used to remove disposable from composite disposable. In case dispose bag was already
     disposed `nil` will be returned.
     */
    public func insert(_ disposable: Disposable) -> DisposeKey? {
        let key = _insert(disposable)

        if key == nil {
            disposable.dispose()
        }

        return key
    }

    private func _insert(_ disposable: Disposable) -> DisposeKey? {
        _lock.lock(); defer { self._lock.unlock() }

        let bagKey = _disposables?.insert(disposable)
        return bagKey.map(DisposeKey.init)
    }

    /// - returns: Gets the number of disposables contained in the `CompositeDisposable`.
    public var count: Int {
        _lock.lock(); defer { self._lock.unlock() }
        return _disposables?.count ?? 0
    }

    /// Removes and disposes the disposable identified by `disposeKey` from the CompositeDisposable.
    ///
    /// - parameter disposeKey: Key used to identify disposable to be removed.
    public func remove(for disposeKey: DisposeKey) {
        _remove(for: disposeKey)?.dispose()
    }

    private func _remove(for disposeKey: DisposeKey) -> Disposable? {
        _lock.lock(); defer { self._lock.unlock() }
        return _disposables?.removeKey(disposeKey.key)
    }

    /// Disposes all disposables in the group and removes them from the group.
    public func dispose() {
        if let disposables = _dispose() {
            disposeAll(in: disposables)
        }
    }

    private func _dispose() -> Bag<Disposable>? {
        _lock.lock(); defer { self._lock.unlock() }

        let disposeBag = _disposables
        _disposables = nil

        return disposeBag
    }
}

public extension Disposables {
    /// Creates a disposable with the given disposables.
    static func create(_ disposable1: Disposable, _ disposable2: Disposable, _ disposable3: Disposable) -> Cancelable {
        return CompositeDisposable(disposable1, disposable2, disposable3)
    }

    /// Creates a disposable with the given disposables.
    static func create(_ disposable1: Disposable, _ disposable2: Disposable, _ disposable3: Disposable, _ disposables: Disposable ...) -> Cancelable {
        var disposables = disposables
        disposables.append(disposable1)
        disposables.append(disposable2)
        disposables.append(disposable3)
        return CompositeDisposable(disposables: disposables)
    }

    /// Creates a disposable with the given disposables.
    static func create(_ disposables: [Disposable]) -> Cancelable {
        switch disposables.count {
        case 2:
            return Disposables.create(disposables[0], disposables[1])
        default:
            return CompositeDisposable(disposables: disposables)
        }
    }
}
