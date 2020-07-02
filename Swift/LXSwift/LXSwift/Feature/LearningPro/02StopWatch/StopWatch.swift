//
//  StopWatch.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/28.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

// Model
class StopWatch: NSObject {
    var counter: Double
    var timer: Timer
    
    override init() {
        counter = 0.0
        timer = Timer()
    }
}
