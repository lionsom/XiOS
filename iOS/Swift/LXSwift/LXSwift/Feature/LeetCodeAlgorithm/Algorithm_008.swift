//
//  Algorithm_008.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/7/27.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Algorithm_008: UIViewController {
    
    override func viewDidLoad() {
        self.view.backgroundColor = UIColor.randomColor()
        self.title = "第一个错误的版本";
        
        Log("第一个错误的版本 = \(isFirstBadVersion(100))")
    }
    
    
    func isFirstBadVersion(_ n: Int) -> Int {
        var left = 0
        var right = n
        while left < right {
            let mid = left + (right - left) / 2
            if isBadVersion(mid) {
                right = mid
            }
            else {
                left = mid + 1
            }
        }
        return left
    }
    
    // 模拟66号有问题，即66及以后数都是错的
    func isBadVersion(_ v: Int) -> Bool {
        if v >= 66 {
            return true
        }
        return false
    }
}
