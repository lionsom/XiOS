#!/usr/bin/env bash
#
# Version:1.0
# 获取所有组件的依赖库列表
#

#Config Color
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW="\033[1;33m"
NC='\033[0m' # No Color

# 仓库公共地址
BaseURL="http://git.qpaas.com/PaasPods/X_X.git"

# 本地仓库路径
Local_Path="${HOME}/Work/Com"

# 0=仅拉取分支引入组件，1＝拉取全部组件
Clone_Type=0



# 所有组件列表
AllPodsArray=(
QYAlterView
QYCAccount
QYCAlertView
QYCAliOSS
QYCAppConfig
QYCApplicationCenter
QYCApplicationCenterModule_Category
QYCAssets
QYCBase
QYCBase_Form
QYCBlueTooth
QYCBlueToothModule_Category
QYCCLImageEditor
QYCCMPopTipView
QYCCacheTool
QYCCategory
QYCCuteHand
QYCCuteHandModule_Category
QYCDialogView
QYCDoraemonKit
QYCEmoticon
QYCEntContainer
QYCExcelView
QYCException
QYCFilePreview
QYCFilePreviewModule_Category
QYCFileProcesse
QYCFileProcesseModule_Category
QYCFixOnlineModule
QYCFlutterApp
QYCFlutterEngine
QYCFlutterFramework_Debug
QYCFlutterFramework_Release
QYCFlutterModule
QYCFlutterModule_Category
QYCFlutterPlugin
QYCForm
QYCFormModule_Category
QYCGlobalSearch
QYCGlobalSearchModule_Category
QYCH5
QYCH5Module_Category
QYCIM
QYCIMKit
QYCIOT
QYCIOTModule_Category
QYCIconFont
QYCJZNavigationExtension
QYCKSYMediaPlayer
QYCLabel
QYCLaunchModule
QYCLaunchModule_Category
QYCLocationTool
QYCLoginModule
QYCLoginModule_Category
QYCMPTextKit
QYCMapModule
QYCMapModule_Category
QYCMediator
QYCMiPushModule
QYCMonitor
QYCNavigationBar
QYCNavigationController
QYCNavigationExtension
QYCNetwork
QYCOC_Swift
QYCOrgStructure
QYCOrgStructureModule_Category
QYCPhotoBrower
QYCPhotoLib
QYCPinYin
QYCPlatformReminds
QYCPlatformRemindsModule_Category
QYCPortal
QYCPortalModule_Category
QYCProfile
QYCProfileModule_Category
QYCQChat
QYCQChatModule_Category
QYCQRCode
QYCQRCodeModule_Category
QYCReachability
QYCRefresh
QYCRequest
QYCRootModule
QYCRootModule_Category
QYCScan
QYCSearchBar
QYCSharePlatform
QYCSharePlatform_Category
QYCSignIn
QYCSignInWithApple
QYCSigninModule_Category
QYCSystemError
QYCSystemErrorModule_Category
QYCSystemPermissionTool
QYCTFHpple
QYCTZImagePickerController
QYCTextField
QYCTheme
QYCThirdLoginSDK
QYCUI
QYCUtility
QYCVideoLiveModule
QYCVideoLiveModule_Category
QYCVoice
QYCWebSocket
QYCWebSocket_Category
QYCWebViewJavascriptBridge
QYCWorkCircleModule
QYCWorkCircleModule_Category
QYCYBImageBrowser
QYCYBPopUpMenu
QYCYYImage
QYCYYPhotoGroupView
QYCYYWebImage
QYCZFPlayer
QYCZLImageEditor
QYCiCloudTool
QYYAssets_Base
QYYBadge_Base
QYYDialogView_Base
QYYException_Base
QYYExtension
QYYFileManager_Base
QYYIconFont_Base
QYYNavigationBar
QYYNavigationViewController
QYYPopover_Base
QYYScan_Base
QYYToast
QYYUI_Base
ZHModule_Category)

# 分支引入组件列表
ModulePodsArray=(
#必须模块
QYCRootModule
QYCLaunchModule
QYCLoginModule
QYCProfile
#首页模块
QYCQChat
QYCApplicationCenter
QYCPortal
QYCH5
QYCWorkCircleModule
QYCPlatformReminds
#功能模块
QYCBlueTooth
QYCCuteHand
QYCFileProcesse
QYCForm
QYCGlobalSearch
QYCIOT
QYCMapModule
QYCOrgStructure
QYCQRCode
QYCSignIn
QYCSignInWithApple
QYCVideoLiveModule
QYCFilePreview)




# 核心请求
# curl --header "PRIVATE-TOKEN: 1w2GZQAeUz5rWzDmk33o" "http://git.qpaas.com/PaasPods/QYCIconFont/raw/master/QYCIconFont.podspec?ref=master"


PRIVATE_TOKEN="1w2GZQAeUz5rWzDmk33o"

REMOTE_URL="http://git.qpaas.com/PaasPods/X_X/raw/master/X_X.podspec"

REMOTE_Branch="master"

# 功能：0：依赖了哪些库，1：被哪些库依赖了
Function_Type=0

# 是否自定义
Custom=0

# 依赖了哪些库
Depending() {
    echo -e "${GREEN} ========== 依赖了哪些库 Start ========== ${NC}"


    # 循环遍历
    for ((i=0;i<${#ModulePodsArray[@]};i++)) do
        # echo ${PodsArray[i]}
        # 替换URL中的X_X字符，生成对应的git地址
        # eg:http://git.qpaas.com/PaasPods/QYAlterView.git
        remote_url=${REMOTE_URL}
        remote_url=${remote_url/X_X/${ModulePodsArray[i]}}
        remote_url=${remote_url/X_X/${ModulePodsArray[i]}}
        echo ${remote_url}
        
        Result=$(curl --header "PRIVATE-TOKEN: ${PRIVATE_TOKEN}" "${remote_url}?ref=${REMOTE_Branch}")
        
        echo ${Result}
        
        # 截取
        str=`${Result} | grep "s.dependency '*'"`
        echo str
        
        break
        
    done;
    
    
    echo -e "${GREEN} ========== 依赖了哪些库 Success =========="
}

# 被哪些库依赖了
Depended() {

    echo -e "${GREEN} ========== 被哪些库依赖了 Start ========== ${NC}"


    echo -e "${GREEN} ========== 被哪些库依赖了 Success =========="

}

# 运行
if [ $Function_Type -eq 0 ]; then
    Depending
else
    Depended
fi

