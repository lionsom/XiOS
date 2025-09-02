//
//  NSTextStorage+Rx.swift
//  RxCocoa
//
//  Created by Segii Shulga on 12/30/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

#if os(iOS) || os(tvOS)
    import RxSwift
    import UIKit

    public extension Reactive where Base: NSTextStorage {
        /// Reactive wrapper for `delegate`.
        ///
        /// For more information take a look at `DelegateProxyType` protocol documentation.
        var delegate: DelegateProxy<NSTextStorage, NSTextStorageDelegate> {
            return RxTextStorageDelegateProxy.proxy(for: base)
        }

        /// Reactive wrapper for `delegate` message.
        var didProcessEditingRangeChangeInLength: Observable<(editedMask: NSTextStorage.EditActions, editedRange: NSRange, delta: Int)> {
            return delegate
                .methodInvoked(#selector(NSTextStorageDelegate.textStorage(_:didProcessEditing:range:changeInLength:)))
                .map { a in
                    let editedMask = try NSTextStorage.EditActions(rawValue: castOrThrow(UInt.self, a[1]))
                    let editedRange = try castOrThrow(NSValue.self, a[2]).rangeValue
                    let delta = try castOrThrow(Int.self, a[3])

                    return (editedMask, editedRange, delta)
                }
        }
    }
#endif
