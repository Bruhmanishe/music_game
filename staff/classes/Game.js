class Game {
  constructor({ canvas, ctx, controls }) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.controls = controls;
    this.joystick = new Joystick({ canvas, ctx, controls, game: this });
    this.player = new Player({ ctx, canvas, speed: 5, game: this });
    this.enemies = [];
    this.buffersAboveMin = 1;
    this.framesCounter = 0;
    this.secondToFrames = 60;
  }

  update({ dataArray, analyser }) {
    this.player.update(this.controls);
    this.enemies = this.enemies.filter((enemy) => {
      enemy.update();
      if (enemy.HP > 0) {
        return enemy;
      } else {
        this.player.heart >= 255
          ? (this.player.heart = 255)
          : this.player.heart++;
      }
    });
    this.joystick.update();

    if (dataArray) {
      analyser.getByteFrequencyData(dataArray);
      const bufferWidth = 10;
      let x = 0;
      for (let i = 0; dataArray.length / 2 > i; i++) {
        if (dataArray[i] > 150) {
          this.buffersAboveMin++;
        }
        ctx.beginPath();
        if (this.player.HP * 1.6 > i) {
          ctx.fillStyle = "red";
        } else {
          ctx.fillStyle = "white";
        }
        ctx.rect(x, canvas.height, bufferWidth, -dataArray[i] / 5);
        ctx.fill();
        x += bufferWidth + 1;
      }
      if (this.buffersAboveMin > 15) {
        this.player.updateProjectiles(this.buffersAboveMin);
        this.#createEnemies();
      }
      this.buffersAboveMin = 1;
    }

    //frames counter
    this.framesCounter > this.secondToFrames
      ? (this.framesCounter = 0)
      : this.framesCounter++;
  }

  draw() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.rect(0, 0, canvas.width, canvas.height);
    this.ctx.fill();
    this.player.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.joystick.draw();
  }

  #createEnemies() {
    this.enemies.push(
      new Enemy({
        game: this,
        ctx: this.ctx,
        canvas: this.canvas,
        speed: 4,
        radius: 5,
      })
    );
  }
}
