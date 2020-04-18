const CellType = {
  NORMAL: 0,
  PLAYER: 1,
};

class Cell {
  constructor(on = false, type = CellType.NORMAL) {
    this.type = type;
    this.on = on;
    this.lastRoundNeighborCount = this.on ? 3 : 0;
    switch (type) {
      case CellType.PLAYER:
        this.on = true;
        break;
      default:
        break;
    }
  }

  updateNeighborCounts(p) {
    function _isFilled(p) {
      return cells[p.x] && cells[p.x][p.y] && cells[p.x][p.y].on;
    }
    this.lastRoundNeighborCount = -_isFilled(p);
    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if (_isFilled({x: p.x - i, y: p.y - j})) ++this.lastRoundNeighborCount;
      }
    }
  }

  update(p) {
    switch (this.type) {
      case CellType.NORMAL:
        const count = this.lastRoundNeighborCount;
        this.on = (count == 3 || count == 2 && this.on);
        break;
      case CellType.PLAYER:
        this.on = true;
        break;
    }
  }
}
