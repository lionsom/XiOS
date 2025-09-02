//
//  NopDisposable.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 2/15/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

/// Represents a disposable that does nothing on disposal.
///
/// Nop = No Operation
private struct NopDisposable: Disposable {
    fileprivate static let noOp: Disposable = NopDisposable()

    private init() {}

    /// Does nothing.
    public func dispose() {}
}

public extension Disposables {
    /**
     Creates a disposable that does nothing on disposal.
     */
    static func create() -> Disposable { NopDisposable.noOp }
}
