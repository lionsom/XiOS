//
//  Algorithm_005.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/19.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Algorithm_005: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.randomColor()
        self.title = "最长公共前缀";
        
        let Arr = ["aasdad", "aasdf", "aaldsdf", "aasdadfs"];
        
        let preStr = longestCommonPrefix(Arr)
        Log("最长公共前缀 :" + preStr)
    }
    
    func longestCommonPrefix(_ strs: [String]) -> String {
        // 1.先找到最短的字符串
        var shortStr: String? = strs.first
        
        if shortStr == nil {
            return ""
        }
        
        for str in strs {
            if str.count < shortStr!.count {
                shortStr = str
            }
        }
        
        // 递归函数
        func Recursion(str: String) -> String {
            // 标记是否跳出for循环
            var isBreak = false
            for tempStr in strs {
                // 遇到一个不匹配的就跳出循环
                if !tempStr.hasPrefix(str) {
                    isBreak = true
                    break
                }
            }
            // 如果被中断了，则移除末尾最后一个字符，再次循环
            if isBreak {
                var newStr: String = str   // let -> var
                newStr.removeLast()
                return Recursion(str: newStr)
            }
            return str
        }
        return Recursion(str: shortStr!)
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
