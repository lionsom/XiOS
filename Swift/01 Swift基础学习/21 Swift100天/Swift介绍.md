

# 一. Swift 与 Objective-C

* 编程范式

  * Swift可以面向协议编程、函数式编程、面向对象编程。
  * OC以面向对象编程为主，引入ARC库进行函数式编程。

* 类型安全

  * Swift类型安全语言，明确值的类型。
  * OC则不然，我们可以声明NSString变量，运行时仍然可以传递NSNumber给他。

* 值类型增强

  * Swift中，典型的有struct、enum、tuple都是值类型，而平时常用的Int、Double、Float、String、Array、Dictionary、Set 其实都是用 **结构体** 实现的，也是值类型。

  * OC中，NSNumber、NSString以及集合类对象都是指针类型。

* 枚举增强

  * Swift的枚举可以使用 整形、浮点型、字符串等，还能拥有属性和方法，甚至支持泛型、协议、扩展等。
  * OC枚举则鸡肋很多。

* 泛型

  * Swift支持泛型，也支持泛型的类型约束等特性。
  * OC的泛型约束仅仅停留在编译器警告阶段。

* 协议和扩展

  * Swift对协议的支持更丰富，也可以用于值类型。
  * OC协议缺乏强约束，提供optional特性。

* 函数和闭包

  * Swift函数是一等公民，可以定义函数类型变量，可以作为其他函数参数传递，可以作为函数的返回值返回。
  * OC中函数是次等公民，需要selector封装或block才能模拟Swift中类似的效果。



# 二. Swift开发工具

## 0. 查看Swift版本

```shell
$ xcrun swift -version
Apple Swift version 5.3.1 (swiftlang-1200.0.41 clang-1200.0.32.8)
Target: x86_64-apple-darwin20.2.0
```



## 1. Swiftc命令行



## 2.REPL交互式解释器

Read Eval Print Loop



## 3.Playground



# 三. Swift定义常量和变量

* let 声明常量
* var 声明变量



## OC中如何声明常量和变量？

> OC默认声明的都是变量。
>
> 1. `#define`定义常量;
> 2. `static const`定义常量；
> 3. 属性中的 `readonly`;

 

## Swift声明常量和变量

```swift
var wel: String
wel = "hello world"

// 多个变量
var wel = "hello", come = "world", ha = "!"
```



## Swift变量和常量的名字

> 1. Swift变量和常量的名字几乎可以是任何字符，包括Unicode字符；
> 2. 但是名字不能包括 `空白符、数学符号、箭头、保留（或无效）Unicode码、连线、制表符`，不能以`数字开头`。

```
let π = 3.14
let 你好 = "你好世界"
```


