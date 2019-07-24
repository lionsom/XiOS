

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



## 二、Category在Runtime层的实现原理

### 2.1、举个栗子

Person.h (包含Person类 、协议、 Person+DD分类)

```
#import <Foundation/Foundation.h>

@interface Person : NSObject
@property (nonatomic, copy) NSString *name;
@property (nonatomic, assign) NSInteger age;
+(void)eat;
-(void)run;
@end

//==================================================
@protocol MyProtocol <NSObject>
- (void)requiredMethod;
-(void)optionalMethod;
@end

//==================================================
@interface Person (DD) <MyProtocol>
@property (nonatomic, copy) NSString *height;
@property (nonatomic, strong) NSNumber *weight;
+(void)eat_Category;
-(void)run_Category;
@end
```

Person.m

```
#import "Person.h"
#import <objc/runtime.h>

@implementation Person
+(void)eat {
    NSLog(@"本类 类方法：eat");
}
-(void)run {
    NSLog(@"本类 对象方法：run");
}
@end

//==================================================
@implementation Person (DD)

#pragma mark - setter/getter
-(void)setHeight:(NSString *)height {
    objc_setAssociatedObject(self, @selector(height), height, OBJC_ASSOCIATION_COPY_NONATOMIC);
}
-(NSString *)height {
    return objc_getAssociatedObject(self, _cmd);
}
- (void)setWeight:(NSNumber *)weight {
    objc_setAssociatedObject(self, @selector(weight), weight, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}
-(NSNumber *)weight {
    return objc_getAssociatedObject(self, _cmd);
}

#pragma mark - Method
+(void)eat_Category {
    NSLog(@"分类 类方法：eat_Category");
}

-(void)run_Category {
    NSLog(@"分类 对象方法：run_Category");
}

#pragma mark - Protocol method
-(void)requiredMethod {
    NSLog(@"分类 Protocol requiredMethod");
}
-(void)optionalMethod {
    NSLog(@"分类 Protocol optionalMethod");
}
@end
```



调用

```
  	Person *p = [Person new];
  	
  	// 本类属性
    p.name = @"lin";
    p.age = 20;
    // 分类属性
    p.height = @"60";
    p.weight = [NSNumber numberWithInteger:120];
    
    // 本类方法
    [Person eat];
    [p run];
    
    // 分类新增方法
    [Person eat_Category];
    [p run_Category];
    
    // 分类 协议方法
    [p requiredMethod];
    [p optionalMethod];
```



### 2.2、将Objective-c的代码转化为c++的源码

我们在分类中新增 `1.对象方法；2.类方法；3.协议；4.属性`

通过将Objective-c的代码转化为c++的源码窥探一下Category的底层结构。在命令行输入`clang -rewrite-objc Person.m`，这样Person.m这个文件就被转化为了c++的源码Person.cpp。

* ##### `struct _category_t` ：该结构体就是每一个分类的结构

```
struct _category_t {
	const char *name;    //类名
	struct _class_t *cls;  // 类
	const struct _method_list_t *instance_methods;  //实例方法列表
	const struct _method_list_t *class_methods;     //类方法列表
	const struct _protocol_list_t *protocols;       //协议列表
	const struct _prop_list_t *properties;          //属性列表
};
```



> - 1)、类的名字（name）
> - 2)、类（cls）
> - 3)、category中所有给类添加的实例方法的列表（instanceMethods）
> - 4)、category中所有添加的类方法的列表（classMethods）
> - 5)、category实现的所有协议的列表（protocols）
> - 6)、category中添加的所有属性（instanceProperties）

* ##### `_OBJC_$_CATEGORY_Person_$_DD` ：该结构体是 Person+DD分类的初始化

```
static struct _category_t _OBJC_$_CATEGORY_Person_$_DD __attribute__ ((used, section ("__DATA,__objc_const"))) = 
{
	"Person",         //类名  
	0, // &OBJC_CLASS_$_Person,   // 类 cls
	(const struct _method_list_t *)&_OBJC_$_CATEGORY_INSTANCE_METHODS_Person_$_DD, //实例方法列表
	(const struct _method_list_t *)&_OBJC_$_CATEGORY_CLASS_METHODS_Person_$_DD, //类方法列表
	(const struct _protocol_list_t *)&_OBJC_CATEGORY_PROTOCOLS_$_Person_$_DD, //协议列表
	(const struct _prop_list_t *)&_OBJC_$_PROP_LIST_Person_$_DD,  //属性列表
};
```

* ##### `_OBJC_$_CATEGORY_INSTANCE_METHODS_Person_$_DD` ：实例方法列表 结构体



* ##### `_OBJC_$_CATEGORY_CLASS_METHODS_Person_$_DD` :  类方法列表 结构体



* ##### `_OBJC_CATEGORY_PROTOCOLS_$_Person_$_DD` : 协议列表 结构体



* ##### `_OBJC_$_PROP_LIST_Person_$_DD ` ：属性列表 结构体







下面我们针对里面的结构体具体看看：

先看 **对象方法列表结构体** `_OBJC_$_CATEGORY_INSTANCE_METHODS_Person_$_C`

```
static struct /*_method_list_t*/ {
	unsigned int entsize;  // sizeof(struct _objc_method)
	unsigned int method_count;
	struct _objc_method method_list[5];
} _OBJC_$_CATEGORY_INSTANCE_METHODS_Person_$_C __attribute__ ((used, section ("__DATA,__objc_const"))) = {
	sizeof(_objc_method),
	5,
	{{(struct objc_selector *)"setHeight:", "v24@0:8@16", (void *)_I_Person_C_setHeight_},
	{(struct objc_selector *)"height", "@16@0:8", (void *)_I_Person_C_height},
	{(struct objc_selector *)"setWeight:", "v24@0:8@16", (void *)_I_Person_C_setWeight_},
	{(struct objc_selector *)"weight", "@16@0:8", (void *)_I_Person_C_weight},
	{(struct objc_selector *)"play_C", "v16@0:8", (void *)_I_Person_C_play_C}}
};
```

可以看到这个结构体中包含多个对象方法setHeight、height、setWeight、weight、play_C，这正是Person+C这个分类中的对象方法。



早看下 **属性列表的结构体** `_OBJC_$_PROP_LIST_Person_$_C`

```
static struct /*_prop_list_t*/ {
	unsigned int entsize;  // sizeof(struct _prop_t)
	unsigned int count_of_properties;
	struct _prop_t prop_list[2];
} _OBJC_$_PROP_LIST_Person_$_C __attribute__ ((used, section ("__DATA,__objc_const"))) = {
	sizeof(_prop_t),
	2,
	{{"height","T@\"NSString\",C,N"},
	{"weight","T@\"NSNumber\",&,N"}}
};
```

可以看到我们Person+C分类为Person新增的两个属性 `height` 、`weight` 。







## Category如何加载



## Category和方法覆盖

1. 覆盖源文件
2. 覆盖分类方法



## Category和关联对象







## Category和+load方法





##  Category与继承一起用？

























