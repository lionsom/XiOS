package com.lx;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.io.BufferedWriter;


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

        // POST Param
        String device_type = request.getParameter("device_type");
        String time = request.getParameter("time");
        String crash_type = request.getParameter("crash_type");
        String crash_reason = request.getParameter("crash_reason");
        String crash_stack = request.getParameter("crash_stack");
        System.out.println("device_type" + " : " + device_type);
        System.out.println("time" + " : " + time);
        System.out.println("crash_type" + " : " + crash_type);
        System.out.println("crash_reason" + " : " + crash_reason);
        System.out.println("crash_stack" + " : " + crash_stack);

        // JDBC
        JDBCManager manager = new JDBCManager();
        manager.startJDBC(device_type, time, crash_type, crash_reason, crash_stack);

        /*
        // POST Body
//        IOUtils.toString(request.getInputStream());

        InputStream inputStream = request.getInputStream();
        StringBuilder sb = new StringBuilder();
        String line;
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        String str22 = sb.toString();
        System.out.println("Body输出 == " + str22);

        // 时间
        Date date = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH");
        String str = format.format(date);
        System.out.println("DATE" + ":" + str);


        String fileName= str + ".txt";

        // 可为文本相对路劲，可以文件夹绝对路径
        String path = "/Users/qiyeyun/Documents/";
        File file = new File(path);
        // 如果文件夹不存在则创建
        if (!file.exists()) {
            file.mkdir();
        }
        // 如果文件不存在则创建
        File filename = new File(path + fileName);
        if (!file.exists()) {
            try {
                file.createNewFile();// 不存在直接创建
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        // 写入内容
        String content = "This is the content to write into file." + "\n Fisrt === " + first + "\n Second === " + second;
//        writeToBuffer(content, filename);
        // Body 写入
        writeToBuffer(str22+"\n", filename);
*/

    }

    private static void writeToBuffer(String content, File filename) {
        try {
            // 1.此方法覆盖
//            FileWriter fw = new FileWriter(filename.getAbsoluteFile());
//            BufferedWriter bw = new BufferedWriter(fw);
            // 2.此方法接着写
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filename.getAbsoluteFile(), true)));
            bw.write(content);
            bw.close();
            System.out.println("success");
        } catch (IOException e) {
            System.out.println("fail");
            e.printStackTrace();
        }
    }



    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("doGet");

        String data = "hello world, i am 中国！！！";
        OutputStream outputStream = response.getOutputStream(); //获取OutputStream输出流
        response.setHeader("content-type", "text/html;charset=UTF-8"); //通过设置响应头控制浏览器以UTF-8的编码显示数据，如果不加这句话，那么浏览器显示的将是乱码

        byte[] dataByteArr = data.getBytes("UTF-8"); //将字符转换成字节数组，指定以UTF-8编码进行转换
        outputStream.write(dataByteArr); //使用OutputStream流向客户端输出字节数组

    }

}
