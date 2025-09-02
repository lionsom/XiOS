//
//  MyApplication.swift
//  Main
//
//  Created by 启业云03 on 2023/1/5.
//

import Foundation
import UIKit

class MyApplication: UIApplication {
    override func sendEvent(_ event: UIEvent) {
        super.sendEvent(event)

        // 每次发送事件（比如点击按钮）时，我们都可以监听到这个事件了。
        print("MyApplication = \(event)")
    }
}
