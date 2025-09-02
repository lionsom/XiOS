[Xcodebuild从入门到精通](https://www.hualong.me/2018/03/14/Xcodebuild/)



# 一、了解



## 1. 查看手册

```
$ man xcodebuild
```



## 2.命令行工具

xcodebuild是打包在`Command Line Tools`中, `Xcode.app` 依赖 `Command Line Tools`。

`Command Line tools` 会安装在/Library/Developer路径下面。

```
$ xcode-select --install
```



## 3. 查看xcodebuild信息

* 路径

  ```shell
  $ which xcodebuild                                                                                                                     
  /usr/bin/xcodebuild
  ```

* 版本号

  ```shell
  $ xcodebuild -version
  Xcode 11.7
  Build version 11E801a
  ```

* 查看SDK

  ```shell
  $ xcodebuild -showsdks
  iOS SDKs:
  	iOS 13.7                      	-sdk iphoneos13.7
  
  iOS Simulator SDKs:
  	Simulator - iOS 13.7          	-sdk iphonesimulator13.7
  
  macOS SDKs:
  	DriverKit 19.0                	-sdk driverkit.macosx19.0
  	macOS 10.15                   	-sdk macosx10.15
  
  tvOS SDKs:
  	tvOS 13.4                     	-sdk appletvos13.4
  
  tvOS Simulator SDKs:
  	Simulator - tvOS 13.4         	-sdk appletvsimulator13.4
  
  watchOS SDKs:
  	watchOS 6.2                   	-sdk watchos6.2
  
  watchOS Simulator SDKs:
  	Simulator - watchOS 6.2       	-sdk watchsimulator6.2
  ```

* 查看SDK详情

  ```shell
  $ xcodebuild  -version -sdk
  iPhoneOS13.7.sdk - iOS 13.7 (iphoneos13.7)
  SDKVersion: 13.7
  Path: /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS13.7.sdk
  PlatformVersion: 13.7
  PlatformPath: /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform
  BuildID: 4F2FF4AE-DC5B-11EA-BCFB-7EFECD391977
  ProductBuildVersion: 17H22
  ProductCopyright: 1983-2020 Apple Inc.
  ProductName: iPhone OS
  ProductVersion: 13.7
  //..........
  ```

  

# 二、编译

[AutoPacking-iOS](https://github.com/monetking/AutoPacking-iOS)

[ios_package](https://github.com/ColinAlanHB/ios_package)



```shell
xcodebuild clean 			// 等同于Xcode下点击Product -> Clean
xcodebuild -xcworkspace  	// 等同于xcworkspace工程 command+B
xcodebuild -xcodeproj 		// 等同于xcworkspace工程 command+B
xcodebuild archive 			// 等同于Xcode下点击Product -> Archive
xcodebuild -exportArchive	// 等同于点击 export
```



```shell
# compile project
echo "###############Building Project#################"
cd "${PROJDIR}"
# 清理缓存
xcodebuild -target "${TARGET_NAME}" clean
# 编译
# xcodebuild -target "${TARGET_NAME}" -sdk "${TARGET_SDK}" -configuration Debug
xcodebuild archive -project ${PROJDIR}/${COMPILE_APP_NAME}.xcodeproj \
-scheme ${TARGET_NAME} \
-archivePath ${PROJECT_BUILDDIR}/${COMPILE_APP_NAME}.xcarchive \
-configuration Release \
CODE_SIGN_IDENTITY="${SIGN}" \
PROVISIONING_PROFILE="${uuid}" \
DEVELOPMENT_TEAM="${SIGNTEAM}" \
PROVISIONING_PROFILE_SPECIFIER="${SPECIFIER}" \
PRODUCT_BUNDLE_IDENTIFIER="${BUNDLEID}"

#Check if build succeeded
if [ $? != 0 ]
then
  exit 1
fi



# 生产IPA
echo "${PROJECT_BUILDDIR}/${COMPILE_APP_NAME}.app"
# /usr/bin/xcrun -sdk iphoneos PackageApplication -verbose "${PROJECT_BUILDDIR}/${COMPILE_APP_NAME}.app" -o "${IPA_TARGET_DIR}${IPANAME}.ipa" --sign "${SIGN}" --embed ${SOURCEAPP_PATH}/embedded.mobileprovision
xcodebuild -exportArchive \
-archivePath ${PROJECT_BUILDDIR}/${COMPILE_APP_NAME}.xcarchive \
-exportOptionsPlist ${ADHOCExportOptionsPlist} \
-exportPath ${IPA_TARGET_DIR}

 mv ${IPA_TARGET_DIR}/${COMPILE_APP_NAME}.ipa ${IPA_TARGET_DIR}/${IPANAME}.ipa
```



