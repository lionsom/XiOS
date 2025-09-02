# 参考

* 官网
    * [XCTest - Apple Document](https://developer.apple.com/documentation/xctest)
    * [Engineering for Testability - WWDC 2017](https://developer.apple.com/videos/play/wwdc2017/414/)
    * [Testing Tips & Tricks - WWDC 2018](https://developer.apple.com/videos/play/wwdc2018/417/)
* 教程
    * [iOS Unit Testing and UI Testing Tutorial](https://www.kodeco.com/21020457-ios-unit-testing-and-ui-testing-tutorial)
        * [翻译 - iOS Swift单元测试 从入门到精通 Unit Test和UI测试 UITest](https://blog.csdn.net/zgpeace/article/details/109058602)



持续集成

[Continuous Integration With GitHub, Fastlane & Jenkins](https://www.raywenderlich.com/1774995-continuous-integration-with-github-fastlane-jenkins)

[Xcode Server for iOS: Getting Started](https://www.raywenderlich.com/12258400-xcode-server-for-ios-getting-started)

[iOS - Jenkins 实现 Unit Test 并输出测试结果、覆盖率](https://xiaoye220.github.io/Jenkins-UnitTest/)

[TDD Sample App: The Complete Collection …So Far](https://qualitycoding.org/tdd-sample-archives/)



[自动化测试在美团外卖的实践与落地](https://mp.weixin.qq.com/s/vLR1FqGi6TiICEcWzOnHfQ)

[iOS自动化测试的那些干货.md](https://github.com/LeoMobileDeveloper/Blogs/blob/master/iOS/iOS%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95%E7%9A%84%E9%82%A3%E4%BA%9B%E5%B9%B2%E8%B4%A7.md)





# 基本知识

黑盒测试：黑盒测试的时候，测试人员不需要接触源代码。是从App层面对其行为以及UI的正确性进行验证，黑盒测试由iOS测试完成。

白盒测试：白盒测试的时候，测试人员是可以直接接触待测试App的源代码的。白盒测试更多的是单元测试，测试人员针对各个单元进行各种可能的输入分析，然后测试其输出。白盒测试的测试代码通常由iOS开发编写。

灰盒测试：



## 自动化测试

> 自动化测试就是写一些测试代码，用代码代替人工去完成模块和业务的测试。

**其实不管是开发还是测试，如果你在不断的做重复性工作的时候，就应该问自己一个问题：是不是有更高效的办法？**

自动化测试有很多优点：

- 测试速度快，避免重复性的工作
- **避免regression，让开发更有信心去修改和重构代码(个人认为最大的优点)**
- 具有一致性。
- 有了自动化测试，持续集成（CI）会变得更可靠。
- 迫使开发人员写出更高质量的代码。（自动化测试不通过，代码不允许合并）

当然，自动化测试也有一些缺点。

- 开发和维护成本高。
- 不能完全替代人工测试。
- 无法完全保证测试的准确性 - 让代码去判断一段逻辑是否正确很容易，但是，让代码判断一个控件显示是否正确却没那么容易。

所以，在做自动化测试之前，首先要问自己几个问题？

- 这个测试业务的变动是否频繁？
- 这个测试业务是否属于核心功能？
- 编写测试代码的成本有多少？
- 自动化测试能保证测试结果的准确么？

通常，我们会选择那些**业务稳定，需要频繁测试的部分来编写自动化测试脚本**，其余的采用人工测试，人工测试仍然是iOS App开发中不可缺少的一部分。



# 框架选择

## XCode内置

**XCTest**。**XCTest**又可以分为两部分：**Unit Test** 和 **UI Test**，分别对应**单元测试**和**UI测试**。



## 三方库

成熟的三方框架通常提供了很多封装好的有好的接口，笔者综合对比了一些，推荐以下框架：

单元测试：

> 以下三个框架都是BDD([Behavior-driven development](https://en.wikipedia.org/wiki/Behavior-driven_development)) - 行为驱动开发。行为驱动开发简单来说就是先定义行为，然后定义测试用例，接着再编写代码。 **实践中发现，通常没有那么多时间来先定义行为，不过BDD中的domain-specific language (DSL)能够很好的描述用例的行为**。

- [Kiwi](https://github.com/kiwi-bdd/Kiwi) 老牌测试框架
- [specta](https://github.com/specta/specta) 另一个BDD优秀框架
- [Quick](https://github.com/Quick/Quick) 三个项目中Star最多，支持OC和Swift，优先推荐。

UI测试

- [KIF](https://github.com/kif-framework/KIF) 基于XCTest的测试框架，调用私有API来控制UI，测试用例用Objective C或Swift编写。
- [appium](https://github.com/appium/appium) 基于Client - Server的测试框架。App相当于一个Server，测试代码相当于Client，通过发送JSON来操作APP，测试语言可以是任意的，支持android和iOS。



# Unit Test - XCTest

[XCTest.md](./XCTest.md)











