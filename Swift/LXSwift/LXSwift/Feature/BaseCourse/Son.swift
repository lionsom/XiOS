//
//  Son.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/24.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Son: Father {
    // 存储属性
    var school: String = ""
    
    // 构造器
    init(name: String, school: String) {
        super.init(name: name, age: 0, sex: "")
    
        self.school = school
    }
    
    override func run() {
        Log("Son run")
    }
    
    override func eat() {
        Log("Son eat")
    }
    
    // 析构函数
    deinit {
        Log("Son deinit")
    }
    
    // MARK: - ========== Set & Get ==========
    // 计算属性
    var study: String {
        get {
            return school
        }
        set {
            school = newValue + "学校"
        }
    }
    
    
}
