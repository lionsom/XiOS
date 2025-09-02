//
//  Generics.swift
//  TestSwift_LX
//
//  Created by 启业云03 on 2022/8/12.
//

import Foundation

func swapValues<T>(_ a: inout T, _ b: inout T) {
    (a, b) = (b, a)
}

class GenericsTest {
    func test() {
        print("")
        print("泛型测试开始：")
        var i1 = 10
        var i2 = 20
        swapValues(&i1, &i2)
        print("交换Int，before：10,20，After：\(i1),\(i2)")

        var d1 = 10.3
        var d2 = 20.5
        swapValues(&d1, &d2)
        print("交换Float，before：10.3,20.5，After：\(d1),\(d2)")

        print("泛型测试结束！！！")
        print("")
    }
}
