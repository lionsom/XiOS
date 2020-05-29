[https://hao5743.github.io/2016/12/28/%E7%A0%94%E7%A9%B6%E4%BA%86oh-my-zsh%E4%B8%AD%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E7%9A%84%E9%85%8D%E7%BD%AE%E5%8A%9E%E6%B3%95/](https://hao5743.github.io/2016/12/28/研究了oh-my-zsh中环境变量的配置办法/)







# mac环境变量保存的地方

默认bash，没有zsh的时候，mac中的环境变量保存在:

#### 0./etc/paths （全局建议修改这个文件 ）

 编辑 paths，将环境变量添加到 paths文件中 ，一行一个路径
 Hint：输入环境变量时，不用一个一个地输入，只要拖动文件夹到 Terminal 里就可以了。

#### 1./etc/profile （建议不修改这个文件 ）

全局（公有）配置，不管是哪个用户，登录时都会读取该文件。

#### 2./etc/bashrc （一般在这个文件中添加系统级环境变量）

全局（公有）配置，bash shell执行时，不管是何种方式，都会读取此文件。

#### 3.~/.bash_profile （一般在这个文件中添加用户级环境变量）

每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行

如果要修改环境变量，一般修改`~/.bash_profile`就行了。



# 查看环境变量

```
➜  ~ env					// 打印系统环境变量
➜  ~ printenv			// 打印系统环境变量

➜  ~ echo $PATH   // 显示当前PATH环境变量
```



# 查看当前使用的shell

```
$ echo $SHELL
    /bin/zsh
```









