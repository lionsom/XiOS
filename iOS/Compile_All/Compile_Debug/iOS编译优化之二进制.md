# 参考

* [火掌柜 iOS 端基于 CocoaPods 的组件二进制化实践](https://www.infoq.cn/article/hiuoajjkns3_tvdaf0eg)
  * [Github - cocoapods-bin](https://github.com/tripleCC/cocoapods-bin)

* [iOS如何提高10倍以上编译速度](https://juejin.cn/post/6844904169124397070#heading-3)
  * [Github - cocoapods-imy-bin](https://github.com/MeetYouDevs/cocoapods-imy-bin)

[Q音直播编译优化与二进制集成方案](https://cloud.tencent.com/developer/article/1746681)

[Github - cocoapods-packager](https://github.com/CocoaPods/cocoapods-packager)

[Github - cocoapods-binary](https://github.com/leavez/cocoapods-binary)

[使用cocoapods-packager打包静态库](https://punmy.cn/2019/05/25/%E4%BD%BF%E7%94%A8cocoapods-packager%E6%89%93%E5%8C%85%E9%9D%99%E6%80%81%E5%BA%93.html)





### CCache

> ​		CCache 是一个编译缓存器，一个能够把编译的中间产物缓存起来的工具。



### distcc分布式编译



### Carthage

> ​		Carthage可以将一部分不常变的库打包成framework，再引如到主工程，这样可以减少开发过程中的编译时间。Carthage 可以比较方便地调试源码。因为我们目前已经大规模使用 CocoaPods，转用 Carthage 来做包管理需要做大量的转换工作，变动太大，不满足我们的`无侵入`、`无影响现有的业务`，所以不考虑这个方案了。



### 常规打包二进制

**工程脚手架 + 打包脚本**

这是常规的打包方式，我们可以选择不同的XCode工程模版来打包静态库(.a | .framework)或动态库(.tbd)。主要分以下几步：

1. 创建XCode模版工程，并配置好二进制包支持的架构等参数。
2. 执行 pod install/update 将需要的pod库引入。
3. 选择需要暴露的头文件。
4. 打包支持模拟器架构的静态库( Build Active Architecture Only=NO 可支持所有模拟器架构)
5. 打包支持真机架构的静态库。
6. 合并生成的静态库。

步骤1是要提前搭好的工程脚手架，后面的步骤可以编写打包脚本来简化操作。



### cocoapods-packager

> ​		cocoapods-packager是cocoapods官方的一款二进制打包插件，通过gem安装后可通过 pod package 命令行来生成 framework 或 static library。使用非常方便，只需要提供一个podspec文件即可完成打包。

看了一下插件的源码，实现逻辑倒也不复杂，关键步骤如下：

1. 将提供的podspec迁移到一个沙盒目录下，根据此podspec生成podfile文件。

  2. 执行 pod install 生成pod工程(podfile中需要设置配置项**intefrate_targets**为false，不然会因找不到target而报错)。

  3. xcodebuild 生成二进制包，然后合并模拟器及真机并输出到指定路径。



### cocoapod-binary

如果说cocoapods-packager仅仅是针对单个pod库的打包，那么cocoapod-binary则是对工程中整个pod库的二进制方案。它在 pod install 时通过将引入的pod库预编译成binary然后缓存至本地，后续工程编译直接link到binary，对于binary的pod库以几乎零编译成本的形式来提高整个项目的编译效率。

同时cocoapods-binary可以通过修改podfile灵活地切换源码和二进制，优化编译效率的同时也方便调试。











