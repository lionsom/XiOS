//
//  ThirdViewController.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/7.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

import SwiftyJSON
import SVProgressHUD

class ThirdViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, ThirdCellDelegate {

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
        tableView.register(ThirdCell.self, forCellReuseIdentifier: ThirdViewController.identifier)
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
    // MARK: ===== ThirdCellDelegate
    func thirdCellDetailBtnClick(fromCell: ThirdCell, didClickBtn: UIButton) {
        Log(fromCell.titleLabel.text! + fromCell.descLabel.text!)
    }
    
    // MARK: ===== UITableViewDataSource
    /// Section number
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    /// Row number
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.dataSource.count
    }
    
    /// Cell
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell: ThirdCell = tableView.dequeueReusableCell(withIdentifier: ThirdViewController.identifier, for: indexPath) as! ThirdCell
        
        // 附件视图
        cell.accessoryType = .disclosureIndicator
        // 点击
        cell.selectionStyle = .none
        // set delegate
        cell.delegate = self
        
        // 获取数据源
        let result = self.dataSource[indexPath.row] as! ThirdResult.MResult
        
        // set model
        cell.model = ThirdModel(title: result.title!, avatar: result.avatar!, detail: result.detail!)
            
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 100.0
    }
    
    // MARK: ===== UITableViewDelegate
    /// didSelect
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)

        // 根据字符串转Class
        let result = self.dataSource[indexPath.row] as! ThirdResult.MResult
        let vcname = result.detail
        if let vc = vcname?.stringChangeToVC() {
            self.hidesBottomBarWhenPushed = true
            self.navigationController?.pushViewController(vc, animated: true)
            self.hidesBottomBarWhenPushed = false
        }
        else {
            SVProgressHUD.showError(withStatus: "暂不支持")
        }
    }
    
    // MARK: - ========== Set&Get ==========
    let tableView: UITableView = {
        let tv = UITableView()
        tv.backgroundColor = UIColor.white
        tv.translatesAutoresizingMaskIntoConstraints = false
        tv.tableFooterView = UIView()
        // separator
        tv.separatorStyle = .none //.singleLine
        tv.separatorColor = UIColor.orange
        // register
        tv.register(UITableViewCell.self, forCellReuseIdentifier: ThirdViewController.identifier)
        return tv
    }()
    
    
    var dataSource: NSArray = {
        var arr = NSMutableArray()
        let mainBundle = Bundle.main
        
        let aa = mainBundle.bundleIdentifier
        let vv = mainBundle.infoDictionary
        
        let b = mainBundle.bundleURL
        let c = mainBundle.bundlePath
        let d = mainBundle.resourceURL
        let e = mainBundle.resourcePath
       
        let jsonfile = mainBundle.path(forResource: "ThirdJSON", ofType: "geojson")
        if jsonfile != nil {
            let json = try! String(contentsOfFile: jsonfile!, encoding: String.Encoding.utf8)
            
            guard let urlPath = Bundle.main.path(forResource: "ThirdJSON", ofType: "geojson") else { return [] }
            do {
                let data = try Data(contentsOf: URL(fileURLWithPath: jsonfile!))
                let jsonData: Any = try JSONSerialization.jsonObject(with: data, options: JSONSerialization.ReadingOptions.mutableContainers)
                let newStr = String(data: data, encoding: String.Encoding.utf8)

                print("present = ", jsonData)

                let decoder = JSONDecoder()
                let result = try decoder.decode(ThirdResult.self, from: data)
                
                return result.datas as NSArray

            } catch let error {
                print(error)
                return []
            }
        }
        return []
    }()
    
}

