//
//  BlockVC.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/30.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class BlockVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    /*
     闭包作为参数，可选值，可赋nil,
     */
    func method_A(_ me: String, complete: Optional<()->()>) {
        var _ : (() -> ())? = nil
        var _ : Optional<() -> ()> = nil
        
        typealias BlockType = () -> ()
        var _ : BlockType? = nil
    }
    
}
