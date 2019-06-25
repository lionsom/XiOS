
# 一、iOS基础部分

* [1.1、iOS内存机制](#1.1)
	* [1.1.1、简述OC内存管理机制](#1.1.1)
	* [1.1.2、对MRC和ARC的理解，什么是ARC？ARC基本原理？ARC是为了解决什么问题诞生的？ARC不足的地方？](#1.1.2)
	* [1.1.3、ObjC中，与alloc语义相反的方法是dealloc还是release？需要与alloc配对使用的方法是dealloc还是release，为什么？与retain语义相反的方法是dealloc还是release，为什么？与retain配对使用的方法是dealloc还是release，为什么？](#1.1.3)
	* [1.1.4、为什么说Objective-C是一门动态的语言？iOS的动态性？](#1.1.4)
	* [1.1.5、[未完成]ARC情况下，编译的时候，系统是怎么添加相关内存管理的代码](#1.1.5)
	
	
* [1.2、@property属性](#1.2)
	* [1.2.1、@property 的本质是什么？ivar、getter、setter 是如何生成并添加到这个类中的？](#1.2.1)
	* [1.2.2、@synthesize 和 @dynamic 分别有什么作用？](#1.2.2)
	* [1.2.3、如何自己重写 setter / getter?](#1.2.3)
	* [1.2.4、@property中有哪些属性关键字？默认的关键字是什么？](#1.2.4)
	* [1.2.4.1、属性关键字 readwrite，readonly，assign，retain，copy，nonatomic 、atomic、strong、weak、unsafe_unretained 各是什么作用，在哪种情况下用？](#1.2.4.1)
	* [1.2.5、写一个 setter 方法用于完成 `@property (nonatomic, retain) NSString *name;`，写一个 setter 方法用于完成 `@property (nonatomic, copy) NSString *name;`](#1.2.5)
	* [1.2.6、什么情况使用 weak 关键字？相比 assign 有什么不同？](#1.2.6)
	* [1.2.7、为什么assign不推荐用于修饰对象？](#1.2.7)
	* [1.2.7.1、什么是空指针、野指针？如何产生野指针？](#1.2.7.1)
	* [1.2.7.2、野指针的定位](#1.2.7.2)
	* [1.2.8、为什么我们常见的delegate属性都用是assign而不是retain/strong？](#1.2.8)
	* [1.2.8.1、为什么很多内置类如UITableViewControl的delegate属性都是assign而不是retain？请举例](#1.2.8.1)
	* [1.2.8.2、delegate的内存管理属性是weak还是assign？](#1.2.8.2)
	* [1.2.9、怎么用 copy 关键字？block用copy修饰吗？可以用其他修饰符吗？](#1.2.9)
	* [1.2.10、用@property声明的 NSString / NSArray / NSDictionary 经常使用 copy 关键字，为什么？如果改用strong关键字，可能造成什么问题？](#1.2.10)
	* [1.2.11、这个写法会出什么问题：`@property (copy) NSMutableArray *arr;`](#1.2.11)
	* [1.2.12、如何让自己的类用 copy 修饰符？](#1.2.12)
	* [1.2.13、对于深拷贝和浅拷贝的理解，系统对象 NSString/NSMutableString/NSArray/NSMutableArray 的 copy 与 mutableCopy 方法](#1.2.13) 
	* [1.2.14、类变量的 @public，@protected，@private，@package 声明各有什么含义？](#1.2.14)
   		
    
* [1.3、autoreleasePool](#1.3)
	* [1.3.1、谈谈你对autoreleasePool自动释放池的理解，自动释放池的原理](#1.17)
	* [1.3.2、autoreleasePool自动释放池在 MRC和ARC 下的区别](#1.17)
	* [1.、不⼿动指定autoreleasepool的前提下，⼀个autorealese对象在什么时刻释放？]()
	* [1.3.3、多层自动释放池嵌套的对象在哪一层释放]()
	* [1.3.4、autoreleasePool自动释放池的应用场景]()
	* [1.3.5、autorelease对象在什么时机会被调用release]()
	* [1.3.6、方法里有局部对象， 出了方法后会立即释放吗]()

* [1.4、iOS中的方法](#1.4)   
	* [1.4.1、+(void)load; +(void)initialize；区别？有什么用处？initialize方法如何调用,以及调用时机](#1.4.1)
	* [1.4.2、谈谈instancetype和id的异同？id和NSObject＊的区别？id 声明的对象有什么特性？](#1.4.2)
	* [1.4.3、UIView和CALayer是啥关系？](#1.4.3)
	* [1.4.4、isKindOfClass和isMemberOfClass的区别？](#1.4.4)
	* [1.4.5、frame 和 bounds 有什么不同？frame 和 bounds 分别是用来做什么的？frame 和 bound 一定都相等么？如果有不等的情况，请举例说明](#1.4.5)
	* [1.、loadView是干嘛用的？viewWillLayoutSubView你总是知道的]()
	* [1.、imageName和mageWithContextOfFile的区别?哪个性能高]()
	* [1.、drawRect与layout]()
	* [1.、setNeedsDisplay]()

* [1.5、iOS编程中一些基础]()    
	* [1.、数据持久化存储方案有哪些？]()
	* [1.、沙盒的目录结构是怎样的？各自一般用于什么场合？]()
	* [1.、介绍下内存的几大区域？内存中的栈和堆的区别是什么？那些数据在栈上，哪些在堆上？]()
	* [1.、#import跟 #include 有什么区别，@class呢，#import<> 跟 #import””有什么区别？]()
	* [1.、#define和const定义的变量，有什么区别？]()
	* [1.、static有什么作⽤?]()   
	* [1.、iOS逆向传值的几种方法整理]()
	* [1.、浅谈iOS开发中方法延迟执行的几种方式]()
	* [1.、怎样实现一个singleton的类？单例的好处与坏处？如何释放一个单例类？]()
	* [1.1、如何令⾃⼰所写的对象具有拷⻉功能?]()
	* [1.、如何重写类方法]()
	* [1.、什么是谓词？谓词过滤]()
	* [1.、NSString存储类型]()
	* [1.、NSCache与可变集合有几点不同]()
	* [1.、UITableView的重用机制]()
	* [1.、请用简单的代码展示@protocol的定义及实现.]()
	* [1.、协议是什么?有什么作用?]()
	* [1.、简述NotificationCenter、KVC、KVO、Delegate？并说明它们之间的区别？]()
    
* [1.6、iOS中一些机制和原理]()   
    * [1.、简单介绍下APNS]()
    * [1.、谈谈事件响应链，如何响应view之外的事件]()
    * [1.、事件传递链，页面上一个按钮，按钮和它的superView有一样的action,为什么只执行button的action?]()
    * [1.、iOS里面的手势是如何实现的?]()
    * [1.、main()之前的过程有哪些？]()
    * [1.、简单说一下APP的启动过程,从main文件开始说起。]()
    * [1.、UIViewController的生命周期， 应用的生命周期]()
    
* [1.7、其他]()    
	* [1.3、iOS中nil 、Nil、 NULL 、NSNull，你真的了解吗？]() 
	* [1.、c++引用和指针区别]()
    * [1.、静态库的原理是什么？你有没有⾃⼰写过静态编译库，遇到了哪些问题？]()
    * [1.、描述一个你遇到过的retain cycle例子。如何避免retain cycle]()
    * [1.、计时器有哪些？NSTimer创建后，会在哪个线程运行？如何让计时器调用一个类方法？]()
    * [1.、你是否接触过OC中的反射机制？简单聊一下概念和使用，反射函数？]()
    * [1.、使用CADisplayLink、NSTimer有什么注意点？]()

	* [1.、对于Objective-C，你认为它最大的优点和最大的不足是什么？对于不足之处，现在有没有可用的方法绕过这些不足来实现需求。如果可以的话，你有没有考虑或者实践过重新实现OC的一些功能，如果有，具体会如何做？]()





![](media/line.png)


<h1 id="1.1">1.1、iOS内存机制</h1>

<h2 id="1.1.1">1.1.1、简述OC内存管理机制</h2>

* 内存管理规则

|Objective-C对象的动作 | Objective-C对象的方法|
|----|----|
|1. 创建一个对象并获取它的所有权 | alloc/new/copy/mutableCopy (RC = 1) |
|2. 获取对象的所有权|retain (RC + 1)|
|3. 放弃对象的所有权|release (RC - 1)|
|4. 释放对象|dealloc (RC = 0 ，此时会调用该方法)|

OC使用了一种叫做引用计数的机制来管理内存中的对象。OC中每个对象都对应着他们自己的引用计数，引用计数可以理解为一个整数计数器，系统判断对象要不要回收的唯一依据就是`RC ?= 0`。

当使用alloc方法创建对象的时候，此时 RC=1；当retain这个对象时，此时RC+1=2；由于调用alloc/retain一次，所以需要release这个对象两次，此时RC=0；而当RC=0时，系统会自动调用dealloc方法释放对象。

* 引用计数的机制分为：

	* 手动引用计数MRC(Manual Reference Counting)：从OS X Lion和iOS 5开始，不再需要程序员手动调用retain和release方法来管理Objective-C对象的内存

	* 自动引用计数ARC(Automatic Reference Counting)：它让编译器来代替程序员来自动加入retain和release方法来持有和放弃对象的所有权。
􏱃􏱄􏴫􏰞􏳫􏴬􏴀􏴭􏱄􏱷􏲮􏰈􏳹􏱨􏳠􏲆􏲇􏱇􏱈􏱢􏰈􏱤􏱥

![](media/001.png)


在MRC中会引起引用计数变化的关键字有：alloc，retain，copy，release，autorelease。（strong关键字只用于ARC，作用等同于retain）

* 内存管理之属性关键字
	* 1、原子操作相关： atomic(默认，线程操作安全)、nonatomic
	* 2、内存管理相关：assign、weak、copy、strong(默认)、unsafe_unretained
	* 3、读写操作：readwrite(默认，表示既有getter方法，也有setter方法)、readonly(表示只有getter方法)
	* 4、setter/getter方法


* 内存管理相关：assign、weak、copy、strong(默认)、unsafe_unretained
	* assign “设置方法” 只会针对“纯量类型”（scalar type， CGFloat或NSInteger等）的简单赋值操作
	* retain(MRC)/strong(ARC) “拥有关系” 为这种属性设置新值时，设置方法先保留新值，并释放旧值，然后再将新值设置上去
	* weak “非拥有关系” 为这种属性设置新值时，设置方法既不保留新值，也不释放旧值。此特质同assign类似，然而属性所指的对象遭到摧毁时，属性也会被清空(nil out)
	* unsafe_unretained 此特质的语义和assign相同，但是它适用于“对象类型”（object type），该特质表达一种“非拥有关系”（“不保留”，unretained），当目标对象遭到摧毁时，属性值不会自动清空（“不安全”，unsafe），这一点与weak有区别
	* copy 此特质所表达的所属关系与strong类似。然而设置方法并不保留新值，而是将其“拷贝”（copy）。当属性类型为NSString *时，经常使用此特质来保护其封装性，因为传递给设置方法的新值可能指向一个NSMutableString类的实例，而NSMutableString是NSString的子类，表示一种可以修改的其值的字符串，此时若是不拷贝字符串，那么设置完属性之后，字符串的值就可能会在对象不知情的情况下被修改。


* 在ARC环境中，id类型和对象类型与c语言类型不同，它的类型上必须附加 **所有权修饰符ownership qualifiers** 其中一个来修饰：

```
__strong(默认，如果不指定其他，编译器就默认加入)
__weak
__unsafe_unretained
__autoreleasing
```

* 属性与所有权修饰符的对应关系

| 属性声明的属性 Property modifier | 所有权修饰符 Ownership qualifier|
|----|----|
|strong|__strong|
|retain|__strong|
|copy|__strong|
|weak|__weak|
|assign|`__unsafe_unretained`|
|unsafe_unretained|`__unsafe_unretained`|


* 对所有权修饰词深层次理解 -- [浅谈 iOS ARC 内存管理](https://cloud.tencent.com/developer/article/1397994)

>**`__strong`**
>
>`__strong` 表示强引用，对应定义 property 时用到的 strong。当对象没有任何一个强引用指向它时，它才会被释放。如果在声明引用时不加修饰符，那么引用将默认是强引用。当需要释放强引用指向的对象时，需要保证所有指向对象强引用置为 nil。__strong 修饰符是 id 类型和对象类型默认的所有权修饰符。


>**`__weak`**
>
>`__weak` 表示弱引用，对应定义 property 时用到的 weak。弱引用不会影响对象的释放，而当对象被释放时，所有指向它的弱引用都会自定被置为 nil，这样可以防止野指针。__weak 最常见的一个作用就是用来避免强引用循环。
>
>**`__weak`** 的几个使用场景：
>
> 1. 在 Delegate 关系中防止强引用循环。在 ARC 特性下，通常我们应该设置 Delegate 属性为 weak 的。但是这里有一个疑问，我们常用到的 UITableView 的 delegate 属性是这样定义的： @property (nonatomic, assign) id<UITableViewDelegate> delegate;，为什么用的修饰符是 assign 而不是 weak？其实这个 assign 在 ARC 中意义等同于 __unsafe_unretained（后面会讲到），它是为了在 ARC 特性下兼容 iOS4 及更低版本来实现弱引用机制。一般情况下，你应该尽量使用 weak。
> 2. 在 Block 中防止强引用循环。
> 3. 用来修饰指向由 Interface Builder 创建的控件。比如：@property (nonatomic, weak) IBOutlet UIButton *testButton;。



>**`__unsafe_unretained`**
>
>ARC 是在 iOS5 引入的，而 `__unsafe_unretained` 这个修饰符主要是为了在 ARC 刚发布时兼容 iOS4 以及版本更低的系统，因为这些版本没有弱引用机制。这个修饰符在定义 property 时对应的是 unsafe_unretained。`__unsafe_unretained` 修饰的指针纯粹只是指向对象，没有任何额外的操作，不会去持有对象使得对象的 retainCount +1。而在指向的对象被释放时依然原原本本地指向原来的对象地址，不会被自动置为 nil，所以成为了野指针，非常不安全。
>
>**`__unsafe_unretained`** 的应用场景：
>
>在 ARC 环境下但是要兼容 iOS4.x 的版本，用 `__unsafe_unretained` 替代 `__weak` 解决强引用循环的问题。


> **`__autoreleasing`**
>
> 在 ARC 模式下，我们不能显示的使用 autorelease 方法了，但是 autorelease 的机制还是有效的，通过将对象赋给 __autoreleasing 修饰的变量就能达到在 MRC 模式下调用对象的 autorelease 方法同样的效果。
>
>**`__autoreleasing`** 修饰的对象会被注册到 Autorelease Pool 中，并在 Autorelease Pool 销毁时被释放。
>
>注意：定义 property 时不能使用这个修饰符，因为任何一个对象的 property 都不应该是 autorelease 类型的。





<h2 id="1.1.2">1.1.2、对MRC和ARC的理解，什么是ARC？ARC基本原理？ARC是为了解决什么问题诞生的？ARC不足的地方？</h2>

* Objective-c中提供了两种内存管理机制 
	* MRC（Manual Reference Counting）：手动引用计数
		
		> 需要程序员手动调用 retain、release、autorelease 这些方法来控制对象的引用计数，这种情况下开发者需要花费大量的精力来进行内存管理，并且很容易出现 release 一个已经释放的对象而导致程序崩溃。
		>
		>	* retain 增加对象的引用计数。
		>	* release 降低对象引用计数，引用计数为0的时候，释放对象。
		>	* autorelease 在当前的auto release pool结束后，降低对象引用计数。
		 
	* ARC（Automatic Reference Counting）：自动引用计数
		> 对于 MRC 环境出现的问题，ARC 自动引用计数，则是由编译器智能的帮我们在合理的地方隐式地添加  retain、release、autorelease  方法（PS：这里不是简单插入这几个方法，而是插入它们对应的底层方法，一定程度上的优化执行效率）。ARC 使得内存管理更加轻松。


![](media/001.png)

**问：什么是ARC？ARC基本原理？**

当我们编译源码的时候，编译器会分析源码中每个对象的生命周期，然后基于这些对象的生命周期，来添加相应的引用计数操作代码。所以，ARC 是工作在编译期的一种技术方案。

ARC的规则就是只要对象没有强指针引用，就会被释放掉，换而言之 只要还有一个强引用指针变量指向对象，那么这个对象就会存在内存中。弱指针指向的对象，会被自动变成空指针（nil指针），从而不会引发野指针错误。

**问：ARC是为了解决什么问题诞生的？**

ARC诞生肯定是MRC有着缺陷！

MRC缺陷一：当我们要释放一个堆内存时，首先要确定指向这个堆空间的指针都被release了。（避免提前释放，也就是很容易出现 release 一个已经释放的对象而导致程序崩溃。）

MRC缺陷二：释放指针指向的堆空间，首先要确定哪些指针指向同一个堆，这些指针只能释放一次。（MRC下即谁创建，谁释放，避免重复释放）

MRC缺陷三：模块化操作时，对象可能被多个模块创建和使用，不能确定最后由谁去释放。

MRC缺陷四：多线程操作时，不确定哪个线程最后使用完毕

ARC优势一：这一机制使得开发者无需键入 retain 和 release , 这不仅能够降低程序崩溃和内存泄露的风险, 而且可以减少开发者的工作量, 能够大幅度提升程序的 流畅性 和 可预测性. 

**问：ARC不足的地方？**

ARC不足一：ARC 不适用于 Core Foundation 框架中, 仍然需要手动管理内存.

ARC不足二：不能释放循环引用的对象（这里也不算是 ARC 不足，这个是引用计数机制本身的缺点）


<h2 id="1.1.3">1.1.3、ObjC中，与alloc语义相反的方法是dealloc还是release？需要与alloc配对使用的方法是dealloc还是release，为什么？与retain语义相反的方法是dealloc还是release，为什么？与retain配对使用的方法是dealloc还是release，为什么？</h2>


|Objective-C对象的动作 | Objective-C对象的方法|
|----|----|
|1. 创建一个对象并获取它的所有权 | alloc/new/copy/mutableCopy (RC = 1) |
|2. 获取对象的所有权|retain (RC + 1)|
|3. 放弃对象的所有权|release (RC - 1)|
|4. 释放对象|dealloc (RC = 0 ，此时系统会调用该方法)|


alloc语义相反：`alloc ---> dealloc (系统自动调用)`

alloc配对使用：`alloc (它们使retainCount = 1)  ---> release/autorelease  (它们使retainCount - 1 ) ---> retainCount为0时...系统会自动调用dealloc`


retain语义相反：`retain ---> release/autorelease`

retain配对使用：`retain（它们使retainCount + 1)  ---> release/autorelease  (它们使retainCount - 1 ) ---> 
retainCount为0时...系统会自动调用dealloc`


<h2 id="1.1.4">1.1.4、为什么说Objective-C是一门动态的语言？iOS的动态性？</h2>

**为什么说Objective-C是一门动态的语言？**

静态、动态是相对的，这里动态语言指的是不需要在编译时确定所有的东西，在运行时还可以动态的添加变量、方法和类。

Objective-C 可以通过Runtime 这个运行时机制，在运行时动态的添加变量、方法、类等，所以说Objective-C 是一门动态的语言。

**iOS的动态性？**

* 动态类型：
 
即运行时再决定对象的类型。简单说就是id类型，任何对象都可以被id指针所指，只有在运行时才能决定是什么类型。

* 动态绑定：

基于动态类型，在某个实例对象被确定后，其类型便被确定了。该对象对应的属性和响应的消息也被完全确定，这就是动态绑定。

* 动态加载:

所谓动态加载就是我们做开发的时候icon图片的时候在Retina设备上要多添加一个张@2x的图片,当设备更换的时候,图片也会自动的替换。


<h2 id="1.1.5">1.1.5、[未完成]ARC情况下，编译的时候，系统是怎么添加相关内存管理的代码</h2>




![](media/line.png)



<h1 id="1.2">1.2、@property属性</h1>


<h2 id="1.2.1">1.2.1、@property 的本质是什么？ivar、getter、setter 是如何生成并添加到这个类中的？</h2>

**问：@property 的本质是什么？**

> @property的本质 = ivar (实例变量) + getter (取方法) + setter （存方法）


**问：ivar、getter、setter 是如何生成并添加到这个类中的？**

“自动合成”( autosynthesis) : 完成属性定义后，编译器会自动编写访问这些属性所需的方法，此过程叫做“自动合成”(autosynthesis)。

iOS5之前，在苹果使用GCC编译器时候，属性的使用方式是：也就是手动声明实例变量

```
***.h***
@interface ViewController : UIViewController
{
    //属性的实例变量
    NSString *myTitle;
}
//编译器遇到@property会自动声明对应的setter/getter
@property (copy, nonatomic) NSString *myTitle;
@end

***.m***
// 编译器遇到@synthesize会自动实现setter/getter方法
// 编译器遇到@synthesize回去访问myTitle的同名变量，如果没找到就报错。
@synthesize myTitle;
```

iOS5之后，现在，苹果将默认编译器从 GCC转换为LLVM(low level virtual machine)，从此 **不再需要为属性声明实例变量** 了。如果LLVM发现一个没有匹配实例变量的属性，**它将自动创建一个以下划线开头的实例变量**。

```
***.h***
@interface ViewController : UIViewController
// 编译器遇到@property会自动声明对应的setter/getter
@property (copy, nonatomic) NSString *myTitle;
@end
```

不隐藏代码，全部显示如下：

```
**.h**
#import <UIKit/UIKit.h>

@interface ViewController : UIViewController
{
/*
***被隐藏的代码：***
1.这个默认是@synthesize myTitle = _myTitle;生成的
2.所以如果我们手动设置@synthesize myTitle，那么我们编译器
  生成的变量就是NSString *myTitle,相当于@synthesize myTitle = myTitle,
  如果设置@synthesize myTitle = youTitle，那么编译器生成的变量就是NSString *youTitle了
  这要注意。
*/
    NSString *_myTitle;
}
@property (copy, nonatomic) NSString *myTitle;

//***被隐藏的代码***
//编译器遇到@property会自动声明setter/getter方法
- (void)setMyTitle:(NSString *)myTitle;
- (NSString *)myTitle;
@end

**.m**
/*
***被隐藏的代码***
1.@synthesize关键字会自动实现setter/getter的方法
2.@synthesize myTitle = _myTitle指明了属性myTitle的实例变量是_myTitle,setter/getter操作的对象就是_myTitle.
*/
@synthesize myTitle = _myTitle;

- (void)viewDidLoad {
    [super viewDidLoad];
    _myTitle = @"123";
}

//***被隐藏的代码***
// 由关键字@synthesize自动实现
- (NSString *)myTitle{
    return _myTitle;
}

- (void)setMyTitle:(NSString *)myTitle{
    _myTitle = myTitle;
}
```

> 代码说明：
> 
> 1.编译器遇到关键字@property，自动声明setter/getter方法。
> 
> 2.编译器遇到@synthesize,自动实现setter/getter方法。 注：Xcode 现在会默认自动添加 @synthesize 关键字。
> 
> 3.@synthesize myTitle = _myTitle;为属性myTitle生成了一个实例变量_myTitle，所以我们对属性的操作self.myTitle实质上都是在操作_myTitle变量。



<h2 id="1.2.2">1.2.2、@synthesize 和 @dynamic 分别有什么作用？</h2>

1、@property有两个对应的词，一个是 @synthesize，一个是 @dynamic。如果 @synthesize和 @dynamic都没写，那么默认的就是@syntheszie var = _var;

2、@synthesize 的语义是如果你没有手动实现 setter 方法和 getter 方法，那么编译器会自动为你加上这两个方法。

3、@dynamic 告诉编译器：属性的 setter 与 getter 方法由用户自己实现，不自动生成。（当然对于 readonly 的属性只需提供 getter 即可）。假如一个属性被声明为 @dynamic var，然后你没有提供 @setter方法和 @getter 方法，编译的时候没问题，但是当程序运行到 instance.var = someVar，由于缺 setter 方法会导致程序崩溃；或者当运行到 someVar = var 时，由于缺 getter 方法同样会导致崩溃。编译时没问题，运行时才执行相应的方法，这就是所谓的动态绑定。


<h2 id="1.2.3">1.2.3、如何自己重写 setter / getter？</h2>

我们会发现，当我们同时重写setter/getter时会报错，为什么呢？这是因为当我们同时重写setter/getter时，编译器自动添加的代码@synthesize myTitle = _myTitle;失效，就不会自动为我们生成实例变量_myTitle了，setter/getter操作的对象就不存在了。所以我们要加上@synthesize myTitle = _myTitle;,手动指定setter/getter要操作的实例对象是_myTitle。

```
***.h***
@interface Study_PropertyVC : UIViewController

@property (copy, nonatomic) NSString *myTitle;

// 重写setter getter
-(NSString *)myTitle;
-(void)setMyTitle:(NSString *)myTitle;

***.m***
@implementation Study_PropertyVC
/*
  @synthesize必须重写
 */
@synthesize myTitle = _newtitle;

// 重写setter getter
- (NSString *)myTitle{
    return _newtitle;
}

- (void)setMyTitle:(NSString *)myTitle{
    _newtitle = myTitle;
}
```

<h2 id="1.2.4">1.2.4、@property中有哪些属性关键字？默认的关键字是什么？</h2>

**问：@property中有哪些属性关键字？**

* 1、原子操作相关： atomic(默认，线程操作安全)、nonatomic
* 2、读写操作：readwrite(默认，表示既有getter方法，也有setter方法)、readonly(表示只有getter方法)
* 3、内存管理相关：assign、weak、copy、strong(默认)、unsafe_unretained
	* assign “设置方法” 只会针对“纯量类型”（scalar type， CGFloat或NSInteger等）的简单赋值操作
	* retain(MRC)/strong(ARC) “拥有关系” 为这种属性设置新值时，设置方法先保留新值，并释放旧值，然后再将新值设置上去
	* weak “非拥有关系” 为这种属性设置新值时，设置方法既不保留新值，也不释放旧值。此特质同assign类似，然而属性所指的对象遭到摧毁时，属性也会被清空(nil out)
	* unsafe_unretained 此特质的语义和assign相同，但是它适用于“对象类型”（object type），该特质表达一种“非拥有关系”（“不保留”，unretained），当目标对象遭到摧毁时，属性值不会自动清空（“不安全”，unsafe），这一点与weak有区别
	* copy 此特质所表达的所属关系与strong类似。然而设置方法并不保留新值，而是将其“拷贝”（copy）。当属性类型为NSString *时，经常使用此特质来保护其封装性，因为传递给设置方法的新值可能指向一个NSMutableString类的实例，而NSMutableString是NSString的子类，表示一种可以修改的其值的字符串，此时若是不拷贝字符串，那么设置完属性之后，字符串的值就可能会在对象不知情的情况下被修改。
* setter/getter方法

**问：默认的关键字是什么？**

1.对应基本数据类型默认关键字是

```atomic,readwrite,assign```

2.对于普通的 Objective-C 对象

```atomic,readwrite,strong```


<h2 id="1.2.4.1">1.2.4.1、属性关键字 readwrite，readonly，assign，retain，copy，nonatomic 、atomic、strong、weak、unsafe_unretained 各是什么作用，在哪种情况下用？</h2>

同上一题目，语言要重新组织




<h2 id="1.2.5">1.2.5、写一个 setter 方法用于完成 `@property (nonatomic, retain) NSString *name;`，写一个 setter 方法用于完成 `@property (nonatomic, copy) NSString *name;`</h2>

```
@property (nonatomic, retain) NSString *name;

- (void)setName:(NSString *)name {
	[str retain];
	[_name release];
	_name = str;
}

@property(nonatomic, copy) NSString *name;

- (void)setName:(NSString *)name {
	id t = [str copy];
	[_name release];
	_name = t;
}
```



<h2 id="1.2.6">1.2.6、什么情况使用 weak 关键字？相比 assign 有什么不同？</h2>

**问：什么情况使用 weak 关键字？**

* 1. 在 Delegate 关系中防止强引用循环。在 ARC 特性下，通常我们应该设置 Delegate 属性为 weak 的。但是这里有一个疑问，我们常用到的 UITableView 的 delegate 属性是这样定义的： @property (nonatomic, assign) id<UITableViewDelegate> delegate;，为什么用的修饰符是 assign 而不是 weak？其实这个 assign 在 ARC 中意义等同于 __unsafe_unretained（后面会讲到），它是为了在 ARC 特性下兼容 iOS4 及更低版本来实现弱引用机制。一般情况下，你应该尽量使用 weak。
* 2. 在 Block 中防止强引用循环。
* 3. 用来修饰指向由 Interface Builder 创建的控件，自身已经对它强引用一次了，没有必再强引用一次使用weak解决。比如：@property (nonatomic, weak) IBOutlet UIButton *testButton;。


**问：相比 assign 有什么不同？**

* weak 此特质表明该属性定义了一种“非拥有关系” (nonowning relationship)。为这种属性设置新值时，设置方法既不保留新值，也不释放旧值。此特质同assign类似，然而在属性所指的对象遭到摧毁时，属性值也会清空(nil out)，而 assign 属性不会清空。 
* assign的“设置方法”只会执行针对“纯量类型” (scalar type，例如 CGFloat 或 NSlnteger 等)的简单赋值操作。
* assign可以修饰对象(但不推荐)和基本数据类型都可以,但是只是简单地进行赋值操作而已，而 weak 必须用于OC对象。


<h2 id="1.2.7">1.2.7、为什么assign不推荐用于修饰对象？</h2>

**assign可以用来修饰OC对象，但是不推荐！！！**

首先我们需要明确，对象的内存一般被分配到堆上，基本数据类型和oc数据类型的内存一般被分配在栈上。

如果用assign修饰对象，它的所有权修饰符是 __unsafe_unretained, 当对象被释放后，指针的地址还是存在的，也就是说指针并没有被置为nil，从而造成了野指针。因为对象是分配在堆上的，堆上的内存由程序员分配释放。而因为指针没有被置为nil,如果后续的内存分配中，刚好分配到了这块内存，就会造成崩溃。

而assign修饰基本数据类型或oc数据类型，因为基本数据类型是分配在栈上的，由系统分配和释放，所以不会造成野指针。


<h2 id="1.2.7.1">1.2.7.1、什么是空指针、野指针？如何产生野指针？</h2>

[【Objective-C】09-空指针和野指针](https://www.cnblogs.com/mjios/archive/2013/04/22/3034788.html)

* 空指针：
 
	1> 没有存储任何内存地址的指针就称为空指针(NULL指针)

	2> 空指针就是被赋值为0的指针，在没有被具体初始化之前，其值为0。

	```
		Student *s1 = NULL;
		Student *s2 = nil;
	```

* 野指针：

	"野指针"不是NULL指针，是指向"垃圾"内存（不可用内存）的指针。野指针是非常危险的。向野指针发送消息会导致崩溃。野指针错误形式在Xcode中通常表现为：Thread 1：EXC_BAD_ACCESS，因为你访问了一块已经不属于你的内存。

* 野指针，有指向，而空指针无指向，为NULL



**问：如何产生野指针？**

> 1. 指针变量未初始化
> 
> 	任何指针变量刚被创建时不会自动成为NULL指针，它的缺省值是随机的，它会乱指一气。所以，指针变量在创建的同时应当被初始化，要么将指针设置为NULL，要么让它指向合法的内存。
> 
> 2. 指针释放后之后未置空
> 
> 	有时指针在free或delete后未赋值 NULL，便会使人以为是合法的。别看free和delete的名字（尤其是delete），它们只是把指针所指的内存给释放掉，但并没有把指针本身干掉。此时指针指向的就是“垃圾”内存。释放后的指针应立即将指针置为NULL，防止产生“野指针”。
> 
> 3. 指针操作超越变量作用域
> 
> 	不要返回指向栈内存的指针或引用，因为栈内存在函数结束时会被释放。


示例一：

assign可以用来修饰OC对象，会造成野指针。
unsafe_unretained声明一个弱引用，但不会自动置为nil，会出现野指针。


示例二：

自定义Student类，在main函数中添加下列代码

```
1 Student *stu = [[Student alloc] init];
2 
3 [stu setAge:10];
4 
5 [stu release];
6 
7 [stu setAge:10];
```

运行程序，你会发现`[stu setAge:10];`报错了，是个野指针错误！

**分析一下报错原因**

1> 执行完第1行代码后，内存中有个指针变量stu，指向了Student对象
`Student *stu = [[Student alloc] init];`

![](media/005.png)

假设Student对象的地址为0xff43，指针变量stu的地址为0xee45，stu中存储的是Student对象的地址0xff43。即指针变量stu指向了这个Student对象。

2> 接下来是第3行代码: `[stu setAge:10];`

这行代码的意思是：给stu所指向的Student对象发送一条setAge:消息，即调用这个Student对象的setAge:方法。目前来说，这个Student对象仍存在于内存中，所以这句代码没有任何问题。

3> 接下来是第5行代码: `[stu release];`

这行代码的意思是：给stu指向的Student对象发送一条release消息。在这里，Student对象接收到release消息后，会马上被销毁，所占用的内存会被回收。

![](media/006.png)

Student对象被销毁了，地址为0xff43的内存就变成了"垃圾内存"，然而，指针变量stu仍然指向这一块内存，这时候，stu就称为了**野指针！**

4> 最后执行了第7行代码: `[stu setAge:10];`

这句代码的意思仍然是： 给stu所指向的Student对象发送一条setAge:消息。但是在执行完第5行代码后，Student对象已经被销毁了，它所占用的内存已经是垃圾内存，如果你还去访问这一块内存，那就会报野指针错误。这块内存已经不可用了，也不属于你了，你还去访问它，肯定是不合法的。所以，这行代码报错了！

5> 如果修改下代码： 

```
1 Student *stu = [[Student alloc] init];
2 
3 [stu setAge:10];
4 
5 [stu release];
6 
7 stu = nil;   // stu变成了空指针，stu就不再指向任何内存了
8 
9 [stu setAge:10];
```
 
 ![](media/007.png)
 
因为stu是个空指针，没有指向任何对象，因此第9行的setAge:消息是发不出去的，不会造成任何影响。当然，肯定也不会报错。

<h3 id="1.2.7.2">1.2.7.2、野指针的定位</h3>

[iOS野指针定位总结](https://www.jianshu.com/p/8aba0ee41cd7)

[iOS 通向野指针的必经之路](https://www.jianshu.com/p/a9014c4f379d)


<h3 id="1.2.8">1.2.8、为什么我们常见的delegate属性都用是assign而不是retain/strong？</h3>

在 Delegate 关系中防止强引用循环。在 ARC 特性下，通常我们应该设置 Delegate 属性为 weak 的。
```@property (nonatomic, weak) id<UITableViewDelegate> delegate;```

但是这里有一个疑问，我们常用到的 UITableView 的 delegate 属性是这样定义的： `@property (nonatomic, assign) id<UITableViewDelegate> delegate;`，为什么用的修饰符是 assign 而不是 weak？其实这个 assign 在 ARC 中意义等同于所有权修饰符 `__unsafe_unretained`，它是为了在 ARC 特性下兼容 iOS4 及更低版本来实现弱引用机制。一般情况下，你应该尽量使用 weak。


<h3 id="1.2.8.1">1.2.8.1、为什么很多内置类如UITableViewControl的delegate属性都是assign而不是retain？请举例</h3>

我们常见的delegate往往是assign方式的属性而不是retain方式的属性，赋值不会增加引用计数，就是为了防止delegation两端产生不必要的循环引用。如果一个UITableViewController对象a通过retain获取了UITableView对象b的所有权，这个UITableView对象b的delegate又是a，如果这个delegate是retain方式的，那基本上就没有机会释放这两个对象了。如果是retain会引起循环引用。


<h3 id="1.2.8.2">1.2.8.2、delegate的内存管理属性是weak还是assign？</h3>

[delegate的内存管理属性是weak还是assign？](https://www.jianshu.com/p/ccc31e92c664)


<h3 id="1.2.9">1.2.9、怎么用 copy 关键字？block用copy修饰吗？可以用其他修饰符吗？</h3>

* NSString、NSArray、NSDictionary等等经常使用copy关键字，是因为他们有对应的可变类型：NSMutableString、NSMutableArray、NSMutableDictionary，为确保对象中的属性值不会无意间变动，应该在设置新属性值时拷贝一份，保护其封装性
* block也经常使用copy关键字
	* block 使用 copy 是从 MRC 遗留下来的“传统”,在 MRC 中,方法内部的 block 是在栈区的,使用 copy 可以把它放到堆区.
	* 在ARC中写不写都行：对于 block 使用 copy 还是 strong 效果是一样的，但是建议写上copy，因为这样显示告知调用者“编译器会自动对 block 进行了 copy 操作”


<h3 id="1.2.10">1.2.10、用@property声明的 NSString / NSArray / NSDictionary 经常使用 copy 关键字，为什么？如果改用strong关键字，可能造成什么问题？</h3>

**用@property声明的 NSString / NSArray / NSDictionary 经常使用 copy 关键字，为什么？**

copy 的语义是将对象拷贝一份给新的引用，通过新的引用对它的修改不影响原来那个被拷贝的对象。

NSString、NSArray、NSDictionary 等等经常使用 copy 关键字，是因为他们有对应的可变类型：NSMutableString、NSMutableArray、NSMutableDictionary。

使用 copy 无论给我传入是一个可变对象还是不可对象，我本身持有的就是一个不可变的副本。

```
-(void)string_Copy {
    NSMutableString *mutableStr = [NSMutableString stringWithFormat:@"123"];
    self.str2 = mutableStr;
    [mutableStr appendString:@"456"];
    
    NSLog(@"**推荐** NSString copy修饰词 : 此时string和copystring的内存地址都是不同的，修改一个，互不影响");
    NSLog(@"%@ == %p", self.str2, self.str2);
    NSLog(@"%@ == %p", mutableStr, mutableStr);
}

-(void)array_Copy {
    NSMutableArray *mutableArray = [NSMutableArray array];
    [mutableArray addObject:@"1"];
    
    self.arr2 = mutableArray;
   	 
    NSLog(@"**** NSArray Copy修饰词 : 此时内存地址都是不同的，修改一个，互不影响");
    NSLog(@"修改前 == %@ == %p", self.arr2, self.arr2);
    NSLog(@"修改前 == %@ == %p", mutableArray, mutableArray);
    
    [mutableArray addObject:@"2"];
    
    NSLog(@"修改后 == %@ == %p", self.arr2, self.arr2);
    NSLog(@"修改后 == %@ == %p", mutableArray, mutableArray);
}
```

**如果改用strong关键字，可能造成什么问题？**

如果我们使用是 strong ,那么这个属性就有可能指向一个可变对象,如果这个可变对象在外部被修改了,那么会影响该属性。

```
-(void)string_Strong {
    NSMutableString *mutableStr = [NSMutableString stringWithFormat:@"123"];
    self.str1 = mutableStr;
    [mutableStr appendString:@"456"];
    
    NSLog(@"NSString Strong修饰词 : 此时string和copystring的内存地址都是一样的，修改一个，两个就同时被修改");
    NSLog(@"%@ == %p", self.str1, self.str1);
    NSLog(@"%@ == %p", mutableStr, mutableStr);
}

-(void)array_Strong {
    NSMutableArray *mutableArray = [NSMutableArray array];
    
    [mutableArray addObject:@"1"];
    
    self.arr1 = [NSArray array];
    self.arr1 = mutableArray;
    
    NSLog(@"**** NSArray Strong修饰词 : 此时内存地址都是一样的，修改一个，两个就同时被修改");
    NSLog(@"修改前 == %@ == %p", self.arr1, self.arr1);
    NSLog(@"修改前 == %@ == %p", mutableArray, mutableArray);
    
    [mutableArray addObject:@"2"];

    NSLog(@"修改后 == %@ == %p", self.arr1, self.arr1);
    NSLog(@"修改后 == %@ == %p", mutableArray, mutableArray);
}
```






