//
//  SecondViewController.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/7.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class SecondViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    private static let identifier = "CellId"
    
    // MARK: - ========== LifeCycle ==========
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.blue
        self.navigationItem.title = "跟着道长敲代码";
        
        // 导航栏是否半透明
        self.navigationController?.navigationBar.isTranslucent = false
        
        // 导航栏构建
        self.setUpNavigationBar()
        
        setUpTableView();
        
    }
    
    deinit {
        Log("")
    }
    
    // MARK: - ========== UI ==========
    func setUpNavigationBar() {
        let leftBarButtonItem1 = UIBarButtonItem(title: "常用代码", style: .plain, target: self, action: #selector(leftBarButtonClick(sender:)))
        self.navigationItem.leftBarButtonItems = [leftBarButtonItem1]
    }
    
    func setUpTableView() {
        tableView.delegate = self
        tableView.dataSource = self
        view.addSubview(tableView)
        
        // Set layout for tableView.
        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: self.view.topAnchor),
            tableView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor),
            tableView.rightAnchor.constraint(equalTo: self.view.rightAnchor),
            tableView.leftAnchor.constraint(equalTo: self.view.leftAnchor)
        ])
    }
    
    // MARK: - ========== Action ==========
    @objc func leftBarButtonClick(sender: UIBarButtonItem) {
        let stringVC = StringVC()
        self.hidesBottomBarWhenPushed = true
        self.navigationController?.pushViewController(stringVC, animated: true)
        self.hidesBottomBarWhenPushed = false
    }

    // MARK: - ========== Delegate ==========
    // MARK: ===== UITableViewDataSource
    /// Section number
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1;
    }
    
    /// Row number
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 20
    }
    
    /// Cell
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        //declare a tableViewCell as an implicitly unwrapped optional...
        var cell:UITableViewCell! = tableView.dequeueReusableCell(withIdentifier: SecondViewController.identifier)

        //you CAN check this against nil, if nil then create a cell (don't redeclare like you were doing...
        if cell == nil {
            cell = UITableViewCell(style: UITableViewCell.CellStyle.default ,
                                   reuseIdentifier:SecondViewController.identifier)
        }
        // 附件视图
        cell.accessoryType = .disclosureIndicator
        
        if indexPath.row == 0 {
            cell.textLabel?.text = "FB"
        }
        else if indexPath.row == 1 {
            cell.textLabel?.text = "计时器"
        }
        else {
            cell.textLabel?.text = "\(indexPath.row)"
        }
        
        cell.imageView?.image = UIImage(named: "fb_games")
        
        return cell
    }
    
    // MARK: ===== UITableViewDelegate
    /// didSelect
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        if indexPath.row == 0 {
            let VC = FBMeViewController()
            self.hidesBottomBarWhenPushed = true
            self.navigationController?.pushViewController(VC, animated: true)
            self.hidesBottomBarWhenPushed = false
        }
        else if indexPath.row == 1 {
            let VC = StopWatchVC()
            self.hidesBottomBarWhenPushed = true
            self.navigationController?.pushViewController(VC, animated: true)
            self.hidesBottomBarWhenPushed = false
        }
        else {
            Log("\(indexPath.row)")
        }
    }
        
    // MARK: - ========== Set&Get ==========
    let tableView: UITableView = {
        let tv = UITableView()
        tv.backgroundColor = UIColor.white
        tv.translatesAutoresizingMaskIntoConstraints = false
        tv.tableFooterView = UIView()
        // separator
        tv.separatorStyle = .singleLine
        tv.separatorColor = UIColor.orange
        // register
        tv.register(UITableViewCell.self, forCellReuseIdentifier: SecondViewController.identifier)
        return tv
    }()
    
}
