##
## 开启执行权限：chmod +x ./git_info.sh
##

#当前的分支名
# Notes: 本地获取分支名OK，但Jenkins自动化打包获取分支名有问题，所以下面有多种方式进行测试
git_branch_name1=$(git symbolic-ref --short -q HEAD)
git_branch_name2=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

git_branch_name3=$(git branch --show-current)
git_branch_name4=$(git branch --contains HEAD)
git_branch_name5=$(git branch | awk '/\*/ { print $2; }')
git_branch_name6=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

git_branch_name7=$(git describe --contains --all HEAD)
git_branch_name8=$(git rev-parse --abbrev-ref HEAD)

#最后一次提交的作者
git_last_commit_user=$(git log -1 --pretty=format:'%an')

#最后一次提交描述
git_last_commit_note=$(git log -1 --format='%s')

#最后一次提交的时间
git_last_commit_date=$(git log -1 --format='%cd' --date=format:'%Y-%m-%d %H:%M:%S')

#最后一次提交的SHA
git_last_commit_sha=$(git rev-parse HEAD)

#当前编译时间
git_current_build_date=`date '+%Y-%m-%d %H:%M:%S'`
 

#输出
echo '一一一一当前分支：'    ${git_branch_name7}
echo '最后一次提交作者：'    ${git_last_commit_user}
echo '最后一次提交日志：'    ${git_last_commit_note}
echo '最后一次提交时间：'    ${git_last_commit_date}
echo '最后一次提交哈希：'    ${git_last_commit_sha}
echo '一一当前编译时间：'    ${git_current_build_date}


####################################
#
# 方式一：写入info.plist文件
#
# 注意：Info.plist路径
#
####################################

#获取App安装包下的info.plist文件路径
git_info_plist_PATH="${SRCROOT}/Qiyeyun/Git_Info.plist"
echo '当前存储文件路径：'    ${git_info_plist_PATH}

#利用PlistBuddy改变info.plist的值
/usr/libexec/PlistBuddy -c "Set :'QYC_git_branch_name' '${git_branch_name7}'" "${git_info_plist_PATH}"
/usr/libexec/PlistBuddy -c "Set :'QYC_git_last_commit_user' '${git_last_commit_user}'" "${git_info_plist_PATH}"
/usr/libexec/PlistBuddy -c "Set :'QYC_git_last_commit_note' '${git_last_commit_note}'" "${git_info_plist_PATH}"
/usr/libexec/PlistBuddy -c "Set :'QYC_git_last_commit_date' '${git_last_commit_date}'" "${git_info_plist_PATH}"
/usr/libexec/PlistBuddy -c "Set :'QYC_git_last_commit_sha' '${git_last_commit_sha}'" "${git_info_plist_PATH}"
/usr/libexec/PlistBuddy -c "Set :'QYC_git_current_build_date' '${git_current_build_date}'" "${git_info_plist_PATH}"


####################################
#
# 方式二：写入Qiyeyun.debug.xcconfig中
#
####################################

# 查找.xcconfig路径
#xcconfig=$(find ./.. -type f -name "Qiyeyun.debug.xcconfig")
#echo '.xcconfig路径：' ${xcconfig}

# 使用参数”i”直接在文件中替换
# 在末尾加g替换每一个匹配的关键字,否则只替换每行的第一个
# eg:最简单的替换
#sed -i "" 's/git_branch_name/1111/g' ${xcconfig}

# 使用通配符（.*）来替换整行
# 命令中的三根斜线分隔符可以换成别的符号,有时候替换目录字符串的时候有较多斜线，这个时候换成其它的分割符是较为方便,只需要紧跟s定义即可。
#sed -i '' "s?.*QYC_git_branch_name.*?QYC_git_branch_name = ${git_branch_name7}?" ${xcconfig}
#sed -i '' "s/.*QYC_git_last_commit_user.*/QYC_git_last_commit_user = ${git_last_commit_user}/" ${xcconfig}
#sed -i '' "s/.*QYC_git_last_commit_note.*/QYC_git_last_commit_note = ${git_last_commit_note}/" ${xcconfig}
#sed -i '' "s/.*QYC_git_last_commit_date.*/QYC_git_last_commit_date = ${git_last_commit_date}/" ${xcconfig}
#sed -i '' "s/.*QYC_git_last_commit_sha.*/QYC_git_last_commit_sha = ${git_last_commit_sha}/" ${xcconfig}
#sed -i '' "s/.*QYC_git_current_build_date.*/QYC_git_current_build_date = ${git_current_build_date}/" ${xcconfig}


####################################
#
# 方式三：写入固定路径下txt文件中
#
# 优势：解决了提交合并时候频繁改动的冲突，需要在.gitignore文件中新增：sh/git_info.txt，从而忽略频繁改动的文件。
# 缺点：无法与源码进行交互。
#
####################################

#git_info_txt_name="git_info.txt"

# 1.判断当前路径下是否存在该文件
# 方式一：
#ls -l|grep "$git_info_txt_name"
#r=$?
#
#if [ $r == 1 ]; then
#    echo "不存在此文件"
#elif [ $r == 0 ]; then
#    echo "存在此文件"
#fi

# 方式二：绝对路径
#Absolute_Path=$(cd `dirname $0`; pwd)
#git_info_txt_PATH="${Absolute_Path}/${git_info_txt_name}"
#echo ${git_info_txt_PATH}
#
#if [ ! -f ${git_info_txt_PATH} ]; then
#    echo  "文件不存在"
#    touch ${git_info_txt_PATH} # 新建
#else
#    echo "文件存在"
#    > ${git_info_txt_PATH}  # 清空内容
#fi

# 2.写入内容
#echo '{"branch":"'${git_branch_name7}'","author":"'${git_last_commit_user}'","note":"'${git_last_commit_note}'","date":"'${git_last_commit_date}'","sha":"'${git_last_commit_sha}'","current":"'${git_current_build_date}'"}' > ${git_info_txt_PATH}

