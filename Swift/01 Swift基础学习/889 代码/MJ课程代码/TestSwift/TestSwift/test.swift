//
//  test.swift
//  TestSwift
//
//  Created by MJ Lee on 2019/7/9.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

import Foundation

func test1() {}

/*

 /*
  1.String 与 NSString 可以互相桥接转换
  2.String 不能 桥接转换成 NSMutableString
  */

 //var str1: String = "jack"
 //var str1: NSMutableString = "jack"
 //var str2 = str1 as String
 //print(str2)

 // ja
 //var str5 = str3.substring(with: NSRange(location: 0, length: 2))
 //print(str5)

 /*
  1.为什么Swift暴露给OC的类最终要继承自NSObject？

  2.p.run()底层是怎么调用的？反过来，OC调用Swift底层又是如何调用？

  3.car.run()底层是怎么调用的？
  */

 //var p = MJPerson(age: 10, name: "Jack")
 //p.run() // 18 Rose -run

 //@objcMembers class Car: NSObject {
 //    var price: Double
 //    var band: String
 //    init(price: Double, band: String) {
 //        self.price = price
 //        self.band = band
 //    }
 //    func run() {
 //        print(price, band, "run")
 //    }
 //    static func run() { print("Car run") }
 //}
 //extension Car {
 //    func test() { print(price, band, "test") }
 //}
 //
 //var car = Car(price: 10.5, band: "Audi")
 //car.run()

 //testSwift()

 /*
 func sum(_ a: Int, _ b: Int) -> Int { a - b }

 var p = MJPerson(age: 10, name: "Jack")
 p.age = 18
 p.name = "Rose"
 p.run() // 18 Rose -run
 p.eat("Apple", other: "Water") // 18 Rose -eat Apple Water

 MJPerson.run() // Person +run
 MJPerson.eat("Pizza", other: "Banana") // Person +eat Pizza Banana

 @_silgen_name("sum")
 func swift_sum(_ v1: Int32,
                _ v2: Int32) -> Int32

 //@_silgen_name("swift_retainCount")
 //func swift_allocObject(,,,) -> UnsafeMutableRawPointer?

 print(swift_sum(10, 20)) // 30
 print(sum(10, 20)) // -10
 */

 //class Person {
 //    lazy var fn: (() -> ()) = {
 //        [weak p = self] in
 //        p?.run()
 //    }
 //    func run() { print("run") }
 //    deinit { print("deinit") }
 //}

 //// (Person) -> ((Int) -> ())
 //var fn1 = Person.run
 //// (Int) -> ()
 //var fn2 = fn1(Person(age: 10))
 //fn2(20)

 //var fn: (Person) -> (Int) -> () = Person.run
 //fn(Person(age: 10))(20)

 //func isOdd<T : BinaryInteger>(_ i: T) -> Bool { i % 2 != 0 }

 //extension BinaryInteger {
 //    func isOdd() -> Bool { self % 2 != 0 }
 //}
 //
 //var age: Int8 = 10
 //
 //print(age.isOdd())
 //print(10.isOdd())
 //print((-3).isOdd())

 //struct Point {
 //    var x: Int = 0
 //    var y: Int = 0
 //}
 //
 //extension Point {
 //    init(_ point: Point) {
 //        self.init(x: point.x, y: point.y)
 //    }
 //}

 //var arr: Array<Int> = [10, 20, 30]
 //
 //
 //extension Array {
 //    subscript(nullable idx: Int) -> Element? {
 //        if (startIndex..<endIndex).contains(idx) {
 //            return self[idx]
 //        }
 //        return nil
 //    }
 //}
 //print(arr[nullable: 1] ?? 0)

 //infix operator +- : PlusMinusPrecedence
 //precedencegroup PlusMinusPrecedence {
 //    associativity: none
 //    higherThan: AdditionPrecedence
 //    lowerThan: MultiplicationPrecedence
 //    assignment: true // 在可选链操作中拥有跟赋值运算符一样的优先级
 //}
 //struct Point {
 //    var x = 0, y = 0
 //    static func +- (p1: Point, p2: Point) -> Point {
 //        Point(x: p1.x + p2.x, y: p1.y - p2.y)
 //    }
 //}

 //var p1 = Point(x: 10, y: 20)
 //var p2 = Point(x: 5, y: 15)
 //var p3 = p1 +- p2
 //print(p3)

 //func getAge() -> Int { 10 }
 //
 //var p: Person? = Person()
 //p?.age = getAge()

 //prefix operator +++
 //
 //prefix func +++ (_ i: inout Int) {
 //    i += 2
 //}
 //
 //var age = 10
 //+++age

 //enum Answer : Equatable {
 //    case wrong(Int, String)
 //    case right
 //}
 //
 //var s1 = Answer.wrong(10, "Jack", Cat())
 //var s2 = Answer.wrong(10, "Jack", Cat())
 //print(s1 == s2)
 //
 //class Person : Equatable {
 //    var age: Int
 //    init(age: Int) {
 //        self.age = age
 //    }
 //    static func == (lhs: Person, rhs: Person) -> Bool {
 //        lhs.age == rhs.age
 //    }
 //}
 //var p1 = Person(age: 10)
 //var p2 = p1
 //print(p1 == p2)
 ////print(p1 != p2)
 //
 //print(p1 === p2)

 //struct Point : Equatable {
 //    var x = 0, y = 0
 //    static func + (p1: Point, p2: Point) -> Point {
 //        Point(x: p1.x + p2.x, y: p1.y + p2.y)
 //    }
 //    static func - (p1: Point, p2: Point) -> Point {
 //        Point(x: p1.x - p2.x, y: p1.y - p2.y)
 //    }
 //    static prefix func - (p: Point) -> Point {
 //        Point(x: -p.x, y: -p.y)
 //    }
 //    static func += (p1: inout Point, p2: Point) {
 //        p1 = p1 + p2
 //    }
 //    static prefix func ++ (p: inout Point) -> Point {
 //        p += Point(x: 1, y: 1)
 //        return p
 //    }
 //    static postfix func ++ (p: inout Point) -> Point {
 //        let tmp = p
 //        p += Point(x: 1, y: 1)
 //        return tmp
 //    }
 //}

 // 重载（结合性）
 //var p1 = Point(x: 10, y: 20)
 //var p2 = Point(x: 11, y: 22)
 //print(p1, p2)

 //var v1 = 10
 //var v2 = 20
 //let v3 = v1 + v2

 //print(Int8.min) // -128
 //print(Int8.max) // 127
 //
 //print(UInt8.min) // 0
 //print(UInt8.max) // 255

 //var v1 = UInt8.max
 //var v2 = v1 &* 3
 //print("v2", v2)

 //enum Score {
 //    case point(Int)
 //    case grade(String)
 //    case other
 //}
 //
 //var s: Score = .other
 //s = .point(10)
 //s = .grade("123")
 //switch s {
 //    case let.point(v)
 //}

 //var age: Int? = 10
 //age = 20
 ////age = nil
 //
 //switch age {
 //case let .some(v):
 //    print("1", v)
 //case .none:
 //    print("2")
 //}

 //switch age {
 //case let v?:
 //    print("1", v)
 //case nil:
 //    print("2")
 //}

 //if let v = age {
 //    print("1", v)
 //} else {
 //    print("2")
 //}

 //var age1: Optional<Int> = .some(10)
 //age1 = .some(20)
 //age1 = .none
 //age1 = Optional(30) // .some(30)

 //var age = 10
 //switch age {
 //case let a where a > 20:
 //    print(a)
 //case 20:
 //    print(1)
 //default:
 //    break
 //}

 //var arr = [Int]()
 //for i in 1...17 {
 //    arr.append(i)
 //}
 ////print(MemoryLayout.stride(ofValue: arr))
 ////print(Mems.memStr(ofRef: arr))
 ////print(Mems.ptr(ofVal: &arr))
 //print(Mems.memStr(ofRef: arr))

 //struct Point {
 //    var x = 0, y = 0
 //}
 //
 //var p = Point(x: 10, y: 10)

 //var str1 = "0123456789"
 //var str2 = "0123456789ABCDEFG"
 // call 0x100000abc

 /*
  // 字符串长度 <= 0xF，字符串内容直接存放在str1变量的内存中
  var str1 = "0123456789"

  // 字符串长度 > 0xF，字符串内容存放在__TEXT.cstring中（常量区）
  // 字符串的地址值信息存放在str2变量的后8个字节中
  var str2 = "0123456789ABCDEF"

  // 由于字符串长度 <= 0xF，所以字符串内容依然存放在str1变量的内存中
  str1.append("ABCDE")
  // 开辟堆空间
  str1.append("F")

  // 开辟堆空间
  str2.append("G")

  */

 //class Person { }
 //var p = Person()

 // 字面量
 //var str1 = "01234567"
 //print(Mems.memStr(ofVal: &str1))
 //str1.append("GIHJ")
 //print(Mems.memStr(ofVal: &str1))

 //var str2 = "0123456789ABCDEF"
 //str2.append("G")

 // 0xd000000000000010 0x800000010000a790
 //print(Mems.memStr(ofVal: &str2))
 // 0xf000000000000011 0x0000000102016030
 //print(Mems.memStr(ofVal: &str2))

 // var str1 = "0123456789ABCDE"
 // 0x3736353433323130 0xef45444342413938
 // print(Mems.memStr(ofVal: &str1))

 //var str2 = "0123456789ABCDEF"
 //// 0xd000000000000010 0x800000010000a790
 //print(Mems.memStr(ofVal: &str2))
 //print("1")

 // 字符串的真实地址 + 0x7fffffffffffffe0 = 0x800000010000a790
 // 字符串的真实地址 = 0x800000010000a790 - 0x7fffffffffffffe0
 // 字符串的真实地址 = 0x000000010000a790 + 0x20

 // movabsq $0x7fffffffffffffe0, %rdx
 // addq %rdx, %rdi

 // 0x10000A7B0是"0123456789ABCDEF"的真实地址

 // %rdi存放着字符串的真实地址
 // %rsi存放的是字符串的长度0x10
 // callq String.init
 // %rdx存放的是 字符串的真实地址  + 0x7fffffffffffffe0

 // 0x100000000 + 0xD7B8

 //protocol Stackable {
 //    associatedtype Element : Equatable
 //}
 //class Stack<E : Equatable> : Stackable {
 //    typealias Element = E
 //}
 //
 //func equal<S1: Stackable, S2: Stackable>(_ s1: S1, _ s2: S2) -> Bool
 //    where S1.Element == S2.Element, S1.Element : Hashable
 //{
 //    return false
 //}

 //func swapValues(_ a: inout Int, _ b: inout Int) {
 //    (a, b) = (b, a)
 //}
 //
 //func swapValues(_ a: inout Double, _ b: inout Double) {
 //    (a, b) = (b, a)
 //}

 //var i1 = 10
 //var i2 = 20
 //swapValues(&i1, &i2)
 //
 //var d1 = 10.0
 //var d2 = 20.0
 //swapValues(&d1, &d2)

 //enum Score<T> {
 //    case point(T)
 //    case grade(String)
 //}
 //
 //let score3 = Score<Int>.grade("A")

 //class Stack<E> {
 //    var elements = [E]()
 //    init(firstElement: E) {
 //        elements.append(firstElement)
 //    }
 //    func push(_ element: E) {
 //        elements.append(element)
 //    }
 //    func pop() -> E {
 //        elements.removeLast()
 //    }
 //    func top() -> E {
 //        elements.last!
 //    }
 //    func size() -> Int {
 //        elements.count
 //    }
 //}

 //var stack = Stack(firstElement: 10.0)
 //var intStack = Stack<Int>()
 //var stringStack = Stack<String>()
 //var anyStack = Stack<Any>()

 //func sum(_ a: Int, _ b: Int) -> Int { a + b }
 //
 //var fn = sum
 //fn(10, 20)

 //var n1 = 10
 //var n2 = 20
 //swapValues(&n1, &n2)
 //
 //var d1 = 10.0
 //var d2 = 20.0
 //swapValues(&d1, &d2)

 //enum SomeError : Error {
 //    case illegalArg(String)
 //    case outOfBounds(Int, Int)
 //    case outOfMemory
 //}
 //
 //func divide(_ num1: Int, _ num2: Int) throws -> Int {
 //    if num2 == 0 {
 //        throw SomeError.illegalArg("0不能作为除数")
 //    }
 //    return num1 / num2
 //}
 //
 //func open(_ filename: String) -> Int {
 //    print("open")
 //    return 0
 //}
 //
 //func close(_ file: Int) {
 //    print("close")
 //}
 //
 //func processFile(_ filename: String) throws {
 //    let file = open(filename)
 //
 //    // 使用file
 //    // ....
 //
 //    close(file)
 //}
 //
 //try processFile("test.txt")

 //
 //var a = try? divide(20, 0)
 //var b: Int?
 //do {
 //    b = try divide(20, 0)
 //} catch {
 //    b = nil
 //}

 //func test0() throws {
 //    print("1")
 //    try test1()
 //    print("2")
 //}
 //
 //func test1() throws {
 //    print("3")
 //    try test2()
 //    print("4")
 //}
 //
 //func test2() throws {
 //    print("5")
 //    print(try divide(200, 0))
 //    print("6")
 //}
 //
 //try test0()

 //func test0() throws {
 //    try test1()
 //}
 //
 //func test1() throws {
 //    try test2()
 //}
 //
 //func test2() throws {
 //    do {
 //        print(try divide(200, 0))
 //    } catch is SomeError {
 //        print("This is SomeError")
 //    }
 //}
 //
 //try test0()

 //func test() {
 //    print("1")
 //    do {
 //        print("2")
 //        print(try divide(200, 0))
 //        print("3")
 //    } catch let SomeError.illegalArg(msg) {
 //        print("参数异常:", msg)
 //    } catch let SomeError.outOfBounds(size, index) {
 //        print("下标越界:", "size=\(size)", "index=\(index)")
 //    } catch SomeError.outOfMemory {
 //        print("内存溢出")
 //    } catch {
 //        print("其他错误")
 //    }
 //    print("4")
 //}
 //
 //test()

 //class Person {
 //    static var age = 0
 //    static func run() {}
 //}
 //
 //Person.age = 10
 //Person.run()
 //
 //Person.self.age = 10
 //Person.self.run()
 //
 //var p0 = Person() // init()
 //var p1 = Person.self() // init()
 //var p2 = Person.init() // init()
 //var p3 = Person.self.init() // init()
 //
 //// var pType0 = Person
 //var pType1 = Person.self
 //
 //func test(_ cls: AnyClass) {
 //
 //}
 //test(Person.self)

 //protocol Runnable {
 //    func test() -> Self
 //}
 //class Person : Runnable {
 //    required init() { }
 //    func test() -> Self {
 //        type(of: self).init()
 //    }
 //}
 //class Student : Person { }
 //
 //var stu = Student()
 //stu.test()

 // TabBarController
 // 1: HomeViewController
 // 2: AboutViewController
 //for (cls in array) {
 //    [[cls alloc] init]
 //}

 //var p2: AnyObject = Person()
 //var pType1: Person.Type = Person.self
 //var pType2: AnyObject.Type = Person.self

 //class Person {
 //    var age: Int
 //    var name: String
 //    init(age: Int, name: String) {
 //        self.age = age
 //        self.name = name
 //    }
 //    init() {
 //        self.age = 0
 //        self.name = ""
 //    }
 //    convenience init(age: Int) {
 //        self.init(age: age, name: "")
 //    }
 //    convenience init(name: String) {
 //        self.init(age: 0, name: name)
 //    }
 //}
 //
 //class Student : Person {
 //    var no: Int = 0
 //    convenience init(no: Int) {
 //        self.init()
 //    }
 //}
 //
 //var stu = Student(age: 10, name: "Jack")

 //class Size {
 //    var width: Int
 //    var height: Int
 //    // 指定初始化器（主要初始化器）
 //    init(width: Int, height: Int) {
 //        self.width = width
 //        self.height = height
 //    }
 //
 //    convenience init(width: Int) {
 //        self.init(width: width, height: 0)
 //    }
 //
 //    convenience init(height: Int) {
 //        self.init(width: 0, height: height)
 //    }
 //
 //    convenience init() {
 //        self.init(width: 0, height: 0)
 //    }
 //}
 //var s1 = Size(width: 10, height: 20)
 //var s2 = Size(width: 10)
 //var s3 = Size(height: 20)
 //var s4 = Size()

 /*
  多态的实现原理：
  1.OC：Runtime
  2.C++：虚表（虚函数表）

  Swift中多态的实现原理
  */

 //class Animal {
 //    func speak() {
 //        print("Animal speak")
 //    }
 //    func eat() {
 //        print("Animal eat")
 //    }
 //    func sleep() {
 //        print("Animal sleep")
 //    }
 //}
 //
 //class Dog : Animal {
 //    override func speak() {
 //        super.speak()
 //        print("Dog speak")
 //    }
 //    override func eat() {
 //        super.speak()
 //        super.eat()
 //        print("Dog eat")
 //    }
 //    func run() {
 //        print("Dog run")
 //    }
 //}
 //
 // /*
 // 堆空间
 // 全局区
 // 代码区
 // */
 //
 //var dog1 = Dog()
 //dog1.eat()

 // MachOView  TEXT  DATA  窥探mach-o文件
 // 代码区        0x100001db0
 // 代码区        0x100002270
 // dog1全局变量   0x10000F048
 // rcx metadata  0x10000e9c0
 // 堆空间Dog对象  0x10280cfa0

 //class Circle {
 //    var radius: Int = 0
 //    var diameter: Int {
 //        set {
 //            print("Circle setDiameter")
 //            radius = newValue / 2
 //        }
 //        get {
 //            print("Circle getDiameter")
 //            return radius * 2
 //        }
 //    }
 //}
 //
 //class SubCircle : Circle {
 //    override var radius: Int {
 //        set {
 //            print("SubCircle setRadius")
 //            super.radius = newValue > 0 ? newValue : 0
 //        }
 //        get {
 //            print("SubCircle getRadius")
 //            return super.radius
 //        }
 //    }
 //    override var diameter: Int {
 //        set {
 //            print("SubCircle setDiameter")
 //            super.diameter = newValue > 0 ? newValue : 0
 //        }
 //        get {
 //            print("SubCircle getDiameter")
 //            return super.diameter
 //        }
 //    }
 //}
 //
 //var circle = SubCircle()
 //print(circle.radius)

 //class Circle {
 //    class var radius: Int {
 //        set {
 //            print("Circle setRadius", newValue)
 //        }
 //        get {
 //            print("Circle getRadius")
 //            return 20
 //        }
 //    }
 //}

 //// SubCircle setRadius
 //circle.radius = 6
 //
 //// SubCircle getDiameter
 //// Circle getDiameter
 //// SubCircle getRadius
 //// 12
 //print(circle.diameter)
 //
 //// SubCircle setDiameter
 //// Circle setDiameter
 //// SubCircle setRadius
 //circle.diameter = 20
 //
 //// SubCircle getRadius
 //// 10
 //print(circle.radius)

 //class Point {
 //    var x = 10, y = 10
 //}
 //
 //class PointManager {
 //    var point = Point()
 //    subscript(index: Int) -> Point {
 //        get { point }
 //    }
 //}
 //
 //var pm = PointManager()
 //pm[0].x = 11
 //pm[0].y = 22

 //class Point {
 //    var x = 0.0, y = 0.0
 //    subscript(index: Int) -> Double {
 //        set {
 //            if index == 0 {
 //                x = newValue
 //            } else if index == 1 {
 //                y = newValue
 //            }
 //        }
 //        get {
 //            if index == 0 {
 //                return x
 //            } else if index == 1 {
 //                return y
 //            }
 //            return 0
 //        }
 //    }
 //}
 //
 //var p = Point()
 //p[0] = 11.1
 //p[1] = 22.2
 //print(p.x) // 11.1
 //print(p.y) // 22.2
 //print(p[0]) // 11.1
 //print(p[1]) // 22.2

 //struct Point {
 //    var x = 0.0, y = 0.0
 //    @discardableResult mutating func moveX(deltaX: Double) -> Double {
 //        x += deltaX
 //        return x
 //    }
 //}
 //var p = Point()
 //p.moveX(deltaX: 10)

 //struct Point {
 //    var x = 0.0, y = 0.0
 //    mutating func moveBy(deltaX: Double, deltaY: Double) {
 //        x += deltaX
 //        y += deltaY
 //    }
 //}

 //class Car {
 //    static var cout = 0
 //    init() {
 //        Car.cout += 1
 //    }
 //
 //    static func getCount() -> Int {
 //        self.cout
 //    }
 //}
 //
 //
 //print(Car.getCount()) // 3

 func testStatic() {
     let num1 = 10

     class Car {
         static var count = 0
     }
     Car.count = 11

     let num3 = 12
 }

 func testClosure5() {
     func getNumber() -> Int {
         let a = 10
         let b = 11
         print("getNumber")
         return a + b
     }

     func getFirstPositive1(_ v1: Int, _ v2: () -> Int) -> Int {
         print("getFirstPositive1")
         return v1 > 0 ? v1 : v2()
     }

     // 如果第1个数大于0，返回第一个数。否则返回第2个数
     func getFirstPositive2(_ v1: Int, _ v2: @autoclosure () -> Int) -> Int {
         print("getFirstPositive2")
         return v1 > 0 ? v1 : v2()
     }

     getFirstPositive2(10, 20)
 }

 func testClosure4() {
     var functions: [() -> Int] = []
     for i in 1...3 {
         functions.append { i }
         //    func myFunc() -> Int {
         //        return i
         //    }
         //    functions.append(myFunc)
     }
     for f in functions {
         print(f())
     }
 }

 func testClosure3() {
     typealias Fn = (Int) -> (Int, Int)

     func getFns() -> (Fn, Fn) {
         var num1 = 0 // alloc
         var num2 = 0 // alloc
         func plus(_ i: Int) -> (Int, Int) {
             num1 += i
             num2 += i << 1
             return (num1, num2)
         }
         func minus(_ i: Int) -> (Int, Int) {
             num1 -= i
             num2 -= i << 1
             return (num1, num2)
         }
         return (plus, minus)
     }

     let (p, m) = getFns()
     p(6) // (6, 12)
     m(5) // (1, 2)
     p(4) // (5, 10)
     m(3) // (2, 4)
 }

 func testClosure2() {
     class Person {
         var age: Int = 10
     }

     typealias Fn = (Int) -> Int

     func getFn() -> Fn {
         // 局部变量
         var person1 = Person()
         var person2 = Person()

         func plus(_ i: Int) -> Int {
             person1.age += i
             person2.age += i
             return person1.age + person2.age
         }

         return plus
     } // 返回的plus和num形成了闭包

     var fn1 = getFn()
     print(fn1(1)) // 1
     print(fn1(3)) // 4

     var fn2 = getFn()
     print(fn2(2)) // 2
     print(fn2(4)) // 6
 }

 func testClosure() {
     var fn: (Int, Int) -> Int = { $0 + $1 }
     func exec(fn: (Int, Int) -> Int) {
         print(fn(1, 2))
     }
     exec { $0 + $1 }
 }

 func testSort() {
     var arr = [10, 1, 4, 20, 99]
     // arr.sort()

     print(arr)
 }

 func show1() {
     print("show1")
 }

 func testMemory() {
     class Point {
         var x = 11
         var y = 22
         func show() {
             var a = 10
             print("局部变量（栈空间）", Mems.ptr(ofVal: &a))
             print(x, y)
         }
     }
 }

 //var p = Point()
 //p.show()
 //show1()
 //
 //var p1 = Point()
 //p1.show()
 //var p2 = Point()
 //p2.show()
 //
 //print("全局变量", Mems.ptr(ofVal: &p))
 //print("堆空间", Mems.ptr(ofRef: p))

 /*
  Point.show 0x100002320
  show1      0x100001e70

  全局变量    0x10000bad0

  堆空间      0x102908550

  局部变量（栈空间） 0x00007ffeefbff408
  */

 func testInstanceSize() {
     class Point {
         // 16
         var x = 11 // 8
         var test = true // 1
         var y = 22 // 8
     } // 33 40 48
     let p = Point() // malloc
     print(class_getInstanceSize(type(of: p)))
     print(class_getInstanceSize(Point.self)) // [Point class]  [p class]
     print(Mems.size(ofRef: p))
 }

 func testParams(_ a1: Int, _ a2: Int, _ a3: Int,
                 _ a4: Int, _ a5: Int, _ a6: Int,
                 _ a7: Int, _ a8: Int, _ a9: Int) {

 }
 // testParams(1, 2, 3, 4, 5, 6, 7, 8, 9)

 func testReferenceType() {
     class Size {
         var width: Int
         var height: Int
         init(width: Int, height: Int) {
             self.width = width
             self.height = height
         }
     }

     let s1 = Size(width: 10, height: 20)
     let s2 = s1
     s2.width = 11
     s2.height = 22
 }

 func testValueType() {
     struct Point {
         var x: Int
         var y: Int
     }
     let p1 = Point(x: 10, y: 20)
     var p2 = p1
     p2.x = 11
     p2.y = 22
     print("123")
 }

 func testClassAndStruct() {
     class Size {
         var width = 1
         var height = 2
     }

     struct Point {
         var x = 3
         var y = 4
     }

     // var ptr = malloc(17)
     // print(malloc_size(ptr))

     /*
      print("MemoryLayout<Size>.stride", MemoryLayout<Size>.stride)
      print("MemoryLayout<Point>.stride", MemoryLayout<Point>.stride)

      print("------------------------")

      var size = Size()

      print(Mems.size(ofRef: size))

      print("size变量的地址", Mems.ptr(ofVal: &size))
      print("size变量的内存", Mems.memStr(ofVal: &size))

      print("size所指向内存的地址", Mems.ptr(ofRef: size))
      print("size所指向内存的内容", Mems.memStr(ofRef: size))

      print("------------------------")

      var point = Point()
      print("point变量的地址", Mems.ptr(ofVal: &point))
      print("point变量的内存", Mems.memStr(ofVal: &point))
      */
 }

 func testClass() {
     class Point {
         var x = 10
         var y = 20
         var b = true

         func test() {

         }
     }
     let p = Point()
     p.test()
 }

 func testStruct() {
     struct Point {
         var x = 10
         var y = 20
         var b = true

         func test() {

         }
     }
     var p = Point(x: 11, y: 22, b: false)
     p = Point(x: 22)
     p.test()
     print(Mems.memStr(ofVal: &p))

     //    print(MemoryLayout<Point>.size)
     //    print(MemoryLayout<Point>.stride)
     //    print(MemoryLayout<Point>.alignment)
 }

 func testEnum2() {
     enum TestEnum {
         case test1(Int, Int, Int)
         case test2(Int, Int)
         case test3(Int)
         case test4(Bool)
         case test5
     }

     var e = TestEnum.test1(10, 20, 30)
     print(Mems.ptr(ofVal: &e))
     switch e {
     case let .test1(v1, v2, v3):
         print("test1", v1, v2, v3)

     case let .test2(v1, v2):
         print("test2", v1, v2)

     case let .test3(v1):
         print("test3", v1)

     case let .test4(v1):
         print("test4", v1)

     case .test5:
         print("test5")
     }
 }

 func testEnum() {
     enum TestEnum {
         case test1(Int, Int, Int)
         case test2(Int, Int)
         case test3(Int)
         case test4(Bool)
         case test5
     }

     // 1个字节存储成员值
     // N个字节存储关联值（N取占用内存最大的关联值），任何一个case的关联值都共用这N个字节
     // 共用体

     // 小端：高高低低
     // 01 00 00 00 00 00 00 00
     // 02 00 00 00 00 00 00 00
     // 03 00 00 00 00 00 00 00
     // 00
     // 00 00 00 00 00 00 00
     var e = TestEnum.test1(1, 2, 3)
     print(Mems.ptr(ofVal: &e))

     // 04 00 00 00 00 00 00 00
     // 05 00 00 00 00 00 00 00
     // 00 00 00 00 00 00 00 00
     // 01
     // 00 00 00 00 00 00 00
     e = .test2(4, 5)
     print(Mems.memStr(ofVal: &e))

     // 06 00 00 00 00 00 00 00
     // 00 00 00 00 00 00 00 00
     // 00 00 00 00 00 00 00 00
     // 02
     // 00 00 00 00 00 00 00
     e = .test3(6)

     // 01 00 00 00 00 00 00 00
     // 00 00 00 00 00 00 00 00
     // 00 00 00 00 00 00 00 00
     // 03
     // 00 00 00 00 00 00 00
     e = .test4(true)

     // 00 00 00 00 00 00 00 00
     // 00 00 00 00 00 00 00 00
     // 00 00 00 00 00 00 00 00
     // 04
     // 00 00 00 00 00 00 00
     e = .test5
 }

 func testInout() {
     var numbers = [10, 20, 30]
     numbers[0] = 20
     numbers[0] = 30

     func test(_ num: inout Int) {

     }

     test(&numbers[0])
 }

 /*
  var number = 10

  func test(_ num: Int) {

  }

  test(number)

  0x100000f5e <+78>: movq   -0x30(%rbp), %rdi
  0x100000f62 <+82>: callq  0x100000f70               ; TestSwift.test(Swift.Int) -> () at main.swift:24

  var number = 10

  func test(_ num: inout Int) {

  }

  test(&number)

  0x100000f47 <+55>: leaq   0x10ca(%rip), %rdi        ; TestSwift.number : Swift.Int
  0x100000f4e <+62>: callq  0x100000f70               ; TestSwift.test(inout Swift.Int) -> () at main.swift:24
  */
 */
