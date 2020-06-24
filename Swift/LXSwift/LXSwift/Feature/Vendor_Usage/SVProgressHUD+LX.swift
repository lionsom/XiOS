//
//  SVProgressHUD+LX.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/23.
//  Copyright © 2020 LX. All rights reserved.
//

import Foundation

import SVProgressHUD.SVProgressHUD

// 扩展不能包括属性
fileprivate let kDurationTime: TimeInterval = 2.0


extension SVProgressHUD {
    
    // 类方法 - 自定义配置
    class func customInit() {
        // 样式 .custom .light .dark
        SVProgressHUD.setDefaultStyle(.custom)
        // 背景层
        SVProgressHUD.setDefaultMaskType(.clear)
        // 菊花样式
        SVProgressHUD.setDefaultAnimationType(.native)
        // 设置最小时长
        SVProgressHUD.setMinimumDismissTimeInterval(kDurationTime)
        // 圆角
        SVProgressHUD.setCornerRadius(10)
        SVProgressHUD.setBorderWidth(2)
        SVProgressHUD.setBorderColor(UIColor.orange)
        /* 触摸反馈 是否开启
         showSuccessWithStatus: <-> UINotificationFeedbackTypeSuccess
         showInfoWithStatus: <-> UINotificationFeedbackTypeWarning
         showErrorWithStatus: <-> UINotificationFeedbackTypeError
         */
        SVProgressHUD.setHapticsEnabled(true)
    }

    // MARK: - ========== Success ==========
    // 类方法
    class func showSuccess(_ message: String) {
        // 初始化
        SVProgressHUD.customInit()
        // 主线程
        DispatchQueue.main.async {
            SVProgressHUD.showSuccess(withStatus: message)
        }
    }
    
    
    // MARK: - ========== Error ==========
    // 类方法
    class func showError(_ message: String) {
        // 初始化
        SVProgressHUD.customInit()
        // 主线程
        DispatchQueue.main.async {
            SVProgressHUD.showError(withStatus: message)
        }
    }
    
    
    // MARK: - ========== Info ==========
    // 类方法
    class func showInfo(_ message: String) {
        // 初始化
        SVProgressHUD.customInit()
        // 主线程
        DispatchQueue.main.async {
            SVProgressHUD.showInfo(withStatus: message)
        }
    }
    
}

