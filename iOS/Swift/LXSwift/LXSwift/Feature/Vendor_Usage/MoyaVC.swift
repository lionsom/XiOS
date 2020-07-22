//
//  MoyaVC.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/29.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

import Moya

class MoyaVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.white
        self.title = "String";
        
        
    }
    
    // Moya请求
    func method_easy() {
        let ApiProvider = MoyaProvider<LXApi>()
        
//        ApiProvider.request(LXApi.login("ll", "1234")) { result in
//            switch result {
//            case .success(Response):
//                print("Scc")
//            case .failure(Error):
//                print("err")
//            }
//        }
//
//        ApiProvider.request(LXApi.logout(parameters: ["name": "lx"])) { (Result<Response, MoyaError>) in
//            switch Result
//        }
    
    }
}

// 声明一个 enum 来对请求进行明确分类。
enum LXApi {
    
    case login(_ name: String, _ password: String)
    
    case logout(parameters: [String: Any])
}

// 让这个 enum 实现 TargetType 协议，在这里面定义我们各个请求的 url、参数、header 等信息。
extension LXApi: TargetType {
    var baseURL: URL {
        return NSURL.init(string: "http://www.baidu.com/")! as URL
    }
    
    var path: String {
        switch self {
        case .login:
            return "/login"
        case .logout:
            return "/logout"
        default:
            return "/"
        }
    }
    
    var method: Moya.Method {
        return .post
    }
    
    // 这个是做单元测试模拟的数据，必须要实现，只在单元测试文件中有作用
    var sampleData: Data {
        return "asdf".data(using: String.Encoding.utf8)!
    }
    
    var task: Task {
        var parmeters: [String : Any] = [:]

            switch self {
            case .login(let name, let password):
                parmeters["name"] = name
                parmeters["password"] = password
            case .logout(parameters: let parameters):
                parmeters = parameters
        }
        return .requestParameters(parameters: parmeters, encoding: URLEncoding.default)
    }
    
    // 在请求头内添加公共请求参数，也可以通过自定义closure返回endpoint，在provider中添加
    var headers: [String : String]? {
        return ["Content-type": "application/json"]
    }
    
    
}
