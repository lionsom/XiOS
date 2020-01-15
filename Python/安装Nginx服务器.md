

使用 homebrew 安装



查看库

```
➜ ~ brew list
cloc		libyaml		openssl		pcre		readline	sqlite		xz
gdbm		nginx		openssl@1.1	python		ruby		uwsgi		yajl
```



更新nginx

```
~ brew reinstall nginx
==> Reinstalling nginx 
…………………………

// 当前版本：nginx-1.17.7
```



通过homebrew，nginx默认目录

```
/usr/local/Cellar/nginx/1.17.7
```

conf安装目录

```
/usr/local/etc/nginx/nginx.conf
```





```
# 启动
nginx

# 重新启动，热启动，修改配置重启不影响线上
nginx -s reload

# 关闭
nginx -s stop

// 查看状态
ps -ef|grep nginx
```





本地访问

```
http://localhost:8080/
```















