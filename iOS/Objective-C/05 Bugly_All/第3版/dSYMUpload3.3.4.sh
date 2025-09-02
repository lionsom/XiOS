#!/bin/sh

# 启业云参数
QYCBundleId="cn.com.ay.Qiyeyun"
QYCAppId="7f152aceb0"
QYCAppKey="fc718882-b42c-4fb8-99f7-d4d36d8745a4"
# 安全无忧参数
SafetyBundleId="com.tools.51safety"
SafetyAppId="a54107c789"
SafetyAppKey="99510981-ff5e-4b30-805b-ff2544c58719"

######################################################
# 1. 脚本集成到Xcode工程的Target
######################################################
#
# --- Copy the SCRIPT to the Run Script of Build Phases in the Xcode project ---
#
# #
UPLOAD_DSYM_ONLY=1
#
# # 脚本默认配置的版本格式为CFBundleShortVersionString(CFBundleVersion),  如果你修改默认的版本格式, 请设置此变量, 如果不想修改, 请忽略此设置
# CUSTOMIZED_APP_VERSION=""
#
# # Debug模式编译是否上传，1＝上传 0＝不上传，默认不上传
UPLOAD_DEBUG_SYMBOLS=0
#
# # 模拟器编译是否上传，1=上传 0=不上传，默认不上传
UPLOAD_SIMULATOR_SYMBOLS=0
#
# # 只有Archive操作时上传, 1=支持Archive上传 0=所有Release模式编译都上传
UPLOAD_ARCHIVE_ONLY=1
#
# --- END OF SCRIPT ---



#######################################################
# 2. 脚本根据输入参数处理
#######################################################

# 打印错误信息
function exitWithMessage(){
    echo "--------------------------------"
    echo "${1}"
    echo "--------------------------------"
    exit ${2}
}

# 执行
function run() {

    CONFIG_BUGLY_APP_ID="$1"
    CONFIG_BUGLY_APP_KEY="$2"

    CONFIG_BUGLY_APP_BUNDLE_IDENTIFIER="$3"
    CONFIG_BUGLY_APP_VERSION="$4"
    CONFIG_DSYM_SOURCE_DIR="$5"
    CONFIG_DSYM_DEST_DIR="$6"
    CONFIG_UPLOAD_DSYM_ONLY="$7"

    # 检查必须参数是否设置
    if [ ! "${CONFIG_BUGLY_APP_ID}" ]; then
        exitWithMessage "Error: Bugly App ID not defined. Please set 'BUGLY_APP_ID' " 0
    fi

    if [[ "${CONFIG_BUGLY_APP_ID}" == *"App ID"* ]]; then
        exitWithMessage "Error: Bugly App ID not defined." 0
    fi

    if [ ! "${CONFIG_BUGLY_APP_KEY}" ]; then
        exitWithMessage "Error: Bugly App Key not defined." 0
    fi

    if [ ! "${CONFIG_BUGLY_APP_BUNDLE_IDENTIFIER}" ]; then
        exitWithMessage "Error: Bundle Identifier not defined." 0
    fi

    if [ ! "${CONFIG_BUGLY_APP_VERSION}" ]; then
        exitWithMessage "Error: App Version not defined." 0
    fi

    if [ ! -e "${CONFIG_DSYM_SOURCE_DIR}" ]; then
        exitWithMessage "Error: Invalid dir ${CONFIG_DSYM_SOURCE_DIR}" 0
    fi

    if [ ! "${CONFIG_DSYM_DEST_DIR}" ]; then
        exitWithMessage "Error: Invalid dir ${CONFIG_DSYM_DEST_DIR}" 0
    fi

    if [ ! -e "${CONFIG_DSYM_DEST_DIR}" ]; then
        mkdir ${CONFIG_DSYM_DEST_DIR}
    fi

    DSYM_FOLDER="${CONFIG_DSYM_SOURCE_DIR}"
    IFS=$'\n'

    echo "Scaning dSYM FOLDER: ${DSYM_FOLDER} ..."
    RET="F"
    
    #
    for dsymFile in $(find "$DSYM_FOLDER" -name '*.dSYM'); do
        RET="T"
        echo "Found dSYM file: $dsymFile"
        
        # 上传  add by linx at 2021.06.21
        echo java -jar ${SRCROOT}/sh/Bugly/buglyqq-upload-symbol.jar -appid $CONFIG_BUGLY_APP_ID -appkey $CONFIG_BUGLY_APP_KEY -bundleid $CONFIG_BUGLY_APP_BUNDLE_IDENTIFIER -version $CONFIG_BUGLY_APP_VERSION -platform IOS -inputSymbol $dsymFile
        java -jar ${SRCROOT}/sh/Bugly/buglyqq-upload-symbol.jar -appid $CONFIG_BUGLY_APP_ID -appkey $CONFIG_BUGLY_APP_KEY -bundleid $CONFIG_BUGLY_APP_BUNDLE_IDENTIFIER -version $CONFIG_BUGLY_APP_VERSION -platform IOS -inputSymbol $dsymFile
    done

    if [ $RET = "F" ]; then
        exitWithMessage "No .dSYM found in ${DSYM_FOLDER}" 0
    fi
}

# 在Xcode工程中执行
function runInXcode(){
    echo "Uploading dSYM to Bugly in Xcode ..."

    echo "Info.Plist : ${INFOPLIST_FILE}"

    # add by linx at 2020.07.10 解决获取不到版本号的问题
    BUNDLE_VERSION="$CURRENT_PROJECT_VERSION"
    BUNDLE_SHORT_VERSION="$MARKETING_VERSION"
    
    # 组装Bugly默认识别的版本信息(格式为CFBundleShortVersionString.CFBundleVersion, 例如: 1.1.0.14)
    if [ ! "${CUSTOMIZED_APP_VERSION}" ]; then
        BUGLY_APP_VERSION="${BUNDLE_SHORT_VERSION}.${BUNDLE_VERSION}"
    else
        BUGLY_APP_VERSION="${CUSTOMIZED_APP_VERSION}"
    fi

    # 根据Bundle Id区分不同target的APP，从而使用不同的Bugly
    if [ "$PRODUCT_BUNDLE_IDENTIFIER" == "$QYCBundleId" ]; then
        BUGLY_APP_ID="$QYCAppId"
        BUGLY_APP_KEY="$QYCAppKey"

    elif [ "$PRODUCT_BUNDLE_IDENTIFIER" == "$SafetyBundleId" ]; then
        BUGLY_APP_ID="$SafetyAppId"
        BUGLY_APP_KEY="$SafetyAppKey"
    else
        exitWithMessage "Bugly暂不支持：$PRODUCT_BUNDLE_IDENTIFIER" 0
    fi

    echo "--------------------------------"
    echo "Prepare application information."
    echo "--------------------------------"

    echo "Product Name: ${PRODUCT_NAME}"
    echo "Bundle Identifier: ${PRODUCT_BUNDLE_IDENTIFIER}"
    echo "Version: ${BUNDLE_SHORT_VERSION}"
    echo "Build: ${BUNDLE_VERSION}"

    echo "Bugly App ID: ${BUGLY_APP_ID}"
    echo "Bugly App key: ${BUGLY_APP_KEY}"
    echo "Bugly App Version: ${BUGLY_APP_VERSION}"

    echo "--------------------------------"
    echo "Check the arguments ..."

    ##检查模拟器编译是否允许上传符号
    if [ "$EFFECTIVE_PLATFORM_NAME" == "-iphonesimulator" ]; then
    if [ $UPLOAD_SIMULATOR_SYMBOLS -eq 0 ]; then
        exitWithMessage "Warning: Build for simulator and skipping to upload. \nYou can modify 'UPLOAD_SIMULATOR_SYMBOLS' to 1 in the script." 0
    fi
    fi

    ##检查是否是Release模式编译
    if [ "${CONFIGURATION=}" == "Debug" ]; then
    if [ $UPLOAD_DEBUG_SYMBOLS -eq 0 ]; then
        exitWithMessage "Warning: Build for debug mode and skipping to upload. \nYou can modify 'UPLOAD_DEBUG_SYMBOLS' to 1 in the script." 0
    fi
    fi

    ##检查是否Archive操作
    if [ $UPLOAD_ARCHIVE_ONLY -eq 1 ]; then
    if [[ "$TARGET_BUILD_DIR" == *"/Archive"* ]]; then
        echo "Archive the package"
    else
        exitWithMessage "Warning: Build for NOT Archive mode and skipping to upload. \nYou can modify 'UPLOAD_ARCHIVE_ONLY' to 0 in the script." 0
    fi
    fi

    #
    run ${BUGLY_APP_ID} ${BUGLY_APP_KEY} ${PRODUCT_BUNDLE_IDENTIFIER} ${BUGLY_APP_VERSION} ${DWARF_DSYM_FOLDER_PATH} ${BUILD_DIR}/BuglySymbolTemp ${UPLOAD_DSYM_ONLY}
}

# 根据Xcode的环境变量判断是否处于Xcode环境
INFO_PLIST_FILE="${INFOPLIST_FILE}"

BuildInXcode="F"
if [ -f "${INFO_PLIST_FILE}" ]; then
    BuildInXcode="T"
fi

if [ $BuildInXcode = "T" ]; then
    runInXcode
else
    echo "暂不支持手动上传dSYM"
    # BUGLY_APP_ID="$1"
    # BUGLY_APP_KEY="$2"
    # BUNDLE_IDENTIFIER="$3"
    # BUGLY_APP_VERSION="$4"
    # DWARF_DSYM_FOLDER_PATH="$5"
    # java -jar buglyqq-upload-symbol.jar -appid BUGLY_APP_ID -appkey BUGLY_APP_KEY -bundleid BUNDLE_IDENTIFIER -version BUGLY_APP_VERSION -platform IOS -inputSymbol DWARF_DSYM_FOLDER_PATH
fi






