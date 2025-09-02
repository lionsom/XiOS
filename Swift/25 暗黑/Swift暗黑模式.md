





Dark Mode在iOS 13中引入，并在WWDC 2019上宣布。



## 监听方法

```objective-c
+ (UIColor *)colorWithDynamicProvider:(UIColor * (^)(UITraitCollection *))dynamicProvider API_AVAILABLE(ios(13.0), tvos(13.0)) API_UNAVAILABLE(watchos);
- (UIColor *)initWithDynamicProvider:(UIColor * (^)(UITraitCollection *))dynamicProvider API_AVAILABLE(ios(13.0), tvos(13.0)) API_UNAVAILABLE(watchos);
```



## 整个APP禁用暗黑

Info.plist设置属性User Interface Style值为Light或者Dark；



## 局部设置暗黑

> 影响范围：所有子视图内容都变更。

* 按『Window - 窗口』设置暗黑模式：window.overrideUserInterfaceStyle = .dark

* 按『Controller - 视图控制器』设置暗黑模式：self.overrideUserInterfaceStyle = .dark

* 按『View - 视图』设置暗黑模式：view.overrideUserInterfaceStyle = .dark





## 系统调用更新方法，自定义重绘视图

#### UIView

```objective-c
traitCollectionDidChange(_:)
layoutSubviews()
draw(_:)
updateConstraints()
tintColorDidChange()
```

#### UIViewController

```objective-c
traitCollectionDidChange(_:)
updateViewConstraints()
viewWillLayoutSubviews()
viewDidLayoutSubviews()
```

#### UIPresentationController

```objective-c
traitCollectionDidChange(_:)
containerViewWillLayoutSubviews()
containerViewDidLayoutSubviews()
```









# 参考文档：

[Apple Developer - Supporting Dark Mode in Your Interface](https://developer.apple.com/documentation/uikit/appearance_customization/supporting_dark_mode_in_your_interface?changes=latest_minor)




[优酷暗黑模式（一）：是什么、为什么、如何落地？](https://www.infoq.cn/article/Sy4NPCGHfORmmLNkKvwU)

[优酷暗黑模式（二）：如何建立设计语言标准化管理体系](https://www.infoq.cn/article/o6rV3ouO6Ov9IMRzc031)

[优酷暗黑模式（三）：暗黑模式设计指南](https://www.infoq.cn/article/NxQZLV2LgxX99Dpouptx)

[优酷暗黑模式（四）：设计标准化的技术实现](https://www.infoq.cn/article/25qyLzNl81VjDafyxfUa)

[优酷暗黑模式（五）：暗黑模式的技术实现策略](https://www.infoq.cn/article/MrWamDDNZuLz9jygPcVD)

[优酷暗黑模式（六）：暗黑模式的技术支撑 iOS](https://www.infoq.cn/article/Lblg6Zk1YO1VVj9DPNbc)

[优酷暗黑模式（七）：暗黑模式的技术支撑 Weex & H5](https://www.infoq.cn/article/ieOS9tuW8jP2ZPc1xjp4)

[优酷暗黑模式（八）：分发场景落地（Android & iOS）](https://www.infoq.cn/article/zeyq5X0mC3941YZmwl4C?utm_source=related_read&utm_medium=article)



[百度APP iOS暗黑模式适配的完美解决方案](https://developer.baidu.com/article.html#/articleDetailPage?id=290490)



[DKNightVersion](https://github.com/draveness/DKNightVersion)

[SwiftTheme](https://github.com/wxxsw/SwiftTheme)

[JXTheme](https://github.com/pujiaxin33/JXTheme)

