class Sound {
  constructor(x, y){
    this.soundFile = loadSound('assets/alive1.mp3');
    this.x = x;
    this.y = y;
    this.playing = false;
  }

  startLoop() {
    if (!this.playing) {
      this.playing = true;
      this.soundFile.loop(random(0,2), random(0.3,1.3), 1);
    }
  }

  stopLoop() {
    if (this.playing) {
      this.playing = false;
      this.soundFile.stop();
    }
  }
}
