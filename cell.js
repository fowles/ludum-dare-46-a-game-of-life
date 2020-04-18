const CellType = {
  NORMAL: 0,
  PLAYER: 1,
  WALL: 2,
};

function getFill(type) {
  switch (type) {
    case CellType.NORMAL:
      return 'cadetblue';
    case CellType.PLAYER:
      return 'red';
    case CellType.WALL:
      return 'black';
  }
}

class Cell {
  constructor(on = false, type = CellType.NORMAL) {
    this.type = type;
    this.on = on;
    this.lastRoundNeighborCount = this.on ? 3 : 0;
    switch (type) {
      case CellType.PLAYER:
      case CellType.WALL:
        this.on = true;
        break;
      default:
        break;
    }
  }

  update() {
    switch (this.type) {
      case CellType.NORMAL:
        const count = this.lastRoundNeighborCount;
        this.on = (count == 3 || count == 2 && this.on);
        break;
      case CellType.PLAYER:
      case CellType.WALL:
        this.on = true;
        break;
    }
  }
}
