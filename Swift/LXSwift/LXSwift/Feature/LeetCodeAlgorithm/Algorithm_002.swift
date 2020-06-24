//
//  Algorithm_002.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/8.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Algorithm_002: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.randomColor()
        self.title = "数字反转";
        
        print("反转 == \(reverseInt(enter: 10234567)))")
        print("反转 == \(reverseInt(enter: 1023456789)))")
        print("反转 == \(reverseInt(enter: 1023456700)))")
        print("反转 == \(reverseInt(enter: -10234567)))")
        print("反转 == \(reverseInt(enter: -1023456789)))")
        print("反转 == \(reverseInt(enter: -1023456700)))")
        
        let reverseStr = String(String("123456000").reversed())
        let a = Int(reverseStr)
    }
    
    /// 反转数字
    /// 注意：由于限制为32位，反转可能导致越界，顾输出字符串
    /// - Returns: 结果
    func reverseInt(enter: Int32) -> String {
        // int -> string
        let intStr = String(enter)
        // string -> array
        var intArr = Array(intStr)

        // 判断第一位是否符号位
        var symbol = "";
        if "-" == intArr.first {
            symbol = "-"
            intArr .remove(at: 0)
        }

        // 遍历移除末尾的0
        // reversed 逆序遍历
        var isFirstZero = true
        var newArr = [Character]();
        for value in intArr.reversed() {
            // 移除前面的连续0
            if isFirstZero {
                if value == "0" {
                    continue
                }
                else {
                    isFirstZero = false
                }
            }
            newArr.append(value)
        }

        // 插入符号
        newArr.insert(contentsOf: symbol, at: 0)
        // array -> string
        let dataStr = newArr.map(String.init)
        let result = dataStr.joined(separator: "")

        // 越界
        let reusltInt = Int32(result);
        if reusltInt == nil {
            return "-1";
        }
        return result;
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
