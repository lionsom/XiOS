//
//  Algorithm_003.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/8.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Algorithm_003: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.randomColor()
        self.title = "判断是否为回文数";
        
        
        Log(isPalindromeNumber(enter: 123321))
    }
    
    /// 判断是否为回文数
    /// - Parameter enter: 输入
    /// - Returns: 输出BOOL
    func isPalindromeNumber(enter:Int) -> Bool {
        // int -> String
        let enterStr = String(enter)
        let reversedStr = String( enterStr.reversed())
        if enterStr == reversedStr {
            return true
        }
        return false
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
