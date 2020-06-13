//
//  FBMeViewController.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/13.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class FBMeViewController: FBMeBaseViewController {
    // MARK - ========== LifeCycle ==========
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.

        title = "FaceBook"
        navigationController?.navigationBar.barTintColor = Specs.color.gray
        
        tableView.delegate = self
        tableView.dataSource = self
        view.addSubview(tableView)
        
        tableView.frame = view.frame
    }
    

    // MARK: - ========== Set&Get ==========
    
    typealias RowModel = [String : String]
    
    fileprivate var user: FBMeUser {
        get {
            return FBMeUser(name: "BayMax", education: "CMU")
        }
    }
    
    fileprivate var dataSource: [[String : Any?]] {
        get {
            return [["1": 12]]
        }
    }
    
    private let tableView: UITableView = {
        let tv = UITableView(frame: .zero, style: .grouped)
        tv.register(FBMeBaseCell.self, forCellReuseIdentifier: FBMeBaseCell.identifier)
        return tv
    }()
    
}

extension FBMeViewController: UITableViewDataSource {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 20
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: FBMeBaseCell.identifier, for: indexPath)
        
        cell.textLabel?.text = "sdsadf"
        cell.detailTextLabel?.text = "adsfsdasfafsd"
        
        return cell
    }
    
    
}


extension FBMeViewController: UITableViewDelegate {
    
}


