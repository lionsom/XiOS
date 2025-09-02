import Foundation

// 设置原始值，
enum TestEnum1: Int {
    case A = 1
    case B = 2
    case C // 隐式指定为3
}

// 获取枚举值：A
print(TestEnum1.A)
// 获取原始值：2
print(TestEnum1.B.rawValue)
// 获取隐式指定的原始值：3
print(TestEnum1.C.rawValue)
