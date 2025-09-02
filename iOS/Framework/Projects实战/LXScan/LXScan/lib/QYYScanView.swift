//
//  QYYScanView.swift
//  QYYScan_Base
//
//  Created by 启业云03 on 2021/6/28.
//

import UIKit
// import QYYIconFont_Base

private let scanner_borderWidth: CGFloat = 1.0 // 扫描器边框宽度
private let scanner_cornerWidth: CGFloat = 3.0 // 扫描器棱角宽度
private let scanner_cornerLength: CGFloat = 10.0 // 扫描器棱角长度
private let scanner_lineHeight: CGFloat = 10.0 // 扫描器线条高度
private let flashlightBtn_Width: CGFloat = 45.0 // 手电筒按钮宽度
private let albumBtn_Width = flashlightBtn_Width // 手电筒按钮宽度
private let flashlightLab_Height: CGFloat = 15.0 // 手电筒提示文字高度
private let tipLab_Height: CGFloat = 50.0 // 扫描器下方提示文字高度

private let scannerLineAnmationKey = "ScannerLineAnmationKey" // 扫描线条动画Key值

/// View中点击事情的代理
protocol QYYScanViewDelegate: AnyObject {
    /// 闪光灯点击事件
    func ScanViewFlashLightBtnClick(_ status: Bool)

    /// 相册点击事件
    func ScanViewAlbumBtnClick()
}

class QYYScanView: UIView {
    // 扫描器宽度
    var scanner_Width: CGFloat!
    // 扫描器初始x值
    var scanner_x: CGFloat!
    // 扫描器初始y值
    var scanner_y: CGFloat!
    // 指示器
    private var activityIndicator: UIActivityIndicatorView!
    // 自定义配置
    var config: ScanConfig!
    // 声明delegate
    weak var delegate: QYYScanViewDelegate?

    init(frame: CGRect, config: ScanConfig) {
        super.init(frame: frame)

        scanner_Width = self.frame.size.width * 0.7
        scanner_x = (bounds.width - scanner_Width) / 2
        scanner_y = (bounds.height - scanner_Width) / 2 - 50

        self.config = config

        p_setupUI()
    }

    @available(*, unavailable)
    required init?(coder _: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    func p_setupUI() {
        backgroundColor = .clear

        addSubview(scannerLine)
        _addScannerLineAnimation()

        addSubview(tipLab)

        addSubview(tipLab)
        addSubview(flashlightBtn)
        // addSubview(flashlightLab)
        addSubview(albumBtn)
    }

    override func draw(_ rect: CGRect) {
        super.draw(rect)
        // 半透明区域
        UIColor(white: 0, alpha: 0.3).setFill()
        UIRectFill(rect)
        // 透明区域
        let scanner_rect = CGRect(x: scanner_x, y: scanner_y, width: scanner_Width, height: scanner_Width)
        UIColor.clear.setFill()
        UIRectFill(scanner_rect)
        // 边框
        let borderPath = UIBezierPath(rect: CGRect(x: scanner_x, y: scanner_y, width: scanner_Width, height: scanner_Width))
        borderPath.lineCapStyle = .round
        borderPath.lineWidth = scanner_borderWidth
        config.borderColor.set()
        borderPath.stroke()
        // 棱角
        for index in 0 ... 3 {
            let tempPath = UIBezierPath()
            tempPath.lineWidth = scanner_cornerWidth
            config.cornerColor.set()

            switch index {
            case 0:
                // 左上角
                tempPath.move(to: CGPoint(x: scanner_x + scanner_cornerLength, y: scanner_y))
                tempPath.addLine(to: CGPoint(x: scanner_x, y: scanner_y))
                tempPath.addLine(to: CGPoint(x: scanner_x, y: scanner_y + scanner_cornerLength))
            // tempPath.close() // 闭环
            case 1:
                // 右上角
                tempPath.move(to: CGPoint(x: scanner_x + scanner_Width - scanner_cornerLength, y: scanner_y))
                tempPath.addLine(to: CGPoint(x: scanner_x + scanner_Width, y: scanner_y))
                tempPath.addLine(to: CGPoint(x: scanner_x + scanner_Width, y: scanner_y + scanner_cornerLength))
            case 2:
                // 左下角
                tempPath.move(to: CGPoint(x: scanner_x, y: scanner_y + scanner_Width - scanner_cornerLength))
                tempPath.addLine(to: CGPoint(x: scanner_x, y: scanner_y + scanner_Width))
                tempPath.addLine(to: CGPoint(x: scanner_x + scanner_cornerLength, y: scanner_y + scanner_Width))
            case 3:
                // 右下角
                tempPath.move(to: CGPoint(x: scanner_x + scanner_Width - scanner_cornerLength, y: scanner_y + scanner_Width))
                tempPath.addLine(to: CGPoint(x: scanner_x + scanner_Width, y: scanner_y + scanner_Width))
                tempPath.addLine(to: CGPoint(x: scanner_x + scanner_Width, y: scanner_y + scanner_Width - scanner_cornerLength))
            default:
                break
            }
            tempPath.stroke() // 根据坐标点连线，fill()是填充
        }
    }

    // 扫描线条
    private lazy var scannerLine: UIImageView = {
        let tempScannerLine = UIImageView(frame: CGRect(x: scanner_x, y: scanner_y, width: scanner_Width, height: scanner_lineHeight))
        tempScannerLine.image = _imageNamed("scan_line")
        return tempScannerLine
    }()

    lazy var tipLab: UILabel = {
        let tempLab = UILabel(frame: CGRect(x: 0,
                                            y: scanner_y + scanner_Width,
                                            width: self.bounds.width,
                                            height: 50))
        tempLab.textAlignment = .center
        tempLab.textColor = .white
        tempLab.font = UIFont.systemFont(ofSize: 15.0)
        tempLab.numberOfLines = 0
        let title = _navigationItemTitle(self.config.scanType)
        tempLab.text = localizedString("将\(title)放入框内，即可自动扫描")
        return tempLab
    }()

    // 手电筒开关
    private lazy var flashlightBtn: UIButton = {
        let tempFlashlightBtn = UIButton(type: .custom)
        tempFlashlightBtn.backgroundColor = UIColor(hex: 0x000000, alpha: 0.5)
        tempFlashlightBtn.frame = CGRect(x: self.center.x - scanner_Width / 2,
                                         y: scanner_y + scanner_Width + 60,
                                         width: flashlightBtn_Width,
                                         height: flashlightBtn_Width)
        tempFlashlightBtn.addTarget(self, action: #selector(flashlightBtnClicked(button:)), for: .touchUpInside)
//        let off = QYYIconFont_Base.QYYFontImage.icon(name: "light-off", fontSize: 25, color: _DarkColor(0xFFFFFF, 0xC4C4C4))
//        let on = QYYIconFont_Base.QYYFontImage.icon(name: "light-on", fontSize: 25, color: _DarkColor(0xFFFFFF, 0xC4C4C4))
        tempFlashlightBtn.setImage(nil, for: .normal)
        tempFlashlightBtn.setImage(nil, for: .selected)
        tempFlashlightBtn.layer.cornerRadius = flashlightBtn_Width / 2
        tempFlashlightBtn.layer.masksToBounds = true
        return tempFlashlightBtn
    }()

    // 手电筒提示文字
    private lazy var flashlightLab: UILabel = {
        let tempFlashlightLab = UILabel(frame: CGRect(x: scanner_x,
                                                      y: scanner_y + scanner_Width + flashlightBtn_Width + 60 + 10,
                                                      width: scanner_Width,
                                                      height: flashlightLab_Height))
        tempFlashlightLab.font = UIFont.systemFont(ofSize: 12)
        tempFlashlightLab.textColor = .white
        tempFlashlightLab.text = localizedString("轻触照亮")
        tempFlashlightLab.textAlignment = .center
        return tempFlashlightLab
    }()

    // 手电筒开关
    private lazy var albumBtn: UIButton = {
        let tempAlbumBtn = UIButton(type: .custom)
        tempAlbumBtn.backgroundColor = UIColor(hex: 0x000000, alpha: 0.5)
        tempAlbumBtn.frame = CGRect(x: self.center.x + scanner_Width / 2 - albumBtn_Width,
                                    y: scanner_y + scanner_Width + 60,
                                    width: albumBtn_Width,
                                    height: albumBtn_Width)
        tempAlbumBtn.addTarget(self, action: #selector(albumBtnClicked(button:)), for: .touchUpInside)
//        let off = QYYIconFont_Base.QYYFontImage.icon(name: "zhaopian", fontSize: 25, color: _DarkColor(0xFFFFFF, 0xC4C4C4))
//        let on = QYYIconFont_Base.QYYFontImage.icon(name: "zhaopian", fontSize: 25, color: _DarkColor(0xFFFFFF, 0xC4C4C4))
        tempAlbumBtn.setImage(nil, for: .normal)
        tempAlbumBtn.setImage(nil, for: .selected)
        tempAlbumBtn.layer.cornerRadius = albumBtn_Width / 2
        tempAlbumBtn.layer.masksToBounds = true
        return tempAlbumBtn
    }()

    // MARK: - Click

    @objc func flashlightBtnClicked(button: UIButton) {
        delegate?.ScanViewFlashLightBtnClick(!button.isSelected)
    }

    @objc func albumBtnClicked(button _: UIButton) {
        delegate?.ScanViewAlbumBtnClick()
    }
}

// MARK: - 扫描线条动画

extension QYYScanView {
    // 添加扫描线条动画
    func _addScannerLineAnimation() {
        // 若已添加动画，则先移除动画再添加
        scannerLine.layer.removeAllAnimations()

        let lineAnimation = CABasicAnimation(keyPath: "transform")
        lineAnimation.toValue = NSValue(caTransform3D: CATransform3DMakeTranslation(0, scanner_Width - scanner_lineHeight, 1))
        lineAnimation.duration = 4
        lineAnimation.repeatCount = MAXFLOAT
        scannerLine.layer.add(lineAnimation, forKey: scannerLineAnmationKey)
        // 重置动画运行速度为1.0
        scannerLine.layer.speed = 1.0
    }

    // 暂停扫描器动画
    func _pauseScannerLineAnimation() {
        // 取出当前时间，转成动画暂停的时间
        let pauseTime = scannerLine.layer.convertTime(CACurrentMediaTime(), from: nil)
        // 设置动画的时间偏移量，指定时间偏移量的目的是让动画定格在该时间点的位置
        scannerLine.layer.timeOffset = pauseTime
        // 将动画的运行速度设置为0， 默认的运行速度是1.0
        scannerLine.layer.speed = 0
    }
}

// MARK: - 外部方法

extension QYYScanView {
    /// 闪光灯按钮状态切换
    func changeFlashlightBtnStatus(_ selected: Bool) {
        flashlightBtn.isSelected = selected
        flashlightLab.text = selected ? localizedString("轻触关闭") : localizedString("轻触照亮")
    }
}

// MARK: - 添加/移除指示器

extension QYYScanView {
    // 添加指示器
    func _addActivityIndicator() {
        if activityIndicator == nil {
            activityIndicator = UIActivityIndicatorView(style: config.indicatorViewStyle)
            activityIndicator.center = CGPoint(x: scanner_x + scanner_Width / 2,
                                               y: scanner_y + scanner_Width / 2)
            addSubview(activityIndicator)
        }
        activityIndicator.startAnimating()
    }

    // 移除指示器
    func _removeActivityIndicator() {
        if activityIndicator != nil {
            activityIndicator.removeFromSuperview()
            activityIndicator = nil
        }
    }
}
