//
//  String+ClassFromString.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/19.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

extension String {
    
    /// 实例方法
    /// - Parameter stringName: 字符串
    /// - Returns: 类
    func stringChangeToVC() -> UIViewController?{
        //Swift中命名空间的概念
        var vc = UIViewController()
        if let nameSpage = Bundle.main.infoDictionary!["CFBundleExecutable"] as? String {
            if let childVcClass = NSClassFromString(nameSpage + "." + self) {
                if let childVcType = childVcClass as? UIViewController.Type {
                    //根据类型创建对应的对象
                    vc = childVcType.init() as UIViewController
                    return vc
                }
            }
        }
        return nil
    }
    
}


