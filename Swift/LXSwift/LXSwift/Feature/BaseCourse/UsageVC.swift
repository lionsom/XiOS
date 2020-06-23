//
//  UsageVC.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/22.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class UsageVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.white
        self.title = "常用的方法举例";
        
        
        
    }
    
    // MARK: - ========== UserDefaults ==========
    func UserDefaults_Usage() {
        // Store
        UserDefaults.standard.set(true, forKey: "Key1")      //Bool
        UserDefaults.standard.set(1, forKey: "Key2")         //Integer
        UserDefaults.standard.set("TEST", forKey: "Key3")    //setObject
        
        // Retrieve
        UserDefaults.standard.bool(forKey: "Key1")
        UserDefaults.standard.integer(forKey: "Key2")
        UserDefaults.standard.string(forKey: "Key3")
        
        // Remove
        UserDefaults.standard.removeObject(forKey: "Key1")
        
        // Remove all Keys
        if let appDomain = Bundle.main.bundleIdentifier {
            UserDefaults.standard.removePersistentDomain(forName: appDomain)
        }
    }
    
    // MARK: - ========== 延迟执行 ==========
    func delayExecute() {
        // 1.perform(必须在主线程中执行)
        perform(#selector(performCallBack), with: nil, afterDelay: 4.0)
        // cancel
        NSObject.cancelPreviousPerformRequests(withTarget: self)

        // 2.timer(必须在主线程中执行)
        Timer.scheduledTimer(timeInterval: 4.0, target: self, selector: #selector(scheduledTimerCallBack), userInfo: nil, repeats: false)
        
        // 3.Thread (在主线程会卡主界面)
        sleep(4)
        
        // 4.GCD 主线程/子线程
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            // your code
        }
        DispatchQueue.global().asyncAfter(deadline: .now() + 3) {
            // your code
        }
        
        // 秒
        let seconds = 1.5
        DispatchQueue.main.asyncAfter(deadline: .now() + seconds) {
            print("1.5 seconds later")
        }
        // 毫秒
        DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(500)) {
            print("500 msec seconds later")
        }
        // 微秒
        DispatchQueue.main.asyncAfter(deadline: .now() + .microseconds(1_000_000)) {
            print("1m μs seconds later")
        }
        // 纳秒
        DispatchQueue.main.asyncAfter(deadline: .now() + .nanoseconds(1_500_000_000)) {
            print("1.5b nsec seconds later")
        }
    }
    
    @objc func performCallBack() {
        print("just call back")
    }
    
    @objc func scheduledTimerCallBack() {
        print("just call back")
    }
    
    
}
