* [Github - Alamofire](https://github.com/Alamofire/Alamofire)
  * [Alamofire Reference](http://alamofire.github.io/Alamofire/)
  * [Usage](https://github.com/Alamofire/Alamofire/blob/master/Documentation/Usage.md#using-alamofire)
  * [Advanced Usage](https://github.com/Alamofire/Alamofire/blob/master/Documentation/AdvancedUsage.md)

* [Swift.org](https://swift.org/)

* [stackoverflow.com](https://stackoverflow.com/)

* 参考blog
  * [Alamofire 5.x 源码阅读分析(Source Code reading and analysis)](https://rayy.top/2019-2019-12-09-alamofire/)
  
  *  [Alamofire 5.4.0 源码学习目录合集](https://juejin.cn/post/6914685327172960263/)
  
       [Alamofire源码学习(一): Almofire文件结构图整理](https://juejin.cn/post/6907871142954926088)
       [Alamofire源码学习(二): Session](https://juejin.cn/post/6908711156773289998/)
       [Alamofire源码学习(三): Session相关的其他几个类](https://juejin.cn/post/6910223545154928648)
       [Alamofire源码学习(四): Request基类](https://juejin.cn/post/6910949808299573255)
       [Alamofire源码学习(五): Request的四个子类](https://juejin.cn/post/6914677667283337230/)
       [Alamofire源码学习(六): RequestInterceptor请求拦截器](https://juejin.cn/post/6915771618988032014/)
       [Alamofire源码学习(七): HTTPMethod与HTTPHeaders](https://juejin.cn/post/6915786108991176712/)
       [Alamofire源码学习(八): URLConvertible与URLRequestConvertible](https://juejin.cn/post/6916068820809416712/)
       [Alamofire源码学习(九): ParameterEncoding与ParameterEncoder](https://juejin.cn/post/6916833048394743821/)
       [Alamofire源码学习(十): URLEncodedFormEncoder--自定义的表单参数编码器](https://juejin.cn/post/6917257706319872007/#heading-16)
       [Alamofire源码学习(十一): MultipartFormData与MultipartUpload：多表单数据上传](https://juejin.cn/post/6921360348243034120/)
       [Alamofire源码学习(十二): 响应与解析](https://juejin.cn/post/6922832459331534861/)
       [Alamofire源码学习(十三): Cache](https://juejin.cn/post/6946112456007614478/)
       [Alamofire源码学习(十四): AFError](https://juejin.cn/post/6946493878862086158/)
       [Alamofire源码学习(十五): 服务器验证处理与身份验证处理](https://juejin.cn/post/6960223833919848462/)
       [Alamofire源码学习(十六): Alamofire中的线程安全](https://juejin.cn/post/6962915495892762638/)
       [Alamofire源码学习(十七): 工具扩展](https://juejin.cn/post/6970335587718922247)
       [Alamofire源码学习(十八): 调用解析](https://juejin.cn/post/6996211099682996232/)



[Alamofire学习（一）网络基础](https://juejin.cn/post/6844904119770038279)

[Alamofire（二）URLSession](https://juejin.cn/post/6844904119774216205)

[Alamofire（三）后台下载原理](https://juejin.cn/post/6844904119778410504)



## 支持

Alamofire 是基于苹果的 URLSession 的, 即 [URL Loading System](https://developer.apple.com/documentation/foundation/url_loading_system).

在 swift.org 论坛中有专门的版块提供 Alamofire 支持.

在 Stack Overflow 上也有.



## 代码行数

查看了一下 `Alamofire` 实现的代码行数：

```shell
# 安装
pod 'Alamofire', '~> 5.0'

# 找到源码路径下
➜ Alamofire git:(main) ✗ find Source -name "*.swift" | xargs cat |wc -l
   13416
```



## PodSpec

```swift
Pod::Spec.new do |s|
  s.name = 'Alamofire'
  s.version = '5.4.1'
  s.license = 'MIT'
  s.summary = 'Elegant HTTP Networking in Swift'
  s.homepage = 'https://github.com/Alamofire/Alamofire'
  s.authors = { 'Alamofire Software Foundation' => 'info@alamofire.org' }
  s.source = { :git => 'https://github.com/Alamofire/Alamofire.git', :tag => s.version }
  s.documentation_url = 'https://alamofire.github.io/Alamofire/'

  s.ios.deployment_target = '10.0'
  s.osx.deployment_target = '10.12'
  s.tvos.deployment_target = '10.0'
  s.watchos.deployment_target = '3.0'

  s.swift_versions = ['5.1', '5.2', '5.3']

  s.source_files = 'Source/*.swift'

  s.frameworks = 'CFNetwork'
end
```



## 文件分层

```
- Source
	- Alamore.swift
	- Core
		- Manager.swift
		- ParameterEncoding.swift
		- Request.swift
	- Features
		- Download.swift
		- MultipartFromData.swift
		- ResponseSeriallization.swift
		- Upload.swift
		- Validation.swift
```

* Alamofire.swift：提供 `AF` 名空间的定义。

* Core：包含 Session/Request/Response, 以及请求参数序列化等功能实现。

  ![](media_Alamofire/001.jpg)

* Extensions：包含任务调度相关的扩展, URLRequest 的相关扩展, Swift `Result` 扩展, 以及 URLSessionConfiguration 的 `default` 实现.

  

  ![](media_Alamofire/002.jpg)

* Feature：包含响应序列化实现, 便捷响应序列化处理等

  ![](media_Alamofire/003.jpg)



## 文件介绍 - Core

### Session.swift

> Session类是ALamofire的核心类, 封装了URLSession类, 管理所有的请求调度。

#### property

```swift
/// 一个默认的单例
public static let `default` = Session()
```

#### init

```swift
// Session有两个初始化方法, 一个必要初始化方法, 一个便捷初始化方法.

Creates a `Session` from a `URLSession` and other parameters.

Creates a `Session` from a `URLSessionConfiguration`.
```

#### deinit

```swift
deinit {
	finishRequestsForDeinit()
    session.invalidateAndCancel()
}

// MARK: - Invalidation

func finishRequestsForDeinit() {
    requestTaskMap.requests.forEach { request in
        rootQueue.async {
            request.finish(error: AFError.sessionDeinitialized)
        }
    }
}
```

#### All Requests API

```swift
// MARK: - All Requests API

/// 获取当前的请求Request
public func withAllRequests(perform action: @escaping (Set<Request>) -> Void) {
    rootQueue.async {
        action(self.activeRequests)
    }
}

/// 取消所有的请求Request
/// 这是一个异步操作，不会阻止创建将来的“请求”。
/// 已取消 “请求”由于内部工作，可能不会立即取消，如果在取消时接近完成，则可能根本不会取消。
public func cancelAllRequests(completingOnQueue queue: DispatchQueue = .main, completion: (() -> Void)? = nil) {
    withAllRequests { requests in
        requests.forEach { $0.cancel() }
        queue.async {
            completion?()
        }
    }
}
```

#### Request

* **DataRequest**

    ![](media_Alamofire/DataRequest.png)

* **DataStreamRequest**

    ![](media_Alamofire/DataStreamRequest.png)

* **DownloadRequest**

    ![](media_Alamofire/DownloadRequest.png)

* **UploadRequest**

    * **Data**
    * **File**
    * **InputStream**
    * **InputStream**

    ![](media_Alamofire/UploadRequest.png)





* URLConvertible+URLRequestConvertible.swift
  * `public protocol URLConvertible`：采用"URLConvertible"协议的类型可用于构建"URL"，然后可用于构建"URLRequests"。
  * `public protocol URLRequestConvertible`：采用"URLRequestConvertible"协议的类型可用于安全地构建"URLRequests"。
* Session.swift
  * `init`
  * `DataRequest`
  * `DataStreamRequest`
  * `DownloadRequest`
  * `UploadRequest`
  * `Internal API` 内部方法
* SessionDelegate.swift ：该类，实现各种"URLSessionDelegate"方法，以连接各种Alamofire功能。







## 代码分析

### AFError.swift

```swift
public enum AFError: Error {...}
// Public 权限修饰符
```



```swift
public var asAFError: AFError? {
		self as? AFError
}
/// as? 用法
```



```swift
public func asAFError(orFailWith message: @autoclosure () -> String, file: StaticString = #file, line: UInt = #line) -> AFError {
    guard let afError = self as? AFError else {
        fatalError(message(), file: file, line: line)
    }
    return afError
}
// guard 用法 与 if 区别
// @autoclosure 用法
```



```swift
extension Error {...}
// extension 用法
```



```swift
public var urlConvertible: URLConvertible? {
    guard case let .invalidURL(url) = self else { return nil }
    return url
}
// guard case 用法
```

[Pattern Matching, Part 4: if case, guard case, for case](https://alisoftware.github.io/swift/pattern-matching/2016/05/16/pattern-matching-4/)



### Alamofire.swift

```swift
/// Reference to `Session.default` for quick bootstrapping and examples.
public let AF = Session.default

/// Current Alamofire version. Necessary since SPM doesn't use dynamic libraries. Plus this will be more accurate.
let version = "5.4.1"

/// 命名空间？
```

[SPM - swift-package-manager](https://github.com/apple/swift-package-manager)



### Session.swift

> `Session`在其生命周期内创建和管理Alamofire的`Request`类型。它还为所有“请求”提供通用功能，包括排队，拦截，信任管理，重定向处理和响应缓存处理。

```swift
/// Shared singleton instance used by all `AF.request` APIs. Cannot be modified.
public static let `default` = Session()
// 单例如何写？
// default为何引号？
```

去除反引号，报错，default是关键字，需要使用反引号来规避它。

![](media_Alamofire/004.jpg)



```swift
// 必要初始化方法
public init(session: URLSession,
                delegate: SessionDelegate,
                rootQueue: DispatchQueue,
                startRequestsImmediately: Bool = true,
                requestQueue: DispatchQueue? = nil,
                serializationQueue: DispatchQueue? = nil,
                interceptor: RequestInterceptor? = nil,
                serverTrustManager: ServerTrustManager? = nil,
                redirectHandler: RedirectHandler? = nil,
                cachedResponseHandler: CachedResponseHandler? = nil,
                eventMonitors: [EventMonitor] = []) {
		//.....
}
/// 方便初始化方法
public convenience init(configuration: URLSessionConfiguration = URLSessionConfiguration.af.default,
                            delegate: SessionDelegate = SessionDelegate(),
                            rootQueue: DispatchQueue = DispatchQueue(label: "org.alamofire.session.rootQueue"),
                            startRequestsImmediately: Bool = true,
                            requestQueue: DispatchQueue? = nil,
                            serializationQueue: DispatchQueue? = nil,
                            interceptor: RequestInterceptor? = nil,
                            serverTrustManager: ServerTrustManager? = nil,
                            redirectHandler: RedirectHandler? = nil,
                            cachedResponseHandler: CachedResponseHandler? = nil,
                            eventMonitors: [EventMonitor] = []) {
 		//...... 
}

/// convenience修饰方法有什么用？
```



```swift
public func withAllRequests(perform action: @escaping (Set<Request>) -> Void) {
		//......
}
/// 函数参数为什么这样写？
```





















