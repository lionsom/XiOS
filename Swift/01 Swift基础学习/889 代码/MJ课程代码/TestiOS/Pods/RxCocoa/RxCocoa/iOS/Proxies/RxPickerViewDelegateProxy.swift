//
//  RxPickerViewDelegateProxy.swift
//  RxCocoa
//
//  Created by Segii Shulga on 5/12/16.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

#if os(iOS)

    import RxSwift
    import UIKit

    extension UIPickerView: HasDelegate {
        public typealias Delegate = UIPickerViewDelegate
    }

    open class RxPickerViewDelegateProxy:
        DelegateProxy<UIPickerView, UIPickerViewDelegate>,
        DelegateProxyType,
        UIPickerViewDelegate
    {
        /// Typed parent object.
        public private(set) weak var pickerView: UIPickerView?

        /// - parameter pickerView: Parent object for delegate proxy.
        public init(pickerView: ParentObject) {
            self.pickerView = pickerView
            super.init(parentObject: pickerView, delegateProxy: RxPickerViewDelegateProxy.self)
        }

        // Register known implementationss
        public static func registerKnownImplementations() {
            register { RxPickerViewDelegateProxy(pickerView: $0) }
        }
    }
#endif
