'use strict'

const MINE = `💣`;

var gLivesCount;  
console.log('gLivesCount: ', gLivesCount);


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
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
    gBoard = createBoard();

    var elSmily = document.querySelector('.smily-start');
    elSmily.innerHTML = `😃`;

    gLivesCount = 3;
    var elLives = document.querySelector('.lives');
    elLives.innerHTML = renderLifeEmoji();

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

            if (board[i][j].isMarked) {

                innerText = `🚩`;
            } else if (board[i][j].isShown) {

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
            style="color: ${minesAroundCountColor};"           
            onclick="cellClicked(this,${i},${j})">${innerText}</td>`
        }
        strHtml += `</tr>`;
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function renderColor(minesAroundCount) {

    switch (minesAroundCount) {
        case 1:
            return `blue`;
        case 2:
            return `green`;
        case 3:
            return `red`;
        case 4:
            return `darkblue`;
        case 5:
            return `rgb(93, 62, 122)`;
        case 6:
            return `blueviolet`;
        case 7:
            return `yellow`;
        case 8:
            return `brown`;
    }
}
function renderLifeEmoji() {


    console.log('emoji: ', gLivesCount);

    switch (gLivesCount) {
        case 3:
            return `❤❤❤`;
        case 2:
            return `❤❤`;
        case 1:
            return `❤`;
        case 0:
            return ` `;
    }
}

function renderTimer() {

    if (gGame.isOn) {

        if (!gInterval) {  // still first num, and internal stiil '0'!!

            gInterval = setInterval(setTime, 10); // min interval is 10 miliseconds!!
        }
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


function cellClicked(elCell, cellI, cellJ) {

    if (gGame.isOn) {

        revealContent(elCell, cellI, cellJ);
        renderScore();
        renderTimer();

        // check lives :
        if (elCell.innerText === '💣' && gLivesCount === 0) {
            gameOver(false);
            return;
        } else if (elCell.innerText === '💣') {

            gLivesCount--;
            console.log('gLivesCount: ', gLivesCount);
        }

    }

    if (selectedNum === gCurrData) {

        if (gCurrData < gLevel) {

            gCurrData++;         // model
            renderNextCellData();    // Dom
        } else {

            renderGameOver(true);
        }
    }
}                                                                       //    <<<----------

function renderRightMouseClick() {
    cellClicked(1);
}

function cellMarked(elCell) {   //Called on right click to mark a cell (suspected to be a mine)

    gGame.markedCount++;
}

function revealContent(elCell, i, j) {  // left click functionality (+start timer !!);

    gBoard[i][j].isShown = true; // Update model; 
    elCell.classList.remove('.cell'); // Update DOM;
    renderBoard(gBoard);
}

function gameOver(isVictory) {

    stopTime();
    gGame.isOn = false;
    var elSmily = document.querySelector('.smily-start');
    elSmily.innerHTML = isVictory ? `😎` : `🤯`;
}



