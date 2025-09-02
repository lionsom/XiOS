//
//  UILabel+Rx.swift
//  RxCocoa
//
//  Created by Krunoslav Zaher on 4/1/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

#if os(iOS) || os(tvOS)

    import RxSwift
    import UIKit

    public extension Reactive where Base: UILabel {
        /// Bindable sink for `text` property.
        var text: Binder<String?> {
            return Binder(base) { label, text in
                label.text = text
            }
        }

        /// Bindable sink for `attributedText` property.
        var attributedText: Binder<NSAttributedString?> {
            return Binder(base) { label, text in
                label.attributedText = text
            }
        }
    }

#endif
