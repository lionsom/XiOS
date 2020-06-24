//
//  Father.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/24.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Father: NSObject {
    
    var name: String = ""
    var age: Int = 0
    var sex: String = "man"
    
    // 构造器
    init(name: String, age: Int, sex: String) {
        self.name = name
        self.age = age
        self.sex = sex
    }
    
    func run() {
        Log("Father run")
    }
    
    func eat() {
        Log("Father eat")
    }
    
    // 析构函数
    deinit {
        Log("Father deinit")
    }
}
