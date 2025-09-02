//
//  UINavigationItem+Rx.swift
//  RxCocoa
//
//  Created by kumapo on 2016/05/09.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

#if os(iOS) || os(tvOS)

    import RxSwift
    import UIKit

    public extension Reactive where Base: UINavigationItem {
        /// Bindable sink for `title` property.
        var title: Binder<String?> {
            return Binder(base) { navigationItem, text in
                navigationItem.title = text
            }
        }
    }

#endif
