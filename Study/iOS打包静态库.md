

## 一、自制简单的Framework

```
armv6｜armv7｜armv7s｜arm64|arm64e 都是ARM处理器的指令集
i386｜x86_64 是Mac处理器的指令集

指令集对应的机型：
2018 A12芯片arm64e ： iphone XS、 iphone XS Max、 iphoneXR
2017 A11芯片arm64： iPhone 8, iPhone 8 Plus, and iPhone X
2016 A10芯片arm64：iPhone 7 , 7 Plus, iPad (2018)
2015 A9芯片arm64： iPhone 6S , 6S Plus 
2014 A8芯片arm64： iPhone 6 , iPhone 6 Plus
2013 A7芯片arm64： iPhone 5S
armv7s：iPhone5｜iPhone5C｜iPad4(iPad with Retina Display)
armv7：iPhone4｜iPhone4S｜iPad｜iPad2｜iPad3(The New iPad)｜iPad mini｜iPod Touch 3G｜iPod Touch4
armv6: iPhone、iPhone 2、iPhone 3G、iPod Touch(第一代)、iPod Touch(第二代)


模拟器32位处理器测试需要i386架构，
模拟器64位处理器测试需要x86_64架构，
真机32位处理器需要armv7,或者armv7s架构，
真机64位处理器需要arm64架构。
```



### 1.1、创建项目

![](media/media_Library/自制001.jpg)



### 1.2、支持所有模拟器机型 / 真机机型架构

设置 `Build Active Architecture Only 设为 NO`

![](media/media_Library/自制002.jpg)



### 1.3、终端查看静态库所支持的架构

```
$ lipo -info xxx.framework
```



### 1.4、设置Framework为静态库

默认打出来的是动态库

![](media/media_Library/自制003.jpg)



### 1.5、将头文件暴露出去，供外界使用

![](media/media_Library/自制005.jpg)



### 1.6、在头文件中导入所有公开的头文件

![](media/media_Library/自制007.jpg)



### 1.7、选择Debug / Release环境

![](media/media_Library/自制004.jpg)



### 1.8、选择模拟器 / 真机环境

![](media/media_Library/自制006.jpg)



### 1.9、查看导出的Framework

![](media/media_Library/自制008.jpg)



### 2.0、导入新项目测试

由于CocoaPods导入的三方并没有打包到我们的Framework中，所以新项目中，需要使用CocoaPods导入基础库，否则Framework会缺少引用文件。



我们导出的Framework分为模拟器与真机，所以导入到项目里面也只能选择对应的机型。

![](media/media_Library/自制009.jpg)



### 2.1、合并模拟器和真机的Framework

为了解决上述Framework分为模拟器与真机的问题，此处将类进行合并。







## 打包.framework





1. 导入form  lxform
2. 系统framework
   1. Libxml2.2.tbd
3. 分类
4. 创建Pod，导入三方库AFN、SDW、YYKit





更改项目配置

1. Build Active Architecture Only修改为NO，否则生成的静态库就只支持当前选择设备的架构。
2. 在搜索栏搜索 Mach-O Type ，将 Mach-O Type修改为 Static Library(静态库)类型。
3. 选中 Target ，选择 Build Phases - Headers ，可以看出有三个选项，分别是 Public 、Private 、Project ，把需要公开给别人的 .h 文件拖到 Public 中，把不想公开的，即为隐藏的 .h 文件拖到 Project 中。





打包framework：分为真机和模拟器，最后将两个Framework合并。













