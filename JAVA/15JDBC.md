

# 一、JDBC

## 1、介绍

> **Java数据库连接**（**Java Database Connectivity**，简称**JDBC**）
>
> JDBC是Java语言中用来规范客户端程序如何来访问数据库的应用程序接口（统一的编程API），提供了诸如查询和更新数据库中数据的方法。
>
> Sun公司无法针对各个不同的服务器厂商编写不同的数据库连接代码，所以Sun公司决定提供一套API，让凡是想数据库与Java连接的数据库厂商必须自己 **实现JDBC这套接口**，而数据库厂商的JDBC的实现，我们也称作它为 **数据库的驱动** 。



## 2、JAVA访问数据库流程

```
1. 加载JDBC驱动；
2. 建立与数据库的连接；
3. 发送SQL语句；
4. 获得查询结果；
```



## 3、下载MySQL数据库驱动

> 下载地址：https://dev.mysql.com/downloads/connector/j/

![](media_JDBC/001.jpg)



## 4、导入MySQL驱动 【重点】

### 1、项目导入

![](media_JDBC/002.jpg)



### 2、Tomcat导入

![](media_JDBC/003.jpg)



## 4、Java程序连接MySQL

> https://www.runoob.com/java/java-mysql-connect.html

```
// MySQL 8.0 以上版本 - JDBC 驱动名及数据库 URL
static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
static final String DB_URL = "jdbc:mysql://localhost:3306/QYC";

// 数据库的用户名与密码，需要根据自己的设置
static final String USERNAME = "root";
static final String PASSWORD = "1111";

public void startJDBC(String arg) {
    Connection conn = null;
    Statement stmt = null;

    // 注册 JDBC 驱动
    Class.forName(JDBC_DRIVER);

    // 打开链接
    conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);
}
```









