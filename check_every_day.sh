#!/bin/bash
#
# 遍历路径下的文件，递归遍历
#

read_dir() {
    for file in $(ls -a $1); do
        if [ -d $1"/"$file ]; then
            if [[ $file != '.' && $file != '..' ]]; then
                read_dir $1"/"$file
            fi
        else
            # echo $1"/"$file

            check_suffix $1"/"$file
        fi
    done
}

##获取后缀为txt或ini的文件
check_suffix() {
    file=$1

    if [ "${file##*.}"x = "${fileType}"x ]; then
        # echo $file
        # filePathArray.add
        filePathArray[${#filePathArray[*]}]=$file
    fi
}

# 生成随机数
function rand() {
    min=$1
    max=$(($2 - $min + 1))
    num=$(($RANDOM + 1000000000)) # 增加一个10位的数再求余
    echo $(($num % $max + $min))
}

#############################
#############################
filePathArray=()

fileType='md'

read_dir $1

echo "=======遍历完成======="

# 打印数组所有元素
# echo ${filePathArray[*]}

# 获取数组长度
maxNum=${#filePathArray[*]}
echo "数组元素个数为: $maxNum"

# 生成随机数
randNum=$(rand 0 $maxNum-1)
echo $randNum

# 打开随机文档学习
open ${filePathArray[$randNum]}
