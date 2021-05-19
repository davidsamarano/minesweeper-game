'use strict'

//chach left and right click, ride on celll click

function WhichButton(event) {
    if(event.button===1||event.button===2) cellClick(); // right click functionize;
    if(event.button===2) cellClick(); // left click functionize
    
  }

// render timer
// --------------------------
function setTime() {

    gTime++;
    displayTime(gTime);
}

function displayTime(timeInterval) {

    var elTimer = document.querySelector('.timer');

    var miliSeconds_Str = '' + parseInt(timeInterval % 100);    // 1-100
    var seconds_Str = '' + parseInt(timeInterval/100% 60);     // 1-60 only after reached 100 seconds!!
    var minutes_Str = '' + parseInt(timeInterval/100/60);

    elTimer.innerText =`${minutes_Str.padStart(2,'0')}:${seconds_Str.padStart(2,'0')}:${miliSeconds_Str.padStart(2,'0')}`;
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
// ---------------------------

// render int
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
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

