//
//  RxPickerViewDataSourceProxy.swift
//  RxCocoa
//
//  Created by Sergey Shulga on 05/07/2017.
//  Copyright © 2017 Krunoslav Zaher. All rights reserved.
//

#if os(iOS)

    import RxSwift
    import UIKit

    extension UIPickerView: HasDataSource {
        public typealias DataSource = UIPickerViewDataSource
    }

    private let pickerViewDataSourceNotSet = PickerViewDataSourceNotSet()

    private final class PickerViewDataSourceNotSet: NSObject, UIPickerViewDataSource {
        func numberOfComponents(in _: UIPickerView) -> Int {
            return 0
        }

        func pickerView(_: UIPickerView, numberOfRowsInComponent _: Int) -> Int {
            return 0
        }
    }

    /// For more information take a look at `DelegateProxyType`.
    public class RxPickerViewDataSourceProxy:
        DelegateProxy<UIPickerView, UIPickerViewDataSource>,
        DelegateProxyType,
        UIPickerViewDataSource
    {
        /// Typed parent object.
        public private(set) weak var pickerView: UIPickerView?

        /// - parameter pickerView: Parent object for delegate proxy.
        public init(pickerView: ParentObject) {
            self.pickerView = pickerView
            super.init(parentObject: pickerView, delegateProxy: RxPickerViewDataSourceProxy.self)
        }

        // Register known implementations
        public static func registerKnownImplementations() {
            register { RxPickerViewDataSourceProxy(pickerView: $0) }
        }

        private weak var _requiredMethodsDataSource: UIPickerViewDataSource? = pickerViewDataSourceNotSet

        // MARK: UIPickerViewDataSource

        /// Required delegate method implementation.
        public func numberOfComponents(in pickerView: UIPickerView) -> Int {
            return (_requiredMethodsDataSource ?? pickerViewDataSourceNotSet).numberOfComponents(in: pickerView)
        }

        /// Required delegate method implementation.
        public func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
            return (_requiredMethodsDataSource ?? pickerViewDataSourceNotSet).pickerView(pickerView, numberOfRowsInComponent: component)
        }

        /// For more information take a look at `DelegateProxyType`.
        override public func setForwardToDelegate(_ forwardToDelegate: UIPickerViewDataSource?, retainDelegate: Bool) {
            _requiredMethodsDataSource = forwardToDelegate ?? pickerViewDataSourceNotSet
            super.setForwardToDelegate(forwardToDelegate, retainDelegate: retainDelegate)
        }
    }

#endif
