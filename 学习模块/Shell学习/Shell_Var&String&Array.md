[菜鸟教程 - Shell 变量](https://www.runoob.com/linux/linux-shell-variable.html)



## 一、变量

```
my_name="lin"
```

* 注意中间不能有空格



## 二、字符串





## 三、数组





\# 变量

file=123qwe

echo $file



\# 字符串 ----- 单引号，原样输出

str1='AAAAABBBBB'

echo $str1



\# 字符串 ----- 双引号，可以有变量

str2="lin"

str3="hello, my name is ${str2}"

echo $str3



\# 字符串长度

echo ${#str2}



\# 截取字符串 ----- 从第2个字符开始截取4个字符：

str4="runoob is a great site"

echo ${str4:1:4}



\# 查找子字符串