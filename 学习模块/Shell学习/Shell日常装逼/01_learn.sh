#!/bin/bash



#=========================== Var ===============================

# 变量
file=123qwe
echo $file


#=========================== String ===============================

# 字符串 ----- 单引号，原样输出
str1='AAAAABBBBB'
echo $str1

# 字符串 ----- 双引号，可以有变量
str2="lin"
str3="hello, my name is ${str2}"
echo $str3

# 字符串长度
echo ${#str2}

# 截取字符串 ----- 从第2个字符开始截取4个字符：
str4="runoob is a great site"
echo ${str4:1:4}

# 查找子字符串
#str5="runoob is a great site"
#echo `expr index "${str5}" run`


#=========================== Array ===============================

# 定义数组
arr1=(1 2 3 4)

arr2=(
	1
	2
	3
	4
	5
)

arr3[0]='m'
arr3[1]='y'
arr3[2]='name'


:<<!
# 读取数组
# 使用 @ 符号可以获取数组中的所有元素
!
echo ${arr1[1]}
echo ${arr2[2]}
echo ${arr3[2]}
echo ${arr3[@]}

# 获取数组长度 。 元素长度
echo ${#arr1[@]}
echo ${#arr2[*]}
echo ${#arr3[1]}   # 获取第二个元素长度









