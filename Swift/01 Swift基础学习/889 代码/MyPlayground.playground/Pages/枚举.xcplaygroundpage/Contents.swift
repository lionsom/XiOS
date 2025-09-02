var age = 10

MemoryLayout<Int>.size
MemoryLayout<Int>.stride
MemoryLayout<Int>.alignment

MemoryLayout.size(ofValue: age)
MemoryLayout.stride(ofValue: age)
MemoryLayout.alignment(ofValue: age)

// *******************************
// 枚举
// *******************************
enum Password {
    // 关联值
    case number(Int, Int, Int, Int) // 32
    case other // 1
}

var pwd = Password.number(4, 5, 5, 6)
pwd = .other

MemoryLayout<Password>.size // 40 实际用到的空间大小
MemoryLayout<Password>.stride // 33 分配占用的空间大小
MemoryLayout<Password>.alignment // 8 内存对齐参数

// *******************************
// 枚举 - 原始值
// *******************************

enum Season {
    case Spring, Summer, Autumn, Winter
}

var s = Season.Summer

MemoryLayout<Season>.size // 1 实际用到的空间大小
MemoryLayout<Season>.stride // 1 分配占用的空间大小
MemoryLayout<Season>.alignment // 1 内存对齐参数
