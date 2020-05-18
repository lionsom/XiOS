package com.lx.server.basic;

import java.lang.reflect.InvocationTargetException;

/*
 *
 */
public class ReflectTest {
    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
        // 获取Class三种方式
        // 1.对象.getClass();
        iPhone ip = new iPhone();
        Class clz = ip.getClass();
        // 2.类.class()
        Class clz1 = iPhone.class;
        // 3.Class.forName("包名.类名")
        Class clz2 = Class.forName("com.lx.server.basic.iPhone");

        // 创建对象
//        iPhone ip2 = (iPhone)clz.newInstance();   // 新版本不支持
//        System.out.println(ip2);

        iPhone ip3 = (iPhone)clz2.getConstructor().newInstance();
        System.out.println(ip3);
    }
}


class iPhone {

    public iPhone() {

    }
}
