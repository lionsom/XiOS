//
//  LoginVC.swift
//  RxSwift_Demo
//
//  Created by 启业云03 on 2023/1/13.
//
//  原demo地址：https://github.com/ReactiveX/RxSwift/blob/main/RxExample/RxExample/Examples/SimpleValidation/SimpleValidationViewController.swift

import RxCocoa
import RxSwift
import UIKit

private let minimalUsernameLength = 5
private let minimalPasswordLength = 6

class ValidationViewController: UIViewController {
    @IBOutlet var usernameTF: UITextField!

    @IBOutlet var usernameValidLB: UILabel!

    @IBOutlet var passwordTF: UITextField!

    @IBOutlet var passwordValidLB: UILabel!

    @IBOutlet var LoginBtn: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .white

        usernameValidLB.text = "Username has to be at least \(minimalUsernameLength) characters"
        usernameValidLB.numberOfLines = 0
        passwordValidLB.text = "Password has to be at least \(minimalPasswordLength) characters"
        passwordValidLB.numberOfLines = 0

        // 用户名是否有效
        let usernameValid = usernameValidLB.rx.text.orEmpty
            .map { $0.count >= minimalUsernameLength }
            .share(replay: 1)
    }

    deinit {}

    func showAlert() {
        let alert = UIAlertController(title: "RxExample", message: "This is wonderful", preferredStyle: .alert)
        let action = UIAlertAction(title: "OK", style: .default, handler: nil)
        alert.addAction(action)
        present(alert, animated: true, completion: nil)
    }
}
