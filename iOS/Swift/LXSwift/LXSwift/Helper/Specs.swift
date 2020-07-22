//
//  Specs.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/13.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

public struct Specs {
    
    struct Color {
        let red = UIColor.red
        let green = UIColor.green
        let gray = UIColor.lightGray
    }
    
    struct FontSize {
        let tiny: CGFloat = 10
        let small: CGFloat = 12
        let regular: CGFloat = 14
        let large: CGFloat = 16
    }
    
    struct Font {
        private static let regularName = "Helvetica Neue"
        private static let boldName = "Helvetica Neue Bold"
        
        let small: UIFont! = UIFont(name: regularName, size: Specs.fontSize.small)
        let smallBold = UIFont(name: boldName, size: Specs.fontSize.small)
        
        let regular = UIFont(name: regularName, size: Specs.fontSize.regular)
        let regularBold = UIFont(name: boldName, size: Specs.fontSize.regular)
     
        let large = UIFont(name: regularName, size: Specs.fontSize.large)
        let largeBold = UIFont(name: boldName, size: Specs.fontSize.large)
    }
    
    
    static var color: Color {
        return Color()
    }
    
    static var fontSize: FontSize {
        return FontSize()
    }
    
    static var font: Font {
        return Font()
    }
}


