//
//  ViewController.swift
//  Singleton_Demo
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
        let a1 = Singleton_A.shared
        let a2 = Singleton_A.shared

        let b1 = Singleton_B.shared
        let b2 = Singleton_B.shared

        let c1 = Singleton_C.shared
        let c2 = Singleton_C.shared

//        let c3 = c1.copy()

        let c4 = c1.mutableCopy()

        let d1 = shared_D
        let d2 = shared_D

        print("")
    }
}
