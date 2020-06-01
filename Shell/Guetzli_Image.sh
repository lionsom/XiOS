#!/bin/zsh

# 方法：递归路径下所有的文件
function getDir() {
	echo $1
	for file in $1/* 
	do
		echo $file
        
		# 目录为空，跳过改循环
		if [ "`ls $file`" = "" ]; then
			echo "===================================="
			echo "$file is empty"
			echo "===================================="
			continue
		fi
  
        	# 判断是否为文件类型
		if test -f $file 
		then
			if [[ $file == *.png ]] || [[ $file == *.jpg ]] || [[ $file == *.jpeg ]]
			then
				echo "我是PNG/JPG/JPEG图片"
				guetzli --quality $2 --verbose $file $file
        		else 
				echo "我文件，但不是图片类型"
			fi
		else
			echo "我是目录"
			getDir $file $2
		fi
	done
}



# 命令行校验
if [ -z $1 ]; then
	echo "请在命令后面加上文件夹路径"
elif test -f $1; then
	echo "请输入目录路径"
elif [ -z $2 ]; then
	echo "请在后面加上图片压缩比：[84 ~ 100]"
elif [ $2 -lt 84 ] || [ $2 -gt 100 ]; then
	echo "请输入图片压缩比范围：[84 ~ 100]"
else
	# 执行遍历方法，参数$1:目录路径，参数$2:图片压缩比例：[84 ~ 100]
	getDir $1 $2
fi

