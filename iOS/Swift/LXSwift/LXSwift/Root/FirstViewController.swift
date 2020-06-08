//
//  FirstViewController.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/7.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.orange
        
        self.title = "第一页";
        
        // 导航栏是否半透明
        self.navigationController?.navigationBar.isTranslucent = false
        
        // 导航栏底色
        self.navigationController?.navigationBar.barTintColor = UIColor.green
        
        // 導覽列右邊 UIView
        let myUIView = UIView(frame: CGRect(x: 0, y: 0, width: 30, height: 30))
        myUIView.backgroundColor = UIColor.purple
        let rightButton = UIBarButtonItem(customView: myUIView)
        // 加到導覽列中
        self.navigationItem.rightBarButtonItem = rightButton

        // 建立一個按鈕
        let myButton = UIButton(frame: CGRect(x: 100, y: 250, width: 120, height: 40))
//        myButton.setTitle("回前頁", forState:UIButton.State.normal)
        myButton.setTitle("哈", for: .normal)
        myButton.backgroundColor = UIColor.randomColor()
        myButton.addTarget(self, action: #selector(back), for: .touchUpInside)

        self.view.addSubview(myButton)
    }
    
    
    // MARK: - ====== Actions ======
    @objc func back() {
        Log("点击了")
        
        // new VC
        let vc = Algorithm_003()
        
        //跳转隐藏tabbar
        self.hidesBottomBarWhenPushed = true;
        // push
        self.navigationController?.pushViewController(vc , animated: true)
        //返回后显示tabbar
        self.hidesBottomBarWhenPushed = false;
    }
    
    // TODO:adf
    
    // FIXME: adsf

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
