//
//  Singleton.swift
//  Singleton_Demo
//
//  Created by 启业云03 on 2023/1/6.
//

import Foundation

// MARK: - 最简单的单例

class Singleton_A {
    static let shared = Singleton_A()
}

// MARK: - 单例 不继承NSObject

class Singleton_B {
    // 方式一
    static let shared = Singleton_B()

    // 方式二
    static let shared_1: Singleton_B = {
        let instance = Singleton_B()
        return instance
    }()

    // Make sure the class has only one instance
    // Should not init or copy outside
    private init() {}
}

// MARK: - 单例 继承NSObject

class Singleton_C: NSObject {
    static let shared = Singleton_C()

    // Make sure the class has only one instance
    // Should not init or copy outside
    override private init() {}

    override class func copy() -> Any {
        return self
    }

    override func mutableCopy() -> Any {
        return self
    }
}

// MARK: - 全局变量 单例

let shared_D = Singleton_D(string: "")

class Singleton_D {
    // Properties
    let string: String
    // Initialization
    init(string: String) {
        self.string = string
    }
}
