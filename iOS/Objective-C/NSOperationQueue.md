- `queue`：用来处理响应数据的线程，
    若为 `mainQueue`，则代理方法或者 `completionHandler` 中的代码在主线程程执行；
    若为 `nil` 或者创建一个操作队列，则在任意子线程执行；

- `configuration`：对会话一些配置的封装：如使用`Cache`、`Cookie`、证书，或者是否允许在蜂窝网络上进行连接！





`NSURLSession` 实例是线程安全的：可以在任何线程中创建会话和任务；当代理方法调用时，将在正确的委托队列上调用。



`NSURLSession` 对`delegate`、`queue`持有强引用，为避免内存泄漏，需要显式地使会话无效！









