

最近利用Runtime在给NSArray写方法交换防止崩溃的时候，简单如下：

```
Class myClass = NSClassFromString(@"__NSArrayI");
        Method safeMethod=class_getInstanceMethod (self, @selector(objectAtSafeIndexI:));
        
        Method unsafeMethod=class_getInstanceMethod (myClass, @selector(objectAtIndex:));
        method_exchangeImplementations(unsafeMethod, safeMethod);

```









