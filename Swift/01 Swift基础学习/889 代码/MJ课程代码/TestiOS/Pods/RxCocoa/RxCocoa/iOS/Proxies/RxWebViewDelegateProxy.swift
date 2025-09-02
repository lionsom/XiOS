//
//  RxWebViewDelegateProxy.swift
//  RxCocoa
//
//  Created by Andrew Breckenridge on 9/26/16.
//  Copyright © 2016 Krunoslav Zaher. All rights reserved.
//

#if os(iOS)

    import RxSwift
    import UIKit

    extension UIWebView: HasDelegate {
        public typealias Delegate = UIWebViewDelegate
    }

    open class RxWebViewDelegateProxy:
        DelegateProxy<UIWebView, UIWebViewDelegate>,
        DelegateProxyType,
        UIWebViewDelegate
    {
        /// Typed parent object.
        public private(set) weak var webView: UIWebView?

        /// - parameter webView: Parent object for delegate proxy.
        public init(webView: ParentObject) {
            self.webView = webView
            super.init(parentObject: webView, delegateProxy: RxWebViewDelegateProxy.self)
        }

        // Register known implementations
        public static func registerKnownImplementations() {
            register { RxWebViewDelegateProxy(webView: $0) }
        }
    }

#endif
