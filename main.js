const updateIntervalMs = 20;
let cellSize = 0;
let board;

const htmlCanvas = document.getElementById('c');
htmlCanvas.width = window.innerWidth * 0.8;
htmlCanvas.height = window.innerWidth * 0.8;

const canvas = htmlCanvas.getContext('2d');

function draw() {
  canvas.clearRect(0, 0, htmlCanvas.width, htmlCanvas.height);
  board.draw({canvas: canvas, cellSize: cellSize});
}

let player = {x: 16, y: 8};
let playerVelocity = {x: 0, y: 0};

const State = {
  PLAYING: 0,
  LOST: 1,
  WON: 2,
  RESTARTING: 3,
};
let gameState = State.RESTARTING;

function setCellSize() {
  htmlCanvas.width = window.innerWidth * 0.8;
  htmlCanvas.height = window.innerHeight * 0.8;
  cellSize = Math.floor(Math.min(
      htmlCanvas.width / board.width, htmlCanvas.height / board.height));
  draw();
}

function init() {
  window.addEventListener('resize', setCellSize);
  gameState = State.RESTARTING;
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function run() {
  switch (gameState) {
    case State.PLAYING:
      break;
    case State.RESTARTING:
      restartGame();
      return;
    case State.WON:
      console.log('You won.');
      return;
    case State.LOST:
      console.log('You lost.');
      return;
  }

  board.update();

  // Check player new position after the board has been updated but before
  // drawing.
  const newPos = {
    x: clamp(player.x + playerVelocity.x, 0, board.width- 1),
    y: clamp(player.y + playerVelocity.y, 0, board.height - 1)
  };
  if (!blocksPlayer(board.at(newPos.x, newPos.y).type)) {
    board.set(player.x, player.y, new Cell(false, CellType.NORMAL));
    player = newPos;
    board.set(player.x, player.y, new Cell(true, CellType.PLAYER));
  }

  draw();
  setTimeout(run, updateIntervalMs);
}

function restartGame() {
  const level = new Level([
    '                                          *       ',
    '                         .                *       ',
    '                       . .                *       ',
    '             ..      ..            .A     *       ',
    '            .   .    ..            .A     *       ',
    ' A.        .     .   ..                   *       ',
    ' A.        .   . ..    . .                *       ',
    '           .     .       .                *       ',
    '            .   .                         *       ',
    '             ..                           *       ',
    '                                          *       ',
    '                                          *       ',
    '                                          *       ',
    '                                          *       ',
    '*********************               *******       ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '       E                                          ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '        *                                         ',
    '       * *                                        ',
    '      *...*                                       ',
    '       * *                                        ',
    '        *      ************                       ',
    '               WWWWWWWWWWWW                       ',
    '                                                  ',
    '               WWWWWWWWWWWW                       ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '               ************                       ',
    '        **********                                ',
    '        WWWWWWWWWW                                ',
    '            P                                     ',
    '        WWWWWWWWWW                                ',
    '        **********                                ',
    '                                                  ',
    '                                                  ',
  ]);
  board = level.makeBoard();
  setCellSize();
  player = level.getPlayer();
  gameState = State.PLAYING;
  setTimeout(run, 0);
}

initKeyListener({
  37: {
    keydown: () => {
      playerVelocity = {x: -1, y: 0};
    },
    keyup: () => {
      playerVelocity = {x: 0, y: 0};
    },
  },
  38: {
    keydown: () => {
      playerVelocity = {x: 0, y: -1};
    },
    keyup: () => {
      playerVelocity = {x: 0, y: 0};
    },
  },
  39: {
    keydown: () => {
      playerVelocity = {x: 1, y: 0};
    },
    keyup: () => {
      playerVelocity = {x: 0, y: 0};
    },
  },
  40: {
    keydown: () => {
      playerVelocity = {x: 0, y: 1};
    },
    keyup: () => {
      playerVelocity = {x: 0, y: 0};
    },
  },
  78: {
    keydown: restartGame,
  },
});

init();
run();
