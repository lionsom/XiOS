//
//  SecondViewController.swift
//  LX_Swift001_AddNum
//
//  Created by 启业云03 on 2020/5/27.
//  Copyright © 2020 AY. All rights reserved.
//

import UIKit

class SecondViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    
        // func test
    
        print(greet(person: "lin"))
        
        if let bounds = minMax(array: []) {
            print("min is \(bounds.min) and max is \(bounds.max)")
        }
        
        print(greeting(for: "Dave"))
        // 打印 "Hello, Dave!"
        
        print(greet(person: "1", from: "2", "的撒发"))
        
        print(greet(person: "1", from: "3", "dsaf", currentTime: 125455))
        
        
        
        arithmeticMean(1, 2, 3, 4, 5)
        // 返回 3.0, 是这 5 个数的平均数。
        arithmeticMean(3, 8.25, 18.75)
        // 返回 10.0, 是这 3 个数的平均数。
       
        
        print("adsfadsf", separator: "11", terminator: "22")
        
        let possibleNumber = "123"
        let convertedNumber = Int(possibleNumber)
        
        if convertedNumber != nil {
            print("convertedNumber has an integer value of \(convertedNumber!).")
        }
        
        
        // let A = -3
        // assert(A > 0, "ASDFD")
        
        let threeMoreDoubleQuotationMarks = #"""
        Here are three \n more double quotes: """
        """#
        print(threeMoreDoubleQuotationMarks)
        
        
        print("DD")
    }


    func greet(person: String) -> String {
        let greeting = "Hello," + person + "!"
        return greeting
    }
    
    func minMax(array: [Int]) -> (min: Int, max: Int)? {
        if array.isEmpty {
            return nil
        }
        var currentMin = array[0]
        var currentMax = array[0]
        for value in array[1..<array.count] {
            if value < currentMin {
                currentMin = value
            } else if value > currentMax {
                currentMax = value
            }
        }
        return (currentMin, currentMax)
    }
    
    func greeting(for person: String) -> String {
        "Hello, " + person + "!"
    }
    
    
    /// 方法标签
    /// - Parameters:
    ///   - person: 默认情况下：函数参数使用参数名称来作为它们的参数标签
    ///   - hometown: 指定参数标签
    ///   - message: 忽略参数标签
    ///   - time: 默认参数值
    /// - Returns: 返回值
    func greet(person: String, from hometown: String, _ message: String, currentTime time: Int = 123) -> String {
        return "Hello \(person)!  Glad you could visit from \(hometown). message \(message) at \(time)"
    }
 
    
    func arithmeticMean(_ numbers: Double...) -> Double  {
        var total: Double = 0
        for number in numbers {
            total += number
        }
        return total / Double(numbers.count)
    }
    
    
    
}

