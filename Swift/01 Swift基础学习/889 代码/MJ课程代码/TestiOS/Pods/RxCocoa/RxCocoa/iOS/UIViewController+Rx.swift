//
//  UIViewController+Rx.swift
//  RxCocoa
//
//  Created by Kyle Fuller on 27/05/2016.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

#if os(iOS) || os(tvOS)

    import RxSwift
    import UIKit

    public extension Reactive where Base: UIViewController {
        /// Bindable sink for `title`.
        var title: Binder<String> {
            return Binder(base) { viewController, title in
                viewController.title = title
            }
        }
    }
#endif
