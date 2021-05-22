'use strict'

const MINE = `💣`;
const LIVES = `❤`;
var gLivesCount = 3;  // (check: you starts frome 0 to 2 with 3 counting lives!!)


var gLevel = {      // defult;
    size: 4,
    mines: 2
};

var gScore;          /////// data to equalize to !!
var gTime;
var gInterval;

var gMinesMat;
var gBoard;
var gGame;  // update object
// -------------------

function initGame() {

    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
    gBoard = createBoard();     // state: manualy...

    var elSmily = document.querySelector('.smily-start');
    elSmily.innerHTML = `😃`;

    var elLives = document.querySelector('.lives');
    elLives.innerHTML = `❤ ❤ ❤`;
    gLivesCount = 3;

    stopTime();
    restTime();
    restScore();
    getMinesMat();
    buildBoard();
    renderBoard(gBoard);
}

function renderBoard(board) {

    var length = gLevel.size;  // rowspan & colspan;
    var strHtml = ``;

    var elHeader_colspan = document.querySelector('th');
    elHeader_colspan.colSpan = '' + length; // <th colspan="4"/"8"/"12">

    for (var i = 0; i < board.length; i++) {
        strHtml += `<tr>`;

        for (var j = 0; j < board[0].length; j++) {

            var innerText = ` `;

            if (board[i][j].isShown) {
                if (board[i][j].isMine) {
                    
                    innerText = `💣`
                } else if (+board[i][j].minesAroundCount) {
                    innerText = +board[i][j].minesAroundCount;
                } else {

                    innerText = ` `;
                }
            }
            var className = (board[i][j].isShown) ? `under-cell` : `cell`;
            var minesAroundCountColor = renderColor(+board[i][j].minesAroundCount);

            strHtml += `<td data-i="${i}" data-j="${j}"
            class="${className}" 
            style="color: ${minesAroundCountColor}; font-size: 1.2em;"           
            onclick="cellClick(this,${i},${j})">${innerText}</td>`
        }
        strHtml += `</tr>`;
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function revealContent(elCell, i, j) {  // left click functionality (+start timer !!);

    gBoard[i][j].isShown = true; // Update model; 
    elCell.classList.remove('.cell'); // Update DOM;
    renderBoard(gBoard);
}

function renderColor(minesAroundCount) {

    if (minesAroundCount === 1) return `blue`;
    if (minesAroundCount === 2) return `green`;
    if (minesAroundCount === 3) return `red`;
    if (minesAroundCount === 4) return `darkblue`;

}

function renderTimer() {

    if (!gInterval) {  // still first num, and internal stiil '0'!!

        gInterval = setInterval(setTime, 10); // min interval is 10 miliseconds!!
    }

}

function renderScore() {

    gScore += 10;
    var elScore = document.querySelector('.score');
    elScore.innerText = gScore;
}

function changeLevel(size, mines) {

    gLevel.size = size;
    gLevel.mines = mines;
    initGame();
}

function setMinesNegsCount(cellI, cellJ, mat) {

    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j] === MINE) negsCount++;
        }
    }

    return negsCount;
}

function buildBoard() {

    var board = gBoard;

    for (var i = 0; i < gLevel.size; i++) {

        for (var j = 0; j < gLevel.size; j++) {

            if (gMinesMat[i][j] === MINE) {

                board[i][j].isMine = true;
            } else {

                board[i][j].minesAroundCount = setMinesNegsCount(i, j, gMinesMat);
            }
        }
    }
    console.table(board);
}

function getMinesMat() {

    var minesMet = createMat();
    var count = 0;
    var rnd_i;
    var rnd_j;

    while (count < gLevel.mines) {

        rnd_i = getRandomInt(0, gLevel.size);
        rnd_j = getRandomInt(0, gLevel.size);
        if (minesMet[rnd_i][rnd_j] === MINE) {

            continue;
        } else {

            minesMet[rnd_i][rnd_j] = MINE;
            count++;
        }
    }

    gMinesMat = minesMet;
}

function createMat() {

    var mat = [];
    for (var i = 0; i < gLevel.size; i++) {

        mat[i] = [];
        for (var j = 0; j < gLevel.size; j++) {

            mat[i][j] = ` `;
        }
    }

    return mat;
}

function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}

function createBoard() {

    var board = [];
    var length = gLevel.size;

    for (var i = 0; i < length; i++) {
        board.push([])
        for (var j = 0; j < length; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell;
        }
    }
    console.log(board);
    return board;
}

// -------------------------------------------------------------------

function cellClick(elCell, cellI, cellJ) {

    renderScore();
    revealContent(elCell, cellI, cellJ);
    //check lives :
    // if (elCell.innerText === '💣' && !gLivesCount) {
    //     gameOver(false);
    //     return;
    // } else if (elCell.innerText === '💣') {
    //     gLivesCount--;
    // }
    // -------------------------

    // if (!gInterval) {  // still first num, and internal stiil '0'!!

    //     gInterval = setInterval(setTime, 10); // min interval is 10 miliseconds!!
    // }

    // **********************************************************************************************

//     var selectedNum = +elCell.innerText; // a must string to numeric!!

//     if (selectedNum === gCurrData) {

//         elCell.classList.add('.correct-num');
//         if (gCurrData < gLevel) {

//             gCurrData++;         // model
//             renderNextCellData();    // Dom
//         } else {

//             renderGameOver(true);
//         }
//     }
}                                                                       //    <<<----------

// *********************************************************************************************************

// Right click flags/unflags  --> toggle

// add toggle game btn

// ------------------------------------------------

function toggleGame(elBtn) {
    if (gGameInterval) {
        clearInterval(gGameInterval)
        gGameInterval = null;
        elBtn.innerText = 'Play';
    } else {
        gGameInterval = setInterval(play, GAME_FREQ);
        elBtn.innerText = 'Pause';
    }
}

function renderRightMouseClick() {
    cellClick(1);
}




