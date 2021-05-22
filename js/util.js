'use strict'

//chach left and right click, ride on celll click

// function WhichButton(event) {

//     if (event.button) renderRightMouseClick();     // cellClick(); // right click functionize;   same as: event.button===0;
//     if (event.button === 2) renderLeftMouseClick();  // cellClick(); // left click functionize;
// }

// ----------------------------------

// Add the event listeners for mousedown ,and prevent default window to appeare
const myClick = document.getElementById('myClick');

myClick.addEventListener('mousedown', e => {
    
    renderTimer();
    if (document.addEventListener) {
        
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();   // preventing defult window to appeare
        }, false);
    }
});

// renderFunctionality

// var cell = document.querySelector('td .cell');
// let log = document.querySelector('#log');
// button.addEventListener('mouseup', logMouseButton);

// function logMouseButton(e) {
//   if (typeof e === 'object') {
//     switch (e.cell) {
//       case 0:
//         cell.innerText = '🚩';
//         break;
//       case 1:
//         log.textContent = 'Middle button clicked.';
//         break;
//       case 2:
//         log.textContent = 'Right button clicked.';
//         break;
//       default:
//         log.textContent = `Unknown button code: ${e.button}`;
//     }
//   }
// }

// const myClick = document.getElementById('myClick');

// myClick.addEventListener('mousedown', e => {

//     cellClick(1);
//     if (document.addEventListener) {

//         document.addEventListener('contextmenu', function (e) {
//             e.preventDefault();   // preventing defult window to appeare
//         }, false);
//     }
// });

// • Left click reveals the cell’s content

// • Right click flags/unflags a suspected cell (you cannot reveal a flagged cell)

// ---------------------------------------------------------------------------

// render timer
// --------------------------
function setTime() {

    gTime++;
    displayTime(gTime);
}

function displayTime(timeInterval) {

    var elTimer = document.querySelector('.timer');

    var miliSeconds_Str = '' + parseInt(timeInterval % 100);    // 1-100
    var seconds_Str = '' + parseInt(timeInterval / 100 % 60);     // 1-60 only after reached 100 seconds!!
    var minutes_Str = '' + parseInt(timeInterval / 100 / 60);

    elTimer.innerText = `${minutes_Str.padStart(2, '0')}:${seconds_Str.padStart(2, '0')}:${miliSeconds_Str.padStart(2, '0')}`;
}

function stopTime() {

    if (gInterval) {

        clearInterval(gInterval);
        gInterval = null;
    }
}

function restTime() {

    gTime = 0;  // Update model;
    var elTime = document.querySelector('.timer'); // Update DOM;
    elTime.innerText = '00:00:00';
}

function restTime() {

    gTime = 0;  // Update model;
    var elTime = document.querySelector('.timer'); // Update DOM;
    elTime.innerText = '00:00:00';
}

// ---------------------------

function restScore() {

    gScore = 0;  // Update model;
    var elScore = document.querySelector('.score'); // Update DOM;
    elScore.innerText = '00';
}

// render int
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max - min) + min);
}

// shuffle data
function shuffle(cells) {

    var rndCells = [];
    while (cells.length > 0) {

        var rndIdx = getRandomInt(0, cells.length);
        rndCells.push(cells.splice(rndIdx, 1));    //  push to rndNums than remove from nums
    }

    return rndCells;
}

function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}

function gameOver(isVictory) {

    stopTime();

    var elSmily = document.querySelector('.smily-start');
    elSmily.innerHTML = isVictory ? `😎` : `🤯`;
}






