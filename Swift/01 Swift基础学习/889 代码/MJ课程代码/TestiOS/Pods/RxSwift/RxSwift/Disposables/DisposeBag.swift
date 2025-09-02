//
//  DisposeBag.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 3/25/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

public extension Disposable {
    /// Adds `self` to `bag`
    ///
    /// - parameter bag: `DisposeBag` to add `self` to.
    func disposed(by bag: DisposeBag) {
        bag.insert(self)
    }
}

/**
 Thread safe bag that disposes added disposables on `deinit`.

 This returns ARC (RAII) like resource management to `RxSwift`.

 In case contained disposables need to be disposed, just put a different dispose bag
 or create a new one in its place.

     self.existingDisposeBag = DisposeBag()

 In case explicit disposal is necessary, there is also `CompositeDisposable`.
 */
public final class DisposeBag: DisposeBase {
    private var _lock = SpinLock()

    // state
    fileprivate var _disposables = [Disposable]()
    fileprivate var _isDisposed = false

    /// Constructs new empty dispose bag.
    override public init() {
        super.init()
    }

    /// Adds `disposable` to be disposed when dispose bag is being deinited.
    ///
    /// - parameter disposable: Disposable to add.
    public func insert(_ disposable: Disposable) {
        _insert(disposable)?.dispose()
    }

    private func _insert(_ disposable: Disposable) -> Disposable? {
        _lock.lock(); defer { self._lock.unlock() }
        if _isDisposed {
            return disposable
        }

        _disposables.append(disposable)

        return nil
    }

    /// This is internal on purpose, take a look at `CompositeDisposable` instead.
    private func dispose() {
        let oldDisposables = _dispose()

        for disposable in oldDisposables {
            disposable.dispose()
        }
    }

    private func _dispose() -> [Disposable] {
        _lock.lock(); defer { self._lock.unlock() }

        let disposables = _disposables

        _disposables.removeAll(keepingCapacity: false)
        _isDisposed = true

        return disposables
    }

    deinit {
        self.dispose()
    }
}

public extension DisposeBag {
    /// Convenience init allows a list of disposables to be gathered for disposal.
    convenience init(disposing disposables: Disposable...) {
        self.init()
        _disposables += disposables
    }

    /// Convenience init allows an array of disposables to be gathered for disposal.
    convenience init(disposing disposables: [Disposable]) {
        self.init()
        _disposables += disposables
    }

    /// Convenience function allows a list of disposables to be gathered for disposal.
    func insert(_ disposables: Disposable...) {
        insert(disposables)
    }

    /// Convenience function allows an array of disposables to be gathered for disposal.
    func insert(_ disposables: [Disposable]) {
        _lock.lock(); defer { self._lock.unlock() }
        if _isDisposed {
            disposables.forEach { $0.dispose() }
        } else {
            _disposables += disposables
        }
    }
}
