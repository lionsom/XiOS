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
    }
    
    func easyShow() {
        // ShowHUD
        SVProgressHUD.show(withStatus: "啊水电费");
        
        // 延迟执行
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            // DismissHUD
            SVProgressHUD.dismiss()
        }
    }
}
