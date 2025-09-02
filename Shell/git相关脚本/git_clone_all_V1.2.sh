#!/usr/bin/env bash
#
# Version:1.1
# 支持分支引入组件clone
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
BaseURL="http://git.qpaas.com/PaasPods/BusinessModule/X_X.git"

# 本地仓库路径
Local_Path="${HOME}/Work/Pods"

# 0=仅拉取分支引入组件，1＝拉取全部组件
Clone_Type=0

# BusinessModule组件列表
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
QYCOrgStructure
QYCQRCode
QYCSignIn
QYCSignInWithApple
QYCFilePreview
QYCShowCallerModule)

# clone仓库
Git_Clone() {
    echo -e "${GREEN} ========== git clone Start ========== ${NC}"
    
    # 区分不同数组
    if [ $Clone_Type -eq 0 ]; then
        PodsArray=(${ModulePodsArray[*]})
    else
        PodsArray=(${AllPodsArray[@]})
    fi
            
    
    # 前往指定目录下
    if [ ! -d "$Local_Path" ]; then
        # 不存在则新建
        echo -e "${YELLOW}${Local_Path}路径不存在，正在创建...${NC}⏰⏰⏰"
        if ! mkdir "$Local_Path"
        then
            echo -e "${RED}创建失败...${NC}🌧🌧🌧"
            exit 1
        fi
    fi
    
    # 前往本地存放路径
    cd $Local_Path
    echo -e "${YELLOW}${Local_Path}本地仓库路径${NC}🚀🚀🚀"
    
    echo -e "${GREEN} ========== 已经前往本地路径下 ========== ${NC}"
        
    for ((i=0;i<${#PodsArray[@]};i++)) do
        # echo ${PodsArray[i]}
        # 替换URL中的X_X字符，生成对应的git地址
        # eg:http://git.qpaas.com/PaasPods/QYAlterView.git
        pod_url=${BaseURL}
        pod_url=${pod_url/X_X/${PodsArray[i]}}
        # echo ${pod_url}
        
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
