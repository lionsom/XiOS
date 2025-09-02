//: [Previous](@previous)

import Foundation

var greeting = "Hello, playground"

//: [Next](@next)

func swapValues<T>(_ a: inout T, _ b: inout T) {
    (a, b) = (b, a)
}

var i1 = 10
var i2 = 20
swapValues(&i1, &i2)

var d1 = 10.0
var d2 = 20.0
swapValues(&d1, &d2)

func GCDTest2() {
    let myQueue = DispatchQueue(label: "com.myQueue", qos: .default, attributes: .concurrent, autoreleaseFrequency: .workItem, target: nil) // 并行队列
    myQueue.sync { // 任务一
        for _ in 0 ... 10 {
            print("任务1......")
        }
    }
    myQueue.sync {
        for _ in 0 ... 5 {
            print("任务2++++++")
        }
    }
//        // barrier 会等待上面执行完毕再执行下面的，会阻塞当前线程
//        myQueue.async(group: nil, qos: .default, flags: .barrier, execute: {//2.
//            print("000000")
//        })
//
//        myQueue.async {
//            print("111111")
//        }
}

GCDTest2()
