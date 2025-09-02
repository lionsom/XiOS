//
//  String.swift
//  TestSwift_LX
//
//  Created by 启业云03 on 2022/8/12.
//

import Foundation

class StringTest {
    func test() {
        print("")
        print("String内存测试开始：")

        var first = "0123456789"
        print("0123456789占用内存大小：\(MemoryLayout.stride(ofValue: first))")
        print("0123456789内存地址：\(Mems.memStr(ofVal: &first))")
        //
        // 0123456789占用内存大小：16
        // 0123456789内存地址：0x3736353433323130 0xea00000000003938
        //
        // 解析：
        // 1.可以发现内存地址对应了 0 - 9 ASCII码（30 31 32 ... 39）；
        // 2.0xea占用一位标识 a表示有十个字符，猜想：此类最多15个字符；
        // 3.这与OC中的 "Tagged Pointer" 类似。

        var second = "0123456789ABCDEF"
        print("0123456789ABCDEF占用内存大小：\(MemoryLayout.stride(ofValue: second))")
        print("0123456789ABCDEF内存地址：\(Mems.memStr(ofVal: &second))")
        //
        // 0123456789ABCDEF占用内存大小：16
        // 0123456789ABCDEF内存地址：0xd000000000000010 0x80000001000073b0
        //

        print("String内存测试结束！！！")
        print("")
    }
}
