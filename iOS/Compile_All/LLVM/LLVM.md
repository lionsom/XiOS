[iOS编译]()





# LLVM

* https://llvm.org
* LLVM 不是 Low Level Virtual Machine

![](media_LLVM/001.png)





## 传统编译器架构

![](media_LLVM/002.png)



## LLVM架构

![](media_LLVM/003.png)



## Clang

![](media_LLVM/004.png)



## Clang与LLVM

![](media_LLVM/005.png)



# OC源文件编译过程

* `$ clang -ccc-print-phases main.m`
* `$ clang -E main.m`

![](media_LLVM/006.png)



## 词法分析

* `$  clang -fmodules -E -Xclang -dump-tokens main.m`

![](media_LLVM/007.png)



## 语法树 AST

* `$  clang -fmodules -fsyntax-only -Xclang -ast-dump main.m`

![](media_LLVM/008.png)



![](media_LLVM/009.png)



## LLVM IR

* 拓展名.ll，`$ clang -S -emit-llvm main.m`

* 拓展名.bc， `$ clang -c -emit-llvm main.m`

* 官方语法参考

    https://llvm.org/docs/LangRef.html

![](media_LLVM/010.png)





# Swift文件编译过程

![](media_LLVM/011.png)





# 编译源码 - 请看PDF文档

