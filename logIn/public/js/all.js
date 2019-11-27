let setBtn = document.querySelector(".signBtn");
let mailInput = document.getElementById("mail");
let passInput = document.getElementById("password");
let changeItem = document.querySelector(".change");
let signTag = document.querySelector(".sign");
let msg = document.querySelector(".msg");

changeItem.addEventListener("click", function (e) {
    e.preventDefault();
    if (signTag.textContent == "Log In") {
        signTag.textContent = "Register";
        changeItem.textContent = "Already have an account";
    } else if (signTag.textContent == "Register") {
        signTag.textContent = "Log In";
        changeItem.textContent = "Join Account";
    }
});

function checkItem(obj) {
    if (obj.email == "") {
        mailInput.focus();
        return false;
    } else if (obj.password == "") {
        passInput.focus();
        return false;
    }
    return true;
}

function setData() {

    let upURL = 'https://hexschool-tutorial.herokuapp.com/api/signup';
    let inURL = 'https://hexschool-tutorial.herokuapp.com/api/signin';

    let account = {
        email: mailInput.value,
        password: passInput.value
    }

    if (!checkItem(account)) {
        msg.textContent = "請輸入欄位";
        msg.className = msg.className.replace(/success/ig, "error");
        return;
    }
    // console.log(JSON.stringify(account));

    let xhr = new XMLHttpRequest;
    if (signTag.textContent == "Log In") {
        xhr.open("post", inURL, true);
    } else {
        xhr.open("post", upURL, true);
    }
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(account));

    xhr.onload = function () {
        // console.log(xhr);
        let res = JSON.parse(xhr.responseText);
        // console.log(res.message);
        if (res.success) {
            msg.className = "msg success";
        } else {
            msg.className = "msg error";
        }
        msg.textContent = res.message;
        mailInput.value = "";
        passInput.value = "";
    }
}

setBtn.addEventListener("click", setData);