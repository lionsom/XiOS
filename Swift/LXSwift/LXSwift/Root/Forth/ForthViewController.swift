//
//  ForthViewController.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/13.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class ForthViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        view.backgroundColor = UIColor.red
        self.navigationItem.title = "个人"
        // 导航栏是否半透明
        navigationController?.navigationBar.isTranslucent = false
        
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
