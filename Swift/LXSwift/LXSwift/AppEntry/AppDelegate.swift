//
//  AppDelegate.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/7.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    // 由于iOS13后window托给scene，iOS12及以下需要在AppDelegate中重新声明
    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        
        //创建window
        self.window = UIWindow(frame: UIScreen.main.bounds)
        self.window?.backgroundColor = UIColor.white
        //设置window的rootViewController
        
        let isLogin = UserDefaults.standard.bool(forKey: Key.UserDefaults.k_ISLogin)
        if isLogin {
            self.window?.rootViewController = RootTabbarController()
        }
        else {
            self.window?.rootViewController = LoginVC()
        }
        self.window?.makeKeyAndVisible()
        return true
    }

}



// MARK: - ========== Variable ==========
// MARK: - ========== UI Component ==========
// MARK: - ========== LifeCycle ==========
// MARK: - ========== UI ==========
// MARK: - ========== Delegate ==========
// MARK: ===== UITableViewDataSource
// MARK: - ========== Private ==========
// MARK: - ========== Public ==========
// MARK: - ========== Action ==========
// MARK: - ========== Set&Get ==========


