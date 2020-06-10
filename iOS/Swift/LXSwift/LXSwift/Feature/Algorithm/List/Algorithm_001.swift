//
//  Algorithm_001.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/8.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class Algorithm_001: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.randomColor()
        self.title = "两数之和";
        
        
        let numsArr = [1,2,3,4,5,6,7,8,9,10];
        let target = 10;
        for (index, value) in numsArr.enumerated() {
            for (index1, value1) in numsArr.enumerated() {
                if index < index1 {
                    if value+value1 == target {
                        print("index =", index, index1)
                    }
                }
            }
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
