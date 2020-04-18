const updateIntervalMs = 200;
const boardWidth = 50;
const boardHeight = 40;
const cellSize = 15;
const board = new Board(boardWidth, boardHeight);
const canvas = document.getElementById('c').getContext('2d');

document.getElementById('c').width = window.innerWidth;
document.getElementById('c').height = window.innerHeight;


let player = {x: 16, y: 8};

/**
 * Initialize game.
 *
 * Will place a Gosper glider gun in the world and start simulation.
 */
function init() {
  // Prefilled cells
  /*[
      // Gosper glider gun
      [1, 5],
      [1, 6],
      [2, 5],
      [2, 6],
      [11, 5],
      [11, 6],
      [11, 7],
      [12, 4],
      [12, 8],
      [13, 3],
      [13, 9],
      [14, 3],
      [14, 9],
      [15, 6],
      [16, 4],
      [16, 8],
      [17, 5],
      [17, 6],
      [17, 7],
      [18, 6],
      [21, 3],
      [21, 4],
      [21, 5],
      [22, 3],
      [22, 4],
      [22, 5],
      [23, 2],
      [23, 6],
      [25, 1],
      [25, 2],
      [25, 6],
      [25, 7],
      [35, 3],
      [35, 4],
      [36, 3],
      [36, 4],

      // Random cells
      // If you wait enough time these will eventually take part
      // in destroying the glider gun, and the simulation will be in a "static"
      // state.
      // [60, 47],
      // [61, 47],
      // [62, 47],
      // [60, 48],
      // [61, 48],
      // [62, 48],
      // [60, 49],
      // [61, 49],
      // [62, 49],
      // [60, 51],
      // [61, 51],
      // [62, 51],
  ].forEach((point) => {
    board.set(point[0], point[1] , new Cell(true));
  });
      */

  board.set(player.x, player.y, new Cell(true, CellType.PLAYER));

  for (let i = 5; i < 10; ++i) {
    board.set(i, 13, new Cell(true, CellType.WALL));
    board.set(i, 15, new Cell(true, CellType.WALL));
  }

  for (let i = 12; i < 30; ++i) {
    board.set(i, 13, new Cell(true, CellType.WALL));
    board.set(i, 15, new Cell(true, CellType.WALL));
  }
}

function run() {
  board.update();
  board.draw({canvas: canvas, cellSize: cellSize});
  setTimeout(run, updateIntervalMs);
}

initKeyListener({
  37: () => {
    const newPos = {x: Math.max(player.x - 1, 0), y: player.y};
    if (board.at(newPos.x, newPos.y).type == CellType.WALL) return;
    board.setType(player.x, player.y, CellType.NORMAL);
    player = newPos;
    board.setType(player.x, player.y, CellType.PLAYER);
  },
  38: () => {
    const newPos = {x: player.x, y: Math.max(player.y - 1, 0)};
    if (board.at(newPos.x, newPos.y).type == CellType.WALL) return;
    board.setType(player.x, player.y, CellType.NORMAL);
    player = newPos;
    board.setType(player.x, player.y, CellType.PLAYER);
  },
  39: () => {
    const newPos = {x: Math.min(player.x + 1, boardWidth - 1), y: player.y};
    if (board.at(newPos.x, newPos.y).type == CellType.WALL) return;
    board.setType(player.x, player.y, CellType.NORMAL);
    player = newPos;
    board.setType(player.x, player.y, CellType.PLAYER);
  },
  40: () => {
    const newPos = {x: player.x, y: Math.min(player.y + 1, boardHeight - 1)};
    if (board.at(newPos.x, newPos.y).type == CellType.WALL) return;
    board.setType(player.x, player.y, CellType.NORMAL);
    player = newPos;
    board.setType(player.x, player.y, CellType.PLAYER);
    draw();
  }
});

init();
run();
