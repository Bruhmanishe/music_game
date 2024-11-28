const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const resolutions = {
  hd: { width: 1280, height: 720 },
  fullHd: { width: 1920, height: 1080 },
};

const audio = document.getElementById("songPerSe");
audio.crossOrigin = "anonymous";
let audioSource;
let analyser;
let dataArray;
let controls = {
  up: false,
  down: false,
  left: false,
  right: false,
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fill();

window.onload = () => {
  const game = new Game({ canvas, ctx, controls });

  function animate() {
    game.update({ dataArray, analyser });
    game.draw();

    // ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    // ctx.rect(0, 0, canvas.width, canvas.height);
    // ctx.fill();
    // player.update(constrols);
    // player.draw();
    requestAnimationFrame(animate);

    // if (dataArray) {
    //   analyser.getByteFrequencyData(dataArray);
    //   const bufferWidth = 10;
    //   let x = 0;
    //   for (let i = 0; dataArray.length / 2 > i; i++) {
    //     if (dataArray[i] > 150) {
    //       buffersAboveMin++;
    //     }
    //     ctx.beginPath();
    //     ctx.fillStyle = "white";
    //     ctx.rect(x, canvas.height, bufferWidth, -dataArray[i] / 5);
    //     ctx.fill();
    //     x += bufferWidth + 1;
    //   }
    //   if (buffersAboveMin > 15) {
    //     player.updateProjectiles(buffersAboveMin);
    //   }
    //   buffersAboveMin = 1;
    //   console.log(dataArray);
    // }
  }

  window.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
      audio.play();
      const audioCtx = new AudioContext();

      audioSource = audioCtx.createMediaElementSource(audio);
      analyser = audioCtx.createAnalyser();
      audioSource.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 64;

      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
    }

    switch (e.keyCode) {
      case 87:
        controls.up = true;
        break;
      case 83:
        controls.down = true;
        break;
      case 68:
        controls.right = true;
        break;
      case 65:
        controls.left = true;
        break;
    }
  });
  window.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 87:
        controls.up = false;
        break;
      case 83:
        controls.down = false;
        break;
      case 68:
        controls.right = false;
        break;
      case 65:
        controls.left = false;
        break;
    }
  });

  animate();
};
