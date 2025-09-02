//
//  UITabBarItem+Rx.swift
//  RxCocoa
//
//  Created by Mateusz Derks on 04/03/16.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

#if os(iOS) || os(tvOS)

    import RxSwift
    import UIKit

    public extension Reactive where Base: UITabBarItem {
        /// Bindable sink for `badgeValue` property.
        var badgeValue: Binder<String?> {
            return Binder(base) { tabBarItem, badgeValue in
                tabBarItem.badgeValue = badgeValue
            }
        }
    }

#endif
