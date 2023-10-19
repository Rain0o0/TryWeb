document.addEventListener('DOMContentLoaded', function() {
    var loginForm_1 = document.querySelector('.login_1');

    loginForm_1.addEventListener('submit', function(event) {
      event.preventDefault(); // 阻止表单的默认提交行为

      var usernameInput = this.querySelector('input[type="text"]');
      var passwordInput = this.querySelector('input[type="password"]');
      var username = usernameInput.value; // 获取用户名输入框的值
      var password = passwordInput.value; // 获取密码输入框的值

      // 发送 Ajax 请求
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/login_1');
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = function() {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          console.log(response.message);
          if (response.message == "用户名已存在"){
            alert("该用户名已存在，请重新输入")}
          else if (response.message == "Did it"){
            alert("注册成功");
          window.close();}
          // 在此处处理后端返回的响应，例如显示成功消息或错误消息
        }
      };

      xhr.send(JSON.stringify({ 'username': username,'password': password }));
    });
  });
