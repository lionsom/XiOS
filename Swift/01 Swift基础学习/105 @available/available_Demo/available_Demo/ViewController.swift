//
//  ViewController.swift
//  available_Demo
//
//  Created by 启业云03 on 2023/1/6.
//

import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.

        E()

        oldFunction()
    }

    // MARK: - @available #available 使用

    @available(iOS 12, *)
    func A() {
        print("")
    }

    func B() {
        if #available(iOS 8, *) {
            // iOS8及其以上系统运行
        }

        guard #available(iOS 8, *) else {
            return // iOS8以下系统就直接返回
        }
    }

    // MARK: - 多参数

    @available(iOS 13, OSX 10.15, tvOS 13, watchOS 6, *)
    func C() {
        // todo
    }

    // MARK: - 废弃

    @available(*, deprecated, message: "不要再使用该方法了")
    func E() {
        // todo
    }

    // MARK: -  约束swift版本

    @available(swift 5.2)
    func F() {
        // todo
    }

    // MARK: - 手动参数

    @available(iOS, introduced: 9.0, message: "111")
    func D() {
        // todo
    }

    // MARK: - 最全参数

    @available(iOS, introduced: 7.0, deprecated: 10.0, message: "Please Use newFunction instead", renamed: "newFunction")
    @available(tvOS, unavailable)
    func oldFunction() {
        // todo
    }

    func newFunction() {
        // todo
    }

    // MARK: - #unavailable

    // Swift 5.6(搭配 Xcode 13.3) 推出了跟 #available 意思相反的 #unavailable
    func G() {
        // 表示 iOS 16 之前(不包含 16)的版本將採用 if { } 裡的寫法。
        if #unavailable(iOS 16.0) {
            // todo
        }
    }
}
