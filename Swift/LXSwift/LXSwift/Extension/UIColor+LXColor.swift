//
//  UIColor+LXColor.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/8.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit
import Foundation

/* Usage
 // 类方法
 let color = UIColor.randomColor()
 
 // 示例方法
 let A = UIColor(red: 23, green: 126, blue: 255)
 let (r, g, b, a) = A.showRGB()
 Log("\(r),\(g),\(b),\(a)")
 
 // 新增init方法
 let color = UIColor(R: 22, G: 33, B: 44, A: 0.9)
 */

extension UIColor {
    
    /// 扩展类方法，获取随机UIColor
    /// - Returns: UIColor
    class func randomColor() -> UIColor {
        let R = arc4random() % 255
        let G = arc4random() % 255
        let B = arc4random() % 255
        
        let randomColor = UIColor(red:CGFloat(R)/255.0 ,green:CGFloat(G)/255.0, blue:CGFloat(B)/255.0 ,alpha:1.0)
        return randomColor
    }
        
    /// 扩展实例方法，获取UIColor的RGBA
    /// - Returns: (R, G, B, A)
    func showRGB() -> (CGFloat, CGFloat, CGFloat, CGFloat) {
        let cg = self.cgColor
        let numComponents = cg.numberOfComponents
        if (numComponents == 4) {
            let arr:[CGFloat]! = cg.components
            return (arr[0], arr[1], arr[2], arr[3])
        }
        return (-1, -1, -1, -1)
    }
}


extension UIColor {
    /// 通过 convenience 对现有的类增加init方法
    /// - Parameters:
    ///   - red: R
    ///   - green: G
    ///   - blue: B
    convenience init(R: Int, G: Int, B: Int, A: CGFloat = 1.0) {
        let newRed = CGFloat(R)/255
        let newGreen = CGFloat(G)/255
        let newBlue = CGFloat(B)/255
        
        self.init(red: newRed,
                  green: newGreen,
                  blue: newBlue,
                  alpha: A)
    }
    
    /// 新增init十六进制
    /// - Parameter hex: 十六进制
    convenience init(hex: Int) {
      self.init(R: (hex & 0xFF0000) >> 16,
                G: (hex & 0x00FF00) >> 8,
                B: (hex & 0x0000FF),
                A: 1)
    }
}
