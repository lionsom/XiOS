



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



# 退出：control + d



# 重新登录

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





## cockpit 跳过防火墙

```
[root@iZbp1hyj00tfq6s5ka3klmZ ~]# systemctl start firewalld.service
[root@iZbp1hyj00tfq6s5ka3klmZ ~]# sudo firewall-cmd --get-services |grep cockpit
RH-Satellite-6 amanda-client amanda-k5-client amqp amqps apcupsd audit bacula bacula-client bb bgp bitcoin bitcoin-rpc bitcoin-testnet bitcoin-testnet-rpc bittorrent-lsd ceph ceph-mon cfengine cockpit condor-collector ctdb dhcp dhcpv6 dhcpv6-client distcc dns dns-over-tls docker-registry docker-swarm dropbox-lansync elasticsearch etcd-client etcd-server finger freeipa-4 freeipa-ldap freeipa-ldaps freeipa-replication freeipa-trust ftp ganglia-client ganglia-master git grafana gre high-availability http https imap imaps ipp ipp-client ipsec irc ircs iscsi-target isns jenkins kadmin kdeconnect kerberos kibana klogin kpasswd kprop kshell ldap ldaps libvirt libvirt-tls lightning-network llmnr managesieve matrix mdns memcache minidlna mongodb mosh mountd mqtt mqtt-tls ms-wbt mssql murmur mysql nfs nfs3 nmea-0183 nrpe ntp nut openvpn ovirt-imageio ovirt-storageconsole ovirt-vmconsole plex pmcd pmproxy pmwebapi pmwebapis pop3 pop3s postgresql privoxy prometheus proxy-dhcp ptp pulseaudio puppetmaster quassel radius rdp redis redis-sentinel rpc-bind rsh rsyncd rtsp salt-master samba samba-client samba-dc sane sip sips slp smtp smtp-submission smtps snmp snmptrap spideroak-lansync spotify-sync squid ssdp ssh steam-streaming svdrp svn syncthing syncthing-gui synergy syslog syslog-tls telnet tentacle tftp tftp-client tile38 tinc tor-socks transmission-client upnp-client vdsm vnc-server wbem-http wbem-https wsman wsmans xdmcp xmpp-bosh xmpp-client xmpp-local xmpp-server zabbix-agent zabbix-server
[root@iZbp1hyj00tfq6s5ka3klmZ ~]# sudo firewall-cmd --add-service=cockpit --permanent
Warning: ALREADY_ENABLED: cockpit
success
[root@iZbp1hyj00tfq6s5ka3klmZ ~]# sudo firewall-cmd --reload
success
[root@iZbp1hyj00tfq6s5ka3klmZ ~]#
```







