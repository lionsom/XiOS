package com.lx.servlet;

import java.util.HashSet;
import java.util.Set;

/* 针对这块数据设计的类
    <servlet-mapping>
        <servlet-name>login</servlet-name>
        <url-pattern>/login</url-pattern>
        <url-pattern>/lg</url-pattern>
    </servlet-mapping>
 */
public class Mapping {
    private String name;
    private Set<String> partterns; // 多个且不重合

    public Mapping() {
        // new创建Mapping对象时进行初始化
        partterns = new HashSet<String>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<String> getPartterns() {
        return partterns;
    }

    public void setPartterns(Set<String> partterns) {
        this.partterns = partterns;
    }

    //
    public void addPatterns(String pattern) {
        this.partterns.add(pattern);
    }
}
