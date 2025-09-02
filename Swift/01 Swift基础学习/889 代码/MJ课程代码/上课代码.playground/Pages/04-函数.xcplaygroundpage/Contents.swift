// ()是空元组

// func sum(v1: Int, v2: Int) -> Int { v1 + v2 }

// sum(v1: 10, v2: 20)

// func goToWork(time: String) {
//    print("this time is \(time)")
// }
// goToWork(time: "08:00")

// func goToWork(at: String) {
//    print("this time is \(at)")
// }
// goToWork(at: "08:00")
//
// func goToWork(at time: String) {
//    print("this time is \(time)")
// }
// goToWork(at: "08:00")
// go to work at 08:00

var number = 10

func add(_ num: inout Int) {
    num = 20
}

add(&number)

print(number)

// func sum(v1: Int, v2: Int) -> Int {
//    v1 + v2
// }
func sum(_ v1: Int, _ v2: Int) -> Int {
    v1 + v2
}

func sum(_ numbers: Int...) -> Int {
    var total = 0
    for number in numbers {
        total += number
    }
    return total
}

// error: ambiguous use of 'sum'
sum(10, 20)
