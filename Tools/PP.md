/etc/profile   

/etc/paths 

~/.bash_profile 

~/.bash_login 

~/.profile 

~/.bashrc



### 查看PATH环境变量：

echo $PATH











## Java为例

https://zhuanlan.zhihu.com/p/57229931



如果我们不配置JAVA环境变量，

java --version

也可以显示出来信息



使用 which java 查看路径，发现使用的是 /user/bin/java

我们配置JAVA环境变量，

which java 就会显示我们配置的java