



收费 [花生壳](https://b.oray.com/)

自建 [FRP](https://github.com/fatedier/frp)

其他 [不用第三方实现内网穿透](https://blog.csdn.net/qq_37063860/article/details/83119887)

[简单的端口映射教程](https://zhuanlan.zhihu.com/p/43233032)





# 一、迅速使用 NATAPP

[官网 - NATAPP](https://natapp.cn/)

[教程 - 1分钟](https://juejin.im/post/5cad5e675188251b1b2f5517)



下载对应版本[download](https://natapp.cn/#download)

解压

![](media_CrossLocalNet/001.jpg)

前往对应的目录下

```
➜ natapp ls
natapp
```



开启权限

```
➜ chmod a+x natapp    // 方式一：给所有用户开启执行命令 

➜ sudo ./natapp ....  // 方式二：sudo执行
```



获取 并 配置authtoken

![](media_CrossLocalNet/002.jpg)



```
➜ natapp ./natapp -authtoken=72cacadb11a24xxx
```

![](media_CrossLocalNet/003.jpg)







