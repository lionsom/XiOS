[Swift官方文档](https://docs.swift.org/swift-book/ReferenceManual/Attributes.html)

[@available 和 #available](https://swift.gg/2016/04/13/swift-qa-2016-04-13/)

​		

Swift 2.0 中，引入了可用性的概念。对于函数，类，协议等，可以使用`@available`声明这些类型的生命周期依赖于特定的平台和操作系统版本。而`#available`用在判断语句中（if, guard, while等），在不同的平台上做不同的逻辑。



## 使用一览

```swift
// MARK: - @available #available 使用

@available(iOS 12, *)
func A() {
    print("")
}

func B() {
    if #available(iOS 8, *) {
        // iOS8及其以上系统运行
    }

    guard #available(iOS 8, *) else {
        return // iOS8以下系统就直接返回
    }
}

// MARK: - 多参数

@available(iOS 13, OSX 10.15, tvOS 13, watchOS 6, *)
func C() {
    // todo
}

// MARK: - 废弃

@available(*, deprecated, message: "不要再使用该方法了")
func E() {
    // todo
}

// MARK: -  约束swift版本

@available(swift 5.2)
func F() {
    // todo
}

// MARK: - 手动参数

@available(iOS, introduced: 9.0, message: "111")
func D() {
    // todo
}

// MARK: - 最全参数

@available(iOS, introduced: 7.0, deprecated: 10.0, message: "Please Use newFunction instead", renamed: "newFunction")
func oldFunction() {}

func newFunction() {}

// MARK: - #unavailable
// Swift 5.6(搭配 Xcode 13.3) 推出了跟 #available 意思相反的 #unavailable
func G() {
	// 表示 iOS 16 之前(不包含 16)的版本將採用 if { } 裡的寫法。
    if #unavailable(iOS 16.0) {
        // todo
    }
}
```



## 参数介绍

`@available(iOS 9, *)`必须包含至少2个特性参数，其中`iOS 9`表示必须在 iOS 9 版本以上才可用；
另外一个特性参数：星号（*），表示包含了所有平台，目前有以下几个平台：

- iOS
- iOSApplicationExtension
- OSX
- OSXApplicationExtension
- watchOS
- watchOSApplicationExtension
- tvOS
- tvOSApplicationExtension



`@available(iOS 9, *)`是一种简写形式。全写形式是`@available(iOS, introduced=9.0)`。`introduced=9.0`参数表示指定平台(iOS)从 9.0 开始引入该声明。为什么可以采用简写形式呢？当只有`introduced`这样一种参数时，就可以简写成以上简写形式。同理：@available(iOS 8.0, OSX 10.10, *) 这样也是可以的。表示同时在多个平台上（iOS 8.0 及其以上；OSX 10.10及其以上）的可用性。

另外，`@available`还有其他一些参数可以使用，分别是：

- **unavailable**：表示该声明在指定的平台上是无效的。

- **introduced**：表示指定平台从哪一版本开始引入该声明。格式如下：

    ```swift
    introduced: 版本号
    ```

- **deprecated**：表示指定平台从哪一版本开始弃用该声明。虽然被弃用，但是依然使用的话也是没有问题的。格式如下：若省略版本号，则表示目前弃用，同时可直接省略冒号。

    ```swift
    deprecated: 版本号
    ```

- **obsoleted**：表示指定平台从哪一版本开始废弃该声明。当一个声明被废弃后，它就从平台中移除，不能再被使用。格式如下：

    ```swift
    obsoleted: 版本号
    ```

- **message**：说明信息。当使用被弃用或者被废弃的声明时，编译器会抛出警告或错误信息。格式如下：

    ```swift
    message: "说明信息"
    ```

- **renamed**：新的声明名称信息。当使用旧声明时，编译器会报错提示修改为新名字。格式如下：

    ```swift
    renamed: "新的声明名称"
    ```

- 如果 **available** 特性除了平台名称参数外，只指定了一个 **introduced** 参数，那么可以使用以下简写语法代替：

    ```swift
    @available(平台名称 版本号, *)
    ```

    

