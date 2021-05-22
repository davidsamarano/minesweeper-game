'use strict'

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

// shuffle data
function shuffle(cells) {

    var rndCells = [];
    while (cells.length > 0) {

        var rndIdx = getRandomInt(0, cells.length);
        rndCells.push(cells.splice(rndIdx, 1));    //  push to rndNums than remove from nums
    }

    return rndCells;
}






