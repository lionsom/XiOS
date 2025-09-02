//
//  QYYScanHelper.swift
//  QYYScan_Base
//
//  Created by 启业云03 on 2021/6/28.
//

import AVFoundation
import Photos
import UIKit

// MARK: - 权限

func _checkCameraAuth(completion: @escaping (_ granted: Bool) -> Void) {
    let videoAuthStatus = AVCaptureDevice.authorizationStatus(for: AVMediaType.video)
    switch videoAuthStatus {
    case .authorized:
        // print("已授权")
        completion(true)
    case .notDetermined:
        // print("未询问用户是否授权")
        AVCaptureDevice.requestAccess(for: .video) { (granted: Bool) in
            completion(granted)
        }
    case .denied, .restricted:
        // print("用户拒绝授权或权限受限")
        completion(false)
    default:
        // print("其他")
        completion(false)
    }
}

func _checkPhotoAlbum(completion: @escaping (_ granted: Bool) -> Void) {
    let photoAlbumStatus = PHPhotoLibrary.authorizationStatus()
    switch photoAlbumStatus {
    case .authorized:
        // print("已授权")
        completion(true)
    case .notDetermined:
        // print("未询问用户是否授权")
        PHPhotoLibrary.requestAuthorization { status in
            completion(status == .authorized)
        }
    case .denied, .restricted:
        // print("用户拒绝授权或权限受限")
        completion(false)
    default:
        // print("其他")
        completion(false)
    }
}

// MARK: - 获取title

func _navigationItemTitle(_ scanType: ScanType) -> String {
    switch scanType {
    case .QR:
        return "二维码"
    case .Line:
        return "条形码"
    case .Both:
        return "二维码/条形码"
    }
}

// MARK: - 获取Bundle中资源

private var bundle: Bundle = {
    let bundle = Bundle(path: Bundle(for: QYYScanView.self).path(forResource: "QYYScan_Base", ofType: "bundle", inDirectory: nil)!)
    return bundle!
}()

func _imageNamed(_ name: String) -> UIImage? {
    var image = UIImage(named: name, in: bundle, compatibleWith: nil)
    if image == nil {
        image = UIImage(named: name)
    }
    return image
}

// MARK: - 颜色（暗黑）

func _DarkColor(_ lightHex: UInt, _ darkHex: UInt) -> UIColor {
    if #available(iOS 13.0, *) {
        return UIColor { (traitCollection: UITraitCollection) -> UIColor in
            if traitCollection.userInterfaceStyle == .dark {
                return UIColor(hex: darkHex)
            } else {
                return UIColor(hex: lightHex)
            }
        }
    } else {
        // Fallback on earlier versions
        return UIColor(hex: lightHex)
    }
}

// MARK: - UIColor

/// 颜色扩展十六进制
extension UIColor {
    /// 通过 convenience 对现有的类增加init方法
    /// - Parameters:
    ///   - red: R
    ///   - green: G
    ///   - blue: B
    convenience init(R: UInt, G: UInt, B: UInt, A: CGFloat = 1.0) {
        let newRed = CGFloat(R) / 255
        let newGreen = CGFloat(G) / 255
        let newBlue = CGFloat(B) / 255
        self.init(red: newRed,
                  green: newGreen,
                  blue: newBlue,
                  alpha: A)
    }

    /// 新增init十六进制
    /// - Parameter hex: 十六进制
    convenience init(hex: UInt, alpha: CGFloat = 1.0) {
        self.init(R: (hex & 0xFF0000) >> 16,
                  G: (hex & 0x00FF00) >> 8,
                  B: hex & 0x0000FF,
                  A: alpha)
    }
}

// MARK: - 国际化

func localizedString(_ key: String) -> String {
    guard let language = Locale.preferredLanguages.first, language.count > 0 else {
        return key
    }

    var fileNamePrefix = "zh-Hans"
    if language.hasPrefix("en") {
        fileNamePrefix = "en"
    }

    let tmpBundle = Bundle(for: QYYScanView.self)
    let url = tmpBundle.url(forResource: "QYYScan_Base", withExtension: "bundle")
    guard url != nil else {
        return key
    }

    let tmp = Bundle(url: url!)
    guard let path = tmp?.path(forResource: fileNamePrefix, ofType: "lproj") else { return key }
    let bundle = Bundle(path: path)

    guard let localizedString = bundle?.localizedString(forKey: key, value: nil, table: "Localizable"), localizedString.count > 0 else {
        return key
    }

    return localizedString
}
