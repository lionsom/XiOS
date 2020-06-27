//
//  StopWatchVC.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/27.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class StopWatchVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        view.backgroundColor = UIColor.white
        navigationItem.title = "秒表"
        
        // UI
        setUpView()
    }
    
    
    // MARK: - ========== UI ==========
    // 是否跟随屏幕旋转
    override var shouldAutorotate: Bool {
        return false
    }
    
    // 支持旋转的方向有哪些
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask {
        return UIInterfaceOrientationMask.portrait
    }
    
    // 状态栏
    override var preferredStatusBarStyle: UIStatusBarStyle {
        if #available(iOS 13.0, *) {
            return UIStatusBarStyle.darkContent
        } else {
            // Fallback on earlier versions
            return UIStatusBarStyle.default
        }
    }
    
    func setUpView() {
        view.addSubview(lapBtn)
        view.addSubview(watchBtn)
        
        lapBtn.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.top.equalTo(view.snp.bottom).multipliedBy(0.1)
            make.width.equalTo(200)
            make.height.equalTo(200)
        }
        
        watchBtn.snp.makeConstraints { (make) in

        }
        
        
        let initCircleButton: (UIButton) -> Void = { button in
            button.layer.cornerRadius = 0.5 * button.bounds.size.width
            button.layer.borderWidth = 1
            button.layer.borderColor = UIColor.randomColor().cgColor
            button.clipsToBounds = true
        }
        
        // 立刻刷新布局
        view.layoutIfNeeded()
        
        initCircleButton(lapBtn)
    }

    // MARK: - ========== Action ==========
    @objc func lapBtnClick(sender: UIButton) {
        Log("lapBtnClick")
    }
    
    @objc func watchBtnClick(sender: UIButton) {
        Log("watchBtnClick")
    }
    
    // MARK: - ========== Set&Get ==========
    lazy var lapTimerLabel: UILabel = {
        let label = UILabel()
        
        return label
    }()
    
    lazy var timerLabel: UILabel = {
        let label = UILabel()
        
        return label
    }()
    
    lazy var lapBtn: UIButton = {
        let btn = UIButton()
        btn.backgroundColor = UIColor.red
        btn.setTitle("Lap", for: .normal)
        btn.setTitle("NO", for: .disabled)
        btn.addTarget(self, action: #selector(lapBtnClick(sender:)), for: .touchUpInside)
        return btn
    }()

    lazy var watchBtn: UIButton = {
        let btn = UIButton()
        btn.backgroundColor = UIColor.red
        btn.setTitle("Watch", for: .normal)
        btn.setTitle("Stop", for: .disabled)
        btn.addTarget(self, action: #selector(watchBtnClick(sender:)), for: .touchUpInside)
        return btn
    }()
    
}
