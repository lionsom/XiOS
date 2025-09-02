//: A UIKit based Playground for presenting user interface

import UIKit
// import PlaygroundSupport
//
// class MyViewController : UIViewController {
//    override func loadView() {
//        let view = UIView()
//        view.backgroundColor = .white
//
//        let label = UILabel()
//        label.frame = CGRect(x: 150, y: 200, width: 200, height: 20)
//        label.text = "Hello World!"
//        label.textColor = .black
//
//        view.addSubview(label)
//        self.view = view
//    }
// }
//// Present the view controller in the Live View window
// PlaygroundPage.current.liveView = MyViewController()

//
// var a = 10
//
// print("A = \(a)")
// print("A = " + String(a))
//
// var b = "eerwer"
// print(Int(b))
////print(Int(b)!)
//
// print(Int(100.999))
// print(Float(10.123456789))
// print(Double(10.123456789123456789))

// let error = (404, "找不到服务")
// print(error.0)
// print(error.1)
//
// var a = ()
// print(a)
//
//
// var b = (1)
// print(b)
//
// var c:(Int, String, Array) = (11, "123", [1,2,3])
// print(c)

// var a: Int = 100
// var b: Int! = 100
//
////a = nil
// b = nil
//
// var c: Int = a
//
// print(c)
//
// var str: String! = "abc"
// let count = str.count
// print(count)
//
// for index in 1...5 {
//    print("index ：\(index)")
// }
//
// var someInts:[Int] = [10, 20, 30]
// for value in someInts {
//   print( "index 的值为 \(value)")
// }

// for var index = 0; index < 3; ++index {
//   print( "索引 [\(index)] 对应的值为 \(someInts[index])")
// }

// var index = 10
// while index < 20
// {
//   print( "index 的值为 \(index)")
//   index = index + 1
// }

// func someFunc(blog: String?) {
//
//    guard let blogName = blog else {
//        print("some ErrorMessage")
////        print(blogName) // will create an error Because blogName isn't defined yet
//        return
//    }
//    print(blogName) // You can access it here ie AFTER the guard statement!!
//
//    // And if I decided to do 'another' guard let with the same name ie 'blogName' then I would create an error!
//    guard let blogName = blog else { // errorLine: Definition Conflicts with previous value.
//            print(" Some errorMessage")
//            return
//        }
//        print(blogName)
// }
//
// someFunc(blog: "123")

// let array = [1, 2, 3, 4, 5]
// array.forEach { (element) in
//    print(element)
//
//    return
// }

//
// func test() {
//
// }
//
// func test1() -> Void {
//
// }
//
// func test2(test a:String) {
//
// }
//
// test2(test: "2")
//
//// 指定实际参数标签
// func someFunction(argumentLabel parameterName: Int) {
//    // In the function body, parameterName refers to the argument value
//    // for that parameter.
// }
//
// func addTwoInts(_ a: Int, _ b: Int) -> Int {
//    return a + b
// }
// var d: (Int, Int) -> Int = addTwoInts
// d(1, 3)
//
// var e: () -> Void = { () -> Void in
//
// }
//
// var f: (Int, String) -> String = { (param1: Int, param2: String) -> String in
//    return String(param1) + param2
// }
// f(191, "234")

// func test() {
//    print("test()方法被调用了")
// }
//
// func test11(param: () -> Void) {
//    param()
// }
// test11(param: test)
//
// test11(param: {() -> Void in
//    print("345")
// })
//
// test11 {() -> Void in
//    print("123")
// }
//
//
//
// func sum(param: (Int, Int) -> Int) {
//    let value = param(1, 3)
//    print(value)
// }
//
// func add(a: Int, b: Int) -> Int {
//    return a + b
// }
//
// sum(param: add)
// sum(param: {(a: Int, b: Int) -> Int in
//    return a + b
// })
//
//
// var arr = [4,1,2,3]
// arr.sort { (a, b) -> Bool in
//    if a < b {
//        return true
//    } else {
//        return false
//    }
// }
//
// print(arr)

// func test(param: Bool) -> (Int) -> Int {
//
//    func play1(value: Int) -> Int {
//        return value * value
//    }
//
//    func play2(value: Int) -> Int {
//        return value + value
//    }
//
//    return param ? play1 : play2
// }
//
// var a = test(param: true)
// print(type(of: a))
//
// a(5)

// var a:() -> Void = { () -> Void in
//    print("a")
// }
// a()
// print(type(of: a))
//
// var b:() -> Void = {
//    print("b")
// }
// b()
// print(type(of: b))
//
//
// var c = {print("c")}
// c()
// print(type(of: c))

// func test(param: () -> Void) {
//    param()
// }
//
// test(param: {() -> Void in
//    print("test")
// })
//
// test(param: {
//    print("test")
// })
//
// test {
//    print("test")
// }

// func test(param: (Int, Int) -> Int) {
//    print(param(10, 20))
// }
//
// test(param: {(value1: Int, value2: Int) -> Int in
//    return value1 + value2
// })
//
// test(param: {
//    return $0 + $1
// })
//
// test(param: {
//    $0 + $1
// })
//
// test{
//    $0 + $1
// }

// test(param: {(value: Int) in
//    print(value)
// })
//
// test(param: {(value) in
//    print(value)
// })
//
// test{(value) in
//    print(value)
// }

// enum TestEnum {
//    case A
//    case B
//    case C, D, E
// }
//
// func swi(param: TestEnum) {
//    switch param {
//    case .A:
//        print("A")
//    case .B:
//        print("B")
//    case .C, .D ,.E:
//        print("C, D, E")
//    default:
//        print("none")
//    }
// }

// swi(param: .D)

// enum TestEnum: CaseIterable  {
//    case A
//    case B
//    case C, D, E
// }
////print(TestEnum.AllCases())
////print(TestEnum.allCases)
//
//
// print(type(of: TestEnum.AllCases()))
// print(type(of: TestEnum.allCases))
//
//
// for item in TestEnum.allCases {
//    print(item)
// }
//
// enum Barcode {
//    case upc(Int, Int, Int, Int)   // 条形码
//    case qrCode(String)         // 二维码
// }
//
// func play(param: Barcode) {
//    switch param {
//    case Barcode.upc(10, 20, 30, 40):
//        print("匹配成功")
//    case let .upc(numberSystem, manufacturer, product, check):
//        print("UPC : \(numberSystem), \(manufacturer), \(product), \(check).")
//    case let .qrCode(productCode):
//        print("QR code: \(productCode).")
//    }
// }
//
// play(param: Barcode.upc(10, 20, 30, 40))

// struct Student {
//    var name = "unknow"
//    var age = 0
//
//    var score = 0.0
//
//    var ispass = false
//
//    static let schoolName = "家里蹲大学"
//
//
//    // Init
//    init() {
//        print("init()")
//    }
//
//    init(name: String, age: Int, score: Double, ispass: Bool) {
//        self.name = name
//        self.age = age
//        self.score = score
//        if score < 60 {
//            self.ispass = false
//        } else {
//            self.ispass = true
//        }
//    }
//
//    // Get
//    func getName() -> String {
//        return self.name
//    }
//
//    func getAge() -> Int {
//        return self.age
//    }
//
//    func getScore() -> Double {
//        return self.score
//    }
//
//    func getIspass() -> Bool {
//        return self.ispass
//    }
//
//    // 不建议
//    // Set: 必须加上 mutating 关键字
//    mutating func setScore(score: Double) {
//        self.score = score
//    }
// }
//
// var a = Student()
// var b = Student(name: "123", age: 22, score: 5.9, ispass: false)
// print("name:" + a.getName())
// print("name:" + b.getName())
// print(b.age)
// b.setScore(score: 99)
// print(b.score)
//
// Student.schoolName
//
//
// struct test {
//    var age = 12
// }
//
// var t1 = test()
// print(t1.age)
//
// var t2 = t1
// print(t2.age)
//
//
// t2.age = 15
// print(t2.age)
//
//
// print(t1.age)

// class SampleClass: Equatable {
//    let myProperty: String
//
//    init(s: String) {
//        myProperty = s
//    }
// }
//
// func ==(lhs: SampleClass, rhs: SampleClass) -> Bool {
//    return lhs.myProperty == rhs.myProperty
// }
//
// let spClass1 = SampleClass(s: "Hello")
// let spClass2 = SampleClass(s: "Hello")
//
// if spClass1 === spClass2 {// false
//    print("引用相同的类实例 \(spClass1)")
// }
//
// if spClass1 !== spClass2 {// true
//    print("引用不相同的类实例 \(spClass2)")
// }

// let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
//
// func backward(_ s1: String, _ s2: String) -> Bool {
//    return s1 > s2
// }
// var reversedNames = names.sorted(by: backward)
//
// var reversedNames1 = names.sorted(by: {(s1: String, s2: String) -> Bool in
//    return s1 < s2
// })
// print(reversedNames)
// print(reversedNames1)

// func test(param: () -> Void) {
//      // 函数体部分
//    param()
// }
//
//// 以下是不使用尾随闭包进行函数调用
// test(param: {() -> Void in
//    // 闭包主体部分
//    print("test")
// })
//
//// 以下是不使用尾随闭包进行函数调用
// test(param: {
//    // 闭包主体部分
//    print("test")
// })
//
//// 以下是使用尾随闭包进行函数调用
// test() {
//    // 闭包主体部分
//    print("test")
// }
//
//// 如果闭包表达式是函数或方法的唯一参数，则当你使用尾随闭包时，你甚至可以把 () 省略掉：
// test {
//    // 闭包主体部分
//    print("test")
// }

// func makeIncrementer(forIncrement amount: Int) -> () -> Int {
//    var runningTotal = 0
//    func incrementer() -> Int {
//        runningTotal += amount
//        return runningTotal
//    }
//    return incrementer
// }
//
// let incrementByTen = makeIncrementer(forIncrement: 10)
//
// incrementByTen()
// incrementByTen()
// incrementByTen()

// var completionHandlers: [() -> Void] = []
// func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
//    completionHandlers.append(completionHandler)
// }
//
// func someFunctionWithNonescapingClosure(closure: () -> Void) {
//    closure()
// }
//
// class SomeClass {
//    var x = 10
//    func doSomething() {
//        someFunctionWithEscapingClosure { self.x = 100 }
//        someFunctionWithNonescapingClosure { x = 200 }
//    }
// }
//
// let instance = SomeClass()
// instance.doSomething()
// print(instance.x)
//// 打印出“200”
//
// completionHandlers.first?()
// print(instance.x)
//// 打印出“100”

// var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
// print(customersInLine.count)
//// 打印出“5”
//
// let customerProvider = { customersInLine.remove(at: 0) }
// print(customersInLine.count)
//// 打印出“5”
//
// print("Now serving \(customerProvider())!")
//// 打印出“Now serving Chris!”
// print(customersInLine.count)
//// 打印出“4”
//
//// customersInLine is ["Alex", "Ewa", "Barry", "Daniella"]
// func serve(customer customerProvider: () -> String) {
//    print("Now serving \(customerProvider())!")
// }
// serve(customer: { customersInLine.remove(at: 0) } )
//// 打印出“Now serving Alex!”
//
//// customersInLine is ["Ewa", "Barry", "Daniella"]
// func serve(customer customerProvider: @autoclosure () -> String) {
//    print("Now serving \(customerProvider())!")
// }
// serve(customer: customersInLine.remove(at: 0))
//// 打印“Now serving Ewa!”

var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]

// customersInLine i= ["Barry", "Daniella"]
var customerProviders: [() -> String] = []
func collectCustomerProviders(_ customerProvider: @autoclosure @escaping () -> String) {
    customerProviders.append(customerProvider)
}

collectCustomerProviders(customersInLine.remove(at: 0))
collectCustomerProviders(customersInLine.remove(at: 0))

print("Collected \(customerProviders.count) closures.")
// 打印“Collected 2 closures.”
for customerProvider in customerProviders {
    print("Now serving \(customerProvider())!")
}

// 打印“Now serving Barry!”
// 打印“Now serving Daniella!”
