import Foundation

// MARK: 1.无类型

// 设置原始值，
enum TestEnum31 {
    case A
    case B
    case C
}

// 获取枚举值：A
print(TestEnum31.A)
// TestEnum31
print(type(of: TestEnum31.A))
// 获取原始值：ERROR: Value of type 'TestEnum31' has no member 'rawValue'
// print(TestEnum31.B.rawValue)
// 获取隐式指定的原始值：ERROR: Value of type 'TestEnum31' has no member 'rawValue'
// print(TestEnum31.C.rawValue)

// MARK: 2.Int

// 设置原始值，
enum TestEnum32: Int {
    case A = 1
    case B = 2
    case C // 隐式指定为3
}

// 获取枚举值：A
print(TestEnum32.A)
// 获取原始值：2
print(TestEnum32.B.rawValue)
// 获取隐式指定的原始值：3
print(TestEnum32.C.rawValue)

// MARK: 3.String

// 设置原始值，
enum TestEnum33: String {
    case A = "11"
    case B = "22"
    case C // 隐式指定为3
}

// 获取枚举值：A
print(TestEnum33.A)
// 获取原始值：2
print(TestEnum33.B.rawValue)
// 获取隐式指定的原始值：C
print(TestEnum33.C.rawValue)
