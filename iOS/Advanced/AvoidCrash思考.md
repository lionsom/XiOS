



### [为什么 iOS 开发中很少用到 @try @catch 语句？](https://www.zhihu.com/question/21248079)

答：因为try catch无法捕获UncaughtException，而oc中大部分crash如：内存溢出、野指针等都是无法捕获的，而能捕获的只是像数组越界之类（这真心需要catch么？），所以try catch对于oc来说，比较鸡肋。



OC崩溃类型

GC：当一个电脑上的动态内存不再需要时，就应该予以释放，以让出内存，这种内存资源管理，称为垃圾回收（garbage collection），简称 GC。

在开启鼠标自动取词功右边按下功能



Apple虽然同时提供了错误处理（NSError）和异常处理（exception）两种机制，但是Apple更加提倡开发者使用NSError来处理程序运行中可恢复的错误。而异常被推荐用来处理不可恢复的错误。