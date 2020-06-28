//
//  Algorithm_006.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/24.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Algorithm_006: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.randomColor()
        self.title = "有效的括号";
        
        // 包括 () [] {}
        let str = "([{()}])[({[]})][([)]]"
//        Log("\(str) 是否为有效括号？结果：\(isValid(str))")
        
        Log("\(str) 是否为有效括号？结果：\(method_A(str))")
    }
    
    /*
     执行用时：976 ms,在所有Swift提交中击败了 5.16% 的用户
     内存消耗：21.7 MB, 在所有 Swift 提交中击败了33.33%的用户
     */
    func method_A(_ str: String) -> Bool {
          // 对其进行特殊情况判断
          // 1.第一位为右侧符号，直接判假；最后一位为左侧符号，直接判假
          // 2.字符串个数为奇数，直接判假
          if str.count % 2 != 0 ||
              str.first == ")" || str.first == "]" ||  str.first == "}" ||
              str.last == "(" || str.last == "[" || str.last == "{" {
              return false
          }
          
          var S = str
          while true {
              let temp = S
              
              S = S.replacingOccurrences(of: "()", with: "")
              S = S.replacingOccurrences(of: "[]", with: "")
              S = S.replacingOccurrences(of: "{}", with: "")
              
              if temp == S {
                  break
              }
          }
          if S.count == 0 {
              return true
          }
          return false
      }
    
    
    fileprivate var charDic: [Character: Character] = ["(":")", "[":"]", "{":"}"]
    
    fileprivate func isValid(_ s: String) -> Bool {
        // 空字符串为真
        if s.isEmpty {
            return true
        }
        
        func Recursion(_ str: String) -> Bool {
            // 对其进行特殊情况判断
            // 1.第一位为右侧符号，直接判假
            // 2.字符串个数为奇数，直接判假
            if str.count/2 == 1 || str.first == charDic["("] || str.first == charDic["["] ||  str.first == charDic["{"] {
                return false
            }
            
            // 根据左侧第一个符号，找到对应的右侧符号
            if str.first == "(" {
                var tempIndex = 0
                for (index, subChar) in str.enumerated() {
                    if subChar == ")" {
                        tempIndex = index
                        break
                    }
                }
                
            }
            return false
        }
        // 直接递归
//        return Recursion(s)
        
        // 判断字符串是否对称
        func isSymmetric(_ str: String) -> Bool {
            let revStr = String(str.reversed())
            if str == revStr {
                return true
            }
            return false
        }
        
        isSymmetric("assaa")
        
        return false
    }
    
    
  
    
}
