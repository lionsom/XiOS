

# Swift 与 Objective-C

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



# Swift开发工具

## 1. Swiftc命令行



## 2.REPL交互式解释器

Read Eval PrintLoop



## 3.Playground



# Swift定义常量和变量

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



## 打印常量和变量

```
print("欢迎\(你好)")

// 欢迎你好世界
```



# Swift中数值类型

## 整数

> Int 拥有与当前平台原生字相同长度
>
> Int8、Int32、Int64
>
> UInt8、UInt32、UInt64

## 浮点数

> Float 32位浮点数
>
> Double【推荐】 64位浮点数



![](media/001.jpg)



## Bool

> 1、true / false
>
> 2、Swift类型安全机制会阻止用一个非布尔量代替Bool

```
【ERROR】
if i==1 {
		print(i)
}
```



## 类型别名 typealias

```
typealias AudioSample = Uint8
let sample: AudioSample
```



# Swift元祖tuple

> 1. tuple可以把多个值合并成一个复合型的值；
> 2. tuple值可以是任何类型，不必是同一类型；

```
let error = (404, "找不到服务")
print(error.0)
print(error.1)

// 1 
// 找不到服务
```



## 可以指定名称

```
let error = (errorCode: 404, errorMessage: "找不到服务")
print(error.errorCode)
print(error.errorMessage)
```



## tuple修改

> 1. `var tuple`为可变元祖，`let tuple`为不可变元祖；
>
> 2. 不管是可变、不可变元祖，元祖创建后就不能增加、删除元素；
> 3. 可变元祖可以对元素进行修改，但不能改变其类型；
> 4. any类型可以改为任何类型；

```
var error: (Any, String)
error.0 = 12
error.1 = "fuck you"

error.1 = "hello"
```



## tuple分解

> 1. 将tuple的内容分解成单独的变量或常量；
> 2. 如果只需要元祖一部分，不需要的数据可以用（_）代替；

```
let error(1, "没有权限", "infomation")
let (errorCode, errorMessage, _) = error
print(errorCode)
print(errorMessage)
```



## 实战 - tuple作为函数返回值

```
func write(content: String) -> (errorCode: Int, errorMessage: String) {
		return (500, "服务器异常")
}

let error = write(content: "哈哈")
print(error)

// (errorCode: 500, errorMessage: "服务器异常")
```



# Swift中使用Optional

## OC为什么需要Optional

> 1. 



































