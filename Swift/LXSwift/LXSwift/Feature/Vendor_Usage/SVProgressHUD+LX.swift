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
fileprivate let kDurationTime: TimeInterval = 1.0


extension SVProgressHUD {
    
    // 类方法 - 自定义配置
    class func customInit() {
        // 样式 .custom .light .dark
        SVProgressHUD.setDefaultStyle(.custom)
        // 背景层
        SVProgressHUD.setDefaultMaskType(.clear)
        // 菊花样式
        SVProgressHUD.setDefaultAnimationType(.native)
        // 设置最小时长，dismiss手动设置
        // SVProgressHUD.setMinimumDismissTimeInterval(kDurationTime)
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
    class func lx_showSuccess(_ message: String) {
        SVProgressHUD.lx_showSuccess(message, completioned: nil)
    }
    
    class func lx_showSuccess(_ message: String, completioned: Optional<()->()>) {
        // 初始化
        SVProgressHUD.customInit()
        // 主线程
        DispatchQueue.main.async {
            SVProgressHUD.showSuccess(withStatus: message)
            SVProgressHUD.dismiss(withDelay: kDurationTime, completion: completioned)
        }
    }
    
    
    // MARK: - ========== Error ==========
    // 类方法
    class func lx_showError(_ message: String) {
        SVProgressHUD.lx_showError(message, completioned: nil)
    }
    
    class func lx_showError(_ message: String, completioned: Optional<()->()>) {
        // 初始化
        SVProgressHUD.customInit()
        // 主线程
        DispatchQueue.main.async {
            SVProgressHUD.showError(withStatus: message)
            SVProgressHUD.dismiss(withDelay: kDurationTime, completion: completioned)
        }
    }
    
    // MARK: - ========== Info ==========
    // 类方法
    class func lx_showInfo(_ message: String) {
        SVProgressHUD.lx_showInfo(message, completioned: nil)
    }
    
    class func lx_showInfo(_ message: String, completioned: Optional<()->()>) {
        // 初始化
        SVProgressHUD.customInit()
        // 主线程
        DispatchQueue.main.async {
            SVProgressHUD.showInfo(withStatus: message)
            SVProgressHUD.dismiss(withDelay: kDurationTime, completion: completioned)
        }
    }
    
}

