[iOS-APP-运行时防Crash工具XXShield练就](https://www.jianshu.com/p/f18876bbe2c4)
Demo - **[XXShield Star 600+](https://github.com/ValiantCat/XXShield)**

[AvoidCrash -- 远离常见的崩溃](https://www.jianshu.com/p/b7a7ae0c9243)
Demo - **[AvoidCrash Star 1200+](https://github.com/chenfanfang/AvoidCrash)**

[Baymax：网易iOS App运行时Crash自动防护实践](https://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247488311&amp;idx=1&amp;sn=0db090c8d4a5efafa47f00af4b3f174f&source=41#wechat_redirect)



[iOS防止崩溃机制以及底层原理](https://blog.csdn.net/goodluckwujie/article/details/84255814)

[iOS中如何防止程序crash](https://www.jianshu.com/p/81cf5dd74286)

Demo - [LSSafeProtector Star 500+](https://github.com/lsmakethebest/LSSafeProtector)



[JJException Star 800+](https://github.com/jezzmemo/JJException)







## NSArray

### 1.1、创建/初始化NSArray

```
//===========
// 创建数组
//===========
    // 崩溃 -[__NSPlaceholderArray initWithObjects:count:]: attempt to insert nil object from objects[0]
    NSString *string = nil;
    NSArray *arr1 = @[@"1",@"2",string];

    NSArray *temp = nil;
    NSArray *arr2 = [NSArray arrayWithArray:temp];
    
    // 崩溃 -[__NSPlaceholderArray initWithObjects:count:]: attempt to insert nil object from objects[0]
    NSArray *arr3 = [NSArray arrayWithObject:nil];
    
    NSArray *arr4 = [NSArray arrayWithObjects:nil];
    
    NSString *strings[3];
    strings[0] = @"First";
    strings[1] = @"Second";
    strings[2] = @"Third";
    NSArray *arr5 = [NSArray arrayWithObjects:strings count:3];
```



```
//===========
// 初始化数组
//===========
    NSArray *arr6 = [[NSArray alloc] init];
    
    NSArray *arr7 = [[NSArray alloc] initWithArray:nil];
    
    NSArray *arr8 = [[NSArray alloc] initWithArray:nil copyItems:YES];
    
    NSArray *arr9 = [[NSArray alloc] initWithObjects:@"2",@"3", nil];
    
    NSString *strings[3];
    strings[0] = @"First";
    strings[1] = @"Second";
    strings[2] = @"Third";
    NSArray *arr10 = [[NSArray alloc] initWithObjects:strings count:3];
```



**通过以上测试，发现有可能造成崩溃的函数有：**

```
NSArray *arr1 = @[@"1",@"2",string];
+ arrayWithObject:
+ arrayWithObjects: count:
- initWithObjects: count:
```







**id** AA = obj[@"value"];

​                NSString *A = AA[@"max"];

​                NSString *B =AA[@"min"];























