//
//  UsageVC.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/22.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class UsageVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor.white
        self.title = "常用的方法举例";
        
        
        enumTest()
        
        Error()
        
        deferFunc()
    }
    
    // MARK: - ========== UserDefaults ==========
    func UserDefaults_Usage() {
        // Store
        UserDefaults.standard.set(true, forKey: "Key1")      //Bool
        UserDefaults.standard.set(1, forKey: "Key2")         //Integer
        UserDefaults.standard.set("TEST", forKey: "Key3")    //setObject
        
        // Retrieve
        UserDefaults.standard.bool(forKey: "Key1")
        UserDefaults.standard.integer(forKey: "Key2")
        UserDefaults.standard.string(forKey: "Key3")
        
        // Remove
        UserDefaults.standard.removeObject(forKey: "Key1")
        
        // Remove all Keys
        if let appDomain = Bundle.main.bundleIdentifier {
            UserDefaults.standard.removePersistentDomain(forName: appDomain)
        }
    }
    
    // MARK: - ========== 延迟执行 ==========
    func delayExecute() {
        // 1.perform(必须在主线程中执行)
        perform(#selector(performCallBack), with: nil, afterDelay: 4.0)
        // cancel
        NSObject.cancelPreviousPerformRequests(withTarget: self)

        // 2.timer(必须在主线程中执行)
        Timer.scheduledTimer(timeInterval: 4.0, target: self, selector: #selector(scheduledTimerCallBack), userInfo: nil, repeats: false)
        
        // 3.Thread (在主线程会卡主界面)
        sleep(4)
        
        // 4.GCD 主线程/子线程
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            // your code
        }
        DispatchQueue.global().asyncAfter(deadline: .now() + 3) {
            // your code
        }
        
        // 秒
        let seconds = 1.5
        DispatchQueue.main.asyncAfter(deadline: .now() + seconds) {
            print("1.5 seconds later")
        }
        // 毫秒
        DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(500)) {
            print("500 msec seconds later")
        }
        // 微秒
        DispatchQueue.main.asyncAfter(deadline: .now() + .microseconds(1_000_000)) {
            print("1m μs seconds later")
        }
        // 纳秒
        DispatchQueue.main.asyncAfter(deadline: .now() + .nanoseconds(1_500_000_000)) {
            print("1.5b nsec seconds later")
        }
    }
    
    @objc func performCallBack() {
        print("just call back")
    }
    
    @objc func scheduledTimerCallBack() {
        print("just call back")
    }
    
    // MARK: - ========== FatherAndSon ==========
    func FatherAndSon() {
         let s = Son(name: "Lin", school: "JS")
         s.run()
         Log("name = \(s.name),age = \(s.age),sex = \(s.sex), school = \(s.school)")
         
         s.study = "哇哈哈"
         Log("study = \(s.study), school = \(s.school)")
    }
    
    // MARK: - ========== Enum枚举 ==========
    func enumTest() {
        let ace = Rank.ace
        let aceRawValue = ace.rawValue
        Log("\(ace) + \(aceRawValue)")
        
        // 使用 init?(rawValue:) 初始化构造器来从原始值创建一个枚举实例。
        if let convertedRank = Rank(rawValue: 3) {
            let threeSimpleDesc = convertedRank.simpleDescription()
            Log(threeSimpleDesc)
        }
    
        let hearts = Suit.hearts
        let heartsDescription = hearts.simpleDescription()
        Log("\(hearts) + \(heartsDescription)")
        
        let threeOfSpades = Card(rank: .three, suit: .spades)
        let threeOfSpadesDescription = threeOfSpades.simpleDescription()
        Log("\(threeOfSpades) + \(threeOfSpadesDescription)")
    }
    
    // MARK: - ========== Error ==========
    func Error() {
        // 方法一：do-catch
        do {
            let printerResponse = try send(job: 100, toPrinter: "AAA")
            Log(printerResponse)
        } catch PrinterError.outOfPaper {
            Log("catch - PrinterError.outOfPaper")
        } catch PrinterError.noToner {
            Log("catch - PrinterError.outOfPaper")
        } catch {
            Log(error)
        }
        
        // 方法二：try?
        // 使用 try? 将结果转换为可选的。如果函数抛出错误，该错误会被抛弃并且结果为 nil。否则，结果会是一个包含函数返回值的可选值。
        let printerSuccess = try? send(job: 1884, toPrinter: "AAA")
        Log(printerSuccess)
    }
    
    // MARK:- ========== defer ==========
    /*
     使用 defer 代码块来表示在函数返回前，函数中最后执行的代码。无论函数是否会抛出错误，这段代码都将执行。
     使用 defer 可以把函数调用之初就要执行的代码和函数调用结束时的扫尾代码写在一起，虽然这两者的执行时机截然不同。
     */
    func deferFunc() {
        Log("代码前...")
        defer {
            Log("代码后...")
        }
        Log("代码中...")
    }
    

}
