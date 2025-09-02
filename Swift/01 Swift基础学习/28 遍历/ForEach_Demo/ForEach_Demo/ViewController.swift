//
//  ViewController.swift
//  ForEach_Demo
//
//  Created by 启业云03 on 2023/1/10.
//

import UIKit

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    var array = [30, 40, 50, 60, 40, 70]

    // MARK: - 数组遍历

    // 下标遍历
    func traversal_1() {
        for i in 0 ..< array.count {
            let item = array[i]
            print(item)
        }
    }

    // 只要数组中的对象
    func traversal_2() {
        for item in array {
            print(item)
        }
    }

    // 下标和对象同时遍历
    func traversal_3() {
        for (i, item) in array.enumerated() {
            print("\(i) = \(item)")
        }
    }

    // Array.forEach
    func traversal_4() {
        array.forEach { value in
            print(value)

            if value == 40 {
                // 结束一次闭包调用
                return
            }
        }
    }

    // 带有步进的遍历
    func traversal_5() {
        // 顺序循环 0 至 10（不包括10），依次递增 2
        for index in stride(from: 0, to: 10, by: 2) {
            print(index)
        }

        // 逆序循环，10 至 0（包括0），依次递减 2
        for index in stride(from: 10, through: 0, by: -2) {
            print(index)
        }
    }

    // MARK: - 数组遍历删除

    func traversal_delete_11() {
        // ❎ ERROR 越界
        for i in 0 ..< array.count {
            let item = array[i]
            if item == 40 {
                array.remove(at: i)
            }
        }
        print(array)
    }

    func traversal_delete_12() {
        for item in array {
            if item == 40,
               let index = array.firstIndex(of: item)
            {
                print(index)
                print(array)
                array.remove(at: index)

                // OC 写法，❎ 崩溃
                // array.removeObject(item)
            }
        }
        print(array)
    }

    func traversal_delete_13() {
        for (_, item) in array.enumerated() {
            if item == 40,
               let index = array.firstIndex(of: item)
            {
                array.remove(at: index)
            }
        }
        print(array)
    }

    func traversal_delete_14() {
        array.forEach { value in
            if value == 40,
               let index = array.firstIndex(of: value)
            {
                array.remove(at: index)
            }
        }
        print(array)
    }

    func traversal_delete_1() {
        // 结论：❎索引会变，错乱，会越界崩溃
        // 入：[30, 40, 50, 60, 40, 70]
        // 出：[30, 50, 60, 40]
        for (index, item) in array.enumerated() {
            if item == 40 {
                array.remove(at: index)
            }
        }
        print(array)
    }

    func traversal_delete_2() {
        // 结论：reversed()加上数组倒序
        // 入：[30, 40, 50, 60, 40, 70]
        // 出：[30, 50, 60, 70]
        for (index, item) in array.enumerated().reversed() {
            if item == 40 {
                array.remove(at: index)
            }
        }
        print(array)
    }

    func traversal_delete_3() {
        // removeAll
        // 入：[30, 40, 50, 60, 40, 70]
        // 出：[30, 50, 60, 70]
        array.removeAll { value in
            if value == 40 {
                // true 是要移除的
                return true
            } else {
                return false
            }
        }
        print(array)

        // 精简写法
        // array.removeAll { $0 == 2 }
    }

    func traversal_delete_4() {
        // filter
        // 入：[30, 40, 50, 60, 40, 70]
        // 出：[30, 50, 60, 70]
        let arr = array.filter { value in
            if value == 40 {
                // fase 是不要
                return false
            } else {
                return true
            }
        }
        print(arr)
    }

    // MARK: 组合where

    func traversal_where() {
        for i in 1 ... 10 where i % 3 == 0 {
            print(i)
        }
    }

    // MARK: - 数组逆序遍历

    func reversed() {
        for i in array.reversed() {
            print(i)
        }
    }

    // MARK: - 遍历字符串

    let string = "Hello"

    func traversal_String() {
        for ch in string {
            print(ch)
        }
    }

    // MARK: - 遍历字典

    let userDict: [String: Int] = ["张三": 23, "李四": 24, "王五": 25]

    // 遍历方式1：for-in 之间必须用小括号包裹内容
    func traversal_Dict_1() {
        for (key, value) in userDict {
            print("\(key)的年龄为\(value)")
        }
    }

    // 遍历方式2：因为构建字典时，实际是将键值对构建成了Element对象，所以，elem就是这个对象
    func traversal_Dict_2() {
        for elem in userDict {
            print(elem)
            print("\(elem.key)的年龄为\(elem.value)")
        }
    }
}
