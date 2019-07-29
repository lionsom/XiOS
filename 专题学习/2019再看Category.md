

- [8.、Category的实现原理]()

- [8.、分别描述类别（categories）和延展（extensions）是什么？以及两者的区别？]()

- [8.、谈谈category和extension区别，系统如何底层实现category]()

- [8.、category中能不能使用声明属性？为什么？如果能，怎么实现？]()

- [8.、Category能否添加成员变量？如果可以，如何给Category添加成员变量？]()

- [8.、为什么Category只能为对象添加方法，却不能添加成员变量？]()

- [8.、Category（类别）、Extension（扩展）和继承的区别]()

- [8.、Category的使用场合是什么？]()

- [8.、Category中有load方法吗？load方法是什么时候调用的？load 方法能继承吗？]()

  



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
>   	  	* b). 可以把不同的功能组织到不同的category里 
>   	   * c). 可以由多个开发者共同完成一个类 d)可以按需加载想要的category 等等。
> - 声明私有方法

不过除了apple推荐的使用场景，广大开发者脑洞大开，还衍生出了category的其他几个使用场景：

>* 模拟多继承
>* 把framework的私有方法公开



## 二、Category在Runtime层的实现原理（编译器的工作）

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

我们知道，所有的OC类和对象，在runtime层都是用struct表示的，category也不例外，在runtime层，category用结构体category_t（在objc-runtime-new.h中可以找到此定义），它包含了：

```
struct category_t {
    const char *name;
    classref_t cls;
    struct method_list_t *instanceMethods;
    struct method_list_t *classMethods;
    struct protocol_list_t *protocols;
    struct property_list_t *instanceProperties;
    // Fields below this point are not always present on disk. 
    // 译：此点下方的字段并不总是出现在磁盘上
    struct property_list_t *_classProperties;

    method_list_t *methodsForMeta(bool isMeta) {
        if (isMeta) return classMethods;
        else return instanceMethods;
    }

    property_list_t *propertiesForMeta(bool isMeta, struct header_info *hi);
};
```



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

* ##### `_OBJC_$_CATEGORY_Person_$_DD` ：该结构体是 Person+DD分类本身的初始化

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

几个结构体的命名都遵循 **公共前缀+类名+category名字** 的命名方式，需要注意到的事实就是category的名字用来给各种列表以及后面的category结构体本身命名，而且有static来修饰，所以在同一个编译单元里我们的category名不能重复，否则会出现编译错误。（***面试题：同一编译单元Category能否重名？***）

* ##### `_OBJC_$_CATEGORY_INSTANCE_METHODS_Person_$_DD` ：实例方法列表 结构体

```
static struct /*_method_list_t*/ {
	unsigned int entsize;  // sizeof(struct _objc_method)
	unsigned int method_count;
	struct _objc_method method_list[7];
} _OBJC_$_CATEGORY_INSTANCE_METHODS_Person_$_DD __attribute__ ((used, section ("__DATA,__objc_const"))) = {
	sizeof(_objc_method),
	7,
	{{(struct objc_selector *)"setHeight:", "v24@0:8@16", (void *)_I_Person_DD_setHeight_},
	{(struct objc_selector *)"height", "@16@0:8", (void *)_I_Person_DD_height},
	{(struct objc_selector *)"setWeight:", "v24@0:8@16", (void *)_I_Person_DD_setWeight_},
	{(struct objc_selector *)"weight", "@16@0:8", (void *)_I_Person_DD_weight},
	{(struct objc_selector *)"run_Category", "v16@0:8", (void *)_I_Person_DD_run_Category},
	{(struct objc_selector *)"requiredMethod", "v16@0:8", (void *)_I_Person_DD_requiredMethod},
	{(struct objc_selector *)"optionalMethod", "v16@0:8", (void *)_I_Person_DD_optionalMethod}}
};
```

此处，很容易发现几个熟悉的方法名，都是分类中的 **实例方法+setter/getter+protocol方法**

> 1. 实例方法：`run_Category`
>
> 2. setter/getter：`setHeight:`、`height`、`setWeight:`、`weight`
>
> 3. protocol方法：`requiredMethod`、`optionalMethod`

* ##### `_OBJC_$_CATEGORY_CLASS_METHODS_Person_$_DD` :  类方法列表 结构体

```
static struct /*_method_list_t*/ {
	unsigned int entsize;  // sizeof(struct _objc_method)
	unsigned int method_count;
	struct _objc_method method_list[1];
} _OBJC_$_CATEGORY_CLASS_METHODS_Person_$_DD __attribute__ ((used, section ("__DATA,__objc_const"))) = {
	sizeof(_objc_method),
	1,
	{{(struct objc_selector *)"eat_Category", "v16@0:8", (void *)_C_Person_DD_eat_Category}}
};
```

此处是分类中 **类方法**

> 1. 类方法：`eat_Category`

* ##### `_OBJC_CATEGORY_PROTOCOLS_$_Person_$_DD` : 协议列表 结构体

```
static struct /*_protocol_list_t*/ {
	long protocol_count;  // Note, this is 32/64 bit
	struct _protocol_t *super_protocols[1];
} _OBJC_CATEGORY_PROTOCOLS_$_Person_$_DD __attribute__ ((used, section ("__DATA,__objc_const"))) = {
	1,
	&_OBJC_PROTOCOL_MyProtocol
};
```

此处为 **协议列表结构体**，可以看出当前Category只遵循了 `_OBJC_PROTOCOL_MyProtocol` 协议。

对于`协议列表结构体` 的深入了解。可自行搜索。

* ##### `_OBJC_$_PROP_LIST_Person_$_DD ` ：属性列表 结构体

```
static struct /*_prop_list_t*/ {
	unsigned int entsize;  // sizeof(struct _prop_t)
	unsigned int count_of_properties;
	struct _prop_t prop_list[2];
} _OBJC_$_PROP_LIST_Person_$_DD __attribute__ ((used, section ("__DATA,__objc_const"))) = {
	sizeof(_prop_t),
	2,
	{{"height","T@\"NSString\",C,N"},
	{"weight","T@\"NSNumber\",&,N"}}
};
```

此处是分类中新增的 **属性列表结构体** ，可以看到分类为Person新增的两个属性 `height` 、`weight` 。



## 三、Category如何加载（运行时加载）

我们知道，Objective-C的运行是依赖OC的runtime的，而OC的runtime和其他系统库一样，是OS X和iOS通过dyld动态加载的。

也就是如何将Category中新增的属性与方法在运行时加载到本类中。

想了解更多dyld地同学可以移步这里（[3](https://www.mikeash.com/pyblog/friday-qa-2012-11-09-dyld-dynamic-linking-on-os-x.html)）。





## 四、Category中+load方法、+initialize方法

我们先从几个面试题开始：

> 1)、在类的+load方法调用的时候，我们可以调用category中声明的方法么？
>
> ​		答： 1)、可以调用，因为附加category到类的工作会先于+load方法的执行
>
> 2)、Category中有load方法吗？load方法是什么时候调用？
>
> ​		答：2)、有，+load的执行顺序是先类，后category，而category的+load执行顺序是根据编译顺序决定的。 
>
> 3)、load，initialize的区别是什么？它们在Category中的调用顺序以及出现继承时它们之间的调用过程是怎么样的？



### 4.1、+load方法在Category中的调用顺序

> +load的执行顺序是先类，后category，而category的+load执行顺序是根据编译顺序决定的。 



![](media_Category/001.png)

```
2019-07-29 14:48:38.461856+0800 Category深入[4543:177912] MyClass load
2019-07-29 14:48:38.462248+0800 Category深入[4543:177912] MyClass+Category_1 load
2019-07-29 14:48:38.462303+0800 Category深入[4543:177912] MyClass+Category_2 load
```



![](media_Category/002.png)

```
2019-07-29 14:47:46.286189+0800 Category深入[4526:177145] MyClass load
2019-07-29 14:47:46.286580+0800 Category深入[4526:177145] MyClass+Category_2 load
2019-07-29 14:47:46.286647+0800 Category深入[4526:177145] MyClass+Category_1 load
```



### 4.2、有继承关系的类中，+load调用顺序

![](media_Category/004.png)

> 父类：Father
>
> 父类分类：Father+Category_1 和 Father+Category_2
>
> 子类：Son
>
> 子类分类：Son+Category_1 和 Son+Category_2



```
// 输出
2019-07-29 16:20:57.900182+0800 Category深入[5664:229891] Father load
2019-07-29 16:20:57.900585+0800 Category深入[5664:229891] Son load
2019-07-29 16:20:57.900681+0800 Category深入[5664:229891] Father Cagetory_2 load
2019-07-29 16:20:57.900734+0800 Category深入[5664:229891] Son Category_1 load
2019-07-29 16:20:57.900782+0800 Category深入[5664:229891] Father Category_1 load
2019-07-29 16:20:57.900845+0800 Category深入[5664:229891] Son Category_2 load
```



> 1、父类+load 在 子类之前调用；子类+load在分类之前调用；(修改编译顺序也一样)
>
> 2、当有多个类别(Category)都实现了load方法,这几个load方法都会执行，但执行顺序不确定，执行顺序与其在Compile Sources中出现的顺序一致; 



为什么会这样呢？

细节查看： [Category的本质<二>load，initialize方法 - 有继承关系时load方法的调用顺序](https://www.jianshu.com/p/b5492c40fe8f)



### 4.3、+initialize方法调用顺序

 [Category的本质<二>load，initialize方法](https://www.jianshu.com/p/b5492c40fe8f)





### 4.4、+load与+initialize比较



拓展：

自写的类方法与+load方法比较

同样是类方法，同样是分类中实现了类的方法，为什么load方法不像test方法一样，调用分类的实现，而是类和每个分类中的load方法都被调用了呢？load方法到底有什么不同呢？



[Category的本质<二>load，initialize方法](https://www.jianshu.com/p/b5492c40fe8f)



+load方法为什么和其他的类方法调用方式不同？

其他分类类方法是通过消息转发机制调用的，isa和superclass来寻找的；而+load是通过函数指针指向函数，拿到函数地址，分开来直接调用的，直接通过内存地址查找调用的。







## 五、Category和方法覆盖

### 5.1、覆盖本类方法（类方法和实例方法）

```
// 本类 方法
+(void)getName;
-(void)getAge;

// Stu_Category_1 分类覆盖实现
// Stu_Category_2 分类覆盖实现

// 输出
2019-07-29 15:29:09.597718+0800 Category深入[5074:203420] Stu_Category_2 getName
2019-07-29 15:29:09.597790+0800 Category深入[5074:203420] Stu_Category_2 getAge
```



**交换下编译顺序**

![](media_Category/003.png)

```
// 输出
2019-07-29 15:36:48.679354+0800 Category深入[5140:208264] Stu_Category_1 getName
2019-07-29 15:36:48.679421+0800 Category深入[5140:208264] Stu_Category_1 getAge
```



> 结论：
>
> 1)、category的方法没有“完全替换掉”原来类已经有的方法，也就是说如果category和原来类都有methodA，那么category附加完成之后，类的方法列表里会有两个methodA；
>
> 2)、category的方法被放到了新方法列表的前面，而原来类的方法被放到了新方法列表的后面，这也就是我们平常所说的category的方法会“覆盖”掉原来类的同名方法，这是因为运行时在查找方法的时候是顺着方法列表的顺序查找的，它只要一找到对应名字的方法，就会罢休^_^，殊不知后面可能还有一样名字的方法。



### 5.2、怎么调用到原来类中被category覆盖掉的方法？

​		对于这个问题，我们已经知道category其实并不是完全替换掉原来类的同名方法，只是category在方法列表的前面而已，所以我们只要顺着方法列表找到最后一个对应名字的方法，就可以调用原来类的方法：

[美团技术 - 深入理解Objective-C：Category  第6节：触类旁通-category和方法覆盖](http://tech.meituan.com/DiveIntoCategory.html)



### 5.3、分类覆盖分类方法

```
// 在分类Stu_Category_1 和 分类Stu_Category_2 分别新增方法，
-(void)getSchool;

// 输出
2019-07-29 15:47:28.076732+0800 Category深入[5297:215194] Stu_Category_2 getSchool

// 交换编译顺序
2019-07-29 15:51:50.765307+0800 Category深入[5336:217361] Stu_Category_1 getSchool
```

> 结论：
>
> ​		与5.1中覆盖本类方法是一样的，category附加完成之后，类的方法列表里会有两个methodA，最后调用哪个是根据编译顺序决定的。





## 六、Category和关联对象

### 6.1、Category能否添加成员变量？如果可以，如何给Category添加成员变量？

首先我们从Category底层结构体category_t（在objc-runtime-new.h中可以找到此定义）来看下：

```
struct category_t {
    const char *name;
    classref_t cls;
    struct method_list_t *instanceMethods;
    struct method_list_t *classMethods;
    struct protocol_list_t *protocols;
    struct property_list_t *instanceProperties;
    // Fields below this point are not always present on disk. 
    // 译：此点下方的字段并不总是出现在磁盘上
    struct property_list_t *_classProperties;

    method_list_t *methodsForMeta(bool isMeta) {
        if (isMeta) return classMethods;
        else return instanceMethods;
    }

    property_list_t *propertiesForMeta(bool isMeta, struct header_info *hi);
};
```

通过分类的底层结构我们可以看到，分类中可以存放实例方法，类方法，协议，属性，但是没有存放成员变量的地方。所以不能添加成员变量。



**如何如何给Category添加成员变量？**

如何给NSArray添加一个属性（不能使用继承）？不能用继承，难道用分类？但是分类只能添加方法不能添加属性啊（Category不允许为已有的类添加新的成员变量，实际上允许添加属性的，同样可以使用@property，但是不会生成_变量（带下划线的成员变量），也不会生成添加属性的getter和setter方法，所以，尽管添加了属性，也无法使用点语法调用getter和setter方法。但实际上可以使用runtime去实现Category为已有的类添加新的属性并生成getter和setter方法)：

```
// .h 文件
@interface Person (DD) 
@property (nonatomic, copy) NSString *height;
@end

// .m 文件
@implementation Person (DD)
#pragma mark - setter/getter
-(void)setHeight:(NSString *)height {
    objc_setAssociatedObject(self, @selector(height), height, OBJC_ASSOCIATION_COPY_NONATOMIC);
}
-(NSString *)height {
    return objc_getAssociatedObject(self, _cmd);
}
@end
```



|             关联策略              |          对应修饰符          |
| :-------------------------------: | :--------------------------: |
|      OBJC_ASSOCIATION_ASSIGN      |      @property(assign)       |
| OBJC_ASSOCIATION_RETAIN_NONATOMIC | @property(strong, nonatomic) |
|  OBJC_ASSOCIATION_COPY_NONATOMIC  |  @property(copy, nonatomic)  |
|      OBJC_ASSOCIATION_RETAIN      |  @property(strong, atomic)   |
|       OBJC_ASSOCIATION_COPY       |   @property(copy, atomic)    |



### 6.2、关联对象又是存在什么地方呢？ 如何存储？ 对象销毁时候如何处理关联对象呢？



[美团技术 - 深入理解Objective-C：Category - 第七节：更上一层-category和关联对象](http://tech.meituan.com/DiveIntoCategory.html)

















































