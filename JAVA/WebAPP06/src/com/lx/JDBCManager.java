package com.lx;

import java.sql.*;
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.SQLException;
//import java.sql.Statement;

public class JDBCManager {
    // MySQL 8.0 以下版本 - JDBC 驱动名及数据库 URL
//    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
//    static final String DB_URL = "jdbc:mysql://localhost:3306/RUNOOB";

    // MySQL 8.0 以上版本 - JDBC 驱动名及数据库 URL
    static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost:3306/QYC";

    // 数据库的用户名与密码，需要根据自己的设置
    static final String USERNAME = "root";
    static final String PASSWORD = "1111";

    public void startJDBC(String device_type, String time, String crash_type, String crash_reason, String crash_stack) {
        Connection conn = null;
        Statement stmt = null;

        try {
            // 注册 JDBC 驱动
            Class.forName(JDBC_DRIVER);

            // 打开链接
            conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);

            // 执行查询
            System.out.println(" 实例化Statement对象...");
            stmt = conn.createStatement();
            String sql;
            sql = "INSERT INTO QYC_Crash" +
                    "(device_type, time, crash_type, crash_reason, crash_stack)" +
                    "VALUES (" + "'" + device_type + "','" + time + "','" + crash_type + "','" + crash_reason + "','" + crash_stack + "'" + ")";

            stmt.executeUpdate(sql);

            // 完成后关闭
            stmt.close();
            conn.close();
        } catch(SQLException se) {
            // 处理 JDBC 错误
            se.printStackTrace();
        } catch(Exception e) {
            // 处理 Class.forName 错误
            e.printStackTrace();  e.printStackTrace();
        } finally {
            // 关闭资源
            try{
                if(stmt!=null) stmt.close();
            } catch (SQLException se2){
            }// 什么都不做
            try{
                if(conn!=null) conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
        }
    }



    public void PackageJDBC_Insert(String name, String icon, String branch, String env, String install, String platform, String create_by, String create_at, String testUser) {
        Connection conn = null;
        Statement stmt = null;

        try {
            // 注册 JDBC 驱动
            Class.forName(JDBC_DRIVER);

            // 打开链接
            conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);

            // 执行查询
            System.out.println(" 实例化Statement对象...");
            stmt = conn.createStatement();
            String sql;
            sql = "INSERT INTO QYC_Package" +
                    "(name, icon, branch, env, install, platform, create_by, create_at, testUser)" +
                    "VALUES (" + "'" + name + "','" + icon + "','" + branch + "','" + env + "','" + install + "','" + platform + "','" + create_by + "','" + create_at + "','" + testUser + "'" + ")";

            stmt.executeUpdate(sql);

            // 完成后关闭
            stmt.close();
            conn.close();
        } catch(SQLException se) {
            // 处理 JDBC 错误
            se.printStackTrace();
        } catch(Exception e) {
            // 处理 Class.forName 错误
            e.printStackTrace();  e.printStackTrace();
        } finally {
            // 关闭资源
            try{
                if(stmt!=null) stmt.close();
            } catch (SQLException se2){
            }// 什么都不做
            try{
                if(conn!=null) conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
        }
    }


    public String PackageJDBC_Select(Integer page, Integer limit){
        Connection conn = null;
        Statement stmt = null;

        try {
            // 注册 JDBC 驱动
            Class.forName(JDBC_DRIVER);

            // 打开链接
            conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);

            // 执行查询
            System.out.println(" 实例化Statement对象...");
            stmt = conn.createStatement();
            String sql;
            sql = "SELECT * FROM QYC_Package ORDER BY create_at DESC LIMIT " + String.valueOf(page * limit) + "," + String.valueOf(limit);

            ResultSet rs = stmt.executeQuery(sql);

            //STEP 5: Extract data from result set
            while(rs.next()){
                //Retrieve by column name
                String name  = rs.getString("name");
                String icon = rs.getString("icon");
                String branch = rs.getString("branch");
                String env = rs.getString("env");
                String install = rs.getString("install");
                String platform = rs.getString("platform");
                String create_by = rs.getString("create_by");
                String create_at = rs.getString("create_at");
                String testUser = rs.getString("testUser");

                //Display values
                System.out.print( "\n" + name+" " + icon+" " + branch+" " + env+" " + install+" " + platform+" " + create_by+" " + create_at+" " + testUser);
            }
            rs.close();

            // 完成后关闭
            stmt.close();
            conn.close();
        } catch(SQLException se) {
            // 处理 JDBC 错误
            se.printStackTrace();
        } catch(Exception e) {
            // 处理 Class.forName 错误
            e.printStackTrace();  e.printStackTrace();
        } finally {
            // 关闭资源
            try{
                if(stmt!=null) stmt.close();
            } catch (SQLException se2){
            }// 什么都不做
            try{
                if(conn!=null) conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
        }

        return "hahaha";
    }

}
