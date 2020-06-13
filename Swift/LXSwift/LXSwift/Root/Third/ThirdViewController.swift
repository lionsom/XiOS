//
//  ThirdViewController.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/7.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class ThirdViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    private static let identifier = "CellId"

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        view.backgroundColor = UIColor.red
        self.navigationItem.title = "LeetCode"
        // 导航栏是否半透明
        navigationController?.navigationBar.isTranslucent = false
        
        setUpNavigationBar()
        
        setUpTableView()
    }
    
    deinit {
        Log("")
    }
    
    // MARK: - ========== UI ==========
    func setUpNavigationBar() {
        let leftBarButtonItem1 = UIBarButtonItem(title: "Learn", style: .plain, target: self, action: #selector(leftBarButtonClick(sender:)))
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
        let stringVC = FBMeViewController() //Learning_String_VC()
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
        var cell:UITableViewCell! = tableView.dequeueReusableCell(withIdentifier: ThirdViewController.identifier)
        
        //you CAN check this against nil, if nil then create a cell (don't redeclare like you were doing...
        if cell == nil {
            cell = UITableViewCell(style: UITableViewCell.CellStyle.default ,
                                   reuseIdentifier:ThirdViewController.identifier)
        }
        
        cell.textLabel?.text = "\(indexPath.row)"
        cell.detailTextLabel?.text = "哈哈哈"
        
        cell.imageView?.image = UIImage(named: "")
        
        return cell
    }
    
    // MARK: ===== UITableViewDelegate
    /// didSelect
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        Log("\(indexPath.row)")
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
        tv.register(UITableViewCell.self, forCellReuseIdentifier: ThirdViewController.identifier)
        return tv
    }()
    
}

