//
//  UIColor+LXColor.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/8.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit
import Foundation

extension UIColor {
    
    class func randomColor() -> UIColor {
        let R = arc4random() % 255
        let G = arc4random() % 255
        let B = arc4random() % 255
        
        let randomColor = UIColor(red:CGFloat(R)/255.0 ,green:CGFloat(G)/255.0, blue:CGFloat(B)/255.0 ,alpha:1.0)
        return randomColor
    }
    
}


extension UIColor {
    convenience init(red: Int, green: Int, blue: Int) {
        let newRed = CGFloat(red)/255
        let newGreen = CGFloat(green)/255
        let newBlue = CGFloat(blue)/255
        
        self.init(red: newRed, green: newGreen, blue: newBlue, alpha: 1.0)
    }
}
