

# 一、安装clang-format

```
// Homebrew安装
➜ ~ brew install clang-format

// 查看版本
➜ ~ clang-format --version
clang-format version 10.0.1

// 更新
➜ ~ brew upgrade clang-format
```



# 二、创建格式化规范文件

```
➜ ~ touch .clang-format
```

> .clang-format 是一个隐藏文件。内容如下：

```
Language:        ObjC
# BasedOnStyle:  LLVM

# 访问说明符(public、private等)的偏移
AccessModifierOffset: -2

# 开括号(开圆括号、开尖括号、开方括号)后的对齐: Align, DontAlign(不要对齐), AlwaysBreak(总是在开括号后换行)
AlignAfterOpenBracket: Align

......
```



# 三、使用

## 3.1、直接使用

1. 直接使用内置 style，比如 LLVM，Google 等，命令为如下形式：

   ```
   ➜ ~ clang-format -style=llvm -i xxx.c
   ```

2. 使用自定义 style 文件 .clang-format，**程序会先查询当前目录是否有 .clang-format 文件，若没找到，则会递归往父目录查找，一般是放在 project 根目录(闲懒可以直接放在 $HOME 目录)**，命令为如下形式：

   ```
   ➜ ~ clang-format -style=file -i xxx.c
   ```



## 3.2、配合脚本使用

脚本如下：

```shell
#!/bin/bash

#  Created by Sin on 19/10/11.
#  Copyright (c) 2019 RongCloud. All rights reserved.

# 按照 .clang-format 格式将受 git 管理的变更的代码文件格式化

# clang-format -i -style=file 会找目录中的 .clang-format 文件，并按照其规则格式化代码

# 获取 git 更改的文件
Git_Diff=`git diff --name-only`
#Clang_Format="/Users/qiyeyun/openSourceRepository/sealtalk-ios/ios-rongimdemo/.clang-format"

currentPath=`pwd`
echo "currentPath ${currentPath}"

Clang_Format="${currentPath}/.clang-format"

if [ ! -f "$Clang_Format" ]; then
    echo "clang-format not exist"
    exit 0
fi

OLD_IFS=$IFS
IFS=$'\n'

for x in $Git_Diff; do
  echo "find ${x}"
  x="${currentPath}/${x}"

  if [ ! -f "$x" ]; then
      echo "can't format file $x"
      continue;
  fi

  # .h 文件格式化代码
  result=$(echo $x | grep "\.h$")
  if [ -n "$result" ]; then
    echo "format ${x}"
    clang-format -i -style=file $x
  fi

  result=$(echo $x | grep "\.m$")
  if [ -n "$result" ]; then
    echo "format ${x}"
    clang-format -i -style=file $x
  fi

  result=$(echo $x | grep "\.mm$")
  if [ -n "$result" ]; then
    echo "format ${x}"
    clang-format -i -style=file $x
  fi

done

IFS=$OLD_IFS
```



