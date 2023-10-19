import datetime
import time
import os
import mysql.connector
from flask import Flask, request, jsonify, send_from_directory, redirect
from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)

# 第一个文件中的代码
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        return send_text()
    return app.send_static_file('Test.html')

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico'), 200

@app.route('/send-text', methods=['POST'])
def send_text():
    text = request.form.get('text')  # 获取通过POST请求发送的文本数据
    
    print("已接收到文本：" + text)
    
    TextList = text.split("-AAAAA-")
    print(TextList)
    
    cnx = mysql.connector.connect(user='root', password='1234', host='127.0.0.1', database='data')
    cursor = cnx.cursor()
    cursor.execute("""
        INSERT INTO usertext (username, text, sendtime)
        SELECT %s, %s, %s
        FROM DUAL
    """, (TextList[0], TextList[1], TextList[2]))
    
    # 事务提交
    cnx.commit()
    
    # 关闭游标和数据库连接
    cursor.close()
    cnx.close()
    
    return jsonify({'message': 'Success'})

@app.route('/upload', methods=['POST'])
def upload():
    path = 'D:/pythonproject/HTML/Upload/'
    start_time = time.time()
    file = request.files['file']
    print("文件正在上传中") if file is not None else print("User_File Not Find")#实际运行中将会在上一条中断
    file.save(path + file.filename)
    end_time = time.time()
    duration = end_time - start_time
    file_size = os.path.getsize(path + file.filename)
    speed = file_size / duration
    print("该次传输速度为" + str(speed / 1024) + "kb/S")
    return jsonify({'message': '文件上传成功'})

@app.route('/Down', methods=['GET'])
def get_download_list():
    directory = 'D:/pythonproject/HTML/Down/'
    files = os.listdir(directory)
    download_list = []
    for file in files:
        download_list.append({
            'filename': file,
            'url': f'https://settling-hippo-suitable.ngrok-free.app/Down/{file}'
        })
    return jsonify({'files': download_list})

@app.route('/Down/<path:filename>', methods=['GET'])
def download_file(filename):
    directory = 'D:/pythonproject/HTML/Down/'
    return send_from_directory(directory, filename)

@app.route('/login', methods=['POST'])
def login():
    # 获取请求中的用户名
    user_name = request.json.get('username')
    pass_word = request.json.get('password')

    # 连接数据库并执行查询
    cnx = mysql.connector.connect(user='root', password='1234', host='127.0.0.1', database='data')
    cursor = cnx.cursor()
    query = "SELECT PassWord FROM userlogin WHERE UserName = %s"
    cursor.execute(query, (user_name,))
    
    list = cursor.fetchall()
    # 获取查询结果
    password = None
    if len(list) == 0:
        print(f"User try to login with UserName'{user_name}',but it is not be found")
    for (password,) in list:
        print(f"User'{user_name}' is response to login,password is {password}")
    
    # 关闭游标和数据库连接
    cursor.close()
    cnx.close()

    if password == pass_word:
        print("登录成功")
        response = {'message': 'Login successful', 'data': {'username': user_name}, 'success': True}
        return jsonify(response)
    else:
        response = {'message': 'Invalid username','success': False}
        print("登录失败")
        return jsonify(response)

@app.route('/login_1', methods=['POST'])
def login_1():
    # 获取请求中的用户名
    user_name = request.json.get('username')
    pass_word = request.json.get('password')

    # 连接数据库并执行添加
    cnx = mysql.connector.connect(user='root', password='1234', host='127.0.0.1', database='data')
    cursor = cnx.cursor()
    cursor.execute("""
        INSERT INTO userlogin (username, password)
        SELECT %s, %s
        FROM DUAL
        WHERE NOT EXISTS (
            SELECT 1 FROM userlogin
            WHERE username = %s
        )
    """, (user_name, pass_word, user_name))
    
    # 获取受影响的行数
    row_count = cursor.rowcount
    
    # 事务提交
    cnx.commit()
    
    # 关闭游标和数据库连接
    cursor.close()
    cnx.close()
    
    print("用户发出注册请求")

    if row_count == 0:
        response = {'message': '用户名已存在'}
        print("用户名'{}'已存在".format(user_name))
    else:
        response = {'message': 'Did it'}
        print("用户'{}'注册成功，密码为'{}'".format(user_name,pass_word))
    


    return jsonify(response)



if __name__ == '__main__':
    app.run()

