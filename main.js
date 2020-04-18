const updateIntervalMs = 50;
const boardWidth = 50;
const boardHeight = 40;
const board = new Board(boardWidth, boardHeight);

/*Conway's Game of Life.
 *
 * A simple Javascript implementation by ankr.
 *
 * @author http://ankr.dk
 */
let canvas = document.getElementById('c').getContext('2d');

let player = {x: 16, y: 8};

/**
 * Initialize game.
 *
 * Will place a Gosper glider gun in the world and start simulation.
 */
function init() {
  // Prefilled cells
  [
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
}

function run() {
  board.update();
  board.draw();
  setTimeout(run, updateIntervalMs);
}

initKeyListener({
  37: () => {
    board.setType(player.x, player.y, CellType.NORMAL);
    --player.x;
    if (player.x < 0) player.x = 0;
    board.setType(player.x, player.y, CellType.PLAYER);
  },
  38: () => {
    board.setType(player.x, player.y, CellType.NORMAL);
    --player.y;
    if (player.y < 0) player.y = 0;
    board.setType(player.x, player.y, CellType.PLAYER);
  },
  39: () => {
    board.setType(player.x, player.y, CellType.NORMAL);
    ++player.x;
    if (player.x > boardWidth - 1) player.x = boardWidth - 1;
    board.setType(player.x, player.y, CellType.PLAYER);
  },
  40: () => {
    board.setType(player.x, player.y, CellType.NORMAL);
    ++player.y;
    if (player.y > boardHeight - 1) player.y = boardHeight - 1;
    board.setType(player.x, player.y, CellType.PLAYER);
  }
});

init();
run();
