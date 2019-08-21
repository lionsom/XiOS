











# 一、Cocopods各种问题汇总

> 推荐文档
>
> [iOS之CocoaPods常见问题汇总](https://blog.csdn.net/lvxiangan/article/details/73503690)



### 一、`GCC_PRECOMPILE_PREFIX_HEADER `重写
当导入 `pod 'Texture'` 时，遇到如下问题， ***图1.1***
提示`GCC_PRECOMPILE_PREFIX_HEADER`重写，我们进入提示的文件查看，***图1.2***
发现：我们项目本身使用PCH，所以对`GCC_PRECOMPILE_PREFIX_HEADER`进行了设置，***图1.3***
而pod的库 Texture 也对其进行了设置，***图1.4***
从而导致改警告的发生，重写。

最终修改：在building setting中搜索 `GCC_PRECOMPILE_PREFIX_HEADER ` ,然后在 `Other` 中添加上`$(inherited)`。***图1.5***，再次`pod install`，警告也就没有了。

[重要参考](https://www.jianshu.com/p/dd6fa8531d0c)
[辅助参考- stackoverflow](https://stackoverflow.com/questions/18376416/the-target-overrides-the-other-ldflags-build-setting-defined-in-pods-pods#)



![图1.1]()

![图1.2]()

![图1.3]()

![图1.4]()

![图1.5]()


### 二、- Use the `$(inherited)` flag, or - Remove the build settings from the target.

#### [stackoverflow同文](https://stackoverflow.com/questions/18376416/the-target-overrides-the-other-ldflags-build-setting-defined-in-pods-pods)
![问题截图]()

![解决方案]()


### 三、不要使用TextEdit编辑PodFile文件

```
[!] Smart quotes were detected and ignored in your Podfile. To avoid issues in the future, you should not use TextEdit for editing it. If you are not using TextEdit, you should turn off smart quotes in your editor of choice.
```

![使用TextEdit编辑警告](https://upload-images.jianshu.io/upload_images/1859399-cf9917e3c2961e8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


> ##### 解决方案：用Xcode打开Podfile 看看里面的pod类库是不是像中文引号 编辑改下就行了 在外面打开编辑就会产生这样的问题



### 四、overrides the `ENABLE_BITCODE` ......

![]()

> ##### 解决方案：`pod update` 将库更新一下，然后再`pod install` 就没有警告了。


### 五、[!] ERROR: Parsing unable to continue due to merge conflicts present in:

![]()

> ##### 解决方案：在`Podfile.lock` 和 `Manifest.lock` 中有冲突，解决下冲突即可。

![冲突]()


### 六、Cocoapod版本过低警告


![]()


> ##### 解决方案：`pod repo update` 命令更新资源库即可。