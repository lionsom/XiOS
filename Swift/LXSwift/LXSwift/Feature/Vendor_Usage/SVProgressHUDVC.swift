//
//  SVProgressHUDVC.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/10.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

// 头文件导入
import SVProgressHUD.SVProgressHUD

class SVProgressHUDVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        
//        SVProgressHUD.lx_showSuccess("自定义Success")
        
        SVProgressHUD.lx_showError("自定义Error")
        
        SVProgressHUD.lx_showInfo("自定义Info")
    }
}
