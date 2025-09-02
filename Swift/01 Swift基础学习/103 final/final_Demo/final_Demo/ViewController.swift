//
//  ViewController.swift
//  final_Demo
//
//  Created by 启业云03 on 2023/1/6.
//

import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    override func touchesBegan(_: Set<UITouch>, with _: UIEvent?) {
        let a = A()
        a.A_Print()

        let b = B()
        b.A_Print()
    }
}
