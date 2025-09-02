//: [Previous](@previous)

import Foundation

var greeting = "Hello, playground"

//: [Next](@next)

func 标签语句() {
    outer: for i in 1 ... 4 {
        for k in 1 ... 4 {
            if k == 3 {
                continue outer
            }
            if i == 3 {
                break outer
            }
            print("i == \(i), k == \(k)")
        }
    }
}

标签语句()

/// 这是X【概述】
///
/// 这里是XXXXXXX【详细描述 】
///
/// - Parameters:
///   - v1: 第一个参数
///   - v2: 第二个参数
/// - Returns: 返回值
///
/// - Note:这里是XX【批注】
///
func 函数描述(v1 _: Int, v2 _: String) -> Bool {
    return true
}

函数描述(v1: 1, v2: "2")

// 多重可选项
func 多重可选项() {
    var num1: Int? = 10
    var num2: Int?? = num1
    var num3: Int?? = 10

    var age1: Optional = .some(10) // 省略泛型类型
}

多重可选项()
