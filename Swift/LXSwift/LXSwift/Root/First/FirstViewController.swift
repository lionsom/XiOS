//
//  FirstViewController.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/7.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

import SVProgressHUD

class FirstViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.orange
        
        self.navigationItem.title = "第一页";
        
        // 自定义 Appearance
        let navigationBarAppearance = self.navigationController!.navigationBar
        navigationBarAppearance.backgroundColor = UIColor.randomColor()
        
        // 导航栏风格
        self.navigationController!.navigationBar.barStyle = .black
        // 导航栏是否半透明
        self.navigationController!.navigationBar.isTranslucent = false
        // 导航栏底色
        self.navigationController!.navigationBar.barTintColor = UIColor.green
        // iOS7以后已经修改，不再修改导航栏背景色
        // To tint the bar's background, please use -barTintColor.
        self.navigationController!.navigationBar.tintColor = UIColor.red  // X
        // 导航栏titile颜色
        self.navigationController!.navigationBar.titleTextAttributes = [.foregroundColor: UIColor.orange]

        // 导航栏左侧按钮
        let leftBarButtonItem1 = UIBarButtonItem(barButtonSystemItem: .camera, target: self, action: #selector(barButtonItemClick(sender:)))
        leftBarButtonItem1.tag = 100;
        let leftBarButtonItem2 = UIBarButtonItem(title: "相册", style: .plain, target: self, action: nil)
        leftBarButtonItem2.action = #selector(barButtonItemClick(sender:))
        leftBarButtonItem2.tag = 101;
        self.navigationItem.leftBarButtonItems = [leftBarButtonItem1, leftBarButtonItem2]
        
        // 自定义导航栏右侧视图
        let myUIView = UIView(frame: CGRect(x: 0, y: 0, width: 30, height: 30))
        myUIView.backgroundColor = UIColor.purple
        // view tap
        let singleTapGesture = UITapGestureRecognizer(target: self, action: #selector(tapClick(tap:)))
        myUIView.addGestureRecognizer(singleTapGesture)
        
        let rightButton = UIBarButtonItem(customView: myUIView)
        // 加到導覽列中
        self.navigationItem.rightBarButtonItem = rightButton

        // 自定义导航栏Title View
        let titleV = UIView(frame: CGRect(x: 0, y: 0, width: 50, height: 30))
        titleV.backgroundColor = UIColor.red
        self.navigationItem.titleView = titleV
        
        // 返回按钮 移除文字
        let backBarButtton = UIBarButtonItem(title: "", style: .plain, target: nil, action: nil)
        navigationItem.backBarButtonItem = backBarButtton
        
        // 导航栏变大
        if #available(iOS 11.0, *) {
//            self.navigationController?.navigationBar.prefersLargeTitles = true
//            self.title = "我是大标题"
        } else {
            // Fallback on earlier versions
        }

        
        // 建立一個按鈕
        let myButton = UIButton(frame: CGRect(x: 100, y: 250, width: 120, height: 40))
//        myButton.setTitle("回前頁", forState:UIButton.State.normal)
        myButton.setTitle("哈", for: .normal)
        myButton.backgroundColor = UIColor.randomColor()
        myButton.addTarget(self, action: #selector(back), for: .touchUpInside)

        self.view.addSubview(myButton)
    }
    
   
    // MARK: - ====== Actions ======
        
    @objc func barButtonItemClick(sender:UIBarButtonItem) {
        if sender.tag == 100 {
            Log("barButtonItemClick 1 Click")
            
            navigationItem.prompt = NSLocalizedString("Navigation prompts appear at the top.", comment: "啊水电费")
        }
        if sender.tag == 101 {
            Log("barButtonItemClick 2 Click")
            
            navigationItem.prompt = nil
        }
    }
    
    @objc func tapClick(tap:UITapGestureRecognizer) {
        Log("tap Click")
    }
    
    @objc func back() {
        Log("点击了")
    
    }
    
    // TODO:adf
    
    // FIXME: adsf
    

}
