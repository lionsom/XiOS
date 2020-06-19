//
//  Algorithm_005.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/19.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Algorithm_005: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.randomColor()
        self.title = "最长公共前缀";
        
        let Arr = ["aasdad", "asdf", "aldsdf", "aasdadfs"];
        
        let preStr = getSomePre(arr: Arr)
        Log("最长公共前缀 :" + preStr)
    }
    
    func getSomePre(arr: [String]) -> String {
        // 先找到最长的字符串
        var longStr: String? = arr.first
        for str in arr {
            if str.count > longStr!.count {
                longStr = str
            }
        }
        
        // 从最大字符串开始匹配，然后一次移除最后一个字符
        for str in arr {
            if !str.hasPrefix(longStr!) {
                longStr!.remove(at: longStr!.endIndex)
                continue
            }
        }
        
        
        return "af"
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
