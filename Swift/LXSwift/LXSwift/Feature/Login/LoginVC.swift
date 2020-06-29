//
//  LoginVC.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/8.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

import SVProgressHUD
import SnapKit

class LoginVC: UIViewController {

    // MARK: - ========== LifeCycle ==========
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.white
        
        
        setUpView()
    }
    
    // MARK: - ========== UI ==========
    func setUpView() {
        view.addSubview(loginBtn)
        
        loginBtn.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.top.equalTo(view.snp.bottom).multipliedBy(0.6)
            make.width.equalTo(200)
            make.height.equalTo(50)
        }
    }

    // MARK: - ====== Actions ======
    @objc func loginBtnClick(sender: UIButton) {
        SVProgressHUD.show(withStatus: "正在登录...")
        
        // 延迟执行
        DispatchQueue.global().asyncAfter(deadline: .now() + 2) {
            SVProgressHUD.dismiss {
                SVProgressHUD.lx_showSuccess("登录成功")
                
                // 设置标识
                UserDefaults.standard.set(true, forKey: Key.UserDefaults.k_ISLogin)
                
                if let window = UIApplication.shared.delegate?.window {
                    window?.rootViewController  = RootTabbarController()
                }
            }
        }
    }
    
    // MARK: - ========== Set&Get ==========
    lazy var headIMV = { () -> UIImageView in
        var imageV = UIImageView()
        imageV.image = UIImage(named: "")
        
        return imageV
    }()

    lazy var nameTF: UITextField = {
        var TF = UITextField()
        TF.placeholder = "请输入用户名"
        TF.textAlignment = .left
        TF.textColor = UIColor.red
        return TF
    }()
    
    lazy var loginBtn: UIButton = {
        let btn = UIButton(type: .custom)
        btn.backgroundColor = UIColor.blue
        btn.setTitle("登  录", for: .normal)
        btn.setTitleColor(UIColor.orange, for: .normal)
        btn.setTitleColor(UIColor.green, for: .selected)
        btn.layer.cornerRadius = 5.0
        btn.layer.borderWidth = 1
        btn.layer.borderColor = UIColor.green.cgColor
        btn.clipsToBounds = true
        
        btn.addTarget(self, action: #selector(loginBtnClick(sender:)), for: .touchUpInside)
        return btn
    }()
    
    
}
