## 一、前期可先使用蓝灯翻墙

[lantern](https://github.com/getlantern/lantern)



## 二、Shadowsocks

#### 2.1、真正官网

[shadowsocks真正官网](https://shadowsocks.org/en/index.html)

[shadowsocks客户端下载地址](https://shadowsocks.org/en/download/clients.html)

[GitHub - shadowsocks](https://github.com/shadowsocks)

#### 2.2、购买使用

本站（[Shadowsocks.com](https://shadowsocks.com/)）由澳洲公司运营，与 [Shadowsocks](https://github.com/shadowsocks) 开发者并无任何关係，并非 Shadowsocks 官网。

[购买 - shadowsocks](https://order.shadowsocks.website)

[GitHub - Shadowsocks-Wiki](https://github.com/Shadowsocks-Wiki)

[详细教程](https://leaderliang.coding.me/1829.html)



## 三、新推荐 - 喵帕斯（稳定，比较贵）

[https://喵帕斯.com](https://xn--i2ru8q2qg.com)

[喵帕斯的注册教程](http://zoohotelforever.blogspot.com/2019/03/blog-post_13.html)



订阅地址：

![](media_OverTheWall/喵_订阅.png)



## 四、推荐阅读

[shadowsocks搭建教程](https://shadowsocks.blogspot.com/)

[自用SS/SSR机场体验及吐槽](http://backu9.blogspot.com/2018/09/ssssr_18.html)

https://github.com/xieyushi/blog/wiki/



## 五、翻墙中遇到的问题

### 5.1、多个翻墙工具，导致1080端口被同时监听

1、查看1080端口，lsof命令显示占用该端口的进程情况

```
#命令格式：lsof -i :端口
➜ ~ lsof -i:1080
COMMAND     PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
Google      489 qiyeyun   30u  IPv4 0xf663055dae816f93      0t0  TCP localhost:57019->localhost:socks (ESTABLISHED)
Google      489 qiyeyun   34u  IPv4 0xf663055daeda4c03      0t0  TCP localhost:57031->localhost:socks (ESTABLISHED)
Google      489 qiyeyun   46u  IPv4 0xf663055dae8ea23b      0t0  TCP localhost:57086->localhost:socks (ESTABLISHED)
Google      489 qiyeyun   56u  IPv4 0xf663055daeda86b3      0t0  TCP localhost:57084->localhost:socks (ESTABLISHED)
Google      489 qiyeyun  110u  IPv4 0xf663055dae8edceb      0t0  TCP localhost:56971->localhost:socks (ESTABLISHED)
trojan    96156 qiyeyun    6u  IPv4 0xf663055dadb076b3      0t0  TCP localhost:socks (LISTEN)
trojan    96156 qiyeyun    9u  IPv4 0xf663055dae744ceb      0t0  TCP localhost:socks->localhost:57086 (ESTABLISHED)
trojan    96156 qiyeyun   10u  IPv4 0xf663055dae81a07b      0t0  TCP localhost:socks->localhost:57019 (ESTABLISHED)
trojan    96156 qiyeyun   15u  IPv4 0xf663055daeda5f93      0t0  TCP localhost:socks->localhost:57031 (ESTABLISHED)
trojan    96156 qiyeyun   21u  IPv4 0xf663055db741aa43      0t0  TCP localhost:socks->localhost:57084 (ESTABLISHED)
trojan    96156 qiyeyun   41u  IPv4 0xf663055dae8e9873      0t0  TCP localhost:socks->localhost:56971 (ESTABLISHED)
```















