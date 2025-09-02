//
//  finalTest.swift
//  final_Demo
//
//  Created by 启业云03 on 2023/1/6.
//

import Foundation

// MARK: - 正常情况

class A {
    func A_Print() {
        print(#line, #function)
    }
}

class B: A {
    override func A_Print() {
        print(#line, #function)
    }
}

// MARK: - final修饰class

final class C {
    // ToDo
}

class D: C {
    // ToDo
}

// MARK: - final修饰function

class E {
    final func method() {
        // ToDo...
    }
}

class F: E {
    override func method() {
        // ToDo...
    }
}

// MARK: - final修饰属性

class G {
    final var name = "lin"
    var age: Int = 0
}

class I: G {
    override var name: String {
        get {
            return self.name
        }
        set {
            self.name = newValue
        }
    }

    override var age: Int {
        get {
            return self.age
        }
        set {
            self.age = newValue
        }
    }
}
