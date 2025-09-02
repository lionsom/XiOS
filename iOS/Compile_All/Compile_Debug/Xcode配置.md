http://jokerhappy.github.io/post/Diagnostics/



利用`Xcode`自带的工具对代码进行分析，解决内存问题。



### Diagnostics

`Xcode` 的 `Product` –> `Sheme` –> `edit scheme` –> `Run` -> `Diagnostics` 下有一些选项可以帮助我们找到`app`中的内存问题：

##### Enable Malloc Scribble

> 申请内存后在申请的内存上填`0xAA`，内存释放后在释放的内存上填`0x55`；再就是说如果内存未被初始化就被访问，或者释放后被访问，就会引发异常，这样就可以使问题尽快暴漏出来。
>
> `Scribble`其实是`malloc`库`libsystem_malloc.dylib`自身提供的调试方案

##### Enable Malloc Guard Edges

> 申请大片内存的时候在前后page上加保护，详见[保护模式](http://baike.baidu.com/link?url=47Hbd0Lf8oBC2tUS1HcASJKPWGPYOp3vsUJqJwF4i-6TJ-QkhwIRfKoYpEbnbZFOjavlB383bXTykYOOGVtqya)。

##### Enable Guard Mallocs

> 使用`libgmalloc`捕获常见的内存问题，比如越界、释放之后继续使用。
>
> 由于`libgmalloc`在真机上不存在，因此这个功能只能在模拟器上使用.

##### Enable Zombie Objects

> `Zombie`的原理是用生成僵尸对象来替换`dealloc`的实现，当对象引用计数为`0`的时候，将需要`dealloc`的对象转化为僵尸对象。如果之后再给这个僵尸对象发消息，则抛出异常，并打印出相应的信息，调试者可以很轻松的找到异常发生位置。

##### Enable Address Sanitizer (Xcode7 +)

> `AddressSanitizer`的原理是当程序创建变量分配一段内存时，将此内存后面的一段内存也冻结住，标识为中毒内存。当程序访问到中毒内存时（越界访问），就会抛出异常，并打印出相应`log`信息。调试者可以根据中断位置和的`log`信息，识别`bug`。如果变量释放了，变量所占的内存也会标识为中毒内存，这时候访问这段内存同样会抛出异常（访问已经释放的对象）。



### 静态分析

一般来说，在程序未运行之前我们可以先通过`Clang Static Analyzer`(静态分析)来检查代码是否存在`bug`。比如，内存泄露、文件资源泄露或访问空指针的数据等。

- 手动静态分析：每次都是通过点击菜单栏的`Product` –> `Analyze`或快捷键`shift + command + b`
- 自动静态分析：在`Build Settings`启用`Analyze During 'Build'`，每次编译时都会自动静态分析

`Analyze`主要分析以下四种问题：

- 逻辑错误：访问空指针或未初始化的变量等；
- 内存管理错误：如内存泄漏等；
- 声明错误：从未使用过的变量；
- `Api`调用错误：未包含使用的库和框架。















