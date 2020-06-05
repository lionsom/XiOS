package com.lx;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Enumeration;

// 注解
@WebServlet(name="PackageServlet",urlPatterns={"/package"})
public class PackageServlet extends javax.servlet.http.HttpServlet {
    public PackageServlet() {
        super();
    }

    @Override
    public void destroy() {
        super.destroy();

        System.out.println("PackageServlet destroy");
    }

    @Override
    public void init() throws ServletException {
        super.init();
        System.out.println("PackageServlet init");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        System.out.println("PackageServlet doGet");

        // 获取Header参数
        Enumeration<String> HeaderNamesList = req.getHeaderNames();     // 相当于一个存放String类型的集合
        while(HeaderNamesList.hasMoreElements()){       // Enumeration获取键值的方法
            String headername = HeaderNamesList.nextElement();
            String headervalue = req.getHeader(headername);
            System.out.println(headername+":"+headervalue);
        }
        String uri = req.getRequestURI();   // 获取uri
        System.out.println("uri:"+uri);     // uri:/WEB152/request

        if ( uri.endsWith("/package") ) {
            // JDBC
            JDBCManager manager = new JDBCManager();
            manager.PackageJDBC_Select(1,1);
        }


        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json; charset=utf-8");
//        resp.setHeader("content-type", "text/html;charset=UTF-8");   // 等价于
        String data = "{\"name\":\"暂不支持\",\"type\":\"后续再开发！\"}";

        OutputStream outputStream = resp.getOutputStream(); //获取OutputStream输出流
        byte[] dataByteArr = data.getBytes("UTF-8"); //将字符转换成字节数组，指定以UTF-8编码进行转换
        outputStream.write(dataByteArr); //使用OutputStream流向客户端输出字节数组
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 处理中文乱码
        req.setCharacterEncoding("UTF-8");

        System.out.println("PackageServlet doPost");

        // POST Param
        String name = req.getParameter("name");
        String icon = req.getParameter("icon");
        String branch = req.getParameter("branch");
        String env = req.getParameter("env");
        String install = req.getParameter("install");
        String platform = req.getParameter("platform");
        String create_by = req.getParameter("create_by");
//        String create_at = req.getParameter("create_at");
        String create_at = getCurrentTime();
        String testUser = req.getParameter("testUser");
        System.out.println("name" + " : " + name);
        System.out.println("icon" + " : " + icon);
        System.out.println("branch" + " : " + branch);
        System.out.println("env" + " : " + env);
        System.out.println("install" + " : " + install);
        System.out.println("platform" + " : " + platform);
        System.out.println("create_by" + " : " + create_by);
        System.out.println("create_at" + " : " + create_at);
        System.out.println("testUser" + " : " + testUser);

        // JDBC
        JDBCManager manager = new JDBCManager();
        manager.PackageJDBC_Insert(name, icon, branch, env, install, platform, create_by, create_at, testUser);


        // 返回值 字符集
        resp.setCharacterEncoding("UTF-8");
        resp.setHeader("content-type","text/html;charset=UTF-8");

        String str ="{\"status\":200, \"code\":\"200\", \"msg\":\"提交成功\",\"desc\":\"来自移动端的服务！\"}";
        OutputStream out = resp.getOutputStream();
        out.write(str.getBytes("UTF-8"));
        out.flush();
        out.close();
    }

    String getCurrentTime() {
        // 时间格式化
        SimpleDateFormat format = new SimpleDateFormat();
        format.applyPattern("yyyy-MM-dd HH:mm:ss");
        // 获取当前时间
        Date date = new Date();
        return format.format(date);
    }

}
