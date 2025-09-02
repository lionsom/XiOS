[猫神 — 命名空间](https://swifter.tips/namespace/)



# 什么是命名空间

众所周知C++中是有命名空间的说法，比如我们将使用的 `using namespace std;` 我们就可以直接使用 `std` 空间下的 `cout`，而不必每次都这样 `std::cout` 加一个 `std::`。

Swift中是没有像C++那样 **显示** 的命名空间说法的。但是强大的Swift语言支持是可以帮我们完成的。

​		Swift 的命名空间是基于 module 而不是在代码中显式地指明，每个 module 代表了 Swift 中的一个命名空间。也就是说，同一个 target 里的类型名称还是不能相同的。



## 同一模块

同一个模块中实现命名空间，其实就是通过 **类型嵌套限定使用范围。**

另一种策略是使用 **类型嵌套** 的方法来 **指定访问的范围**。常见做法是将名字重复的类型定义到不同的 struct 中，以此避免冲突。这样在不使用多个 module 的情况下也能取得隔离同样名字的类型的效果：

```swift
struct MyClassContainer1 {
    class MyClass {
        class func hello() {
            print("hello from MyClassContainer1")
        }
    }
}

struct MyClassContainer2 {
    class MyClass {
        class func hello() {
            print("hello from MyClassContainer2")
        }
    }
}
```

使用时：

```swift
MyClassContainer1.MyClass.hello()
MyClassContainer2.MyClass.hello()
```



## 不同模块

​		在我们进行 app 开发时，默认添加到 app 的主 target 的内容都是处于同一个命名空间中的，我们可以通过创建 Cocoa (Touch) Framework 的 target 的方法来新建一个 module，这样我们就可以在两个不同的 target 中添加同样名字的类型了：

```swift
// MyApp.swift
// 这个文件存在于 app 的主 target 中
class MyClass {
    class func hello() {
        print("hello from app")
    }
}

// MyFramework.swift
// 这个文件存在于 MyFramework.framework 中
public class MyClass {
    public class func hello() {
        print("hello from framework")
    }
}

```

在使用时，如果出现可能冲突的时候，我们需要在类型名称前面加上 module 的名字 (也就是 target 的名字)：

```swift
MyClass.hello()
// hello from app

MyFramework.MyClass.hello()
// hello from framework
```





# 为什么需要命名空间

​		有时候我们使用别人的第三方库或者我们写库来供他人使用的时候，就可能出现变量、方法等出现重名的情况。那么如果有命名空间的存在的话，就可以达到各司其职的作用。比如第三方库和你的项目中对UIView进行了扩展，可直接通过某个view.width获取宽度，但是我们项目中也进行了扩展，可能会出现编译不通过的情况。那么我们下面用命名空间来解决。





# 实现自己的『命名空间』

[Versatile namespace in Swift](https://medium.com/@thibault.wittemberg/versatile-namespace-in-swift-3e8bbd6b6250)

[RxSwift/Reactive.swift](https://github.com/ReactiveX/RxSwift/blob/0b66f666ba6955a51cba1ad530311b030fa4db9c/RxSwift/Reactive.swift)

[Swift的命名空间式的拓展实现](https://blog.hudongdong.com/swift/1077.html)

[Swift 命名空间](https://juejin.cn/post/6844903886407335950#heading-2)



## 普通版 - UIButton的命名空间¡¡

```swift
// MARK: - 针对UIButton单个的命名空间
struct ButtonNameSpace {
    private let button: UIButton   //存储的实例对象¡¡

    init(button: UIButton) {
        self.button = button
    }

    func hello() {
        let title = self.button.title(for: .normal) ?? ""
        print("Hello!!! \(title)")
    }
}

extension UIButton {
    var nameSpace: ButtonNameSpace {
        return ButtonNameSpace(button: self)
    }
}
```

调用

```swift
// 简单的命名空间测试
let myBtn = UIButton()
myBtn.setTitle("my button", for: .normal)
myBtn.nameSpace.hello()
```



## 通用版 - 泛型

```swift
// MARK: - 通用的命名空间
struct MyNameSpace<Base> {
    private let base: Base

    init(base: Base) {
        self.base = base
    }
}
```

UIButton

```swift
// MARK: UIButton
extension MyNameSpace where Base: UIButton {
    func hello() {
        let title = self.base.title(for: .normal) ?? ""
        print("Hello \(title)")
    }
}

extension UIButton {
    var myNameSpace: MyNameSpace<UIButton> {
        return MyNameSpace(base: self)
    }
}
```

UIImage

```swift
// MARK: UIImage
extension MyNameSpace where Base: UIImage {
    func hello() {
        let title = self.base.accessibilityHint ?? ""
        print("Hello \(title)")
    }
}

extension UIImage {
    var myNameSpace: MyNameSpace<UIImage> {
        return MyNameSpace(base: self)
    }
}
```

调用

```swift
// 通用的命名空间测试
let myButton = UIButton()
myButton.setTitle("My button", for: .normal)
myButton.myNameSpace.hello()

let myImage = UIImage()
myImage.accessibilityHint = "My Image"
myImage.myNameSpace.hello()
```



## 更高阶 - 协议

为了更加方便统一，这里可以使用协议约束一下命名，防止出现`String`调用的时候是`hd`，`View`调用的时候关键词变成了`md`这种问题。



**定义一个泛型类**

```swift
// 定义泛型类
// 首先定义一个泛型类 JTKit，使用泛型 Base
public struct JTKit<Base> {
    private let base: Base
    public init(_ base: Base) {
        self.base = base
    }
}
```

**定义泛型协议**

定义了一个 JTWrappable 协议，这个协议代表了支持 namespace 形式的扩展。并紧接着给这个协议 extension 了默认实现。这样实现了这个协议的类型就不需要自行实现协议所约定的内容了。

```swift
// 定义泛型协议
// 定义支持泛型的协议 JTWrappable，并通过协议扩展提供协议的默认实现，返回实现泛型类 JTKit 的对象自身。
public protocol JTWrappable {
    // associatedtype：相关类型。意思也就是被associatedtype关键字修饰的变量，相当于一个占位符，而不能表示具体的类型。具体的类型需要让实现的类来指定。
    associatedtype WrappableType 
    
    var jt: WrappableType { get }
}

// 协议的扩展
public extension JTWrappable {
    var jt: JTKit<Self> {
        get { return JTKit(self) }
    }
}
```

**实现命名空间 jt**

需要实现命名空间的类提供 JTWrappable 协议扩展，并实现相关命名空间的对象方法（主要是扩展新的方法，如代码中的 testMethod 方法）

```swift
extension String: JTWrappable {}

// String 命名空间 jt 中的函数
extension JTKit where Base == String {
    public var testMethod: String {
        return base + "namespace"
    }
    
    public func method(str: String) -> String {
        return base + str
    }
}
```

**使用**

```swift
let str = "Hello "
print(str.jt.testMethod)
print(str.jt.method(str: "namespace"))

---输出结果：---
Hello namespace
Hello namespace
```















