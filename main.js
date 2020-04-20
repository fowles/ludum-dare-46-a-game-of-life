let updateIntervalMs = 40;
let cellSize = 0;
let board;

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight - 100;

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
  const ctx = {canvas: canvas, overlay: overlay, cellSize: cellSize};
  board.draw(ctx);
  for (const text of levels[currentLevelIndex].textArray) {
    text.draw(ctx);
  }
}

let playerVelocity = {x: 0, y: 0};
let singleStep = false;
let currentLevelIndex = 1;

const State = {
  PLAYING: 0,
  LOST: 1,
  WON: 2,
  RESTARTING: 3,
};
let gameState = State.RESTARTING;

function updateCanvas() {
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight - 100;

  const _update = (c, cHtml) => {
    c.width = canvasWidth;
    c.height = canvasHeight;
    cHtml.width = canvasWidth;
    cHtml.height = canvasHeight;
  }
  _update(canvas, htmlCanvas);
  _update(overlay, htmlOverlay);

  cellSize = Math.floor(
      Math.min(canvasWidth / board.width, canvasHeight / board.height));
  draw();
}

function init() {
  window.addEventListener('resize', updateCanvas);
  gameState = State.RESTARTING;
}

let isRunning = true;
function run() {
  switch (gameState) {
    case State.PLAYING:
      board.update();
      board.movePlayer(playerVelocity);
      if (singleStep) playerVelocity = {x: 0, y: 0};
      draw();
      setTimeout(run, updateIntervalMs);
      return;
    case State.RESTARTING:
      isRunning = false;
      setTimeout(() => restartGame(currentLevelIndex), 0);
      return;
    case State.WON:
      isRunning = false;
      return;
    case State.LOST:
      isRunning = false;
      return;
  }
}

function restartGame(levelIndex) {
  const level = levels[levelIndex];
  board = level.makeBoard();
  updateCanvas();
  updateIntervalMs = level.updateInterval;
  board.warpPlayer(level.getPlayer());
  gameState = State.PLAYING;
  isRunning = true;
  setTimeout(run, 0);
}

let keyUpArrow = (modified) => {
  playerVelocity = {x: 0, y: -1};
  singleStep = modified;
};
let keyDownArrow = (modified) => {
  playerVelocity = {x: 0, y: 1};
  singleStep = modified;
};
let keyReleaseVertical = () => {
  playerVelocity.y = 0
};

let keyLeftArrow = (modified) => {
  playerVelocity = {x: -1, y: 0};
  singleStep = modified;
};
let keyRightArrow = (modified) => {
  playerVelocity = {x: 1, y: 0};
  singleStep = modified;
};
let keyReleaseHorizontal = () => {
  playerVelocity.x = 0
};

initKeyListener({
  37: { // arrow left
    keydown: keyLeftArrow,
    keyup: keyReleaseHorizontal,
  },
  65: { // 'a'
    keydown: keyLeftArrow,
    keyup: keyReleaseHorizontal,
  },
  38: { // arrow up
    keydown: keyUpArrow,
    keyup: keyReleaseVertical,
  },
  87: { // 'w'
    keydown: keyUpArrow,
    keyup: keyReleaseVertical,
  },
  39: {  // arrow right
    keydown: keyRightArrow,
    keyup: keyReleaseHorizontal,
  },
  68: {  // 'd'
    keydown: keyRightArrow,
    keyup: keyReleaseHorizontal,
  },
  40: { // arrow down
    keydown: keyDownArrow,
    keyup: keyReleaseVertical,
  },
  83: { // arrow down
    keydown: keyDownArrow,
    keyup: keyReleaseVertical,
  },
  // 'n'
  78: {
    keydown: () => {
      const wasRunning = (gameState == State.PLAYING);
      if (gameState == State.WON) {
        currentLevelIndex = currentLevelIndex + 1;
      }
      gameState = State.RESTARTING;
      if (!isRunning) run();
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
      if (newLevelIndex !== null && newLevelIndex > 0) {
        const levelChange = (newLevelIndex != currentLevelIndex);
        currentLevelIndex = parseInt(newLevelIndex);
        if (levelChange) {
          gameState = State.RESTARTING;
          if (!isRunning) run();
        }
      }
    }
  },
});

init();
run();
