> 本文是记录Guetzli批量压缩png/jpg/jpeg图片脚本的开发过程。



# 第一步：遍历路径下所有文件

```
# 读取参数路径下所有的文件
for file in $1/*
do
    if test -f $file
then
echo $file
   arr=(${arr[*]} $file)
fi
done

echo ${arr[@]}
```



# 第二步：通过命令参数，获取自定义路径





# 第三步：区分目录与文件

```
-f "file"  // 判断file是否是文件;
-d "file"  // 判断file是否是目录（文件夹）。
```



# 第四步：判断文件是否为.png、.jpg、.jpeg结尾





# 第五步：guetzli压缩图片命令

```
➜ ~ brew install guetzli		// 安装，自动安装依赖Installing guetzli dependency: libpng

// 使用
➜ ~ guetzli [--quality Q] [--verbose] original.png output.jpg
➜ ~ guetzli [--quality Q] [--verbose] original.jpg output.jpg
// 实战
➜ ~ guetzli --quality 85 --verbose 005.png 010.png

// 说明
--quality	指的是质量，取值100~85，默认为95。
--verbose	加此参数后 在执行压缩时会在控制台输出过程。
original.jpg	输入的图片路径
output.jpg	输出的图片路径
```





# 第六步：命令行校验

```
# 先判断命令后是否有路径，若没有，则会遍历根目录，不符合我们的需求。
if [ -z $1 ]; then
    echo "请在命令后面加上文件夹路径"
elif [ -z $2 ]; then
    echo "请在后面加上图片压缩比：[84 ~ 100]"
else
		# 执行遍历方法，参数$1:目录路径，参数$2:图片压缩比例[84 ~ 100]
		# 判断路径是否为目录
    getDir $1 $2
fi
```



## 6.1、判断压缩比范围是否合法



```
if [ $1 -gt $2 ]
then echo "参数$1大于参数$2"
else echo "参数$1小于参数$2"
fi

数字判断一些命令：
# -gt 	// 大于
# -lt 	// 小于
# -eq 	// 等于
# -ne 	// 不等于
# -ge 	// 大于等于
# -le 	// 小于等于   
```







# 七、遇到的问题

## 1、压缩质量小于84

```
// Error log
Guetzli should be called with quality >= 84, otherwise the
output will have noticeable artifacts. If you want to
proceed anyway, please edit the source code.
Guetzli processing failed
```



## 2、如果有空目录，但仍会打断执行

【源码】：这里我们判断目录是否为空的代码

```
# 目录为空，跳过改循环
if [ "`ls -A $file`" = "" ]; then
    echo "$file is empty"
    continue
fi

// =========== 说明 ===========
注意ls 命令带了-A参数，这是为了将目录中隐藏文件列出，同时排除.和..
```

但代码仍然被中断了！！！

【原因】：当我们显示该路径发现，目录中有个隐藏文件`.DS_Store`

```
➜ ls -A /Users/lionsom/GitHub/XiOS/Life/media
➜ .DS_Store
```

【修改】:移除-A，仅查看显示的文件

```
# 目录为空，跳过改循环
if [ "`ls $file`" = "" ]; then
    echo "$file is empty"
    continue
fi
```



## 3、大图片压缩非常耗时





