

# 一、JDBC

## 1、介绍

> **Java数据库连接**（**Java Database Connectivity**，简称**JDBC**）
>
> JDBC是Java语言中用来规范客户端程序如何来访问数据库的应用程序接口（统一的编程API），提供了诸如查询和更新数据库中数据的方法。
>
> Sun公司无法针对各个不同的服务器厂商编写不同的数据库连接代码，所以Sun公司决定提供一套API，让凡是想数据库与Java连接的数据库厂商必须自己 **实现JDBC这套接口**，而数据库厂商的JDBC的实现，我们也称作它为 **数据库的驱动** 。



## 2、JAVA访问数据库流程

使用JDBC应用程序向表中插入数据记录需要以下步骤：

* 导入包：需要包含包含数据库编程所需的JDBC类的包。 大多数情况下，使用import java.sql.*就足够了。
* 注册JDBC驱动程序：需要初始化驱动程序，以便可以程序中打开数据库的通信通道。
* 打开连接：需要使用DriverManager.getConnection()方法来创建一个Connection对象，它表示与数据库服务器的物理连接。
* 执行查询：需要使用类型为Statement的对象来构建和提交SQL语句，以在选择的数据库的表中插入数据记录。
* 清理环境：需要明确地关闭所有数据库资源，而不依赖于JVM的垃圾收集。



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









