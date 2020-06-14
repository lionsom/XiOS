//
//  ThirdModel.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/14.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class ThirdModel: NSObject {
    
    var title, avatar, detail: String
    
    // initialize
    init(title: String = "default title",
         avatar: String = "default_avatar",
         detail: String = "Something is Missing!") {
        self.title = title
        self.avatar = avatar
        self.detail = detail
    }
    
}
