//
//  ViewController.swift
//  Chapter_1
//
//  Created by 启业云03 on 2023/1/10.
//

import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.

        arr()
    }

    func arr() {
        var array = [1, 2, 3]
        for number in array {
            print(number)
            array = [4, 5, 6]
        }
        print(array)
    }
}
