var urlParams = new URLSearchParams(window.location.search);
var param1 = urlParams.get('param1');
if(param1){
    var FixButton = document.getElementById("Login");
    FixButton.innerHTML = "欢迎："+param1;
    var UserName = document.getElementById("UserNameInput");
    UserName.value = param1

}

var sent = false; // 用于判断是否已经发送请求

window.onload = function() {
    var textInput = document.getElementById("textInput");
    textInput.addEventListener("input", adjustHeight);
}

function adjustHeight() {
    var textInput = document.getElementById("textInput");
    textInput.style.height = "auto";
    textInput.style.height = textInput.scrollHeight + "px";
}

function sendText() {
    if (sent) {
        return;
    }
    var UserName = document.getElementById("UserNameInput");
    var textInput = document.getElementById("textInput");
    var UserName_text = UserName.value;
    
    var currentDate = new Date();
    var formattedDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    var text = UserName.value + "-AAAAA-" + textInput.value ;
    if (UserName_text != null){
        var text = UserName.value+"-AAAAA-"+textInput.value + "-AAAAA-" + formattedDate;
    }
    else    {var text = "游客-AAAAA-" + textInput.value+formattedDate;}

    if (text === "") {
        return;
    }

    sent = true;
    fetch('https://settling-hippo-suitable.ngrok-free.app/send-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'cors',
        body: 'text=' + encodeURIComponent(text)
    }).then(response => {
        console.log("已发送：" + response.statusText);
        textInput.value = "";
        displayOutput(text); //启用‘记录’功能
        sent = false; // 请求完成后重置sent值
    }).catch(error => {
        console.error('Error:', error);
        sent = false; // 请求失败后重置sent值
    });
}

function uploadFile() {
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];

    if (!file) {
        alert("请先选择文件");
        return; // 中断后续进程
    }

    var formData = new FormData();
    formData.append('file', file);

    fetch('https://settling-hippo-suitable.ngrok-free.app/upload', {
        method: 'POST',
        body: formData
    }).then(response => {
        console.log("文件上传成功");
        alert("上传成功");
    }).catch(error => {
        console.error('上传错误:', error);
        alert("上传失败");
    });
    
}

function getDownloadList() {
    fetch('https://settling-hippo-suitable.ngrok-free.app/Down', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    }).then(response => {
        return response.json();
    }).then(data => {
        displayDownloadList(data.files);
    }).catch(error => {
        console.error('Error:', error);
    });
}

function downloadFile(url) {
    var link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.target = "_blank";
    link.click();
}

function displayDownloadList(files) {
    var downloadListDiv = document.getElementById("output");
    downloadListDiv.innerHTML = '';

    for (var i = 0; i < files.length; i++) {
        var link = `<a href="#" onclick="downloadFile('${files[i].url}')">${files[i].filename}</a>`;
        downloadListDiv.innerHTML += "<p>" + link + "</p>";
    }
}

function displayOutput(text) {
    var currentDate = new Date();
    var outputDiv = document.getElementById("output_text");
    var outputText = text + " " + currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate();
    
    var newParagraph = document.createElement("p");
    newParagraph.style.fontWeight = "bold";
    newParagraph.style.color = "red";
    newParagraph.textContent = outputText;
    
    outputDiv.appendChild(newParagraph);
  }
  

var sendButton = document.querySelector("button");
if ('ontouchstart' in window) {
    sendButton.addEventListener('touchstart', sendText);
} else {
    sendButton.addEventListener('click', sendText);
}

function OpenHelpWeb(){
    window.open("https://settling-hippo-suitable.ngrok-free.app/HelpWeb.html");
}

function OpenMainWeb(){
    window.open("https://settling-hippo-suitable.ngrok-free.app/Test.html");
}

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

function Login(){
    window.open("https://settling-hippo-suitable.ngrok-free.app/Login/LoginWeb.html");
}