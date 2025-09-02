//
//  ViewController.swift
//  NameSpace_Demo
//
//  Created by 启业云03 on 2023/1/9.
//

import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.

        MyClass.hello()
    }

    override func touchesBegan(_: Set<UITouch>, with _: UIEvent?) {
        // 简单的命名空间测试
        let myBtn = UIButton()
        myBtn.nameSpace.hello()
        myBtn.setTitle("my button", for: .normal)
        myBtn.nameSpace.hello()

        // 通用的命名空间测试
        let myButton = UIButton()
        myButton.setTitle("My button", for: .normal)
        myButton.myNameSpace.hello()

        let myImage = UIImage()
        myImage.accessibilityHint = "My Image"
        myImage.myNameSpace.hello()

        // 更高级测试
        let str = "Hello "
        print(str.jt.testMethod)
        print(str.jt.method(str: "namespace"))
    }
}

// MARK: - 一、针对UIButton单个的命名空间

struct ButtonNameSpace {
    private let button: UIButton

    init(button: UIButton) {
        self.button = button
    }

    func hello() {
        let title = button.title(for: .normal) ?? ""
        print("Hello!!! \(title)")
    }
}

extension UIButton {
    var nameSpace: ButtonNameSpace {
        return ButtonNameSpace(button: self)
    }
}

// MARK: - 二、通用的命名空间

struct MyNameSpace<Base> {
    private let base: Base

    init(base: Base) {
        self.base = base
    }
}

// MARK: UIButton

// extension MyNameSpace where Base == String {  } 这样也可以
extension MyNameSpace where Base: UIButton {
    func hello() {
        let title = base.title(for: .normal) ?? ""
        print("Hello \(title)")
    }
}

extension UIButton {
    var myNameSpace: MyNameSpace<UIButton> {
        return MyNameSpace(base: self)
    }
}

// MARK: UIImage

extension MyNameSpace where Base: UIImage {
    func hello() {
        let title = base.accessibilityHint ?? ""
        print("Hello \(title)")
    }
}

extension UIImage {
    var myNameSpace: MyNameSpace<UIImage> {
        return MyNameSpace(base: self)
    }
}

// MARK: - 三、更高级 协议

// 定义泛型类
public struct JTKit<Base> {
    private let base: Base
    public init(_ base: Base) {
        self.base = base
    }
}

// 定义泛型协议
public protocol JTWrappable {
    associatedtype WrappableType

    var jt: WrappableType { get }
}

// 协议的扩展
public extension JTWrappable {
    var jt: JTKit<Self> {
        return JTKit(self)
    }
}

extension String: JTWrappable {}

// String 命名空间 jt 中的函数
public extension JTKit where Base == String {
    var testMethod: String {
        return base + "namespace"
    }

    func method(str: String) -> String {
        return base + str
    }
}
