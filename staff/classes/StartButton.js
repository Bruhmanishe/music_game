class StartButton {
  constructor({ ctx, canvas, game }) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = this.canvas.width / 5;
    this.height = this.canvas.height / 5;
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height / 2 - this.height / 2;

    this.canvas.addEventListener("touchstart", (e) => {
      if (this.game.startButton) {
        if (
          e.touches[0].clientX > this.x &&
          e.touches[0].clientX < this.x + this.width &&
          e.touches[0].clientY > this.y &&
          e.touches[0].clientY < this.y + this.height
        ) {
          document.getElementById("songInput").click();
        }
      }
    });

    document.getElementById("songInput").onchange = () => {
      const files = document.getElementById("songInput").files;
      audio.src = URL.createObjectURL(files[0]);
      console.log(audio);
      audio.load();
      audio.crossOrigin = "anonymous";
      audio.play();
      const audioCtx = new AudioContext();

      audioSource = audioCtx.createMediaElementSource(audio);
      analyser = audioCtx.createAnalyser();
      audioSource.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 64;

      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      this.isGameStarted = true;
      this.game.startButton = null;
    };
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "blue";
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.font = "24px serif";
    this.ctx.fillText(
      "CHOOSE YOUR SONG",
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }

  update() {}
}
