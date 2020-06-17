//
//  ThirdResult.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/17.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class ThirdResult: Codable {
    var ID: Int
    var result: Bool
    var code: Int?
    var message: String?
    var datas: [MResult]
    var config: MConfig?
    
    enum CodingKeys: String, CodingKey {
        case ID = "id"
        case result
        case code
        case message
        case datas
        case config
    }
    
    class MResult: Codable {
        var title: String?
        var avatar: String?
        var detail: String?
        var index: Int?
    }

    class MConfig: Codable {
        var title: String?
        var color: MColor?    // 枚举类型
    }
    
    enum MColor: String, Codable {
        case red, green, blue
    }
}
