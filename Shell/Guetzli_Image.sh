#!/bin/zsh

# 方法：递归路径下所有的文件
function getDir() {
	echo $1
	for file in $1/* 
	do
		echo $file
		if test -f $file 
		then
			if [[ $file == *.png ]]
			then
				echo "我是PNG图片"
				guetzli --quality $2 --verbose $file $file
			elif [[ $file == *.jpg ]]
			then
				echo "我是JPG图片"
				guetzli --quality $2 --verbose $file $file
            elif [[ $file == *.jpeg ]]
            then
                echo "我是JPEG图片"
                guetzli --quality $2 --verbose $file $file
            else 
				echo "我是不是图片文件"
			fi
		else
			echo "我是目录"
			getDir $file			
		fi
	done
}



# 先判断命令后是否有路径，若没有，则会遍历根目录，不符合我们的需求。
if [ -z $1 ]; then
    echo "请在命令后面加上文件夹路径"
elif [ -z $2 ]; then
    echo "请在后面加上图片压缩比：【85 ~ 100】"
else
    # 判断是否为文件
    if test -f $file
    then
        echo "请输入目录路径"
    else
        # 执行遍历方法，参数$1:目录路径，参数$2:图片压缩比例【85 ~ 100】
        getDir $1 $2
    fi
fi

