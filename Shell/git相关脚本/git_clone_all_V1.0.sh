#!/usr/bin/env bash
#
# Version:1.0
# 批量拉取组件到本地
#

#Config Color
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW="\033[1;33m"
NC='\033[0m' # No Color

# 仓库公共地址
BaseURL="http://git.qpaas.com/PaasPods/X_X.git"

# 组件列表
PodsArray=(
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

# clone仓库
Git_Clone() {
    echo -e "${GREEN} ========== git clone Start =========="
    
    for ((i=0;i<${#PodsArray[@]};i++)) do
        # echo ${PodsArray[i]}
        # 替换URL中的X_X字符，生成对应的git地址
        # eg:http://git.qpaas.com/PaasPods/QYAlterView.git
        pod_url=${BaseURL}
        pod_url=${pod_url/X_X/${PodsArray[i]}}
        # echo ${pod_url}
        
        # 前往指定目录下 ~/Work/Com11
        if ! cd ~/Work/Com11
        then
            # 不存在则新建
            mkdir ~/Work/Com11
            cd ~/Work/Com11
            pwd
        fi
        
        # 显示本地存放路径
        # pwd
        
        if [ -d ${PodsArray[i]} ]; then
            echo -e "${YELLOW}${pod_url} 仓库已经存在${NC}🚀🚀🚀"
            continue
        fi
        
        # 拉取仓库
        if git clone ${pod_url}
        then
            echo -e "${GREEN}${pod_url} git clone仓库成功${NC}🚀🚀🚀"
        else
            echo -e "${RED}${pod_url} git clone仓库失败${NC}🌧🌧🌧"
            exit 1
        fi
        
    done;
    
    echo -e "${GREEN} ========== git clone All Success =========="
}

# 运行
Git_Clone
