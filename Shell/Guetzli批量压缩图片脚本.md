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





# 第六步：增加健壮性

```
# 先判断命令后是否有路径，若没有，则会遍历根目录，不符合我们的需求。
if [ -z $1 ]; then
    echo "请在命令后面加上文件夹路径"
elif [ -z $2 ]; then
    echo "请在后面加上图片压缩比：【85 ~ 100】"
else
		# 执行遍历方法，参数$1:目录路径，参数$2:图片压缩比例【85 ~ 100】
		# 判断路径是否为目录
    getDir $1 $2
fi
```









