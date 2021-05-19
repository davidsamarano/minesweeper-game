'use strict'




// render timer

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


// render int
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
