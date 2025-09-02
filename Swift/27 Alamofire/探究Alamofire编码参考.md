## 判断是否可以导入头文件

```swift
#if canImport(FoundationNetworking)
@_exported import FoundationNetworking
#endif
```



## 判断最新版本

```swift
// Enforce minimum Swift version for all platforms and build systems.
#if swift(<5.3)
#error("Alamofire doesn't support Swift versions below 5.3.")
#endif
```



## 单例

```swift
/// 一个默认的单例
public static let `default` = Session()
```
