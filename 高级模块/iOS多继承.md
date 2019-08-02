

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
// 分类.h
@interface Programmer (Coding)
@property (nonatomic, copy) NSString *height;
-(void)show;
@end

// 分类.m
#import <objc/runtime.h>
@implementation Programmer (Coding)
-(void)setHeight:(NSString *)height {
    objc_setAssociatedObject(self, @selector(height), height, OBJC_ASSOCIATION_COPY_NONATOMIC);
}
-(NSString *)height {
    return objc_getAssociatedObject(self, _cmd);
}
-(void)show {
    NSLog(@"分类新增方法");
}
@end


/**
 多继承实现一：分类，给类添加属性和方法
 */
 		// 调用
    Programmer *programmer = [[Programmer alloc] init];
    programmer.height = @"123";
    [programmer show];

```



### 2.2、协议

协议主要是用来提出类应遵守的标准，但其特性也可用来实现多继承。一个类可以遵守多个协议，也即实现多个协议的方法，以此来达到多继承的效果。

概念上的单继承和多继承应该是继承父类的属性和方法，并且不经重写即可使用，但通过协议实现多继承有如下不同:

> a.需要实现协议方法
> b.由于协议无法定义属性，所以只能实现方法的多继承



### 2.3、消息转发机制





### 2.4、NSProxy



