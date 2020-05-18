package com.lx.myServer;

import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class myServer {
    private ServerSocket serverSocket;

    public static void main(String[] args) {
        myServer server = new myServer();
        server.start();
    }

    void start() {
        try {
            serverSocket = new ServerSocket(8800);
            receive();
        } catch (Exception e){
            System.out.println("服务器启动失败！！！");
        }
    }

    void receive() {
        try {
            Socket client = serverSocket.accept();
            System.out.println("一个客户端建立了连接！！！");

            // 获取请求协议
            InputStream input = client.getInputStream();
            byte[] datas = new byte[1024 * 1024 *1024 * 1024 * 1024];
            int len = input.read(datas);
            String requestInfo = new String(datas, 0, len);
            System.out.println(requestInfo);

        } catch (Exception e) {
            System.out.println("客户端错误！！！");
        }

    }

    void stop() {

    }


}
