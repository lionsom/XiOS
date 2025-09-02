#!/bin/bash

# 查看PC状态：CPU使用率、内存使用率、存储空间使用率。

cpu=`top -bn 1 -i -c | grep Cpu | awk '{print $8}'`
mem=`free -m | grep M | awk '{print $4}'`
ssd=`df -h | head -2 | tail -1 | awk '{print $5}'`

echo "##################### PC状态 #####################"
echo "CPU空闲百分比:     $cpu "
echo "MEM空闲百分比:     $mem  "
echo "SSD使用率百分比:     $ssd  "
echo "#################################################"

