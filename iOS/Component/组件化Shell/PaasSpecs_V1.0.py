import time  # 引入time模块
import requests
from bs4 import BeautifulSoup
import xlwt
import re

excel_Path = '/Users/qiyeyun/Desktop/PaasPods版本一览.xls'

# 初始化excel操作对象
workbook = xlwt.Workbook(encoding='utf-8')
booksheet = workbook.add_sheet('PaasPods版本一览', cell_overwrite_ok=True)
# 设置宽高
first_col = booksheet.col(0)    # xlwt中是行和列都是从0开始计算的
first_col.width = 256*40        # 256为衡量单位，20表示20个字符宽度
forth_col = booksheet.col(3)
forth_col.width = 256*30

# 打印当前时间
currentTime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
# 格式化成2016-03-20 11:45:39形式
print('当前时间：' + currentTime)
# 将当前时间写入Excel，存第一行cell(1,1)和cell(1,2)
booksheet.write(0, 0, 'Pod名称')
booksheet.write(0, 1, '最新版本')
booksheet.write(0, 2, '提交人')
booksheet.write(0, 3, '提交时间')
booksheet.write(0, 4, '历史版本')
booksheet.write(0, 8, '当前文档更新时间：' + currentTime)

# 获取网页，解决418
# headers={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36'}
# r = requests.get('http://movie.douban.com/top250?format=text',headers=headers)

# 获取网页
myHeader = {'PRIVATE-TOKEN': '1w2GZQAeUz5rWzDmk33o'}
r = requests.get('http://git.qpaas.com/PaasPods/PaasSpecs', headers=myHeader)
html = r.text
# print(html)
soup = BeautifulSoup(html, "html.parser")
idx = 0
for tag in soup.find_all('a', class_='str-truncated'):
    idx = idx + 1
    m_span = tag.findAll('span')
    # print(m_span[0].contents[0])
    str_list = m_span[0].contents[0].split('/')  # 用/分割str字符串，并保存到列表
    url_str = 'http://git.qpaas.com/PaasPods/PaasSpecs/tree/master/' + str_list[0]
    print(url_str)
    # 将name与URL存入Excel的第二行与第三行
    booksheet.write(idx, 0, str_list[0])
    # 再请求
    myHeader1 = {'PRIVATE-TOKEN': '1w2GZQAeUz5rWzDmk33o'}
    r1 = requests.get(url_str, headers=myHeader1)
    html1 = r1.text
    soup1 = BeautifulSoup(html1, "html.parser")
    tempList = []
    for tag1 in soup1.find_all('a', class_='str-truncated'):
        m_span1 = tag1.find('span')
        # print('顺序:' + m_span1.contents[0])
        # tempList.insert(0, m_span1.contents[0])
        tempList.append(m_span1.contents[0])
    # 获取最新版本
    commit_message = soup1.find('a', class_='commit-row-message item-title')
    p1 = re.compile(r'[(](.*?)[)]', re.S)
    arr = re.findall(p1, commit_message.string)
    print('最新版本：' + arr[0])
    # 获取最新提交记录
    commiter = soup1.find('a', class_='commit-author-link has-tooltip')
    print('最新提交人：' + commiter.string)
    commit_time = soup1.find('time', class_='js-timeago')
    print('最新提交时间：' + commit_time.get('title'))
    booksheet.write(idx, 1, arr[0])
    booksheet.write(idx, 2, commiter.string)
    booksheet.write(idx, 3, commit_time.get('title'))

    # 降序
    tempList.sort(reverse=True)

    idx1 = 3
    for tag2 in tempList:
        idx1 = idx1 + 1
        print('历史版本：' + tag2)
        booksheet.write(idx, idx1, tag2)

# 保存
workbook.save(excel_Path)
print('========================= 操作完成 =========================')
