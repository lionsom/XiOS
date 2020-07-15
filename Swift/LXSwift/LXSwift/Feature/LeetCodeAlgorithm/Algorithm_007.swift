//
//  Algorithm_007.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/7/15.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Algorithm_007: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.randomColor()
        self.title = "删除排序数组中的重复项";
        
        
        var Arr = [1,1,2,2,3,3,3,4,4,4,4,5,6,7]
        let len = removeDuplicates(&Arr)
        Log("新数组长度：\(len), 新数组为：\(Arr)")
    }
    
    // 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
    func removeDuplicates(_ nums: inout [Int]) -> Int {
        // 数组判断
        if nums.count == 1 {
            return 1
        }
        
        var i = 0
        var j = 1
        while j < nums.count {
            if nums[i] != nums[j] {
                i += 1
                nums[i] = nums[j]
            }
            j += 1
        }
        return i+1
    }

}
