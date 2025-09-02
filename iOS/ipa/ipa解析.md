# iOS查看ipa包证书信息

1. 首先将ipa改成zip

2. 解压zip包生成Payload文件

3. cd到对应的文件下,然后执行命令

    > security cms -D -i embedded.mobileprovision

