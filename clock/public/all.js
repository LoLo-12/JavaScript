(function () {
    var hourHtml = document.querySelector(".hour");
    var minuteHtml = document.querySelector(".minute");
    var secondHtml = document.querySelector(".second");

    function run() {
        var nowTime = new Date();
        var hour = nowTime.getHours();
        var minute = nowTime.getMinutes();
        var second = nowTime.getSeconds();
        hourHtml.style = `transform: rotate(${hour * 30 + minute * 0.5 - 90}deg)`; //一小時轉30度，每分鐘轉0.5度
        minuteHtml.style = `transform: rotate(${minute * 6 - 90}deg)`;
        secondHtml.style = `transform: rotate(${second * 6 - 90}deg)`;
    }
    setInterval(run, 1000);
}());
