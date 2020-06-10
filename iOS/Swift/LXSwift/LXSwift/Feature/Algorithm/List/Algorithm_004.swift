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
        
//        print("\(RomaNumChangeToAlaboNum(romaNum: "asdfadfs"))")
        
        print("\(romanToInt("DCXV"))")
    }
    
    deinit {
        Log("")
    }
    
    /// 将罗马数字转换为阿拉伯数字
    /// - Returns: 返回值 -1 失败
    func RomaNumChangeToAlaboNum(romaNum:String) -> Int {
        /**
         I  1
         V  5
         X 10
         L 50
         C 100
         D 500
         M 1000
         */
        let array = Array(romaNum)
        
        for item in romaNum {
            
            if item == "M" {
                
            }
            
            //
            print(item)
            
        }
        
        
        return -1;
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
