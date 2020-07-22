//
//  StringVC.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/13.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class StringVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.white
        self.title = "String";
        
//        // 1. String初始化
//        method_init()
//        // 2. 使用字符
//        method_Character()
//        // 3. 连接字符和字符串
//        method_Append()
//        // 4. 访问和修改字符串
//        method_Revise()
//        // 5. 字符串插入 删除
//        method_InsertDelete()
//        // 6. 比较字符串, Swift 提供了三种方式来比较文本值：字符串字符相等、前缀相等和后缀相等。
//        method_Compare()
        // 7. 子字符串
        method_Substring()
    }
    
    deinit {
        Log("")
    }
    
    // MARK: - ========== String初始化 ==========
    fileprivate func method_init() {
        // 1.初始化器语法
        _ = String()
        // 2.字面量
        _ = "abc"
        // 3.多行字面量
        _ = """
        ajsjkljlkasdfj
                jkadadssdfjkladfskl
            lkjkladfsjkladfsklaf
        end
        """
        // 4.特殊字符
        _ = "\u{2665}"          ///< ♥，Unicode 标量 U+2665
        _ = "\u{1F496}"         ///< 💖，Unicode 标量 U+1F496
        // 5.扩展字符串分隔符
        _ = #"Line 1 \nLine 2"#     ///< 打印转义字符，而不会换行
        _ = #"Line 1 \#nLine 2"#    ///< 进行换行
        // 6.判空
        let str = ""
        if str.isEmpty {
            
        }
    }

    // MARK: - ========== 使用字符 ==========
    fileprivate func method_Character() {
        // 1.遍历String，输出Character
        for character in "Dog!🐶" {
            print(character)
        }
        // 2.Character初始化
        let _: Character = "!"
        // 3.字符数组转String
        let catChars: [Character] = ["C", "a", "t", "!"]
        _ = String(catChars)
        // 4.计算字符数量
        let unusualMenagerie = "Koala 🐨, Snail 🐌, Penguin 🐧, Dromedary 🐪"
        print("unusualMenagerie has \(unusualMenagerie.count) characters")
        /// 打印输出“unusualMenagerie has 40 characters”
        
        //【注意】：使用可拓展的字符群集作为 Character 值来连接或改变字符串时，并不一定会更改字符串的字符数量。
        var word = "cafe"
        print("the number of characters in \(word) is \(word.count)")
        /// 打印输出“the number of characters in cafe is 4”

        // 拼接一个重音Unicode
        word += "\u{301}"
        print("the number of characters in \(word) is \(word.count)")
        /// 打印输出“the number of characters in café is 4”
    }
    
    // MARK: - ========== 连接字符和字符串 ==========
    fileprivate func method_Append() {
        // 1. +
        let string1 = "hello"
        let string2 = " there"
        var welcome = string1 + string2
        
        // 2. +=
        var instruction = "look over"
        instruction += string2
        
        // 3. append()
        let exclamationMark: Character = "!"
        welcome.append(exclamationMark)
        
        // 4. 多行字面量拼接
        let badStart = """
        one
        two
        """
        let end = """
        three
        """
        print(badStart + end)
        /// 打印两行:
        /// one
        /// twothree
        
        let goodStart = """
        one
        two

        """
        print(goodStart + end)
        /// 打印三行:
        /// one
        /// two
        /// three
    }
    
    // MARK: - ========== 访问和修改字符串 ==========
    fileprivate func method_Revise() {
        let greeting = "Guten Tag!"
        // 1. 获取第一个字符
        let startIdx = greeting.startIndex
        _ = greeting[startIdx]
        
        // 2. 获取第二个字符
        let secIdx = greeting.index(after: greeting.startIndex)
        _ = greeting[secIdx]
        
        // 3. 获取最后一个字符
        var endIdx = greeting.endIndex
        _ = greeting[endIdx]    // ERROR 越界了
        endIdx = greeting.index(before: endIdx)
        _ = greeting[endIdx]    // SUCCESS
        
        // 4. 获取中间某个字符
        let index = greeting.index(greeting.startIndex, offsetBy: 7)
        _ = greeting[index]   ///< a
        
        // 5. Range, 使用 indices 属性会创建一个包含全部索引的范围（Range）
        for index in greeting.indices {
           print("\(greeting[index]) ", terminator: "")
        }
        /// 打印输出“G u t e n   T a g ! ”
    }
    
    // MARK: - ========== 字符串插入 删除 ==========
    fileprivate func method_InsertDelete() {
        // 1. 插值
        let multiplier = 3
        _ = "\(multiplier) times 2.5 is \(Double(multiplier) * 2.5)"
        /// message 是 "3 times 2.5 is 7.5"
        
        // 2. 插入
        // 调用 insert(_:at:) 方法可以在一个字符串的指定索引插入一个字符；
        // 调用 insert(contentsOf:at:) 方法可以在一个字符串的指定索引插入一个段字符串。
        var welcome = "hello"
        welcome.insert("!", at: welcome.endIndex)
        /// welcome 变量现在等于 "hello!"

        welcome.insert(contentsOf:" there", at: welcome.index(before: welcome.endIndex))
        /// welcome 变量现在等于 "hello there!"
        
        // 3. 删除
        // 调用 remove(at:) 方法可以在一个字符串的指定索引删除一个字符；
        // 调用 removeSubrange(_:) 方法可以在一个字符串的指定索引删除一个子字符串。
        welcome.remove(at: welcome.index(before: welcome.endIndex))
        /// welcome 现在等于 "hello there"

        let range = welcome.index(welcome.endIndex, offsetBy: -6)..<welcome.endIndex
        welcome.removeSubrange(range)
        /// welcome 现在等于 "hello"
    }

    // MARK: - ========== 比较字符串 ==========
    // Swift 提供了三种方式来比较文本值：字符串字符相等、前缀相等和后缀相等。
    fileprivate func method_Compare() {
        // 1. ==
        let quotation = "We're a lot alike, you and I."
        let sameQuotation = "We're a lot alike, you and I."
        if quotation == sameQuotation {
            print("These two strings are considered equal")
        }
        
        // 2. 前缀相等
        let str = "ABCDEF"
        if str.hasPrefix("A") {
        }
        
        // 3. 后缀相等
        if str.hasSuffix("A") {
        }
    }
    
    // MARK: - ========== 子字符串 ==========
    fileprivate func method_Substring() {
        let greeting = "Hello, world!"
        let index = greeting.firstIndex(of: ",") ?? greeting.endIndex
        let beginning = greeting[..<index]
        /// beginning 的值为 "Hello"

        // beginning类型为Substring
        let t = type(of: beginning)
        
        // 把结果转化为 String 以便长期存储。
        let newString = String(beginning)
    }
}
