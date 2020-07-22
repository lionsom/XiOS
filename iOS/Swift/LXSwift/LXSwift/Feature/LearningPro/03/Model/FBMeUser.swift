//
//  FBMeUser.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/13.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class FBMeUser: NSObject {
    var name: String
    var avatar: String
    var education: String
    
    init(name: String, avatar: String = "default_avatar", education: String) {
        self.name = name
        self.avatar = avatar
        self.education = education
    }
    
}
