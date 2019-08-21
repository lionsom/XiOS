











# 一、Cocopods各种问题汇总

> 推荐文档
>
> [iOS之CocoaPods常见问题汇总](https://blog.csdn.net/lvxiangan/article/details/73503690)



## 一、`GCC_PRECOMPILE_PREFIX_HEADER`重写

当导入 `pod 'Texture'` 时，遇到如下问题， **图1.1**
提示`GCC_PRECOMPILE_PREFIX_HEADER`重写，我们进入提示的文件查看，**图1.2**
发现：我们项目本身使用PCH，所以对`GCC_PRECOMPILE_PREFIX_HEADER`进行了设置，**图1.3**
而pod的库 Texture 也对其进行了设置，**图1.4**
从而导致改警告的发生，重写。

最终修改：在building setting中搜索 `GCC_PRECOMPILE_PREFIX_HEADER` ,然后在 `Other` 中添加上`$(inherited)`。**图1.5**，再次`pod install`，警告也就没有了。