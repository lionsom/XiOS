//
//  StopWatchVC.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/27.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class StopWatchVC: UIViewController {
    // MARK: - ========== Variable ==========
    fileprivate let mainStopWatch: StopWatch = StopWatch()
    fileprivate let lapStopWatch: StopWatch = StopWatch()
    fileprivate var isPlay: Bool = false
    fileprivate var laps: [String] = []
    
    // MARK: - ========== UI ==========
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        view.backgroundColor = UIColor.white
        navigationItem.title = "秒表"
        
        // UI
        setUpView()
    }
    
    
    // MARK: - ========== UI ==========
    // 是否跟随屏幕旋转
    override var shouldAutorotate: Bool {
        return false
    }
    
    // 支持旋转的方向有哪些
    override var supportedInterfaceOrientations: UIInterfaceOrientationMask {
        return UIInterfaceOrientationMask.portrait
    }
    
    // 状态栏
    override var preferredStatusBarStyle: UIStatusBarStyle {
        if #available(iOS 13.0, *) {
            return UIStatusBarStyle.darkContent
        } else {
            // Fallback on earlier versions
            return UIStatusBarStyle.default
        }
    }
    
    // UI构建
    func setUpView() {
        view.addSubview(timerLabel)
        view.addSubview(lapTimerLabel)
        view.addSubview(lapBtn)
        view.addSubview(watchBtn)
        view.addSubview(tableView)
        
        // Layout
        lapTimerLabel.snp.makeConstraints { (make) in
            make.leading.equalTo(view.snp_centerXWithinMargins)
            make.trailing.equalToSuperview()
            make.topMargin.equalTo(50)
            make.height.equalTo(50)
        }
        
        timerLabel.snp.makeConstraints { (make) in
            make.leading.trailing.equalToSuperview()
            make.height.equalTo(50)
            make.top.equalTo(lapTimerLabel.snp.bottom)
        }
        
        lapBtn.snp.makeConstraints { (make) in
            // make.centerX.equalToSuperview()
            make.centerX.equalTo(view.snp.trailing).dividedBy(3)
            // make.top.equalTo(view.snp.bottom).multipliedBy(0.6)
            make.top.equalTo(timerLabel.snp.bottom).offset(50)
            make.width.height.equalTo(80)
        }
        
        watchBtn.snp.makeConstraints { (make) in
            // make.centerX.equalTo(view.snp.trailing).multipliedBy(0.6667)
            make.centerX.equalTo(view.snp.trailing).dividedBy(1.5)
            make.top.equalTo(lapBtn)
            make.width.height.equalTo(lapBtn)
        }
        
        tableView.snp.makeConstraints { (make) in
            make.leading.trailing.bottom.equalToSuperview()
            make.top.equalTo(watchBtn.snp.bottom).offset(100)
        }
        
        
        let initCircleButton: (UIButton) -> Void = { button in
            button.layer.cornerRadius = 0.5 * button.bounds.size.width
            button.layer.borderWidth = 1
            button.layer.borderColor = UIColor.randomColor().cgColor
            button.clipsToBounds = true
        }
        
        // 立刻刷新布局
        view.layoutIfNeeded()
        
        initCircleButton(lapBtn)
        initCircleButton(watchBtn)
    }

    // MARK: - ========== Action ==========
    @objc func lapBtnClick(sender: UIButton) {
        Log("lapBtnClick")
        
        if !isPlay {
            // 重置
            resetMainTimer()
            resetLapTimer()
            
            lapBtn.setTitle("", for: .normal)
            lapBtn.isEnabled = false
        }
        else {
            if let text = lapTimerLabel.text {
                laps.append(text)
            }
            tableView.reloadData()
            
            // 重置计数
            resetLapTimer()
            
            unowned let weakSelf = self
            lapStopWatch.timer = Timer.scheduledTimer(timeInterval: 0.035, target: weakSelf, selector: Selector.updateLapTimer, userInfo: nil, repeats: true)
            RunLoop.current.add(lapStopWatch.timer, forMode: RunLoop.Mode.common)
        }
    }
    
    @objc func watchBtnClick(sender: UIButton) {
        Log("watchBtnClick")
        
        lapBtn.isEnabled = true
        
        if !isPlay {
            unowned let weakSelf = self
            mainStopWatch.timer = Timer.scheduledTimer(timeInterval: 0.035, target: weakSelf, selector: Selector.updateMainTimer, userInfo: nil, repeats: true)
            lapStopWatch.timer = Timer.scheduledTimer(timeInterval: 0.035, target: weakSelf, selector: Selector.updateLapTimer, userInfo: nil, repeats: true)
            
            // 添加到RunLoop中，避免卡住
            RunLoop.current.add(mainStopWatch.timer, forMode: RunLoop.Mode.common)
            RunLoop.current.add(lapStopWatch.timer, forMode: RunLoop.Mode.common)
            
            isPlay = true
            watchBtn.setTitle("Stop", for: .normal)
            lapBtn.setTitle("Lap", for: .normal)
        }
        else {
            // 暂停
            mainStopWatch.timer.invalidate()
            lapStopWatch.timer.invalidate()
            
            isPlay = false
            
            watchBtn.setTitle("Start", for: .normal)
            lapBtn.setTitle("Reset", for: .normal)
        }
    }
    
    // MARK: - ========== Private ==========
    
    @objc func updateMainTimer() {
        updateTimer(mainStopWatch, label: timerLabel)
    }
    
    @objc func updateLapTimer() {
        updateTimer(lapStopWatch, label: lapTimerLabel)
    }
    
    func updateTimer(_ stopwatch: StopWatch, label: UILabel) {
        stopwatch.counter = stopwatch.counter + 0.035
        
        let tempCounter = (Int)(stopwatch.counter / 60)
        var minutes: String = "\(tempCounter)"
        if tempCounter < 10 {
            minutes = "0\(tempCounter)"
        }
        
        // 浮点数取余：truncatingRemainder
        var seconds: String = String(format: "%0.2f", stopwatch.counter.truncatingRemainder(dividingBy: 60))
        if stopwatch.counter.truncatingRemainder(dividingBy: 60) < 10 {
            seconds = "0" + seconds
        }
        
        // 刷新Label UI
        label.text = minutes + ":" + seconds
    }
    
    // Helper
    
    func resetMainTimer() {
        resetTimer(mainStopWatch, label: timerLabel)
        laps.removeAll()
        tableView.reloadData()
    }
    
    func resetLapTimer() {
        resetTimer(lapStopWatch, label: lapTimerLabel)
    }
    
    // 重置
    func resetTimer(_ stopwatch: StopWatch, label: UILabel) {
        stopwatch.timer.invalidate()
        stopwatch.counter = 0.0
        label.text = "00:00:00"
    }
    
    
    // MARK: - ========== Set&Get ==========
    lazy var lapTimerLabel: UILabel = {
        let label = UILabel()
        label.text = "00:00:00"
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: Specs.fontSize.small)
        label.textColor = UIColor.blue
        label.backgroundColor = UIColor.lightGray
        return label
    }()
    
    lazy var timerLabel: UILabel = {
        let label = UILabel()
        label.text = "00:00:00"
        label.textAlignment = .center
        label.font = UIFont.systemFont(ofSize: Specs.fontSize.large)
        label.textColor = UIColor.blue
        label.backgroundColor = UIColor.lightGray
        return label
    }()
    
    lazy var lapBtn: UIButton = {
        let btn = UIButton()
        btn.backgroundColor = UIColor.orange
        btn.setTitle("Lap", for: .normal)
        btn.setTitle("NO", for: .disabled)
        btn.setTitleColor(UIColor.green, for: .normal)
        btn.setTitleColor(UIColor.lightGray, for: .disabled)
        btn.titleLabel?.font = UIFont.systemFont(ofSize: 15)
        btn.addTarget(self, action: #selector(lapBtnClick(sender:)), for: .touchUpInside)
        btn.isEnabled = false    // 默认
        return btn
    }()

    lazy var watchBtn: UIButton = {
        let btn = UIButton()
        btn.backgroundColor = UIColor.orange
        btn.setTitle("Start", for: .normal)
        btn.titleLabel?.font = UIFont.systemFont(ofSize: 15)
        btn.addTarget(self, action: #selector(watchBtnClick(sender:)), for: .touchUpInside)
        return btn
    }()
    
    lazy var tableView: UITableView = {
        let tableView = UITableView(frame: .zero, style: .plain)
        tableView.delegate = self
        tableView.dataSource = self
        
        tableView.backgroundColor = UIColor.lightGray
        tableView.translatesAutoresizingMaskIntoConstraints = false
        tableView.tableFooterView = UIView()
        // separator
        tableView.separatorStyle = .singleLine
        tableView.separatorColor = UIColor.orange
        // register
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "lapCell")
        
        return tableView
    }()
    
    lazy var dataSource: [String] = {
        var arr: [String] = []
        return arr
    }()
}


// UITableView扩展
extension StopWatchVC: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return laps.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let identifier: String = "lapCell"
        
        let cell: UITableViewCell = tableView.dequeueReusableCell(withIdentifier: identifier, for: indexPath)
        
        
        cell.detailTextLabel?.text = String(indexPath.row)
        cell.textLabel?.text = laps[indexPath.row]
        
        return cell
    }
}


fileprivate extension Selector {
    static let updateMainTimer = #selector(StopWatchVC.updateMainTimer)
    static let updateLapTimer = #selector(StopWatchVC.updateLapTimer)
}
