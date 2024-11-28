class Player {
  constructor({ ctx, canvas, speed, game }) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas;
    this.radius =
      this.canvas.width > this.canvas.height
        ? this.canvas.width * 0.015
        : this.canvas.height * 0.015;
    this.speed = speed;
    this.siundData = dataArray;
    this.projectiles = [];
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.HP = 10;
    this.heart = 0;
    this.healthTime = 4;
    this.timeCounter = 0;
  }

  updateProjectiles(bufferLength) {
    // if (dataArray) {
    //   for (let i = 0; dataArray.length > i; i++) {
    //     if (dataArray[i] > 230) {
    //       this.projectiles.push(
    //         new Projectile({
    //           canvas: this.canvas,
    //           ctx: this.ctx,
    //           x: this.x,
    //           y: this.y,
    //           radius: dataArray[i] / 15,
    //           velocity: dataArray[i] * 0.001,
    //           dirX: Math.random() * (1 - -1) + -1,
    //           dirY: Math.random() * (1 - -1) + -1,
    //         })
    //       );
    //     }
    //     return;
    //   }
    // }
    this.projectiles.push(
      new Projectile({
        canvas: this.canvas,
        ctx: this.ctx,
        x: this.x,
        y: this.y,
        radius: bufferLength / 2,
        velocity: bufferLength * 0.5,
        dirX: Math.random() * (1 - -1) + -1,
        dirY: Math.random() * (1 - -1) + -1,
      })
    );
  }

  update({ up, down, left, right }) {
    if (up === true) {
      this.y -= this.speed;
    }
    if (down === true) {
      this.y += this.speed;
    }
    if (left === true) {
      this.x -= this.speed;
    }
    if (right === true) {
      this.x += this.speed;
    }

    for (let i = 0; this.projectiles.length > i; i++) {
      this.projectiles[i].update();
      if (this.projectiles[i].isDestroy) {
        this.projectiles.splice(i, 1);
      }
    }

    //Heal
    if (
      this.game.framesCounter === this.game.secondToFrames &&
      this.healthTime > 0
    ) {
      this.timeCounter++;
      if (this.timeCounter === this.healthTime) {
        this.HP < 10 ? (this.HP += 0.02) : (this.HP = 10);
        this.timeCounter = 0;
        console.log(this.HP);
      }
    }
  }

  draw() {
    this.projectiles.forEach((el) => el.draw());

    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${255}, ${255 - this.heart}, ${
      255 - this.heart
    }, 1)`;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fill();
  }
}
