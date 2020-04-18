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

  updateNeighborCounts(i, j) {
    function _isFilled(i, j) {
      const cell = board.at(i, j);
      return cell && cell.on;
    }

    this.lastRoundNeighborCount = -_isFilled(i, j);
    for (let ii = -1; ii <= 1; ++ii) {
      for (let jj = -1; jj <= 1; ++jj) {
        if (_isFilled(i - ii, j - jj)) ++this.lastRoundNeighborCount;
      }
    }
  }

  update() {
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
