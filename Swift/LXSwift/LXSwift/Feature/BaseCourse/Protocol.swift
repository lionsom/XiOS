//
//  Protocol.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/24.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

/* 协议
 类、枚举和结构体都可以遵循协议。
 */
protocol myProtocol {
    var desc: String {
        get
    }
    
    mutating func adjust()
}

// 类继承协议
class MyProtocolClass: myProtocol {
    var desc: String
    var anotherProperty: Int = 69105
    
    init(desc: String) {
        self.desc = desc
    }
    
    func adjust() {
        
    }
}

// 结构体继承协议
struct MyProtocolStruct: myProtocol {
    var desc: String
    
    mutating func adjust() {
        
    }
    
    
}

// 枚举继承协议
//enum MyProtocolEnum: myProtocol {
//    var desc: String = ""
//
//    mutating func adjust() {
//
//    }
//}

extension Int: myProtocol {
    var desc: String {
        return "The number \(self)"
    }
    
    mutating func adjust() {
        self += 42
    }
}
