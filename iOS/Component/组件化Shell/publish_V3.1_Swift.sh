#!/usr/bin/env bash

#Config Color
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

#const
source1=http://git.qpaas.com/PaasPods/PaasSpecs.git
commitText=""
tag=""
result=`find ./ -maxdepth 1 -type f -name "*.podspec"`
SpecName=${result}


#替换podspec的Tag
updatePodspec(){
    sed -i '' s/"s.version[[:space:]]*=[[:space:]]*\'[0-9a-zA-Z.]*\'"/"s.version = \'${tag}\'"/g ${SpecName}
}
#验证Lib
validationLib(){
    echo -e "${GREEN}开始验证${NC}⏰⏰⏰"
    if ! pod lib lint --skip-import-validation --allow-warnings --use-libraries --use-modular-headers --sources="${source1}"; then echo -e "${RED}验证失败${NC}🌧🌧🌧"; exit 1; fi
    echo -e "${GREEN}验证成功${NC}🚀🚀🚀"
}

#push代码，tag
pushAndTag(){
    echo -e "${GREEN}准备提交代码${NC}⏰⏰⏰"
    git add .
    git commit -m ${commitText}
    git push
    echo -e "${GREEN}提交代码成功${NC}🚀🚀🚀"

    echo -e "${GREEN}准备打Tag${NC}⏰⏰⏰"
    git tag ${tag}
    git push --tags
    echo -e "${GREEN}打Tag成功${NC}🚀🚀🚀"
}

#发布库
publishLib(){
    echo -e "${GREEN}准备发布${tag}版本${NC}⏰⏰⏰"
    if ! pod repo push PaasSpecs ${SpecName} --allow-warnings --sources="${source1}" --allow-warnings --use-libraries --use-modular-headers --skip-import-validation; then echo -e "${RED}发布${tag}版本失败${NC}🌧🌧🌧"; exit 1; fi
    echo -e "${GREEN}发布${tag}版本成功${NC}🚀🚀🚀"
}

#发布二进制
publishBinary(){
    echo -e "${GREEN}准备发布${tag}二进制版本${NC}⏰⏰⏰"

    echo -e "${GREEN}发布${tag}二进制版本成功${NC}🚀🚀🚀"
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
    updatePodspec

    #
    validationLib

    #
    pushAndTag

    #
    publishLib

    #
    publishBinary

}

publish
