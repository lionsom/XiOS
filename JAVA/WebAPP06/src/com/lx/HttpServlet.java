package com.lx;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Enumeration;


@WebServlet(name = "Servlet")
public class HttpServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("doPost");

        String uri = request.getRequestURI();   // 获取uri
        System.out.println("uri:"+uri);     // uri:/WEB152/request

        StringBuffer url = request.getRequestURL();     // 获取url
        System.out.println("url:"+url);     // url:http://127.0.0.1:8080/WEB152/request

        String Contextpath = request.getContextPath();  // 获取当前Web应用的名称***
        System.out.println("Contextpath:"+Contextpath);     // Contextpath:/WEB152

        String queryString = request.getQueryString();      // 获取get提交url地址后的参数字符串
        System.out.println("queryString:"+queryString);     // queryString:username=x5456&passwd=123

        String header = request.getHeader("User-Agent");    // 获取请求头
        System.out.println(header);     // PostmanRuntime/7.1.1

        Enumeration<String> HeaderNamesList = request.getHeaderNames();     // 相当于一个存放String类型的集合

        while(HeaderNamesList.hasMoreElements()){       // Enumeration获取键值的方法
            String headername = HeaderNamesList.nextElement();
            String headervalue = request.getHeader(headername);
            System.out.println(headername+":"+headervalue);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("doGet");

        String data = "hello world, i am 中国！！！";
        OutputStream outputStream = response.getOutputStream();//获取OutputStream输出流
        response.setHeader("content-type", "text/html;charset=UTF-8");//通过设置响应头控制浏览器以UTF-8的编码显示数据，如果不加这句话，那么浏览器显示的将是乱码

        byte[] dataByteArr = data.getBytes("UTF-8");//将字符转换成字节数组，指定以UTF-8编码进行转换
        outputStream.write(dataByteArr);//使用OutputStream流向客户端输出字节数组
    }
}
