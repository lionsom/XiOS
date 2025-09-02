[swift 中的KVC该如何使用](https://www.jianshu.com/p/ae07646ac9d2)





# KVC基本使用

## 原始类使用KVC

```swift
// 创建一个类，不继承任何类
class KVCTestClass {
    var name: String = "林"
    var age: Int = 99
}

// 给类中属性进行赋值
let kvc = KVCTestClass()
print("赋值前边:\(kvc.name)")
kvc.name = "lionsom"
print("赋值后:\(kvc.name)")

// 【成功】输出
赋值前边:林
赋值后:lionsom
```

```swift
// 使用`setValue:key:`给类中属性进行赋值
let kvc = KVCTestClass()
kvc.setValue("我很好", forKey: "name")

// 【错误】无法运行！！Xcode报错提示！！！
Value of type 'KVCTestClass' has no member 'setValue'
```

问题分析：

> 首先我们都知道使用KVC的重要一点就是需要实现`NSKeyValueCoding`的协议，因为所有的KVC核心的机制都在这个协议当中，而我们之所以在Objective-C 中可以直接使用不会报错，是因为我们在Objective-C 中创建类的时候xcode会默认为我们继承 NSObject基类。所以我们可以直接使用KVC进行读写操作。那么在swift中我们就需要手动去显示的继承一下NSObject类了。



## 改进继承NSObject

```swift
// 创建一个类，继承NSObject
class KVCTestClass: NSObject {
    var name: String = "林"
    var age: Int = 99
}

// 此时 再次 使用`setValue:key:`给类中属性进行赋值
let kvc = KVCTestClass()
kvc.setValue("我很好", forKey: "name")

// 【错误】可以运行！！运行崩溃！！！
2021-07-05 10:59:47.206444+0800 自学Swift[79125:5368516] *** Terminating app due to uncaught exception 'NSUnknownKeyException', reason: '[<自学Swift.KVCTestClass 0x60000164bf00> setValue:forUndefinedKey:]: this class is not key value coding-compliant for the key name.'
```



## 属性新增@objc

```swift
// 创建一个类，继承NSObject，属性新增@objc
class KVCTestClass: NSObject {
    @objc var name: String = "林"
    var age: Int = 99
}

// 使用`setValue:key:`给类中属性进行赋值
let kvc = KVCTestClass()
print("赋值前边:\(kvc.name)")
kvc.setValue("我很好", forKey: "name")
print("赋值后:\(kvc.name)")

// 【成功】输出
赋值前边:林
赋值后:我很好
```



## 使用总结

> ### 在swift中要使用KVC这种机制的话，继承NSObject这个类是必要条件，而且还需要显示的使用`@objc`关键字来声明一下才可以正常使用。



