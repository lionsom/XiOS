var age = 10

// MemoryLayout<Int>.size
// MemoryLayout<Int>.stride
// MemoryLayout<Int>.alignment

// MemoryLayout.size(ofValue: age)
// MemoryLayout.stride(ofValue: age)
// MemoryLayout.alignment(ofValue: age)

enum Password {
    case number(Int, Int, Int, Int) // 32
    case other
}

var pwd = Password.number(5, 6, 4, 7) // 33
pwd = .other // 0

var pwd2 = Password.number(10, 9, 100, 19999)

var pwd3 = Password.number(111, 222, 100, 19999)

MemoryLayout<Password>.size // 33
MemoryLayout<Password>.stride // 40
MemoryLayout<Password>.alignment // 8

enum Season: Int {
    // 0 1 2 3
    case spring = 1, summer, autumn, winter
}

var s = Season.spring // 0
var s1 = Season.spring // 0
var s2 = Season.spring // 0

MemoryLayout<Season>.size // 33
MemoryLayout<Season>.stride // 40
MemoryLayout<Season>.alignment // 8

// 关联值、原始值的区别
