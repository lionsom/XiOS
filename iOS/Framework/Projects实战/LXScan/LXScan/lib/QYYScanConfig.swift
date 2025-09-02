//
//  QYYScanConfig.swift
//  QYYScan_Base
//
//  Created by 启业云03 on 2021/6/28.
//

import UIKit

enum ScanType {
    case QR // 二维码
    case Line // 条形码
    case Both
}

enum ScanArea {
    case FullScreen // 全屏
    case PartScreen // 中间部分
}

public struct ScanConfig {
    /// 扫描器类型，默认支持二维码以及条码
    var scanType: ScanType = .Both
    /// 扫描区域，默认局部
    var scanArea: ScanArea = .PartScreen
    /// 棱角颜色
    var cornerColor = UIColor(hex: 0x4680FF)
    /// 边框颜色
    var borderColor: UIColor = .white
    /// 指示器
    var indicatorViewStyle: UIActivityIndicatorView.Style = .whiteLarge
}
