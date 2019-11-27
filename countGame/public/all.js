let checkStart = document.querySelector(".bone");
let checkEnd = document.querySelector(".btwo");

checkStart.addEventListener("click", function () {
    document.querySelector(".pageStart").classList.remove("isActive");
    document.querySelector(".pageView").classList.add("isActive");
    runTime();
})

checkEnd.addEventListener("click", function () {
    document.querySelector(".pageEnd").classList.remove("isActive");
    document.querySelector(".pageStart").classList.add("isActive");
})

let calculateSign = ["+", "-", "×", "÷"];
let sign = "";
let firstText = document.querySelector(".num1");
let lastText = document.querySelector(".num2");
let signText = document.querySelector(".symbol");
let firstNum = 0;
let lastNum = 0;
let arr = [];
let inputAns = 0;
let finalAns = 0;
let sec = 60;
let slogan = document.querySelector(".slogan");
let score = document.querySelector(".score");
let scoreNum = 0;
let result = document.querySelector(".result");

function runNum(n, w) {
    firstNum = Math.floor(Math.random() * n + w);
    lastNum = Math.floor(Math.random() * n + w);
    sign = calculateSign[Math.floor(Math.random() * calculateSign.length)];
    minMum(n, w);
}

function minMum(n, w) {
    if ((firstNum < lastNum && sign == "-") || (firstNum < lastNum && sign == "÷") || (firstNum % lastNum != 0)) {
        // console.log("no");
        runNum(n, w);
    } else {
        firstText.textContent = firstNum;
        lastText.textContent = lastNum;
        signText.textContent = sign;
        arr = [firstNum, sign, lastNum];
        runCal();
    }
}

function runCal() {
    if (sign == "×") {
        arr[1] = "*";
    } else if (sign == "÷") {
        arr[1] = "/";
    }
    // console.log(arr);
    finalAns = eval(arr.join(""));
    // console.log(finalAns,"arr");
}

function runTime() {
    runNum(9, 1);
    let timer = setInterval(function () {
        // runInterval(sec);
        sec -= 1;
        document.querySelector(".time").textContent = sec + " s";
        if (sec == 0) {
            clearTimeout(timer);
            // console.log("時間到");
            // console.log(scoreNum,"score");
            setTimeout(function () {
                document.querySelector(".pageView").classList.remove("isActive");
                document.querySelector(".pageEnd").classList.add("isActive");
                document.querySelector(".finalScore").textContent = scoreNum;
            }, 1000);
        }
    }, 1000);
}

function checkAns(inputAns, t) {
    if (Number(inputAns) == finalAns) {
        scoreNum += t;
        // console.log(t,"rt");
    } else {
        if (scoreNum != 0) {
            scoreNum -= 1;
            // console.log(t,"wt");
        }
    }
    score.textContent = scoreNum;
}

function runFinal(sec, inputAns) {
    if (sec <= 60 && sec > 40) {
        checkAns(inputAns, 1);
        runNum(9, 1);
    } else if (sec <= 40 && sec > 20) {
        checkAns(inputAns, 1);
        runNum(90, 10);
    } else if (sec <= 20 && sec > 0) {
        checkAns(inputAns, 5);
        runNum(900, 100);
    }
}

result.addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        let inputAns = result.value;
        runFinal(sec, inputAns);
        result.value = "";
    }
})