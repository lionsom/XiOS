[cocoapods-xcframework](https://github.com/TyrantDante/cocoapods-xcframework)





https://github.com/CocoaPods/CocoaPods/issues/9549

https://github.com/CocoaPods/CocoaPods/pull/9720

https://github.com/CocoaPods/CocoaPods/issues/9943

https://github.com/CocoaPods/CocoaPods/issues/9944





https://blog.cocoapods.org/CocoaPods-1.9.0-beta/





融云 样例

https://github.com/CocoaPods/Specs/blob/master/Specs/3/f/1/RongCloudIM/5.1.3.2/RongCloudIM.podspec.json





# [Creating a Framework for iOS](https://www.raywenderlich.com/17753301-creating-a-framework-for-ios)





https://www.jianshu.com/p/ad07419980c7

https://www.jianshu.com/p/c92c08d8afda

https://www.jianshu.com/p/d3a1ac66a9e6

https://www.jianshu.com/p/c068a8fbba17









[iOS中Framework Library嵌套使用](https://www.jianshu.com/p/874e178cdc9d)

# fa 



SDK（software development kits）







# 制作静态库还是动态库呢？

* 动态库：运行时加载，发布的程序需要一同携带着。
* 静态库：将汇编期生成的目标.o文件和引用的库一同链接为可执行文件，有framework和.a的形式。
    * .a：单纯的二进制文件，需要配合.h文件一同使用。
    * .framework：二进制文件 + 资源文件，可以直接使用。
    * .framework = .a + .h + 资源文件



# 项目场景

* 新建项目
* 新增Target
* 组件





# LXScan打包过程



## 1. 图片资源



## 2. 方









# CocoaPods 制作 Framework

[Using CocoaPods to just build frameworks for use elsewhere](https://blog.kulman.sk/using-pods-to-just-build-frameworks/)







# pod package

```bash
$ pod package QYCH5SDK.podspec --force --exclude-deps --no-mangle --embedded --spec-sources='http://git.qpaas.com/PaasPods/PaasSpecs.git, https://github.com/CocoaPods/Specs.git' --configuration=Debug
```





```swift
//强制覆盖之前已经生成过的二进制库 
--force

//生成静态.framework 
--embedded

//生成静态.a 
--library

//生成动态.framework 
--dynamic

//动态.framework是需要签名的，所以只有生成动态库的时候需要这个BundleId 
--bundle-identifier

//不包含依赖的符号表，生成动态库的时候不能包含这个命令，动态库一定需要包含依赖的符号表。 
--exclude-deps

//表示生成的库是debug还是release，默认是release。--configuration=Debug 
--configuration


//表示不使用name mangling技术，pod package默认是使用这个技术的。我们能在用pod package生成二进制库的时候会看到终端有输出Mangling symbols和Building mangled framework。表示使用了这个技术。
//如果你的pod库没有其他依赖的话，那么不使用这个命令也不会报错。但是如果有其他依赖，不使用--no-mangle这个命令的话，那么你在工程里使用生成的二进制库的时候就会报错：Undefined symbols for architecture x86_64。
--no-mangle

//如果你的pod库有subspec，那么加上这个命名表示只给某个或几个subspec生成二进制库，--subspecs=subspec1,subspec2。生成的库的名字就是你podspec的名字，如果你想生成的库的名字跟subspec的名字一样，那么就需要修改podspec的名字。 
//这个脚本就是批量生成subspec的二进制库，每一个subspec的库名就是podspecName+subspecName。
--subspecs

//一些依赖的source，如果你有依赖是来自于私有库的，那就需要加上那个私有库的source，默认是cocoapods的Specs仓库。--spec-sources=private,https://github.com/CocoaPods/Specs.git。
--spec-sources
```





```bash
Usage:

    $ pod package NAME [SOURCE]

      Package a podspec into a static library.

Options:

    --force                                                         
    // Overwrite existing files.
    // 强制覆盖之前已经生成过的二进制库 
	
    --no-mangle                                                     
    // Do not mangle symbols of depedendant Pods.
    
    --embedded                                                      
    // Generate embedded frameworks.
    
    --library                                                       
    // Generate static libraries.
    
    --dynamic                                                       
    // Generate dynamic framework.
    
    --bundle-identifier                                             
    // Bundle identifier for dynamic framework
    
    --exclude-deps                                                  
    // Exclude symbols from dependencies.
    
    --configuration                                                 
    // Build the specified configuration (e.g. Debug). Defaults to Release Only include the given subspecs
    
    --spec-sources=private,https://github.com/CocoaPods/Specs.git   
    // The sources to pull dependant pods from (defaults to https://github.com/CocoaPods/Specs.git)
```





### package swift static library error

pod package这个工具有一段时间没有维护了， [在打包swift静态带依赖库报错](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2FCocoaPods%2Fcocoapods-packager%2Fissues%2F255) 并且还 [无法通过命令参数指定输出库的架构](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2FCocoaPods%2Fcocoapods-packager%2Fissues%2F212) 等等有些局限，如果要求不多并且没有swift静态库动态库的混合打包的话可以使用，打包方便；目前我自己的话还是通过xcode配合shell脚本进行构建。



[iOS组件化之路——打包依赖AFNetworking的静态framework](https://www.yfmingo.cn/2019/12/31/dependency-pod-lib-framework/)



```swift
pod package QYCH5SDK.podspec --force --exclude-deps --no-mangle --embedded --spec-sources='http://git.qpaas.com/PaasPods/PaasSpecs.git, https://github.com/CocoaPods/Specs.git' --configuration=Debug
```



[SDK开发和打包静态库遇到的坑](https://xdev.in/posts/sdk-development/)





# 解包

[MachOView](https://github.com/gdbinit/MachOView)

* 进入Framework文件夹中

    ```bash
    $ cd OpenSDK.Framework
    ```

* 查看静态库支持的架构

    ```bash
    $ lipo -info OpenSDK
    ```

* 抽离出arm64的架构，生成一个arm64的XX

    ```bash
    $ lipo OpenSDK -thin arm64 -outpath OpenSDK_arm64
    ```

* 查看.o文件

    ```bash
    $ ar -x OpenSDK_arm64 （noflat 文件）
    ```

* 查看.o文件内部方法

    ```bash
    $ nm *.o >> OpenSDK.symbols.txt
    ```

    



# 场景



1.swift不支持.a的静态库,因此只能制作.framework的静态库

如果静态库中使用了任何category，主工程Build Settings下Other Linker Flags是必须要加上-ObjC的，而动态库则不用。

## 静态库依赖静态库

* 两个静态库里面不能包含相同类（符号），如果有在链接的时候就会报符号重复的错误
* 静态库（以`.a`或`.framework`结尾）构建完成后的产物不会包含依赖的另一个以`.framework`结尾的静态库的代码
* 静态库（以`.a`或`.framework`结尾）构建完成后的产物包含依赖的另一个以`.a`结尾的静态库的代码



## [动静态库的混用](https://www.hanleylee.com/various-libraries-in-ios.html#%E5%8A%A8%E9%9D%99%E6%80%81%E5%BA%93%E7%9A%84%E6%B7%B7%E7%94%A8)



OC动态库 + Swift静态库

- 静态库可以依赖静态库
- 动态库可以依赖动态库
- 动态库不能依赖静态库! 动态库不能依赖静态库是因为静态库不需要在运行时再次加载, 如果多个动态库依赖同一个静态库, 会出现多个静态库的拷贝, 而这些拷贝本身只是对于内存空间的消耗.





当主工程是OC工程时，调用Swift库有一个常见的报错，image not found xxxx。这个报错通常可能由于以下几个原因。

- 可能是setting中Always Embed Swift Standard Libraries没有选成YES。
- 可能是Swift的库版本不对应，需要重新出Swift库。
- 可能是工程没有自动帮你引入Swift支持库，这个时候我们可以在工程中新建一个.swift文件，创建桥接文件选YES，然后在该文件中包含一些swift的头文件，比如UIKIT，CoreImage之类的，错误信息报的是哪个库就添加哪个，可以强行让工程引入这些缺失的支持库。







# H5_SDK 过程

















