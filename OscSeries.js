
class OscSeries {
    constructor(amps) {
        this.playing = false;
        this.oscs = [];
        for (var i=0; i<amps.length; i++) {
            this.oscs.push( new p5.Oscillator('sine') );
            this.oscs[i].amp(amps[i] / 10.);
        }
    }

    toggle(fundFreq) {
        if (!this.playing) {
            for (var i=0; i<this.oscs.length; i++) {
                this.oscs[i].freq(i * fundFreq);
                this.oscs[i].start();
            }
        } else {
            for (var i=0; i<this.oscs.length; i++) {this.oscs[i].stop();}
        }
        this.playing = !this.playing;
        return this.playing;
    }

    setFreqs(fundFreq) {
        for (var i=0; i<this.oscs.length; i++) {
            this.oscs[i].freq(i * fundFreq);
        }
    }
    


}