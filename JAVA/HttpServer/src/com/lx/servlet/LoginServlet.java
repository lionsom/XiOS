package com.lx.servlet;

// 实现接口
public class LoginServlet implements Servlet{

    @Override
    public void service() {
        System.out.println("LoginServlet");
    }
}
