//
//  FirstViewController.swift
//  LX_Swift001_AddNum
//
//  Created by 启业云03 on 2020/5/27.
//  Copyright © 2020 AY. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        print("hello world!")
        
        // let 声明常量
        let myA = 20
        // myA = 30      error
         
        // var 声明变量
        var myB = 44
        myB = 33
        print(myA, myB)
        
        let implicitInteger = 70
        let implicitDouble = 70.0
        let implicitDouble1:Double = 70   // 如果初始值没有提供足够的信息（或者没有初始值），那你需要在变量后面声明类型，用冒号分割。
        print(implicitInteger, implicitDouble, implicitDouble1)
        
        let myFloat: Float = 4;
        print(myFloat)
        
        
        // 把一个值转换成其他类型，请显式转换。
        let label = "The test is";
        let width = 94;
        let widthLabel = label + String(width);  // 强制转换
        print(widthLabel)
        
        // 有一种更简单的把值转换成字符串的方法：把值写到括号中，并且在括号之前写一个反斜杠（\）。
        let apples = 3
        let oranges = 5
        let appleSummary = "I have \(apples) apples."
        let fruitSummary = "I have \(apples + oranges) pieces of fruit."
        print(appleSummary, fruitSummary)
        

        let showmyFlost = "i am \(myFloat) years old!!";
        print(showmyFlost)
        
        
        let quotation = """
        I said "I have \(apples) apples."
        And then I said "I have \(apples + oranges) pieces of fruit."
        """
        print(quotation)
        
        // 数组 && 字典
        // 初始化
        let emptyArray = [String]()
        let emptyDictionary = [String: Float]()
        
        var shoppingList = ["catfish", "water", "tulips", "blue paint",]
        shoppingList[1] = "bottle of water"
        shoppingList.append("bububu")   // 数组在添加元素时会自动变大。
        print(shoppingList)
        
        var accDic = ["AA":"1234",
                      "BB":"2222"]
        accDic["AA"] = "1111"
        print(accDic)
        
        // for
        let individualScores = [10, 12, 15, 50, 100]
        var teamScore = 0
        for score in individualScores {
            if score > 50 {
                teamScore += 1
            }
            else {
                teamScore += 3
            }
        }
        print(teamScore)
        
        // 在 if 语句中，条件必须是一个布尔表达式——这意味着像 if score { ... } 这样的代码将报错，而不会隐形地与 0 做对比。
        /* 错误
        if "10" {
            
        }
         */
        
        
        
        let numsArr = [1,2,3,4,5,6,7,8,9,10];
        let target = 10;
        for (index, value) in numsArr.enumerated() {
            for (index1, value1) in numsArr.enumerated() {
                if index < index1 {
                    if value+value1 == target {
                        print("index =", index, index1)
                    }
                }
            }
        }
        
        

        
        var someInts = [Int]();
        print("someInts is of type [Int] with \(someInts.count) items.")

        
        testArray();
        
        
        let greetStr = greetAgain(person: "Lionsom")
        print(greetStr + "\n" + greetAgain(person: "Anna"))
    

        ReverseInt32.init();
        
    }
    
    func testArray() -> Void {
        
        print("AAA")
        
        var AAA = Array(repeating: 1, count: 3);
        
        var BBB = [Int](repeating: 1, count: 3);
        
        var threeDoubles = Array(repeating: 0.0, count: 3)
        // threeDoubles 是一种 [Double] 数组，等价于 [0.0, 0.0, 0.0]
        var anotherThreeDoubles = Array(repeating: 2.5, count: 3)

        
        var bothDoubles = threeDoubles + anotherThreeDoubles;
        
        
        
        
        var shoppingList = ["Eggs", "Milk1", "Milk2", "Milk3", "Milk4", "Milk5"];
        shoppingList[3...5] = ["Bananas", "Apples"]
        
        
        shoppingList.insert("newInsert", at: 1)
        
        shoppingList.remove(at: 1);
        
        shoppingList.removeFirst()
        shoppingList.removeLast();
        
        shoppingList.append("DDDD")
        
        shoppingList += ["123"]
        
        for item in shoppingList {
            print(item);
        }
        
        for (index, value) in shoppingList.enumerated() {
            print(index, value);
        }
        
        
        print("BB");
    }
    
    func greetAgain(person: String) -> String {
        return "Hello again, " + person + "!"
    }
    
    
  
    
}

