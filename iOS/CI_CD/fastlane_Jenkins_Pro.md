# 文档

[fastlane docs](https://docs.fastlane.tools/)

[pgyer docs](https://www.pgyer.com/doc)



# 一、Jenkins插件介绍

- [Git plugin](https://plugins.jenkins.io/git)：该插件将Git与Jenkins集成在一起。
- [Git Parameter Plug-In](https://plugins.jenkins.io/git-parameter)：选择分支、tag等。
- [GitHub plugin](https://plugins.jenkins.io/github)：该插件将GitHub集成到Jenkins。
- [SSH Credentials Plugin](https://plugins.jenkins.io/ssh-credentials)：允许在Jenkins中存储SSH凭据。
- [Xcode integration](https://plugins.jenkins.io/xcode-plugin)：iOS专用（可选）
- [Gradle Plugin](https://plugins.jenkins.io/gradle)：Android专用（可选）
- [Localization: Chinese (Simplified)](https://plugins.jenkins.io/localization-zh-cn)：汉化包
- [Upload to pgyer](https://plugins.jenkins.io/upload-pgyer)：包分发

- build-name-setter：用于修改Build名称
- description setter plugin：用于在修改Build描述信息，在描述信息中增加显示QRCode（二维码）
- Post-Build Script Plug-in：在编译完成后通过执行脚本实现一些额外功能



# 二、Jenkins构建触发器

* 手动触发，即点击Jenkins上项目中的手动构建按钮。
* 远程触发，通过请求触发。

![](media_fastlane_jenkins/001.jpg)



# 三、Jenkins参数化构建

**最终效果图**

![](media_fastlane_jenkins/003.jpg)



## 分支选择

需要安装插件 [Git Parameter Plug-In](https://plugins.jenkins.io/git-parameter)：选择分支、tag等。

![](media_fastlane_jenkins/005.jpg)

**设置如下**

![](media_fastlane_jenkins/004.jpg)





# 四、fastlane进阶

## 获取时间

```
time = Time.new.strftime("%Y%m%d") 		# 获取时间格式
```



## 获取项目版本号

[fastlane docs - get_version_number](https://docs.fastlane.tools/actions/get_version_number/)

```
# 单Target
version = get_version_number				# 获取版本号 简写
version = get_version_number(xcodeproj:'FastLaneDemo.xcodeproj')  # 全写

# 多Target，获取指定Target的版本号
version = get_version_number(xcodeproj:'FastLaneDemo.xcodeproj', target:'FastLaneDemoX')
```



## 自定义包名

```
ipaName = "Debug_#{version}_#{time}.ipa"
```



## 常量+外部传参

```shell
# 定义常量
output_name = “TestOne”

# lane
lane :getParam_lane do |options|         # 传参

  # 打印
  puts 'print something'

  # 使用常量
  puts "#{output_name}"

  # 字符串拼接
  puts '字符串A' + '字符串B'

  # 获取外部参数
  puts '外部参数是：' + "#{options[:a]}"

end
```

**调用**

```shell
$ fastlane getParam_lane a:123 b:abc

# 输出
[23:40:41]: print something
[23:40:41]: TestOne
[23:40:41]: 参数是asdf
[23:40:41]: 参数：123
[23:40:41]: 参数：123abc
```







## 真假判断

```shell
lane :TrueOrFalse do |options|

  if 0
    puts '我是真'
  else 
    puts '我是假'
  end

end
```



# 五、fastlane构建传参

```
lane :beta do |options|   # 函数名称
    # 获取时间格式
    time = Time.new.strftime("%Y%m%d") 		
    # 获取版本号
    version = get_version_number(
				xcodeproj:"FastLaneDemo.xcodeproj", 
				target:"#{options[:scheme]}"
    )
    # 自定义包名
    ipaName = "#{options[:scheme]}_#{options[:configuration]}_#{version}_#{time}.ipa"
    
    # build打包
    gym(scheme: "#{options[:scheme]}",   							# 项目Target名称
    	  configuration: "#{options[:configuration]}",  # 模式，默认Release，还有Debug
    	  export_method: "#{options[:export_method]}",	# 打包的类型
    	  silent: true,  									# 隐藏没有必要的信息
        clean: true,  									# 在构建前先clean
				output_name:"#{ipaName}",				# 输出的包名
        output_directory: "../AppPath",	# 输出包的位置
    )

    # 上传蒲公英
    pgyer(api_key: "c2ee006efdc4ade0085921e8bxxxxx", 
          user_key: "f6a62972d4f3f6d0d02a8ff7bf0xxxxx", 
          update_description: "update by fastlane",
          password: "111111",
          install_type: "2",
    )
end
```

**调用**

```shell
# 终端
➜ fastlane beta scheme:FastLaneDemo configuration:Feature export_method:development

# Jenkins Exec Shell
fastlane beta \
scheme:${SCHEME} \
configuration:${BUILD_CONFIGURATION} \
export_method:${EXPORT_TYPE}
```







# 六、上传分发平台

## fastlane插件上传到蒲公英

[蒲公英官网 - 使用 Fastlane 上传 App 到蒲公英](https://www.pgyer.com/doc/view/fastlane)

```
# 上传蒲公英
pgyer(api_key: "c2ee006efdc4ade0085921e8b0xxxxx", 
      user_key: "f6a62972d4f3f6d0d02a8ff7bfxxxxxx", 
      update_description: "update by fastlane",
      password: "111111",
      install_type: "2",
)
```



## Jenkins插件上传到蒲公英

[蒲公英官网 - 使用 Jenkins 插件上传应用到蒲公英](https://www.pgyer.com/doc/view/jenkins_plugin)

[Jenkins插件 - Upload to pgyer](https://plugins.jenkins.io/upload-pgyer)



## crul上传到蒲公英

[蒲公英官网 - 使用 Jenkins 实现持续集成 (iOS)](https://www.pgyer.com/doc/view/jenkins_ios)



## 自建服务

[Github - fabu.love](https://github.com/rock-app/fabu.love)





# 七、Jenkins Rest API

[Jenkins官网 - REST API](https://ci.jenkins.io/api/)

[Jenkins docs - Remote Access API](https://www.jenkins.io/doc/book/using/remote-access-api/)

[Jenkins REST API 完全手册——上篇](https://blog.csdn.net/qq_34832393/article/details/88210942)

[Jenkins REST API 完全手册——下篇](https://blog.csdn.net/qq_34832393/article/details/88229804?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param)



## 7.1. HTTP BASIC authentication

摘自《[Jenkins docs - Remote Access API](https://www.jenkins.io/doc/book/using/remote-access-api/)》

[Authenticating scripted clients](https://wiki.jenkins.io/display/JENKINS/Authenticating+scripted+clients)

> ## Remote API and security
>
> When your Jenkins is secured, you can use HTTP BASIC authentication to authenticate remote API requests. See [Authenticating scripted clients](https://wiki.jenkins.io/display/JENKINS/Authenticating+scripted+clients) for more details.



### 1. 请求加上登录信息

```
eg:
http://userName:password@127.0.0.1:8989/job/FastLaneDemo/config.xml
```

### 2. Jenkins开放匿名用户权限

![](media_fastlane_jenkins/006.jpg)

## 3. CrumbIssuer 系统哈希值信息（用于防御CSRF攻击）

[使用 CrumbIssuer 防御 CSRF 攻击](https://blog.csdn.net/qq_34832393/article/details/88531049)



## 7.2. Jobs相关

### 1. job-info 获取任务信息

```
GET http://jenkins_url:port/{optionalFolderPath}job/{name}/api/json

eg:
http://127.0.0.1:8989/job/FastLaneDemo/api/json
```



### 2. build-info 获取构筑信息

```
GET http://127.0.0.1:8080/{optionalFolderPath}job/{name}/{number}/api/json

eg:
http://127.0.0.1:8989/job/FastLaneDemo/36/api/json
```



### 3. build 构建

![](media_fastlane_jenkins/007.jpg)

* **Jobs without parameters**

  ```
  POST http://127.0.0.1:8080/job/{JOBNAME}/build?token=TOKEN_NAME
  ```

* **Jobs with parameters**

  ```
  POST http://127.0.0.1:8080/job/{JOBNAME}/buildWithParameters?token=TOKEN_NAME
  
  curl JENKINS_URL/job/JOB_NAME/buildWithParameters \
    --user USER:TOKEN \
    --data id=123 --data verbosity=high
  ```

  





















