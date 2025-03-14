//
//  UISearchController+Rx.swift
//  RxCocoa
//
//  Created by Segii Shulga on 3/17/16.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

#if os(iOS)

    import RxSwift
    import UIKit

    @available(iOS 8.0, *)
    public extension Reactive where Base: UISearchController {
        /// Reactive wrapper for `delegate`.
        /// For more information take a look at `DelegateProxyType` protocol documentation.
        var delegate: DelegateProxy<UISearchController, UISearchControllerDelegate> {
            return RxSearchControllerDelegateProxy.proxy(for: base)
        }

        /// Reactive wrapper for `delegate` message.
        var didDismiss: Observable<Void> {
            return delegate
                .methodInvoked(#selector(UISearchControllerDelegate.didDismissSearchController(_:)))
                .map { _ in }
        }

        /// Reactive wrapper for `delegate` message.
        var didPresent: Observable<Void> {
            return delegate
                .methodInvoked(#selector(UISearchControllerDelegate.didPresentSearchController(_:)))
                .map { _ in }
        }

        /// Reactive wrapper for `delegate` message.
        var present: Observable<Void> {
            return delegate
                .methodInvoked(#selector(UISearchControllerDelegate.presentSearchController(_:)))
                .map { _ in }
        }

        /// Reactive wrapper for `delegate` message.
        var willDismiss: Observable<Void> {
            return delegate
                .methodInvoked(#selector(UISearchControllerDelegate.willDismissSearchController(_:)))
                .map { _ in }
        }

        /// Reactive wrapper for `delegate` message.
        var willPresent: Observable<Void> {
            return delegate
                .methodInvoked(#selector(UISearchControllerDelegate.willPresentSearchController(_:)))
                .map { _ in }
        }
    }

#endif
