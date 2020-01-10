# 参考文件
# http://docs.jinkan.org/docs/flask/quickstart.html#quickstart

# 1. 首先，我们导入了 Flask 类。这个类的实例将会是我们的 WSGI 应用程序
from flask import Flask
from flask import request

# 2. 接下来，我们创建一个该类的实例，第一个参数是应用模块或者包的名称。
# 如果你使用单一的模块（如本例），你应该使用 __name__ ，因为模块的名称将会因其作为单独应用启动还是作为模块导入而有不同（ 也即是 '__main__' 或实际的导入名）。
# 这是必须的，这样 Flask 才知道到哪去找模板、静态文件等等。
app = Flask(__name__)


# 3. 然后，我们使用 route() 装饰器告诉 Flask 什么样的URL 能触发我们的函数
@app.route('/')
# 4. 这个函数的名字也在生成 URL 时被特定的函数采用，这个函数返回我们想要显示在用户浏览器中的信息。
def index():
    return 'index html'


# Flask 的 URL 规则基于 Werkzeug 的路由模块。这个模块背后的思想是基于 Apache 以及更早的 HTTP 服务器主张的先例，保证优雅且唯一的 URL。
@app.route('/hello')  # URL 路由
def hello_world():
    return "Heeeello worlddddddddaadfff!"


@app.route('/method01/<param>')  # http://0.0.0.0:9527/method01/lin
def method01(param):
    return '参数 = %s' % param


@app.route('/method02/<int:post_id>')  # http://0.0.0.0:9527/method02/2
def method02(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id


# 处理GET、POST方法
@app.route('/loginXX', methods=['GET', 'POST'])
def loginXX():
    if request.method == 'POST':
        return 'POST' + AAA()
    else:
        return 'GET'


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if valid_login(request.form['name'],
                       request.form['password']):
            return 'Success！'
        else:
            return '账号、密码错误！'
    else:
        return 'GET'


# 登录信息验证
def valid_login(name, password):
    if name == 'lin' and password == '123':
        return True
    else:
        return False


# with app.test_request_context('/login', method='POST'):
#     assert request.path == 'login'
#     assert request.method == 'POST'


def AAA():
    return 'AAAAAA'


# 5. 最后我们用 run() 函数来让应用运行在本地服务器上。
# 其中 if __name__ == '__main__': 确保服务器只会在该脚本被 Python 解释器直接执行的时候才会运行，而不是作为模块导入的时候。
if __name__ == "__main__":
    # 本机可访问
    # app.run()

    # 如果你启用了调试支持，服务器会在代码修改后自动重新载入，并在发生错误时提供一个相当有用的调试器。
    app.debug = True
    # app.run()

    # 方式二
    # app.run(debug=True)

    # 同局域网可访问，端口号=9527
    app.run(host='0.0.0.0', port=9527)
