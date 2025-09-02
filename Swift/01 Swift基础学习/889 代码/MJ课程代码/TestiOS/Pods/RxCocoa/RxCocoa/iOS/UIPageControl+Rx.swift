//
//  UIPageControl+Rx.swift
//  RxCocoa
//
//  Created by Francesco Puntillo on 14/04/2016.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

#if os(iOS) || os(tvOS)

    import RxSwift
    import UIKit

    public extension Reactive where Base: UIPageControl {
        /// Bindable sink for `currentPage` property.
        var currentPage: Binder<Int> {
            return Binder(base) { controller, page in
                controller.currentPage = page
            }
        }

        /// Bindable sink for `numberOfPages` property.
        var numberOfPages: Binder<Int> {
            return Binder(base) { controller, page in
                controller.numberOfPages = page
            }
        }
    }

#endif
