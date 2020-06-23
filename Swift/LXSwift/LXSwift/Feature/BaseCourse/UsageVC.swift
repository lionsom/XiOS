//
//  UsageVC.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/22.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class UsageVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.white
        self.title = "常用的方法举例";
        
        
        
    }
    
    // MARK: - ========== UserDefaults ==========
    func UserDefaults_Usage() {
        // set
        let isLogin = UserDefaults.standard.bool(forKey: "ATT")
        // get
        UserDefaults.standard.set(true, forKey: "ATT")
    }
    
    

}
