'use strict'

var gNums;
var gLevel = 16;  
var gCurrNum;
var gCurrNum;
var gTime;
var gInterval;

// -------------------

function initGame() {

    fillNums();
    renderNums();
    gCurrNum = 1;
    renderNextNum();
    stopTime();  
    restTime();  
}

function renderNums() {

    var currNum;
    var length = Math.sqrt(gLevel);  // rowspan & colspan;
    var currIdx = 0;          //  0 - (gLevel-1);
    var strHtml = ``;

    var elHeader_colspan = document.querySelector('th');
    elHeader_colspan.colSpan = '' + length; // <th colspan="4"/"5"/"6">

    for (var i = 0; i < length; i++) {

        strHtml += `<tr>`;

        for (var j = 0; j < length; j++) {

            currNum = gNums[currIdx];
            strHtml += `<td class="cell" onclick="cellClick(this)">${currNum}</td>`;
            currIdx++;
        }
        strHtml += `</tr>`;
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function cellClick(elCellNum) {

    if (!gInterval && gCurrNum === 1) {  // still first num, and internal stiil '0'!!

        gInterval = setInterval(setTime, 10); // min interval is 10 miliseconds!!
    }

    var selectedNum = +elCellNum.innerText; // a must string to numeric!!

    if (selectedNum === gCurrNum) {

        elCellNum.classList.add('.correct-choise');
        if (gCurrNum < gLevel) {

            gCurrNum++;         // model
            renderNextNum();    // Dom
        } else {

            renderWin()
        }
    }
}

function changeLevel(level) {

    gLevel = level;
    initGame();
}

function renderNextNum() {
    var elNextNum = document.querySelector('.next-number');
    elNextNum.innerText = ' ' + gCurrNum;
}


function renderMessage(isVictory) {

    var elMessege = document.querySelector('.messege-title');
    elMessege.style.innerText = isVictory ? "You win!!" : "You win!!"
    elMessege.style.display = 'block';
    stopTime();
}



// -----------------------------------

function fillNums() {

    var nums = [];
    for (var i = 1; i <= gLevel; i++) {

        nums.push(i);
    }
    gNums = shuffle(nums);
}

function shuffle(nums) {

    var rndNums = [];
    while (nums.length > 0) {

        var rndIdx = getRandomInt(0, nums.length);
        rndNums.push(nums.splice(rndIdx, 1));    //  push to rndNums than remove from nums
    }

    return rndNums;
}

