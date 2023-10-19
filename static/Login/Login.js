document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.querySelector('.login');

    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // 阻止表单的默认提交行为

      var usernameInput = this.querySelector('input[type="text"]');
      var passwordInput = this.querySelector('input[type="password"]');
      var username = usernameInput.value; // 获取用户名输入框的值
      var password = passwordInput.value; // 获取密码输入框的值

      // 发送 Ajax 请求
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/login');
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = function() {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          console.log(response.message);
          // 在此处处理后端返回的响应，例如显示成功消息或错误消息
          if (response.success) {
            // 如果登录成功，关闭当前窗口
            var url = 'https://settling-hippo-suitable.ngrok-free.app/Test.html?param1=' + username;
            window.open(url,'_blank');
            window.close();
          }
          else if (!response.success){
            alert("用户名或密码错误，请重试")
          }
        }
      };

      xhr.send(JSON.stringify({ 'username': username,'password': password }));
    });
  });

function FixBackGround() {
  var body = document.getElementsByTagName('body')[0];
  var computedStyle = window.getComputedStyle(body);
  var backgroundImage = computedStyle.getPropertyValue('background-image');
  var FixButton = document.getElementById("FixButton");

  if (backgroundImage == 'url("https://settling-hippo-suitable.ngrok-free.app/HT.png")') {
    body.style.backgroundImage = 'url("https://settling-hippo-suitable.ngrok-free.app/HT_1.png")';
    FixButton.innerHTML = "切换背景2"
} else if (backgroundImage == 'url("https://settling-hippo-suitable.ngrok-free.app/HT_1.png")') {
    body.style.backgroundImage = 'url("https://settling-hippo-suitable.ngrok-free.app/HT_2.png")';
    FixButton.innerHTML = "切换背景3"
} else if (backgroundImage == 'url("https://settling-hippo-suitable.ngrok-free.app/HT_2.png")') {
    body.style.backgroundImage = 'url("https://settling-hippo-suitable.ngrok-free.app/HT.png")';
    FixButton.innerHTML = "切换背景1"
}
}

function OpenHelpWeb(){
  window.open("https://settling-hippo-suitable.ngrok-free.app/HelpWeb.html");
}

function OpenMainWeb(){
  window.open("https://settling-hippo-suitable.ngrok-free.app/Test.html");
}

function reg(){
  window.open("https://settling-hippo-suitable.ngrok-free.app/Login/LoginWeb_1.html")
}