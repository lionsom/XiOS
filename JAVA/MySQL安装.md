# brew安装mysql

## 一、流程概览

1. 安装mysql

   ```
   ➜ brew install mysql
   ```

2. 登录mysql

   ```
   ➜ mysql.server start
   ```

3. 修改密码及基础配置

   ```
   ➜ mysql_secure_installation
   ```



## 二、终端实操

```
// 安装mysql
➜ XiOS git:(**master)** ✗ brew install mysql
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 1 tap (homebrew/core).
==> New Formulae
duckdb                  graphql-cli
==> Updated Formulae
awscli           i2p            opencc
bat            i2pd            paket
bmake           jenkins          passenger
botan           jenv            pdnsrec
catch2           just            phoronix-test-suite
fades           kakoune          pspg
folly           macvim           singular
freeswitch         mdcat           sourcedocs
game-music-emu       mill            sphinx-doc
gh             minizip2          tfenv
git-absorb         mutt            twarc
grafana          nginx           ucloud
helmsman          ngt            velero
hyperfine         node-build         zola
hyperscan         node@12          zookeeper

==> Downloading https://homebrew.bintray.com/bottles/openssl%401.1-1.1.1g.catali
######################################################################## 100.0%
==> Downloading https://homebrew.bintray.com/bottles/protobuf-3.12.1.catalina.bo
==> Downloading from https://akamai.bintray.com/6b/6b13b089c2754bb9df99f2621ea0f
######################################################################## 100.0%
==> Downloading https://homebrew.bintray.com/bottles/mysql-8.0.19_1.catalina.bot
==> Downloading from https://akamai.bintray.com/e5/e5a5455d254260e9ca9821cb9c5e9
######################################################################## 100.0%

==> Installing dependencies for mysql: openssl@1.1 and protobuf
==> Installing mysql dependency: openssl@1.1
==> Pouring openssl@1.1-1.1.1g.catalina.bottle.tar.gz
==> Caveats

A CA file has been bootstrapped using certificates from the system
keychain. To add additional certificates, place .pem files in
 /usr/local/etc/openssl@1.1/certs

and run
 /usr/local/opt/openssl@1.1/bin/c_rehash

openssl@1.1 is keg-only, which means it was not symlinked into /usr/local,
because macOS provides LibreSSL.

If you need to have openssl@1.1 first in your PATH run:
 echo 'export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"' >> ~/.zshrc

For compilers to find openssl@1.1 you may need to set:
 export LDFLAGS="-L/usr/local/opt/openssl@1.1/lib"
 export CPPFLAGS="-I/usr/local/opt/openssl@1.1/include"

For pkg-config to find openssl@1.1 you may need to set:
 export PKG_CONFIG_PATH="/usr/local/opt/openssl@1.1/lib/pkgconfig"

==> Summary
🍺 /usr/local/Cellar/openssl@1.1/1.1.1g: 8,059 files, 18MB
==> Installing mysql dependency: protobuf
==> Pouring protobuf-3.12.1.catalina.bottle.tar.gz
🍺 /usr/local/Cellar/protobuf/3.12.1: 270 files, 19.8MB
==> Installing mysql
==> Pouring mysql-8.0.19_1.catalina.bottle.tar.gz
==> /usr/local/Cellar/mysql/8.0.19_1/bin/mysqld --initialize-insecure --user=lio
==> Caveats

We've installed your MySQL database without a root password. To secure it run:
  mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
  mysql -uroot

To have launchd start mysql now and restart at login:
 brew services start mysql

Or, if you don't want/need a background service you can just run:
 mysql.server start

==> Summary
🍺 /usr/local/Cellar/mysql/8.0.19_1: 286 files, 288.8MB
==> Caveats
==> openssl@1.1
A CA file has been bootstrapped using certificates from the system
keychain. To add additional certificates, place .pem files in
 /usr/local/etc/openssl@1.1/certs

and run
 /usr/local/opt/openssl@1.1/bin/c_rehash

openssl@1.1 is keg-only, which means it was not symlinked into /usr/local,
because macOS provides LibreSSL.

If you need to have openssl@1.1 first in your PATH run:
 echo 'export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"' >> ~/.zshrc

For compilers to find openssl@1.1 you may need to set:
 export LDFLAGS="-L/usr/local/opt/openssl@1.1/lib"
 export CPPFLAGS="-I/usr/local/opt/openssl@1.1/include"

For pkg-config to find openssl@1.1 you may need to set:

 export PKG_CONFIG_PATH="/usr/local/opt/openssl@1.1/lib/pkgconfig"

==> mysql
We've installed your MySQL database without a root password. To secure it run:
  mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
  mysql -uroot

To have launchd start mysql now and restart at login:
 brew services start mysql

Or, if you don't want/need a background service you can just run:
 mysql.server start


// 启动mysql
➜ XiOS git:(**master)** ✗ mysql.server start
Starting MySQL
.. SUCCESS! 

// 修改密码
➜ XiOS git:(**master)** ✗ mysql_secure_installation

Securing the MySQL server deployment.

Connecting to MySQL using a blank password.

VALIDATE PASSWORD COMPONENT can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD component?

// 是否查看密码验证策略
Press y|Y for Yes, any other key for No: Y

There are three levels of password validation policy:
LOW  Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary         file

// 这里提示选一个密码强度等级
Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 0
Please set the password for root here.

New password: 
Re-enter new password: 

Estimated strength of the password: 25 

Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : Y

// 由于我输入密码：123456，并未达到其最低密码标准 >= 8
 ... Failed! Error: Your password does not satisfy the current policy requirements

New password: 
Re-enter new password: 

Estimated strength of the password: 50 

// 您希望继续使用提供的密码吗？再次确认使用输入的密码。
Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : Y


By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

// 是否移除默认无密码用户
Remove anonymous users? (Press y|Y for Yes, any other key for No) : Y
Success.


Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

// 是否禁止远程root登录，我选的是不禁止 N。
Disallow root login remotely? (Press y|Y for Yes, any other key for No) : N
 ... skipping.


By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.

// 是否删除默认自带的test数据库
Remove test database and access to it? (Press y|Y for Yes, any other key for No) : Y
 - Dropping test database...
Success.
 - Removing privileges on test database...
Success.


Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

// 是否立刻重新加载特权表
Reload privilege tables now? (Press y|Y for Yes, any other key for No) : Y
Success.


All done! 
```

