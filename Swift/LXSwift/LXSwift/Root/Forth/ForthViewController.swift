//
//  ForthViewController.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/13.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

import SVProgressHUD

class ForthViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.backgroundColor = UIColor.white
        self.navigationItem.title = "个人"
        
        
        setUpNavigation()
    }
    
    func setUpNavigation() {
        // 导航栏是否半透明
        navigationController?.navigationBar.isTranslucent = false
        
        // 导航栏右侧按钮 - 退出
        let logoutBarButtonItem = UIBarButtonItem(barButtonSystemItem: .cancel, target: self, action: #selector(logoutBarButtonItemClick(sender:)))
        self.navigationItem.rightBarButtonItems = [logoutBarButtonItem]
    }
    
    // MARK: - ====== Actions ======
    @objc func logoutBarButtonItemClick(sender: UIBarButtonItem) {
        SVProgressHUD.lx_showSuccess("退出成功")
        
        // 设置标识
        UserDefaults.standard.set(false, forKey: Key.UserDefaults.k_ISLogin)
        
        if let window = UIApplication.shared.delegate?.window {
            window?.rootViewController  = LoginVC()
        }
    }
}
