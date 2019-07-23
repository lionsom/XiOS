

1. category添加属性（用到runtime绑定对象方法）、方法；
2. 调用顺序
3. 多个Category之间，属性，方法如何调用，调用顺序
4. Category不允许为已有的类添加新的成员变量，实际上允许添加属性的；
5. category在runtime层的实现原理

- [8.、Category的实现原理]()

- [8.、分别描述类别（categories）和延展（extensions）是什么？以及两者的区别？]()

- [8.、谈谈category和extension区别，系统如何底层实现category]()

- [8.、category中能不能使用声明属性？为什么？如果能，怎么实现？]()

- [8.、Category能否添加成员变量？如果可以，如何给Category添加成员变量？]()

- [8.、为什么Category只能为对象添加方法，却不能添加成员变量？]()

- [8.、Category（类别）、Extension（扩展）和继承的区别]()

- [8.、Category的使用场合是什么？]()

- [8.、Category中有load方法吗？load方法是什么时候调用的？load 方法能继承吗？]()

  

##### 如何给NSArray添加一个属性（不能使用继承）？不能用继承，难道用分类？但是分类只能添加方法不能添加属性啊（Category不允许为已有的类添加新的成员变量，实际上允许添加属性的，同样可以使用@property，但是不会生成_变量（带下划线的成员变量），也不会生成添加属性的getter和setter方法，所以，尽管添加了属性，也无法使用点语法调用getter和setter方法。但实际上可以使用runtime去实现Category为已有的类添加新的属性并生成getter和setter方法)



[官网文档 - Category](https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/Category.html)

[Runtime开源代码](https://github.com/RetVal/objc-runtime)

[美团技术 - 深入理解Objective-C：Category](http://tech.meituan.com/DiveIntoCategory.html)

[Category的本质<一>](https://www.jianshu.com/p/da463f413de7)

[结合 Category 工作原理分析 OC2.0 中的 runtime](https://bestswifter.com/jie-he-category-gong-zuo-yuan-li-fen-xi-oc2-0-zhong-de-runtime/)











## 一、Category简介

Category是Objective-C 2.0之后添加的语言特性，category的主要作用是为已经存在的类添加方法。除此之外，[apple](https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/Category.html) 还推荐了category的另外两个使用场景:

> * Distribute the implementation of your own classes into separate source files—for example, you could group the methods of a large class into several categories and put each category in a different file.
>
> * Declare private methods.

大致意思：

> - 可以把类的实现分开在几个不同的文件里面。这样做有几个显而易见的好处：
>   	* a). 可以减少单个文件的体积 
>   	* b). 可以把不同的功能组织到不同的category里 
>   	* c). 可以由多个开发者共同完成一个类 d)可以按需加载想要的category 等等。
> - 声明私有方法

不过除了apple推荐的使用场景，广大开发者脑洞大开，还衍生出了category的其他几个使用场景：

>* 模拟多继承
>* 把framework的私有方法公开



## 二、Category在runtime层的实现原理

通过将Objective-c的代码转化为c++的源码窥探一下Category的底层结构。在命令行输入`clang -rewrite-objc Person+C.m`，这样Person+Test.m这个文件就被转化为了c++的源码Person+C.cpp。

```
struct _category_t {
	const char *name;    //类名
	struct _class_t *cls;
	const struct _method_list_t *instance_methods;  //对象方法列表
	const struct _method_list_t *class_methods;     //实例方法列表
	const struct _protocol_list_t *protocols;       //协议列表
	const struct _prop_list_t *properties;          //属性列表
};
```







## category如何加载



## category和方法覆盖

1. 覆盖源文件
2. 覆盖分类方法



## category和关联对象







## category和+load方法





























