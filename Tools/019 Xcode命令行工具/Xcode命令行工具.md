## 什么是 Xcode 命令行工具？

如果你不是为苹果设备开发软件，你将不需要完整的 Xcode 应用程序（它需要超过 40GB 的磁盘空间！）。

相反，你将安装 Xcode 命令行工具。这是一个较小的软件包，为软件开发人员提供了在命令行（也就是在终端应用程序）上运行的工具。

自从计算机诞生以来，程序员就在 Unix 操作系统上使用这些工具，它们几乎是所有软件开发的基础。

幸运的是，Xcode 命令行工具包在你的磁盘上只需要 1.2GB 的空间。

你有三种选择在 Mac 上安装 Xcode 命令行工具：

- 安装完整的 Xcode 包
- 当被一个命令触发时安装 Xcode 命令行工具
- 安装 Xcode 命令行工具作为 Homebrew 安装的一部分

我不建议安装完整的 Xcode 包，除非你在为苹果设备开发软件。下载它的时间太长，而且会消耗不必要的磁盘空间。请尝试两种更快的方法之一。



## 如何从命令提示符中安装 Xcode 命令行工具？

苹果公司已经使安装 Xcode 命令行工具变得很容易，因为某些命令会提示你开始安装。

下面是一些命令的例子，它们会触发安装 Xcode 命令行工具的提示：

- `clang` - 一个编译器，将源代码变成可执行程序
- `gcc` - GNU 编译器
- `git` - 即存即用的版本控制系统

在终端中运行任何这些命令都会出现安装 Xcode 命令行工具的提示。



你也可以在终端中输入命令 `xcode-select --install` 来开始安装过程：

```bash
$ xcode-select --install

xcode-select: error: command line tools are already installed, use "Software Update" to install updates
```



验证你已经成功地安装了 Xcode 命令行工具：

```bash
$ xcode-select -p

/Library/Developer/CommandLineTools
```

