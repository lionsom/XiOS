

[Objective-C 的“多继承”](https://blog.csdn.net/yiyaaixuexi/article/details/8970734)

[iOS实现多继承的几种方式](https://www.jianshu.com/p/4a2a693267d6)





## 第一部分：概念

多继承：所谓多继承是指派生类具有多个[基类](https://baike.baidu.com/item/基类)，[派生类](https://baike.baidu.com/item/派生类/9589520)与每个基类之间的关系仍可看作是一个单继承。

派生类C具有两个基类(类A和类B)，因此，类C是多继承的。按照继承的规定，派生类C的成员包含了基类A、B中成员以及该类本身的成员。



如果在多继承中，如果父类A和父类B中，有一个同名的方法，那么通过子类调用的时候，该调用哪个？



OC为什么不支持多继承？

Objective-C不支持多继承，由于消息机制名字查找发生在运行时而非编译时，很难解决多个基类可能导致的二义性问题。



## 第二部分：Objective-C实现多继承



### 2.1、Category分类



```
/*分类头文件*/
#import "Programmer.h"

@interface Programmer (Program)
// 声明属性
@property (nonatomic, assign) NSString *motto;
// 声明公有方法
- (void)draw;
- (void)sing;
@end


/*分类实现文件*/
#import <objc/runtime.h>

@implementation Programmer (Program)
// 为Catagory添加属性
static const char kMottoKey;
- (void)setMotto:(NSString *)motto {
    objc_setAssociatedObject(self, &kMottoKey, motto, OBJC_ASSOCIATION_COPY_NONATOMIC);
}
- (NSString *)motto {
    return objc_getAssociatedObject(self, &kMottoKey);
}
// 私有方法
- (void)program {
    NSLog(@"I'm writing bugs!");
}
// 实现公有方法
- (void)draw {
    NSLog(@"I can draw");
}
- (void)sing {
    NSLog(@"Lalalalallalala");
}
@end
```









### 2.2、协议









**方法1. 组合方式，用ClassC  添加ClassA ,ClassB成员变量 来调用methodA，methodB**



**方法2.协议protocol  设置ClassA delegate和 ClasssB delegate 以及实现方法ClassA里的methodA，和ClasssB里的methodB。ClassC遵守这两个协议就可以。**



**方法3.类别（分类）**



**方法4.消息转发机制**





NSproxy



