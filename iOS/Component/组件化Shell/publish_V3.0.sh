#!/usr/bin/env bash
#
# Version:3.0
#

#Config Color
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

#const
source1=https://github.com/CocoaPods/Specs.git
source2=http://git.qpaas.com/PaasPods/PaasSpecs.git
commitText=""
tag=""
result=`find ./ -maxdepth 1 -type f -name "*.podspec"`
SpecName=${result}


#pull代码
pull() {
    echo -e "${GREEN}\n第一步：准备pull代码${NC}⏰⏰⏰"
    #先拉代码
    if git pull; then
        echo -e "${GREEN}pull代码成功${NC}🚀🚀🚀"
    else
        echo -e "${RED}pull代码失败，请手动解决冲突${NC}🌧🌧🌧"
        exit 1
    fi
}

#替换podspec的Tag
updatePodspec() {
    echo -e "${GREEN}\n第二步：修改 s.version = ${tag} ${NC}⏰⏰⏰"
    sed -i '' s/"s.version[[:space:]]*=[[:space:]]*\'[0-9a-zA-Z.]*\'"/"s.version = \'${tag}\'"/g ${SpecName}
}

#本地验证Lib
localVerifyLib(){
    echo -e "${GREEN}\n第三步：开始本地验证：pod lib lint ${NC}⏰⏰⏰"
    if ! pod lib lint --skip-import-validation --allow-warnings --use-libraries --sources="${source1},${source2}"; then echo -e "${RED}验证失败${NC}🌧🌧🌧"; exit 1; fi
    echo -e "${GREEN}验证成功${NC}🚀🚀🚀"
}

#push代码，tag
pushAndTag(){
    echo -e "${GREEN}\n第四步：准备提交代码${NC}⏰⏰⏰"
    git add .
    if ! git commit -m ${commitText}
    then
        echo -e "${RED}git commit失败${NC}🌧🌧🌧"
        exit 1
    fi
    if ! git push
    then
        echo -e "${RED}git push失败${NC}🌧🌧🌧"
        exit 1
    fi
    echo -e "${GREEN}提交代码成功${NC}🚀🚀🚀"

    echo -e "${GREEN}\n第五步：准备打Tag${NC}⏰⏰⏰"
    if git tag ${tag}
    then
        git push --tags
        echo -e "${GREEN}打Tag成功${NC}🚀🚀🚀"
    else
        echo -e "${RED}打Tag失败${NC}🌧🌧🌧"
        exit 1
    fi
}

#远程验证
remoteVerifyLib(){
    echo -e "${GREEN}\n第六步：开始远程验证：pod spec lint ${NC}⏰⏰⏰"
    echo -e "${GREEN}----- 跳过该步骤 -----${NC}🚀🚀🚀"
#    if ! pod spec lint --skip-import-validation --allow-warnings --use-libraries --sources="${source1},${source2}"; then echo -e "${RED}验证失败${NC}🌧🌧🌧"; exit 1; fi
#    echo -e "${GREEN}验证成功${NC}🚀🚀🚀"
}

#发布库
publishLib(){
    echo -e "${GREEN}\n第七步：准备发布${tag}版本${NC}⏰⏰⏰"
    if ! pod repo push PaasSpecs ${SpecName} --allow-warnings --sources="${source1},${source2}" --allow-warnings --use-libraries --skip-import-validation; then echo -e "${RED}发布${tag}版本失败${NC}🌧🌧🌧"; exit 1; fi
    echo -e "${GREEN}发布${tag}版本成功${NC}🚀🚀🚀"
}

#发布二进制
publishBinary(){
    echo -e "${GREEN}\n第八步：准备发布${tag}二进制版本${NC}⏰⏰⏰"
    echo -e "${GREEN}----- 跳过该步骤 -----${NC}🚀🚀🚀"
#    echo -e "${GREEN}发布${tag}二进制版本成功${NC}🚀🚀🚀"
}


publish(){
    #
    echo -e "${GREEN}请输入提交内容:${NC}"
    read a
    commitText=${a}
    
    #
    echo -e "${GREEN}请输入tag:${NC}"
    read b
    tag=${b}
    
    #
    if [ -z "$commitText" ]; then
        echo -e "${RED}提交内容不能为空${NC}🌧🌧🌧"
        exit 1
    fi

    if [ -z "$tag" ]; then
        echo -e "${RED}提交Tag不能为空${NC}🌧🌧🌧"
        exit 1
    fi

    if [ -z "$SpecName" ]; then
        echo -e "${RED}请配置podspec的名称${NC}🌧🌧🌧"
        exit 1
    fi
    
    #
    pull

    #
    updatePodspec
    
    #
    localVerifyLib

    #
    pushAndTag

    #
    remoteVerifyLib

    #
    publishLib

    #
    publishBinary

}

publish
