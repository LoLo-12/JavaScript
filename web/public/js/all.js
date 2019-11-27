let clickBtn = document.querySelector(".wantKnow");
let section = document.querySelector("section");

function combineData(data) {
    let totalData = data;
    let totalNum = 8;
    let nowNum = 1;
    let pageLength = Math.ceil(data.length / totalNum);

    function changePage(e) {
        e.preventDefault();
        // console.log(e.target.textContent);
        let clickTag = e.target.className;
        if (clickTag == "right") {
            if (nowNum == pageLength) {
                nowNum = pageLength;
            } else {
                nowNum++;
            }
        } else if (clickTag == "left") {
            if (nowNum == 1) {
                nowNum = 1;
            } else {
                nowNum--;
            }
        } else {
            nowNum = e.target.textContent;
        }
        createItem(parseInt(nowNum));
        createPage(parseInt(nowNum));
    }

    function createPage(num) {
        let str = "";
        str = `<li><a href="#" class="left"> < </li>`;
        if (totalData.length > totalNum) {
            // console.log(pageLength);
            for (let i = 1; i <= pageLength; i++) {
                if (i == num) {
                    str += `<li><a href="#" class="active">${i}</li>`;
                } else {
                    str += `<li><a href="#">${i}</li>`;
                }
            }
        } else {
            str += `<li><a href="#" class="active">1</li>`;
        }
        str += `<li><a href="#" class="right"> > </li>`;
        document.querySelector(".pagesNum").innerHTML = str;

        let pagesNum = document.querySelector(".pagesNum");
        pagesNum.addEventListener("click", changePage);
    }

    function createItem(num) {
        let strItem = "";
        let start = num * totalNum;
        let dataLen = totalData.length;
        // console.log(num,totalNum);
        // console.log(num,"nowNum");
        // console.log(start,"start");
        if (dataLen > start) {
            dataLen = start;
        } else {
            dataLen = dataLen;
        };
        // console.log(start-totalNum,dataLen);
        for (let i = start - totalNum; i < dataLen; i++) {
            strItem += `<li id="${i}">
                    <img src="${data[i].pic}" alt="${data[i].name}">
                    <h2>${data[i].name}</h2>
                    <h3>${data[i].city} ${data[i].town}</h3>
                    <div class="icon ${data[i].creditCard}">
                      <i class="far fa-credit-card"></i>
                      <div class="coinIcon">
                        <div class="coin">$</div>
                        <div class="coin1"></div>
                      </div>
                    </div>
                    <p>${data[i].foodFeature}...</p>
                  </li>`;
        }
        document.querySelector(".itemBox").innerHTML = strItem;
    }
    createItem(nowNum);
    createPage(nowNum);
}


function listData(item) {

    document.querySelector(".introduce").classList.add("hide");
    document.querySelector(".main").classList.remove("hide");

    let itemCity = [];
    // console.log(item.length);
    for (let i = 0; i < item.length; i++) {
        if (itemCity.indexOf(item[i].City) == -1) {
            itemCity.push(item[i].City);
        }
    }

    // console.log(itemCity);
    let str = "";
    let newNode = document.createElement('select');
    for (let j = 0; j < itemCity.length; j++) {
        str += `<option value="${itemCity[j]}">${itemCity[j]}</option>`;
    }
    // console.log(str);
    newNode.innerHTML = str;
    document.querySelector(".main").appendChild(newNode);

    let mainName = document.querySelector(".mainName");
    let itemSelect = document.querySelector("select");

    let itemlink = document.querySelector(".areaLink");
    let areaArr = {
        "北部地區": ["基隆市", "宜蘭縣", "新北市", "桃園市", "新竹縣", "新竹市"],
        "中部地區": ["苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣"],
        "南部地區": ["嘉義縣", "臺南市", "高雄市", "屏東縣"],
        "東部地區": ["花蓮縣", "臺東縣"],
        "離島地區": ["澎湖縣", "金門縣"]
    };


    function selectData(e) {
        // console.log(e.target.value);
        mainName.textContent = e.target.value;
        let chiceItem = {};
        let choiceArr = [];
        for (let i = 0; i < item.length; i++) {
            if (item[i].City == e.target.value) {
                chiceItem = {
                    pic: item[i].PicURL,
                    name: item[i].Name,
                    city: item[i].City,
                    town: item[i].Town,
                    creditCard: item[i].CreditCard,
                    foodFeature: item[i].FoodFeature.substr(0, 55)
                }
                choiceArr.push(chiceItem);
            }
        }
        // console.log(choiceArr);
        combineData(choiceArr);
        section.classList.remove("hide");
        // section.appendChild(newUl);
    }

    itemSelect.addEventListener("change", selectData);

    function linkData(e) {
        e.preventDefault();
        mainName.textContent = e.target.textContent;
        let newArr = areaArr[e.target.textContent];
        let chiceItem = {};
        let choiceArr = [];
        for (let i = 0; i < item.length; i++) {
            for (let j = 0; j < newArr.length; j++) {
                if (item[i].City == newArr[j]) {
                    chiceItem = {
                        pic: item[i].PicURL,
                        name: item[i].Name,
                        city: item[i].City,
                        town: item[i].Town,
                        creditCard: item[i].CreditCard,
                        foodFeature: item[i].FoodFeature.substr(0, 35)
                    }
                    choiceArr.push(chiceItem);
                }
            }
        }
        // console.log(choiceArr);
        combineData(choiceArr);
        section.classList.remove("hide");
    }

    itemlink.addEventListener("click", linkData);
}

function loading() {
    const dataUrl = "https://script.google.com/macros/s/AKfycbwXzEAYMUmxep5q8JHUKYa8SJ0emc5dQgWYfwyNsG0THQgWhDo/exec?url=http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx";

    fetch(dataUrl, {})
        .then((response) => {
            // console.log(response);
            return response.json();
        }).then((data) => {
            // console.log(data);
            listData(data);
        }).catch((err) => {
            console.log('錯誤:', err);
        });
}

function changeView() {
    loading();
    clickBtn.textContent = "Let's GO ~";
    document.querySelector(".introduce").classList.add("animated");
    document.querySelector(".introduce").classList.add("bounceOutLeft");
    document.querySelector('.introduce').style.animationDuration = '5s';
}

clickBtn.addEventListener("click", changeView);
