import UIKit

enum TestEnum {
    case A
    case B
    case C, D, E, F
}

// Switch调用枚举
func swi(param: TestEnum) {
    switch param {
    case .A:
        print("A")
    case .B:
        print("B")
    case .C, .D, .E:
        print("C, D, E")
    default:
        print("none")
    }
}

// 调用
swi(param: .D)
