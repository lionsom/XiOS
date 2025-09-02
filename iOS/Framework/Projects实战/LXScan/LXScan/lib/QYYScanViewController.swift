//
//  QYYScanViewController.swift
//  QYYScan_Base
//
//  Created by 启业云03 on 2021/6/28.
//

import AVFoundation
import UIKit

open class QYYScanViewController: UIViewController {
    /// 点击曝光
    @objc open var canExposure: Bool = false
    /// 回调
    public typealias ClosureType = (_ isSucc: Bool, _ value: String, _ vc: QYYScanViewController) -> Void
    @objc open var scanClosure: ClosureType?

    private var config = ScanConfig()

    private var device: AVCaptureDevice!

    private lazy var session = AVCaptureSession()

    private lazy var previewLayer = AVCaptureVideoPreviewLayer(session: session)

    private let sessionQueue = DispatchQueue(label: "Session Queue")

    /// A range to determine minimum and maximum zoom factor.
    ///
    /// This value will be intersected with `AVCaptureDevice.minAvailableVideoZoomFactor` and `AVCaptureDevice.maxAvailableVideoZoomFactor` before being applied.
    private var zoomScaleRange: ClosedRange<CGFloat> = 1 ... 10

    private var initialScale: CGFloat = 0

    /// 限制最大缩放
    private let maxZoomFactor: CGFloat = 3.0

    /// 标记是否为第一次进入页面，区分Push还是Pop
    private var isFirstEnter = true

    // MARK: - LifeCycle

    override open func viewDidLoad() {
        super.viewDidLoad()
        title = localizedString("扫一扫")

        p_setupUI()

        NotificationCenter.default.addObserver(self, selector: #selector(applicationDidBecomeActive), name: UIApplication.didBecomeActiveNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(applicationWillResignActive), name: UIApplication.willResignActiveNotification, object: nil)
    }

    override open func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        if isFirstEnter {
            isFirstEnter = false
        } else {
            p_resumeScanning()
        }
    }

    override open func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        p_pauseScanning()
    }

    /// 从后台进入前台
    @objc func applicationDidBecomeActive() {
        p_resumeScanning()
    }

    /// 从前台进入后台
    @objc func applicationWillResignActive() {
        p_pauseScanning()
    }

    deinit {
        // print("LXScanViewController - deinit")
    }

    // MARK: - UI

    func p_setupUI() {
        view.backgroundColor = _DarkColor(0xFFFFFF, 0x1E1E1E)

//        let leftItem = UIBarButtonItem(title: localizedString("返回"), style: .plain, target: self, action: #selector(p_dismiss))
//        let leftItem = UIBarButtonItem(image: UIImage(named: "scan_back_normal"), style: .plain, target: self, action: #selector(p_dismiss))
//        leftItem.tintColor = _DarkColor(0xffffff, 0xffffff)
//        navigationItem.leftBarButtonItems = [leftItem]

        view.addSubview(scannerView)

        _checkCameraAuth { (granted: Bool) in
            DispatchQueue.main.async { [self] in
                if granted {
                    p_setupScanner()
                } else {
                    p_showAlert(localizedString("请在”设置-隐私-相机”选项中，允许访问你的相机"))
                }
            }
        }
    }

    private func p_setupScanner() {
        // 拍摄设备初始化
        guard let tempDevice = AVCaptureDevice.default(for: .video) else {
            p_showAlert(localizedString("暂无设备"))
            return
        }
        device = tempDevice

        // 初始化session对象
        if let deviceInput = try? AVCaptureDeviceInput(device: device) {
            let metadataOutput = AVCaptureMetadataOutput()
            metadataOutput.setMetadataObjectsDelegate(self, queue: .main)

            if config.scanArea == .PartScreen {
                let kW = view.frame.size.width
                let kH = view.frame.size.height
                // 可扫描区域设置，计算rectOfInterest 注意x,y交换位置
                metadataOutput.rectOfInterest = CGRect(x: scannerView.scanner_y / kH,
                                                       y: scannerView.scanner_x / kW,
                                                       width: scannerView.scanner_Width / kH,
                                                       height: scannerView.scanner_Width / kW)
            }

            let videoDataOutput = AVCaptureVideoDataOutput()
            videoDataOutput.setSampleBufferDelegate(self, queue: .main)

            // Session设置
            if UIScreen.main.bounds.size.height < 500 {
                session.sessionPreset = .vga640x480
            }
            session.canSetSessionPreset(.high)
            if session.canAddInput(deviceInput) { session.addInput(deviceInput) }
            if session.canAddOutput(metadataOutput) { session.addOutput(metadataOutput) }
            if session.canAddOutput(videoDataOutput) { session.addOutput(videoDataOutput) }

            // 支持扫码类型:https://developer.apple.com/documentation/avfoundation/avmetadatamachinereadablecodeobject/machine-readable_object_types?language=objc
            switch config.scanType {
            case .Line:
                metadataOutput.metadataObjectTypes = [.ean8, .ean13, .upce, .code39, .code39Mod43, .code93, .code128, .pdf417]
            case .QR:
                metadataOutput.metadataObjectTypes = [.qr]
            default:
                metadataOutput.metadataObjectTypes = [.qr, .ean8, .ean13, .upce, .code39, .code39Mod43, .code93, .code128, .pdf417]
            }

            // 预览图层
            previewLayer.videoGravity = .resizeAspectFill
            previewLayer.frame = view.layer.bounds
            // 将图层插入当前视图
            view.layer.insertSublayer(previewLayer, at: 0)

            // 开始扫描
            p_resumeScanning()

            // 点击手势
            let singleTap = UITapGestureRecognizer(target: self, action: #selector(handleTap(_:)))
            singleTap.numberOfTapsRequired = 1
            view.addGestureRecognizer(singleTap)
            let doubleTap = UITapGestureRecognizer(target: self, action: #selector(handleDoubleTap(_:)))
            doubleTap.numberOfTapsRequired = 2
            view.addGestureRecognizer(doubleTap)
            // 区分单击与双击
            singleTap.require(toFail: doubleTap)
            // 捏合手势
            let pinch = UIPinchGestureRecognizer(target: self, action: #selector(handlePinch(_:)))
            view.addGestureRecognizer(pinch)
        }
    }

    private func p_showAlert(_ message: String, handler: ((UIAlertAction) -> Void)? = nil) {
        let alertVC = UIAlertController(title: localizedString("提醒"), message: message, preferredStyle: .alert)
        let cancelAction = UIAlertAction(title: localizedString("知道了"), style: .cancel, handler: handler)
        alertVC.addAction(cancelAction)
        present(alertVC, animated: true, completion: nil)
    }

    // MARK: - Action

    @objc func handleTap(_ tap: UITapGestureRecognizer) {
        let point = tap.location(in: view)
        let devicePoint = previewLayer.captureDevicePointConverted(fromLayerPoint: point)
        sessionQueue.async {
            do {
                try self.device.lockForConfiguration()
            } catch {
                return
            }
            // 聚焦
            let focusMode = AVCaptureDevice.FocusMode.autoFocus
            if self.device.isFocusPointOfInterestSupported, self.device.isFocusModeSupported(focusMode) {
                self.device.focusPointOfInterest = devicePoint
                self.device.focusMode = focusMode
            }
            // 曝光
            if self.canExposure {
                let exposureMode = AVCaptureDevice.ExposureMode.autoExpose
                if self.device.isExposurePointOfInterestSupported, self.device.isExposureModeSupported(exposureMode) {
                    self.device.exposurePointOfInterest = devicePoint
                    self.device.exposureMode = exposureMode
                }
            }
            self.device.unlockForConfiguration()
        }
    }

    @objc func handleDoubleTap(_: UITapGestureRecognizer) {
        if #available(iOS 11.0, *) {
            let availableMaxScale = min(maxZoomFactor, device.maxAvailableVideoZoomFactor)
            if self.device.videoZoomFactor >= availableMaxScale {
                do {
                    try self.device.lockForConfiguration()
                    defer {
                        self.device.unlockForConfiguration()
                    }
                    // 差值
                    let differ = availableMaxScale - 1.0
                    let percent = differ / 8
                    var newScale = availableMaxScale

                    let timer = DispatchSource.makeTimerSource(flags: [], queue: .main)
                    var count = 8
                    timer.schedule(deadline: .now(), repeating: 0.25 / 8)
                    timer.setEventHandler {
                        count -= 1
                        do {
                            try self.device.lockForConfiguration()
                            defer {
                                self.device.unlockForConfiguration()
                            }
                            //
                            newScale = newScale - percent
                            self.device.videoZoomFactor = newScale
                            //
                            if count == 0 {
                                timer.cancel()
                            }
                        } catch {
                            print(error)
                        }
                    }
                    timer.resume()
                } catch {
                    print(error)
                }
            } else {
                // 差值
                let differ = availableMaxScale - self.device.videoZoomFactor
                let percent = differ / 8
                var newScale: CGFloat = 1.0

                let timer = DispatchSource.makeTimerSource(flags: [], queue: .main)
                var count = 8
                timer.schedule(wallDeadline: .now(), repeating: 0.25 / 8)
                timer.setEventHandler {
                    count -= 1
                    do {
                        try self.device.lockForConfiguration()
                        defer {
                            self.device.unlockForConfiguration()
                        }
                        //
                        newScale = newScale + percent
                        self.device.videoZoomFactor = newScale
                        //
                        if count == 0 {
                            timer.cancel()
                        }
                    } catch {
                        print(error)
                    }
                }
                timer.resume()
            }
        } else {
            // Fallback on earlier versions
        }
    }

    @objc func handlePinch(_ pinch: UIPinchGestureRecognizer) {
        switch pinch.state {
        case .began:
            initialScale = device.videoZoomFactor
        case .changed:
            var minAvailableZoomScale: CGFloat = 1.0
            var maxAvailableZoomScale: CGFloat = 1.0
            if #available(iOS 11.0, *) {
                minAvailableZoomScale = device.minAvailableVideoZoomFactor
                maxAvailableZoomScale = device.maxAvailableVideoZoomFactor
            }

            if maxAvailableZoomScale > maxZoomFactor {
                maxAvailableZoomScale = maxZoomFactor
            }

            let availableZoomScaleRange = minAvailableZoomScale ... maxAvailableZoomScale
            let resolvedZoomScaleRange = zoomScaleRange.clamped(to: availableZoomScaleRange)

            let resolvedScale = max(resolvedZoomScaleRange.lowerBound, min(pinch.scale * initialScale, resolvedZoomScaleRange.upperBound))

            do {
                try device.lockForConfiguration()
                defer {
                    device.unlockForConfiguration()
                }
                device.videoZoomFactor = resolvedScale
            } catch {
                print(error)
            }

        default:
            return
        }
    }

    @objc func p_dismiss() {
        let controllers = navigationController?.viewControllers
        if controllers != nil, controllers!.count > 1 {
            if controllers!.last == self {
                navigationController?.popViewController(animated: true)
            }
        } else {
            dismiss(animated: true, completion: nil)
        }
    }

    // 打开相册
    @objc func showPhotoAlbum() {
        _checkPhotoAlbum { (granted: Bool) in
            DispatchQueue.main.async {
                if granted {
                    // 打开相册
                    self.present(self.imagePicker, animated: true, completion: nil)
                } else {
                    self.p_showAlert(localizedString("请在”设置-隐私-相片”选项中，允许访问你的相册"))
                }
            }
        }
    }

    // MARK: - lazy

    lazy var scannerView: QYYScanView = {
        let tempView = QYYScanView(frame: view.bounds, config: config)
        tempView.delegate = self
        return tempView
    }()

    lazy var imagePicker: UIImagePickerController = {
        let imagePicker = UIImagePickerController()
        imagePicker.sourceType = .photoLibrary
        imagePicker.delegate = self
        imagePicker.modalPresentationStyle = .fullScreen
        return imagePicker
    }()
}

// 统一处理结果扫描
extension QYYScanViewController {
    func p_handlerResult(isSucc: Bool, value: String) {
        if isSucc {
            p_dismiss()
            // 回调
            scanClosure?(true, value, self)
        } else {
            // resume
            p_resumeScanning()
        }
    }

    // Just for test
    func p_handlerResult_Test(value: String) {
        // show Indicator
        scannerView._addActivityIndicator()
        // delay
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            // hide Indicator
            self.scannerView._removeActivityIndicator()
            // show Result Alert
            self.p_showAlert(value) { _ in
                // resume
                self.p_resumeScanning()
            }
        }
    }
}

// MARK: - 恢复/暂停扫一扫功能

extension QYYScanViewController {
    /// 恢复扫一扫功能
    private func p_resumeScanning() {
        if !session.isRunning {
            session.startRunning()
            scannerView._addScannerLineAnimation()
        }
    }

    /// 暂停扫一扫功能
    private func p_pauseScanning() {
        if session.isRunning {
            session.stopRunning()
            scannerView._pauseScannerLineAnimation()
        }
    }
}

// MARK: - 扫描结果处理

extension QYYScanViewController: AVCaptureMetadataOutputObjectsDelegate {
    public func metadataOutput(_: AVCaptureMetadataOutput, didOutput metadataObjects: [AVMetadataObject], from _: AVCaptureConnection) {
        if metadataObjects.count > 0 {
            //
            p_pauseScanning()
            if let metadataObject = metadataObjects[0] as? AVMetadataMachineReadableCodeObject {
                if let stringValue = metadataObject.stringValue {
                    // 处理结果
                    p_handlerResult(isSucc: true, value: stringValue)
                } else {
                    //
                    p_resumeScanning()
                }
            }
        }
    }
}

// MARK: - 识别选择图片

extension QYYScanViewController: UIImagePickerControllerDelegate & UINavigationControllerDelegate {
    public func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        picker.dismiss(animated: true, completion: nil)
    }

    public func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {
        picker.dismiss(animated: true, completion: nil)
        /// 识别二维码
        if let pickImage = info[UIImagePickerController.InfoKey(rawValue: UIImagePickerController.InfoKey.originalImage.rawValue)] as? UIImage {
            let ciImage = CIImage(cgImage: pickImage.cgImage!)
            let detector = CIDetector(ofType: CIDetectorTypeQRCode, context: nil, options: [CIDetectorAccuracy: CIDetectorAccuracyHigh])
            if let features = detector?.features(in: ciImage),
               let firstFeature = features.first as? CIQRCodeFeature
            {
                if let stringValue = firstFeature.messageString {
                    // 处理结果
                    p_handlerResult(isSucc: true, value: stringValue)
                } else {
                    p_showAlert(localizedString("处理失败"))
                }
            } else {
                p_showAlert(localizedString("请选择有效的二维码"))
            }
        }
    }
}

// MARK: - 监听光线亮度

extension QYYScanViewController: AVCaptureVideoDataOutputSampleBufferDelegate {
    public func captureOutput(_: AVCaptureOutput, didOutput _: CMSampleBuffer, from _: AVCaptureConnection) {
        /*
         let metadataDict = CMCopyDictionaryOfAttachments(allocator: nil, target: sampleBuffer, attachmentMode: kCMAttachmentMode_ShouldPropagate)
         if let metadata = metadataDict as? [AnyHashable: Any] {
             if let exifMetadata = metadata[kCGImagePropertyExifDictionary as String] as? [AnyHashable: Any] {
                 if let brightness = exifMetadata[kCGImagePropertyExifBrightnessValue as String] as? NSNumber {
                     // 亮度值。brightnessValue 值代表光线强度，值越小代表光线越暗
                     let brightnessValue = brightness.floatValue
                     if brightnessValue < -2.0 {
                         p_showAlert("光线过暗请打开灯光！")
                     }
                 }
             }
         }
          */
    }
}

// MARK: - LXScanView Delegate

extension QYYScanViewController: QYYScanViewDelegate {
    /// 闪光灯
    func ScanViewFlashLightBtnClick(_ status: Bool) {
        guard let device = AVCaptureDevice.default(for: .video) else {
            p_showAlert(localizedString("暂无设备")) { _ in
                self.p_dismiss()
            }
            return
        }
        if device.hasFlash, device.hasTorch {
            try? device.lockForConfiguration()
            device.torchMode = status ? .on : .off
            device.flashMode = status ? .on : .off
            device.unlockForConfiguration()
            // 改变按钮状态
            scannerView.changeFlashlightBtnStatus(status)
        } else {
            p_showAlert(localizedString("暂无设备"))
        }
    }

    /// 相册
    func ScanViewAlbumBtnClick() {
        showPhotoAlbum()
    }
}
