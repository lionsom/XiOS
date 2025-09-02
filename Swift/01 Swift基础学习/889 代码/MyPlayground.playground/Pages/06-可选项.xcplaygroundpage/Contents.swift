

// var age: Int? = 10
//
// age = age! + 20

var num1: Int? = 5
num1? = 10
print(num1 ?? 100)

var num2: Int?
num2? = 10
print(num2 ?? 100)

let str1 = ###"Line 1 \###nLine 2"###
print(str1)

var number = 1
switch number {
case 1:
    print("number is 1")
    fallthrough
case 2:
    print("number is 2")
default:
    print("number is other")
}

class Person {
    let name: String
    init(name: String) {
        self.name = name
        print("\(name) is being initialized")
    }

    deinit {
        print("\(name) is being deinitialized")
    }
}

var per1: Person?
var per2: Person?
var per3: Person?

per1 = Person(name: "John Appleseed")
per2 = per1
per3 = per1
per1 = nil
per2 = nil
