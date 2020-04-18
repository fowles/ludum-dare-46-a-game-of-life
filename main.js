let updateIntervalMs = 40;
let cellSize = 0;
let board;

let canvasWidth = window.innerWidth * 0.8;
let canvasHeight = window.innerHeight * 0.8;

const htmlCanvas = document.getElementById('c');
htmlCanvas.width = canvasWidth;
htmlCanvas.height = canvasHeight;
const canvas = htmlCanvas.getContext('2d');

const htmlOverlay = document.getElementById('overlay')
htmlOverlay.width = canvasWidth;
htmlOverlay.height = canvasHeight;
const overlay = htmlOverlay.getContext('2d');

function draw() {
  canvas.clearRect(0, 0, htmlCanvas.width, htmlCanvas.height);
  board.draw({canvas: canvas, overlay: overlay, cellSize: cellSize});
}

let playerVelocity = {x: 0, y: 0};
let currentLevelIndex = 1;

const State = {
  PLAYING: 0,
  LOST: 1,
  WON: 2,
  RESTARTING: 3,
};
let gameState = State.RESTARTING;

function setCellSize() {
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;
  htmlCanvas.width = canvasWidth;
  htmlCanvas.height = canvasHeight;
  htmlOverlay.width = canvasWidth;
  htmlOverlay.height = canvasHeight;

  cellSize = Math.floor(Math.min(
      htmlCanvas.width / board.width, htmlCanvas.height / board.height));
  draw();
}

function init() {
  window.addEventListener('resize', setCellSize);
  gameState = State.RESTARTING;
}

function run() {
  switch (gameState) {
    case State.PLAYING:
      break;
    case State.RESTARTING:
      restartGame(currentLevelIndex);
      return;
    case State.WON:
      console.log('You won.');
      return;
    case State.LOST:
      console.log('You lost.');
      return;
  }

  board.update();
  board.movePlayer(playerVelocity)
  draw();
  setTimeout(run, updateIntervalMs);
}

function restartGame(levelIndex) {
  board = levels[levelIndex].makeBoard();
  setCellSize();
  board.warpPlayer(levels[levelIndex].getPlayer());
  gameState = State.PLAYING;
  setTimeout(run, 0);
}

function stop() {
  playerVelocity = {x: 0, y: 0};
};

initKeyListener({
  37: {
    keydown: () => {
      playerVelocity = {x: -1, y: 0};
    },
    keyup: stop,
  },
  38: {
    keydown: () => {
      playerVelocity = {x: 0, y: -1};
    },
    keyup: stop,
  },
  39: {
    keydown: () => {
      playerVelocity = {x: 1, y: 0};
    },
    keyup: stop,
  },
  40: {
    keydown: () => {
      playerVelocity = {x: 0, y: 1};
    },
    keyup: stop,
  },
  78: {
    keydown: () => {
      restartGame(currentLevelIndex);
    },
  },

  // '+'
  187: {
    keydown: () => {
      updateIntervalMs /= 2;
    }
  },
  // '-'
  189: {
    keydown: () => {
      updateIntervalMs *= 2;
    }
  },
  // '\'
  220: {
    keydown: () => {
      const newUpdate = window.prompt(
          'New Update interval in milliseconds (currently ' + updateIntervalMs +
          'ms)');
      if (newUpdate) updateIntervalMs = newUpdate;
    }
  },
  // 'l'
  76: {
    keydown: () => {
      const newLevelIndex =
          window.prompt('Go to level (current ' + currentLevelIndex + ')');
      if (newLevelIndex !== null) {
        const levelChange = (newLevelIndex != currentLevelIndex);
        currentLevelIndex = newLevelIndex;
        if (levelChange) restartGame(currentLevelIndex);
      }
    }
  },


});

init();
run();
