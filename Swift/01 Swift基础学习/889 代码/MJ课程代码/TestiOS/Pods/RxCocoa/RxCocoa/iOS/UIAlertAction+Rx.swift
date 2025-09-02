//
//  UIAlertAction+Rx.swift
//  RxCocoa
//
//  Created by Andrew Breckenridge on 5/7/16.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

#if os(iOS) || os(tvOS)

    import RxSwift
    import UIKit

    public extension Reactive where Base: UIAlertAction {
        /// Bindable sink for `enabled` property.
        var isEnabled: Binder<Bool> {
            return Binder(base) { alertAction, value in
                alertAction.isEnabled = value
            }
        }
    }

#endif
