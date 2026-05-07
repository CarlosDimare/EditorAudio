class AudioEffect {
  constructor(audioContext) {
    this.ctx = audioContext;
    this.input = null;
    this.output = null;
  }

  connect(destination) {
    this.output.connect(destination);
  }

  disconnect() {
    this.output.disconnect();
  }
}

class Reverb extends AudioEffect {
  constructor(audioContext) {
    super(audioContext);
    this.input = this.ctx.createConvolver();
    this.output = this.input;
    this.wet = this.ctx.createGain();
    this.dry = this.ctx.createGain();
    this.mix = 0.5;
    
    this.loadImpulseResponse();
  }

  async loadImpulseResponse() {
    const response = await fetch('/reverb-ir.wav');
    const arrayBuffer = await response.arrayBuffer();
    this.input.buffer = await this.ctx.decodeAudioData(arrayBuffer);
  }

  setMix(value) {
    this.mix = value;
    this.wet.gain.value = value;
    this.dry.gain.value = 1 - value; 
  }
}

class Delay extends AudioEffect {
  constructor(audioContext) {
    super(audioContext);
    this.input = this.ctx.createDelay(5.0);
    this.feedback = this.ctx.createGain();
    this.output = this.ctx.createGain();

    this.input.connect(this.feedback);
    this.feedback.connect(this.input);
    this.input.connect(this.output);
  }

  setDelayTime(time) {
    this.input.delayTime.value = time;
  }

  setFeedback(value) {
    this.feedback.gain.value = value;
  }
}

class Compressor extends AudioEffect {
  constructor(audioContext) {
    super(audioContext);
    this.input = this.ctx.createDynamicsCompressor();
    this.output = this.input;
  }

  setThreshold(value) {
    this.input.threshold.value = value;
  }

  setRatio(value) {
    this.input.ratio.value = value; 
  }
}

class Equalizer extends AudioEffect {
  constructor(audioContext) {
    super(audioContext);
    this.bands = [];
    
    const frequencies = [60, 170, 350, 1000, 3500, 10000];
    frequencies.forEach(freq => {
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'peaking';
      filter.frequency.value = freq;
      filter.Q.value = 1;
      this.bands.push(filter);
    });

    // Connect filters in series
    for(let i = 0; i < this.bands.length - 1; i++) {
      this.bands[i].connect(this.bands[i + 1]);
    }

    this.input = this.bands[0];
    this.output = this.bands[this.bands.length - 1];
  }

  setBand(index, gain) {
    if (index >= 0 && index < this.bands.length) {
      this.bands[index].gain.value = gain;
    }
  }
}