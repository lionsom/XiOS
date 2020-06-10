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
        
        SVProgressHUD.show(withStatus: "啊水电费");
        
        DispatchQueue.main.asyncAfter(deadline: .now()+3) {
            SVProgressHUD.dismiss()
        }
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
