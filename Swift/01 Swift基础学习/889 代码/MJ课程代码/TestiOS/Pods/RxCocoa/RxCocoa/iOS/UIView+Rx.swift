//
//  UIView+Rx.swift
//  RxCocoa
//
//  Created by Krunoslav Zaher on 12/6/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

#if os(iOS) || os(tvOS)

    import RxSwift
    import UIKit

    public extension Reactive where Base: UIView {
        /// Bindable sink for `hidden` property.
        var isHidden: Binder<Bool> {
            return Binder(base) { view, hidden in
                view.isHidden = hidden
            }
        }

        /// Bindable sink for `alpha` property.
        var alpha: Binder<CGFloat> {
            return Binder(base) { view, alpha in
                view.alpha = alpha
            }
        }

        /// Bindable sink for `backgroundColor` property.
        var backgroundColor: Binder<UIColor?> {
            return Binder(base) { view, color in
                view.backgroundColor = color
            }
        }

        /// Bindable sink for `isUserInteractionEnabled` property.
        var isUserInteractionEnabled: Binder<Bool> {
            return Binder(base) { view, userInteractionEnabled in
                view.isUserInteractionEnabled = userInteractionEnabled
            }
        }
    }

#endif
