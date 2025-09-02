#!/bin/bash

######### 打包脚本 #########

FRAMEWORK_NAME='MyLego'
WORK_DIR='build'
BUILD_TIME=`date "+%y%m%d%H%M"`

# clean and build 是否重新clean编译
CLEAN_BUILD=0
# SDK名称
SDK_NAME=${PROJECT_NAME}
# iOS SDK工程路径
PATH_SDK=${SRCROOT}
PATH_DEMO=$(dirname ${SRCROOT})/FastSDKDemo

# Release 真机
DEVICE_DIR=${WORK_DIR}/'Release-iphoneos'/${FRAMEWORK_NAME}'.framework'
# Release 模拟器
SIMULATOR_DIR=${WORK_DIR}/'Release-iphonesimulator'/${FRAMEWORK_NAME}'.framework'
# Framework的输出目录
OUTPUT_DIR=${SRCROOT}/'Products'/${FRAMEWORK_NAME}'.framework'

#xcodebuild打包
xcodebuild -target ${FRAMEWORK_NAME}
ONLY_ACTIVE_ARCH=NO
-configuration 'Release'
-sdk iphoneos clean build

xcodebuild -target ${FRAMEWORK_NAME}
ONLY_ACTIVE_ARCH=NO
-configuration 'Release'
-sdk iphonesimulator clean build

#如果输出目录存在，即移除该目录，再创建该目录。目的是为了清空输出目录。
if [ -d ${OUTPUT_DIR} ]; then
rm -rf ${OUTPUT_DIR}
fi
mkdir -p ${OUTPUT_DIR}

#复制release-simulator下的framework到输出目录
cp -r ${DEVICE_DIR}/ ${OUTPUT_DIR}/

#lipo命令合并两种framework，将SVProgressHUD.framework/SVProgressHUD，覆盖输出到输出目录。
lipo -create ${DEVICE_DIR}/${FRAMEWORK_NAME} ${SIMULATOR_DIR}/${FRAMEWORK_NAME} -output ${OUTPUT_DIR}/${FRAMEWORK_NAME}

rm -r ${WORK_DIR}
#打开输出目录
open ${OUTPUT_DIR}


