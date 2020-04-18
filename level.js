class Level {
  constructor(map) {
    this.map = map;
    this.player = {x: -1, y: -1};
  }

  makeBoard() {
    const board = new Board(this.map[0].length, this.map.length);
    for (let j = 0; j < this.map.length; ++j) {
      for (let i = 0; i < this.map[0].length; ++i) {
        switch (this.map[j][i]) {
          case ' ':
            continue;
          case 'W':
            board.set(i, j, new Cell(true, CellType.WALL));
            break;
          case '*':
            board.set(i, j, new Cell(true, CellType.DITCH));
            break;
          case 'P':
            board.set(i, j, new Cell(true, CellType.PLAYER));
            this.player = {x: i, y: j};
            break;
          case '.':
            board.set(i, j, new Cell(true));
            break;
          case 'A':
            board.set(i, j, new Cell(true, CellType.STAY_ALIVE))
        }
      }
    }
    return board;
  }

  getPlayer() {
    return this.player;
  }
}
