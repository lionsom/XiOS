//
//  main.swift
//  TestSwift
//
//  Created by MJ Lee on 2019/6/16.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

// func isArray(_ value: Any) -> Bool {
////    value is Array<Any>
//    value is [Any]
// }
//
// print( isArray( [1, 2] ) )
// print( isArray( ["1", 2] ) )
// print( isArray( NSArray() ) )
// print( isArray( NSMutableArray() ) )
// print( isArray( "23123" ) )

protocol ArrayType {}
extension Array: ArrayType {}
extension NSArray: ArrayType {}

// var ttt: ArrayType.Type
// ttt = Array<Int>.self
// ttt = NSArray.self
// ttt = NSMutableArray.self

func isArrayType(_ type: Any.Type) -> Bool {
    type is ArrayType.Type
}

print(isArrayType([Int].self))
print(isArrayType([Double].self))
print(isArrayType([Any].self))
print(isArrayType(NSArray.self))
print(isArrayType(NSMutableArray.self))
print(isArrayType(String.self))

/*
 /// 前缀类型
 struct MJ<Base> {
     var base: Base
     init(_ base: Base) {
         self.base = base
     }
 }

 /// 利用协议扩展前缀属性
 protocol MJCompatible {}
 extension MJCompatible {
     static var mj: MJ<Self>.Type {
         set {}
         get { MJ<Self>.self }
     }
     var mj: MJ<Self> {
         set {}
         get { MJ(self) }
     }
 }

 /// 给字符串扩展功能
 // 让String拥有mj前缀属性
 extension String: MJCompatible {}
 extension NSString: MJCompatible {}

 // 给String.mj、String().mj前缀扩展功能
 extension MJ where Base: ExpressibleByStringLiteral {
     var numberCount: Int {
         var count = 0
         for c in (base as! String) where ("0"..."9").contains(c) {
             count += 1
         }
         return count
     }
 }

 var str1 = "123xxx"
 var str2: NSString = "123xxx"
 var str3: NSMutableString = "123xxx"
 print(str1.mj.numberCount)
 print(str2.mj.numberCount)
 print(str3.mj.numberCount)
 */

// var person = Person()
// person.mj.run()

// "123xxx".mj.numberCount

// extension String {
//    var mj_numberCount: Int {
//        var count = 0
//        for c in self where ("0"..."9").contains(c) {
//            count += 1
//        }
//        return count
//    }
// }

// func numberCount(_ str: String) -> Int {
//    var count = 0
//    for c in str where ("0"..."9").contains(c) {
//        count += 1
//    }
//    return count
// }
//
// print(numberCount(str))
