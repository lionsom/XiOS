# mac登录云服务器

```
➜ ~ ssh root@47.114.81.248
root@47.114.81.248's password:

Welcome to Alibaba Cloud Elastic Compute Service !

Activate the web console with: systemctl enable --now cockpit.socket

[root@iZbp1hyj00tfq6s5ka3klmZ ~]#
```



* `Activate the web console with: systemctl enable --now cockpit.socket`

[centos8 终端登录后提示需要把cockpit服务设置开机自启](https://zhuanlan.zhihu.com/p/113270502)

https://docsxyz.com/wiki/centos/activate-the-web-console

```
[root@iZbp1hyj00tfq6s5ka3klmZ ~]# systemctl enable --now cockpit.socket
Created symlink /etc/systemd/system/sockets.target.wants/cockpit.socket → /usr/lib/systemd/system/cockpit.socket.
```



### 退出：control + d

### 重新登录

```
➜ ~ ssh root@47.114.81.248
root@47.114.81.248's password:

Welcome to Alibaba Cloud Elastic Compute Service !

Web console: https://iZbp1hyj00tfq6s5ka3klmZ:9090/ or https://172.16.90.116:9090/

Last login: Mon Jun 29 17:02:59 2020 from 221.226.186.58
[root@iZbp1hyj00tfq6s5ka3klmZ ~]#
```



### 防火墙

```
查看状态：systemctl status firewalld.service

开启：systemctl start firewalld.service
关闭：systemctl stop firewalld.service || systemctl disable firewalld.service
```

### cockpit 跳过防火墙

```
[root@iZbp1hyj00tfq6s5ka3klmZ ~]# systemctl start firewalld.service
[root@iZbp1hyj00tfq6s5ka3klmZ ~]# sudo firewall-cmd --get-services |grep cockpit
RH-Satellite-6 amanda-client amanda-k5-client amqp amqps apcupsd audit bacula bacula-client bb bgp bitcoin bitcoin-rpc bitcoin-testnet bitcoin-testnet-rpc bittorrent-lsd ceph ceph-mon cfengine cockpit condor-collector ctdb dhcp dhcpv6 dhcpv6-client distcc dns dns-over-tls docker-registry docker-swarm dropbox-lansync elasticsearch etcd-client etcd-server finger freeipa-4 freeipa-ldap freeipa-ldaps freeipa-replication freeipa-trust ftp ganglia-client ganglia-master git grafana gre high-availability http https imap imaps ipp ipp-client ipsec irc ircs iscsi-target isns jenkins kadmin kdeconnect kerberos kibana klogin kpasswd kprop kshell ldap ldaps libvirt libvirt-tls lightning-network llmnr managesieve matrix mdns memcache minidlna mongodb mosh mountd mqtt mqtt-tls ms-wbt mssql murmur mysql nfs nfs3 nmea-0183 nrpe ntp nut openvpn ovirt-imageio ovirt-storageconsole ovirt-vmconsole plex pmcd pmproxy pmwebapi pmwebapis pop3 pop3s postgresql privoxy prometheus proxy-dhcp ptp pulseaudio puppetmaster quassel radius rdp redis redis-sentinel rpc-bind rsh rsyncd rtsp salt-master samba samba-client samba-dc sane sip sips slp smtp smtp-submission smtps snmp snmptrap spideroak-lansync spotify-sync squid ssdp ssh steam-streaming svdrp svn syncthing syncthing-gui synergy syslog syslog-tls telnet tentacle tftp tftp-client tile38 tinc tor-socks transmission-client upnp-client vdsm vnc-server wbem-http wbem-https wsman wsmans xdmcp xmpp-bosh xmpp-client xmpp-local xmpp-server zabbix-agent zabbix-server
[root@iZbp1hyj00tfq6s5ka3klmZ ~]# sudo firewall-cmd --add-service=cockpit --permanent
Warning: ALREADY_ENABLED: cockpit
success
[root@iZbp1hyj00tfq6s5ka3klmZ ~]# sudo firewall-cmd --reload
success
```



### 控制台 添加安全组

![](media_Cloud/ECS_安全组规则3.jpg)





## SFTP上传本地文件到远程服务器

登录

```
~ sftp root@47.114.81.248
```

上传

```
~ put /Users/qiyeyun/ChromeDown/apache-tomcat-9.0.36.tar.gz /opt/tomcat
```



### 解压







### JAVA - OpenJDK

```
~ java -version
```



4.1 检查 yum 中有没有 java1.8 包

```
~ yum list java-1.8*
~ yum search java-1.8*

==================================================== Name Matched: java-1.8 =====================================================
java-1.8.0-openjdk.x86_64 : OpenJDK Runtime Environment 8
java-1.8.0-openjdk.x86_64 : OpenJDK Runtime Environment 8
java-1.8.0-openjdk-src.x86_64 : OpenJDK Source Bundle 8
java-1.8.0-openjdk-src.x86_64 : OpenJDK Source Bundle 8
java-1.8.0-openjdk-demo.x86_64 : OpenJDK Demos 8
java-1.8.0-openjdk-demo.x86_64 : OpenJDK Demos 8
java-1.8.0-openjdk-devel.x86_64 : OpenJDK Development Environment 8
java-1.8.0-openjdk-devel.x86_64 : OpenJDK Development Environment 8
java-1.8.0-openjdk-javadoc.noarch : OpenJDK 8 API documentation
java-1.8.0-openjdk-javadoc.noarch : OpenJDK 8 API documentation
java-1.8.0-openjdk-headless.x86_64 : OpenJDK Headless Runtime Environment 8
java-1.8.0-openjdk-headless.x86_64 : OpenJDK Headless Runtime Environment 8
java-1.8.0-openjdk-javadoc-zip.noarch : OpenJDK 8 API documentation compressed in single archive
java-1.8.0-openjdk-javadoc-zip.noarch : OpenJDK 8 API documentation compressed in single archive
java-1.8.0-openjdk-accessibility.x86_64 : OpenJDK 8 accessibility connector
java-1.8.0-openjdk-accessibility.x86_64 : OpenJDK 8 accessibility connector
```

4.2 开始安装

```
~ yum install java-1.8.0-openjdk* -y
```

3 查看版本

```
[root@iZbp1hyj00tfq6s5ka3klmZ ~]# java -version
openjdk version "1.8.0_252"
OpenJDK Runtime Environment (build 1.8.0_252-b09)
OpenJDK 64-Bit Server VM (build 25.252-b09, mixed mode)
```



### JAVA 环境变量

```
// which java查询到的是java的执行路径，不是安装路径
~ which java
/usr/bin/java

// 查看安装路径
// 根据执行文件找到对应的软链接指向的文件路径
~ ls -lrt /usr/bin/java
lrwxrwxrwx 1 root root 22 Jun 30 09:53 /usr/bin/java -> /etc/alternatives/java
~ ls -lrt /etc/alternatives/java
lrwxrwxrwx 1 root root 73 Jun 30 09:53 /etc/alternatives/java -> /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.252.b09-3.el8_2.x86_64/jre/bin/java
```



前往  /etc/profile 文件添加JAVA环境变量

```
~ vi /etc/profile

// 在添加
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.252.b09-3.el8_2.x86_64/jre/bin/java
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$JAVA_HOME/bin:$PATH:

// 使之立即生效
~ source /etc/profile

// 查看是否生效 
~ echo $JAVA_HOME
/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.252.b09-3.el8_2.x86_64/jre/bin/java
```



### 移除文件夹，不提示用户

```rm -rf /home/test
~ rm -rf /home/test
```



### 检查tomcat是否成功启动

```
~ ps -ef|grep tomcat 

root     28804     1  0 15:06 ?        00:00:17 /usr/bin/java -Djava.util.logging.config.file=/opt/tomcat/apache-tomcat-9.0.36/conf/logging.properties -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -Djdk.tls.ephemeralDHKeySize=2048 -Djava.protocol.handler.pkgs=org.apache.catalina.webresources -Dorg.apache.catalina.security.SecurityListener.UMASK=0027 -Dignore.endorsed.dirs= -classpath /opt/tomcat/apache-tomcat-9.0.36/bin/bootstrap.jar:/opt/tomcat/apache-tomcat-9.0.36/bin/tomcat-juli.jar -Dcatalina.base=/opt/tomcat/apache-tomcat-9.0.36 -Dcatalina.home=/opt/tomcat/apache-tomcat-9.0.36 -Djava.io.tmpdir=/opt/tomcat/apache-tomcat-9.0.36/temp org.apache.catalina.startup.Bootstrap start
root     29297 29052  0 18:52 pts/0    00:00:00 grep --color=auto tomcat
```



### 调整防火墙 - 开放8080端口

如果您的服务器受到防火墙的保护，并且您想从本地网络外部访问tomcat接口，则还需要打开端口`8080`。

使用以下命令打开所需的端口：

```
~ sudo firewall-cmd --zone=public --permanent --add-port=8080/tcp
Warning: ALREADY_ENABLED: 8080:tcp
success

~ sudo firewall-cmd --reload
success
```





### 前往阿里云控制台-添加安全组规则



![](media_Cloud/ECS_安全组规则1.jpg)

![](media_Cloud/ECS_安全组规则2.jpg)

