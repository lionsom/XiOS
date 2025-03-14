//
//  RxTableViewDataSourceProxy.swift
//  RxCocoa
//
//  Created by Krunoslav Zaher on 6/15/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

#if os(iOS) || os(tvOS)

    import RxSwift
    import UIKit

    extension UITableView: HasDataSource {
        public typealias DataSource = UITableViewDataSource
    }

    fileprivate let tableViewDataSourceNotSet = TableViewDataSourceNotSet()

    fileprivate final class TableViewDataSourceNotSet:
        NSObject,
        UITableViewDataSource
    {
        func tableView(_: UITableView, numberOfRowsInSection _: Int) -> Int {
            return 0
        }

        func tableView(_: UITableView, cellForRowAt _: IndexPath) -> UITableViewCell {
            rxAbstractMethod(message: dataSourceNotSet)
        }
    }

    /// For more information take a look at `DelegateProxyType`.
    open class RxTableViewDataSourceProxy:
        DelegateProxy<UITableView, UITableViewDataSource>,
        DelegateProxyType,
        UITableViewDataSource
    {
        /// Typed parent object.
        public private(set) weak var tableView: UITableView?

        /// - parameter tableView: Parent object for delegate proxy.
        public init(tableView: UITableView) {
            self.tableView = tableView
            super.init(parentObject: tableView, delegateProxy: RxTableViewDataSourceProxy.self)
        }

        // Register known implementations
        public static func registerKnownImplementations() {
            register { RxTableViewDataSourceProxy(tableView: $0) }
        }

        fileprivate weak var _requiredMethodsDataSource: UITableViewDataSource? = tableViewDataSourceNotSet

        // MARK: delegate

        /// Required delegate method implementation.
        public func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            return (_requiredMethodsDataSource ?? tableViewDataSourceNotSet).tableView(tableView, numberOfRowsInSection: section)
        }

        /// Required delegate method implementation.
        public func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            return (_requiredMethodsDataSource ?? tableViewDataSourceNotSet).tableView(tableView, cellForRowAt: indexPath)
        }

        /// For more information take a look at `DelegateProxyType`.
        override open func setForwardToDelegate(_ forwardToDelegate: UITableViewDataSource?, retainDelegate: Bool) {
            _requiredMethodsDataSource = forwardToDelegate ?? tableViewDataSourceNotSet
            super.setForwardToDelegate(forwardToDelegate, retainDelegate: retainDelegate)
        }
    }

#endif
