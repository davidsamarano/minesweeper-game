'use strict'

const LIVES = `❤`;
var gLivesCount = 2;  // you starts frome 0 to 2 with 3 counting lives!!

const MINE = `💣`;
var gMinesCount = 2;      //////////  as defult, but needs to get from id !!

var gCellsData;
var gLevel = 16;
var gCurrData;          /////// data to equalize to !!
var gTime;
var gInterval;

// -------------------

function initGame() {

    var elSmily = document.querySelector('.smily-start');
    elSmily.innerHTML = `😃`;
    var elLives = document.querySelector('.lives');
    elLives.innerHTML = `❤ ❤ ❤`;

    gLivesCount = 3;
    fillCellsData(gMinesCount);
    renderCellsData();
    gCurrData = 1;              /////// data to equalize to !!
    renderNextCellData();
    stopTime();
    restTime();
}

function renderCellsData() {

    var currNum;
    var length = Math.sqrt(gLevel);  // rowspan & colspan;
    var currIdx = 0;          //  0 - (gLevel-1);
    var strHtml = ``;

    var elHeader_colspan = document.querySelector('th');
    elHeader_colspan.colSpan = '' + length; // <th colspan="4"/"5"/"6">

    for (var i = 0; i < length; i++) {

        strHtml += `<tr>`;

        for (var j = 0; j < length; j++) {

            currNum = gCellsData[currIdx];
            strHtml += `<td class="cell" onclick="cellClick(this)">${currNum}</td>`;
            currIdx++;
        }
        strHtml += `</tr>`;
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function cellClick(elCellData) {

    if (elCellData.innerText === '💣' && !gLivesCount) {
        gameOver(false);
        return;
    } else if (elCellData.innerText === '💣') {
        gLivesCount--;
    }

    if (!gInterval && gCurrData === 1) {  // still first num, and internal stiil '0'!!

        gInterval = setInterval(setTime, 10); // min interval is 10 miliseconds!!
    }

    var selectedNum = +elCellData.innerText; // a must string to numeric!!

    if (selectedNum === gCurrData) {

        elCellData.classList.add('.correct-num');
        if (gCurrData < gLevel) {

            gCurrData++;         // model
            renderNextCellData();    // Dom
        } else {

            renderGameOver(true);
        }
    }
}

function changeLevel(level) {

    gLevel = level;
    initGame();
}

function renderNextCellData() {
    var elNextNum = document.querySelector('.score');
    elNextNum.innerText = ' ' + gCurrData;
}

function fillCellsData(minseCount) {

    var Cells = [];
    var count = 0;
    while (count < minseCount) {
        Cells.push(MINE);
        count++;
    }
    for (var i = 1; i <= gLevel - minseCount; i++) {

        Cells.push(i);
    }
    gCellsData = shuffle(Cells);
}

function gameOver(isVictory) {

    stopTime();

    var elSmily = document.querySelector('.smily-start');
    elSmily.innerHTML = isVictory ? `😎` : `🤯`;
}
