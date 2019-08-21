
### 参考文档

> [Runtime 官方文档](https://developer.apple.com/documentation/objectivec/objective_c_runtime#//apple_ref/c/func/class_getName)
>
> [Objective-C Runtime Programming Guide](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Introduction/Introduction.html)
>
> [苹果维护的开源代码](https://opensource.apple.com/source/objc4/)
>
> [GUN维护的Runtime源码项目：`objc-runtime`](https://github.com/RetVal/objc-runtime)



0. 于德志 (@halfrost) 博客的三篇 Runtime
   * [ isa 和 Class](https://halfrost.com/objc_runtime_isa_class/)
   * [消息发送与转发](https://halfrost.com/objc_runtime_objc_msgsend/)
   * [如何正确使用 Runtime](https://halfrost.com/how_to_use_runtime/)
1. [iOS 模块注解—「Runtime面试、工作」看我就 🐒 了 ^_^.](https://www.jianshu.com/p/19f280afcb24)
2. [iOS进阶补完计划--通读runtime](https://www.jianshu.com/p/f82fe7ead6ce)
3. [Runtime知识点概括以及使用场景](https://blog.csdn.net/deft_mkjing/article/details/53789125)
4. [李峰峰runtime系列 - iOS Runtime之一：Class和meta-class](https://imlifengfeng.github.io/article/390/)
5. [Runtime的运用和减少应用崩溃](https://www.jianshu.com/p/35971a7e8bf6)
6. [结合 category 工作原理分析 OC2.0 中的 runtime](http://www.cocoachina.com/ios/20160804/17293.html)
7. [利用OC的消息转发机制实现多重代理](http://zziking.github.io)
8. [Effective Objective-C Notes：理解消息传递机制](https://www.zybuluo.com/MicroCai/note/64270)
9. [《Runtime消息传递总结》](https://www.jianshu.com/p/1a1fb1d884cc)
10. [iOS中类找不到方法时消息处理机制](https://www.jianshu.com/p/6e6a01d96d72)
11. [iOS~runtime理解](https://www.jianshu.com/p/927c8384855a)
12. [iOS Runtime详解](https://www.jianshu.com/p/6ebda3cd8052)
13. [你会遇到的runtime面试题（详）](https://www.jianshu.com/p/8345a79fd572)
14. [RunTime面试题及答案](https://blog.csdn.net/fzhlee/article/details/78893217)
15. [iOS开发 Runtime原理及使用（最后面试题详解）](http://www.code4app.com/blog-958584-47401.html)
16. [iOS 模块详解—「Runtime面试、工作」看我就 🐒 了 ^_^.](https://my.oschina.net/fadoudou/blog/1798657)
    - [项目：Runtime-RunLoop](https://github.com/CoderLN/Runtime-RunLoop)
17. [我也说说runtime的一道经典面试题](https://blog.csdn.net/u010548686/article/details/77017254)
18. [iOS源码解析：runtime<三>super,isKindOfClass,isMemberOfClass](http://www.cocoachina.com/articles/24984)
19. [关于Objective-C Runtime看我就够了](https://www.jianshu.com/p/f73ea068efd2)



>通过Category来看Runtime《[2019再看Category](https://github.com/lionsom/iOS-/blob/master/学习模块/2019再看Category.md)》-----**二、Category在Runtime层的实现原理（编译器的工作）**





## 一、Runtime简介 (参考：iOS 模块分解_Runtime面试、工作看我就 🐒 了 ^_^.)

[Objective-C Runtime Programming Guide](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Introduction/Introduction.html)



Objective-C 是基于 C 的，它为 C 添加了面向对象的特性。它将很多静态语言在编译和链接时期做的事放到了 runtime 运行时来处理，可以说 runtime 是我们 Objective-C 幕后工作者。

1.**runtime**（`简称运行时`），是一套 纯C(C和汇编)写的API。而 **OC 就是运行时机制**，也就是在运行时候的一些机制，其中最主要的是 **消息机制**。

2.对于 C 语言，**函数的调用在编译的时候会决定调用哪个函数**。

3.**运行时机制原理**：OC的函数调用称为消息发送，属于 **动态调用过程**。在 **编译的时候**并不能决定真正调用哪个函数，只有在真 **正运行的时候**才会根据函数的名称找到对应的函数来调用。

4.**事实证明：在编译阶段，OC 可以 调用任何函数，即使这个函数并未实现，只要声明过就不会报错，只有当运行的时候才会报错，这是因为OC是运行时动态调用的。而 C 语言 调用未实现的函数 就会报错**。

一、Runtime消息传递

二、Runtime消息转发


三、Runtime应用



















