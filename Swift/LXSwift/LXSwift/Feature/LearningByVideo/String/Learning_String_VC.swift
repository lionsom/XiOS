//
//  Learning_String_VC.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/13.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Learning_String_VC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.white
        self.title = "String";
        
        // MARK: - ========== 计算字符数量 ==========
        // MARK: ===== 包含Unicode =====
        let unusualMenagerie = "Koala 🐨, Snail 🐌, Penguin 🐧, Dromedary 🐪"
        print("unusualMenagerie has \(unusualMenagerie.count) characters")
        // 打印输出“unusualMenagerie has 40 characters”
        
        var word = "cafe"
        print("the number of characters in \(word) is \(word.count)")
        // 打印输出“the number of characters in cafe is 4”

        // MARK: ===== 拼接一个重音Unicode =====
        word += "\u{301}"    // 拼接一个重音，U+0301
        print("the number of characters in \(word) is \(word.count)")
        // 打印输出“the number of characters in café is 4”
        
    }
    
    deinit {
        Log("")
    }
    
    
}
