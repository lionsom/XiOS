package com.lx.servlet;

/* 针对这块数据创建的类
    <servlet>
        <servlet-name>login</servlet-name>
        <servlet-class>com.lx.server.LoginServlet</servlet-class>
    </servlet>
 */
public class Entity {
    private String name;
    private String clz;

    public Entity() {
    }

    public Entity(String name, String clz) {
        this.name = name;
        this.clz = clz;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClz() {
        return clz;
    }

    public void setClz(String clz) {
        this.clz = clz;
    }
}
