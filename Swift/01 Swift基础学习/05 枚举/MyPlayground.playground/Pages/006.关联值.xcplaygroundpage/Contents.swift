import Foundation

enum Password {
    case number(Int, Int, Int, Int)
    case gesture(String)
}

var pwd = Password.number(3, 5, 7, 8)
pwd = .gesture("123456")

func A() {
    switch pwd {
    case let .number(n1, n2, n3, n4):
        print(n1, n2, n3, n4)
    default:
        print("")
    }
}
