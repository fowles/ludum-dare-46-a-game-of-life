const updateIntervalMs = 20;
const boardWidth = 50;
const boardHeight = 40;
const cellSize = 12;
let board = new Board(boardWidth, boardHeight);
const canvas = document.getElementById('c').getContext('2d');

document.getElementById('c').width = window.innerWidth;
document.getElementById('c').height = window.innerHeight;

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

let player = {x: 16, y: 8};
let playerVelocity = {x: 0, y: 0};

function init() {
  const level = new Level([
    '                                          *       ',
    '                         .                *       ',
    '                       . .                *       ',
    '             ..      ..            ..     *       ',
    '            .   .    ..            ..     *       ',
    ' ..        .     .   ..                   *       ',
    ' ..        .   . ..    . .                *       ',
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
    '            P                                     ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
    '                                                  ',
  ]);
  board = level.makeBoard();
  player = level.getPlayer();
}

function run() {
  board.update();

  // Check player new position after the board has been updated but before
  // drawing.
  const newPos = {
    x: clamp(player.x + playerVelocity.x, 0, boardWidth - 1),
    y: clamp(player.y + playerVelocity.y, 0, boardHeight - 1)
  };
  if (board.at(newPos.x, newPos.y).type == CellType.NORMAL) {
    board.set(player.x, player.y, new Cell(false, CellType.NORMAL));
    player = newPos;
    board.set(player.x, player.y, new Cell(true, CellType.PLAYER));
  }

  board.draw({canvas: canvas, cellSize: cellSize});
  setTimeout(run, updateIntervalMs);
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
      console.log("x");
      playerVelocity = {x: 0, y: 1};
    },
    keyup: () => {
      console.log("y");
      playerVelocity = {x: 0, y: 0};
    },
  },
});

init();
run();
