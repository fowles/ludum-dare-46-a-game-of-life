const updateIntervalMs = 20;
const boardWidth = 50;
const boardHeight = 40;
const cellSize = 15;
let board = new Board(boardWidth, boardHeight);
const canvas = document.getElementById('c').getContext('2d');

document.getElementById('c').width = window.innerWidth;
document.getElementById('c').height = window.innerHeight;

let player = {x: 16, y: 8};

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
  board.draw({canvas: canvas, cellSize: cellSize});
  setTimeout(run, updateIntervalMs);
}

initKeyListener({
  37: () => {
    const newPos = {x: Math.max(player.x - 1, 0), y: player.y};
    if (board.at(newPos.x, newPos.y).type != CellType.NORMAL) return;
    board.setType(player.x, player.y, CellType.NORMAL);
    player = newPos;
    board.setType(player.x, player.y, CellType.PLAYER);
  },
  38: () => {
    const newPos = {x: player.x, y: Math.max(player.y - 1, 0)};
    if (board.at(newPos.x, newPos.y).type != CellType.NORMAL) return;
    board.setType(player.x, player.y, CellType.NORMAL);
    player = newPos;
    board.setType(player.x, player.y, CellType.PLAYER);
  },
  39: () => {
    const newPos = {x: Math.min(player.x + 1, boardWidth - 1), y: player.y};
    if (board.at(newPos.x, newPos.y).type != CellType.NORMAL) return;
    board.setType(player.x, player.y, CellType.NORMAL);
    player = newPos;
    board.setType(player.x, player.y, CellType.PLAYER);
  },
  40: () => {
    const newPos = {x: player.x, y: Math.min(player.y + 1, boardHeight - 1)};
    if (board.at(newPos.x, newPos.y).type != CellType.NORMAL) return;
    board.setType(player.x, player.y, CellType.NORMAL);
    player = newPos;
    board.setType(player.x, player.y, CellType.PLAYER);
  }
});

init();
run();
