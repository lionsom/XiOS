package com.lx;

import com.google.gson.Gson;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
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



    public void PackageJDBC_Insert(String createAt, String bundleName, String currentVersion, String appId, String appName, String icon, String branch, String env, String install, String platform, String developer, String testUser) {
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
                    "(createAt, bundleName, currentVersion, appId, appName, icon, branch, env, install, platform, developer, testUser)" +
                    "VALUES (" + "'" + createAt + "','" + bundleName + "','" + currentVersion + "','" + appId + "','" + appName + "','" + icon + "','" + branch + "','" + env + "','" + install + "','" + platform + "','" + developer + "','"  + testUser + "'" + ")";

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

        // 数据数组
        List<PackageInfo> infoList = new ArrayList<PackageInfo>();

        try {
            // 注册 JDBC 驱动
            Class.forName(JDBC_DRIVER);

            // 打开链接
            conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);

            // 执行查询
            System.out.println(" 实例化Statement对象...");
            stmt = conn.createStatement();
            String sql;
            sql = "SELECT * FROM QYC_Package ORDER BY createAt DESC LIMIT " + String.valueOf(page * limit) + "," + String.valueOf(limit);

            System.out.print("SQL语句 ：" + sql);

            ResultSet rs = stmt.executeQuery(sql);

            //STEP 5: Extract data from result set
            while(rs.next()){

                //Retrieve by column name
                String createAt  = rs.getString("createAt");
                String bundleName = rs.getString("bundleName");
                String currentVersion = rs.getString("currentVersion");
                String appId = rs.getString("appId");
                String appName = rs.getString("appName");
                String icon = rs.getString("icon");
                String branch = rs.getString("branch");
                String env = rs.getString("env");
                String install = rs.getString("install");
                String platform = rs.getString("platform");
                String developer = rs.getString("developer");
                String testUser = rs.getString("testUser");

                // Bean
                PackageInfo info = new PackageInfo(createAt,bundleName,currentVersion,appId,appName,icon,branch,env,install,platform,developer,testUser);
                infoList.add(info);

                //Display values
                System.out.print( "\n" + createAt+" " + bundleName+" " + currentVersion+" " + appId+" " + appName+" " + icon+" " + branch +" " + env +" " + install +" " + platform+" " + developer+" " + testUser);
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

        // 解析对象
        Gson gson = new Gson();
        String resultJson = gson.toJson(infoList);

        return resultJson;
    }

}
