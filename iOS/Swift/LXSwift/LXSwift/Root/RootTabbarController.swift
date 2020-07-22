//
//  RootTabbarController.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/7.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class RootTabbarController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        createSubVC()
    }
    
    func createSubVC() {
        let firstVC = FirstViewController()
        let firstNavi = UINavigationController(rootViewController: firstVC)
        var tabbar1_normal = UIImage(named:"tabbar_home_normal")
        tabbar1_normal = tabbar1_normal?.withRenderingMode(UIImage.RenderingMode.automatic)
        let tabbar1_select = UIImage(named:"tabbar_home_select")
        let tabItem1 = UITabBarItem(title: "主页", image: tabbar1_normal, selectedImage: tabbar1_select)
        tabItem1.imageInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0);  // 偏移
        firstNavi.tabBarItem = tabItem1
        
        let secondVC = SecondViewController()
        let secondNavi = UINavigationController(rootViewController: secondVC)
        let tabbar2_normal = UIImage(named:"tabbar_node_normal")
        let tabbar2_select = UIImage(named:"tabbar_node_select")
        let tabItem2 = UITabBarItem(title: "记录", image: tabbar2_normal, selectedImage: tabbar2_select)
        secondNavi.tabBarItem = tabItem2
        
        let thirdVC = ThirdViewController()
        let thirdNavi = UINavigationController()
        thirdNavi.addChild(thirdVC)
        let tabbar3_normal = UIImage(named:"tabbar_shop_normal")
        let tabbar3_select = UIImage(named:"tabbar_shop_select")
        let tabItem3 = UITabBarItem(title: "力扣", image: tabbar3_normal, selectedImage: tabbar3_select)
        thirdNavi.tabBarItem = tabItem3
        
        let forthVC = ForthViewController()
        let forthNavi = UINavigationController(rootViewController: forthVC)
        let tabbar4_normal = UIImage(named:"tabbar_person_normal")
        let tabbar4_select = UIImage(named:"tabbar_person_select")
        let tabItem4 = UITabBarItem(title: "个人", image: tabbar4_normal, selectedImage: tabbar4_select)
        forthNavi.tabBarItem = tabItem4
        
        // 添加
//        self.viewControllers = [firstNavi, secondNavi, thirdNavi]
        self.addChild(firstNavi)
        self.addChild(secondNavi)
        self.addChild(thirdNavi)
        self.viewControllers?.append(forthNavi)
        
        // 默认选择
        self.selectedIndex = 2

        //tabbar背景
        self.tabBar.barTintColor = UIColor.white
        //tabbar选中图片+文字颜色
        self.tabBar.tintColor = UIColor.red
        //tabbar未选择图片+文字颜色
        self.tabBar.unselectedItemTintColor = UIColor.black
        
//        self.tabBar.backgroundImage = UIImage();
//        self.tabBar.shadowImage = UIImage();
    }
    
    override func tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem) {
        
        let tabIndex = tabBar.items?.firstIndex(of: item)
        
        if tabIndex == 0 {
            item.badgeValue = "1"
            item.badgeColor = UIColor.blue
        }
        else if tabIndex == 1 {
            item.badgeValue = "2"
            item.badgeColor = UIColor.green
        }
        
        print("Line = \(#line), Function = \(#function) ")
    }
    
}
