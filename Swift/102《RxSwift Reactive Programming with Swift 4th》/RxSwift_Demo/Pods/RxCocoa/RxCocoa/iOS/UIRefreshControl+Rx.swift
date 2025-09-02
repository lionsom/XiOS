//
//  UIRefreshControl+Rx.swift
//  RxCocoa
//
//  Created by Yosuke Ishikawa on 1/31/16.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

#if os(iOS)

    import RxSwift
    import UIKit

    public extension Reactive where Base: UIRefreshControl {
        /// Bindable sink for `beginRefreshing()`, `endRefreshing()` methods.
        var isRefreshing: Binder<Bool> {
            return Binder(base) { refreshControl, refresh in
                if refresh {
                    refreshControl.beginRefreshing()
                } else {
                    refreshControl.endRefreshing()
                }
            }
        }
    }

#endif
