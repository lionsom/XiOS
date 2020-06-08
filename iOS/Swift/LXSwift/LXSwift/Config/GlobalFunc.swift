//
//  GlobalFunc.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/8.
//  Copyright © 2020 LX. All rights reserved.
//
//  Swift 支持全局函数

import Foundation

func Log<T>(_ message:T, file:String = #file, function:String = #function, line:Int = #line) {
    #if DEBUG
    // 获取文件名
    let fileName = (file as NSString).lastPathComponent
    // 打印日志内容
    print("\(fileName) \(line) \(function) \(message)")
    #endif
}
