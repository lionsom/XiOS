//
//  Algorithm_004.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/9.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Algorithm_004: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.randomColor()
        self.title = "罗马数字转阿拉伯数字";
        

        print("\(RomaToInt(romaNum: "XLVIII"))")   // 48
        print("\(RomaToInt(romaNum: "XLIX"))")     // 49
        print("\(RomaToInt(romaNum: "XCIX"))")     // 99
        print("\(RomaToInt(romaNum: "CDLXXXIX"))") // 489
        print("\(RomaToInt(romaNum: "MCMXLIII"))") // 1943
        print("\(RomaToInt(romaNum: "MCMXLIX"))")  // 1949
    }
    
    deinit {
        Log("")
    }
    
    /// 将罗马数字转换为阿拉伯数字
    /// 罗马数字对照表：https://wywu.pixnet.net/blog/post/23023232
    /// - Returns: 返回值 -1 失败
    func RomaToInt(romaNum:String) -> Int {
        /**
         I  1
         V  5
         X 10
         L 50
         C 100
         D 500
         M 1000
         */
        var Num = romaNum
        var result = 0;
        
        if Num.contains("IV") {
            result += 4
            Num = Num.replacingOccurrences(of: "IV", with: "")
        }
        if Num.contains("IX") {
            result += 9
            Num = Num.replacingOccurrences(of: "IX", with: "")
        }
        if Num.contains("XL") {
            result += 40
            Num = Num.replacingOccurrences(of: "XL", with: "")
        }
        if Num.contains("XC") {
            result += 90
            Num = Num.replacingOccurrences(of: "XC", with: "")
        }
        if Num.contains("CD") {
            result += 400
            Num = Num.replacingOccurrences(of: "CD", with: "")
        }
        if Num.contains("CM") {
            result += 900
            Num = Num.replacingOccurrences(of: "CM", with: "")
        }
        
        
        for item in Num {
            switch item {
            case "M":
                result += 1000
            case "D":
                result += 500
            case "C":
                result += 100
            case "L":
                result += 50
            case "X":
                result += 10
            case "V":
                result += 5
            case "I":
                result += 1
            default:
                break
            }
        }
        return result
    }
    
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
