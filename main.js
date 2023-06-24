
let sounds = [];
let pitches = [195.555, 293.333, 440, 660];
let displayError = false;
let semitone = 1.059463;

function setup() {
    let violinSeries = [10, 6, 6, 7, 3.5, 2, 3.5, 1];
    let series = [10, 8, 6, 4, 5, 6, 4, 2, 1, 1]
    for (var i=0; i<4; i++) {
        sounds.push( new OscSeries(violinSeries) );
    }
}

function toggleSound(i) {
    let playing = sounds[i].toggle(pitches[i]);
    if (playing) {
        document.getElementById(i).classList.add("pressed");
    } else {
        document.getElementById(i).classList.remove("pressed");
    }   
}

function changePitch(i, sharp) {
    let inc = 1.001;
    let factor = sharp ? inc : 1/inc;
    pitches[i] *= factor;
    sounds[i].setFreqs(pitches[i]);
}

function update() {
    for (var i=0; i<sounds.length; i++) {
        if (sounds[i].playing) {
            sounds[i].setFreqs(pitches[i]);
        }
    }
}

function detune() {
    for (var i=0; i<pitches.length; i++) {
        let factor = 1 - 0.02 * Math.random();
        pitches[i] *= factor
    }
    update();
}

function tune() {
    pitches = [195.555, 293.333, 440, 660]
    update();
}

function tuneA() {
    pitches[2] = 440;
    sounds[2].setFreqs(pitches[2]);
}

function showError() {
    displayError = !displayError;
    if (!displayError) {
        for (var i=0; i<pitches.length-1; i++) {
            document.getElementById("Err"+i).innerHTML = "";
        }
    }
}

function draw() {
    if (displayError) {
        for (var i=0; i<pitches.length-1; i++) {
            val = pitches[i+1]/pitches[i]
            val = Math.log(val) / Math.log(semitone);
            val -= 7.02
            document.getElementById("Err"+i).innerHTML = (String) (val.toFixed(2));
        }
    }
}