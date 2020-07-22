# 一、Document

[stackoverflow - How to program a delay in Swift 3](https://stackoverflow.com/questions/38031137/how-to-program-a-delay-in-swift-3)

[stackoverflow - How do I write dispatch_after GCD in Swift 3, 4, and 5?](https://stackoverflow.com/questions/37801436/how-do-i-write-dispatch-after-gcd-in-swift-3-4-and-5)

[stackoverflow - How to create a delay in Swift?](https://stackoverflow.com/questions/27517632/how-to-create-a-delay-in-swift)





# 二、 How

```swift
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
```

