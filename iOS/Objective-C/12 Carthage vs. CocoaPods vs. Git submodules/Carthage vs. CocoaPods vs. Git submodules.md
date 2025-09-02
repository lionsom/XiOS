- [Carthage vs. CocoaPods vs. Git submodules](https://reallifeprogramming.com/carthage-vs-cocoapods-vs-git-submodules-9dc341ec6710#cocoapods)
- [Git submodules]()
    - [Git Tools - Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
    - [Git submodules](https://www.atlassian.com/git/tutorials/git-submodule)
    - [Git submodule 子模块的管理和使用](https://www.jianshu.com/p/9000cd49822c)
- [CocoaPods]()
- [Carthage](https://github.com/Carthage/Carthage)
    - [Carthage Tutorial: Getting Started](https://www.kodeco.com/7649117-carthage-tutorial-getting-started#toc-anchor-001)



# CocoaPods 省略



# Carthage

## 1. 安装

- Download and run a *.pkg* installer for the latest release.
- Use the [Homebrew](http://brew.sh/) package manager.

```shell
# 安装homebrew
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# 升级brew
$ brew update

# 安装Carthage
$ brew install Carthage

# 卸载Carthage
$ brew uninstall Carthage

# 查看版本
$ Carthage version
```

## 2. 使用

```shell
# 1.进入项目
$ cd 项目路径

# 2.创建一个空的Carthage文件
$ touch Cartfile

# 3.编辑cartfile文件
github "Alamofire/Alamofire"
# or
git "https://github.com/Alamofire/Alamofire.git"

# 4.保存并关闭cartfile文件，使用cartfile安装框架
# 注: 不追加参数会编译出iOS、OSX、tvOS多个framework
$ Carthage update --platform iOS

# iOS
$ carthage update --platform iOS
# macOS
$ carthage update --platform macOS
# tvOS
$ carthage update --platform tvOS
# watchOS
$ carthage update --platform watchOS





$ carthage update  # 修改了Cartfile文件，并重新编译
$ carthage update  Alamofire  # 仅更新Alamofire框架
$ carthage update --platform ios  # 仅编译iOS平台的framework
$ carthage bootstrap    # 从本地库重新编译依赖


# 版號 >= 5.0
github "onevcat/Kingfisher" >= 5.0

# 版號 5.x 
github "onevcat/Kingfisher" ~> 5.0

# 版號 5.0
github "onevcat/Kingfisher" == 5.0

# 最新版
github "onevcat/Kingfisher"

# 指定 Git branch
github "onevcat/Kingfisher" "branch"
```



## 3. 文件结构

```shell
# 执行文件多出三个文件
Cartfile # 存放需要安装的依赖列表

Cartfile.resolved # 自动生成的依赖关系文件，需提交到git
# 确保提交的项目可以使用完全相同的配置与方式运行启用, 跟踪项目当前所用的依赖版本号

Carthage # 自动生成的Carthage目录 (不需要提交到 Git)
# 目录下有两个文件夹：Build  Checkouts
Build  # 存放编译后的文件，包括 iOS/Mac/tvOS/watchOS对应的framework
Checkouts  # 存放从git拉取的依赖库源文件
```







### 六 关于版本指定

Carthage 支持以下几种版本指定方法:

```shell
>= 1.0 代表 “最低 1.0版本”
~> 1.0 代表 “表示使用版本1.0以上但是低于2.0的最新版本，如1.5, 1.9”
== 1.0 代表 “必须是 1.0 版本”
```



**Carthage的不足**

- 仅支持 iOS8 +
- 它只支持框架，所以不能用来针对 iOS 8 以前的系统版本进行开发
- 支持的 Carthage 安装的第三方框架和依赖不如 CocoaPods 丰富
- 无法在 Xcode 里定位到第三方库源码



### Carthage的其他命令

```vbnet
archive           Archives built frameworks into a zip that Carthage can use
bootstrap         Check out and build the project's dependencies
build             Build the project's dependencies
checkout          Check out the project's dependencies
copy-frameworks   In a Run Script build phase, copies each framework specified by a SCRIPT_INPUT_FILE environment variable into the built app bundle
fetch             Clones or fetches a Git repository ahead of time
help              Display general or command-specific help
outdated          Check for compatible updates to the project's dependencies
update            Update and rebuild the project's dependencies
version           Display the current version of Carthage
```







# Git submodules
