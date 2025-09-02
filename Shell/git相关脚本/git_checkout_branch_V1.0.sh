#!/usr/bin/env bash
#
# Version:1.0
# 批量从master切出新分支
#

#Config Color
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW="\033[1;33m"
NC='\033[0m' # No Color

# 本地仓库路径
Local_Path="${HOME}/Work/Pods/BusinessModule/"

# 切换分支（xxx -> integration）
Other_Branch="integration"

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
QYCOrgStructure
QYCQRCode
QYCSignIn
QYCSignInWithApple
QYCFilePreview
QYCShowCallerModule)

# 从master分支切出新分支
Git_Checkout() {
    echo -e "${GREEN} ========== git checkout ${Other_Branch} Start ========== ${NC}"
    
    # 循环遍历
    for ((i=0;i<${#ModulePodsArray[@]};i++)) do
        # 判断是否是文件夹
        file_path=$Local_Path${ModulePodsArray[i]}
        if [ -d $file_path ]; then
            # 前往
            cd $file_path
            pwd
            
            # 先拉取一波
            git fetch -p
            
            # git操作 - 切换分支
            if ! git checkout $Other_Branch
            then
                # 切换到旧分支操作失败，跳过，进行下一个
                echo -e "${YELLOW}切换到 ${ModulePodsArray[i]} ${Other_Branch} 分支失败 ${NC}🚀🚀🚀"
                continue
            fi
            
            # git操作 - 拉取分支
            if ! git pull
            then
                # 拉取旧分支操作失败，跳过，进行下一个
                echo -e "${YELLOW}拉取 ${ModulePodsArray[i]} ${Other_Branch} 分支失败 ${NC}🚀🚀🚀"
                continue
            fi
            
        fi
    done;
    
    echo -e "${GREEN} ========== git checkout -b ${New_Branch} from ${Old_Branch} All Success =========="
}

# 运行
Git_Checkout
