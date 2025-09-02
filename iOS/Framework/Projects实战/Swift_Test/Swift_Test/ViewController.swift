//
//  ViewController.swift
//  Swift_Test
//
//  Created by 启业云03 on 2021/8/25.
//

import LXScan
import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    override func touchesBegan(_: Set<UITouch>, with _: UIEvent?) {
        let scanVC = LXScan.QYYScanViewController()
        present(scanVC, animated: true, completion: nil)
    }
}
