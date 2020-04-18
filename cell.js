const CellType = {
  NORMAL: 0,
  PLAYER: 1,
};

class Cell {
  constructor(on = false, type = CellType.NORMAL) {
    this.type = type;
    this.on = on;
    switch (type) {
      case CellType.PLAYER:
        this.on = true;
        break;
      default:
        break;
    }
  }

  update(p) {
    switch (this.type) {
      case CellType.NORMAL:
        const count = _countNeighbours(cells, p);
        return new Cell((count == 3 || count == 2 && this.on), this.type);
      case CellType.PLAYER:
        return new Cell(true, this.type)
    }
  }
}

function _countNeighbours(board, p) {
  function _isFilled(p) {
    if (player.x == p.x && player.y == p.y) return true;
    return cells[p.x] && cells[p.x][p.y] && cells[p.x][p.y].on;
  }

  let amount = -_isFilled(p);
  for (i = -1; i <= 1; ++i) {
    for (j = -1; j <= 1; ++j) {
      if (_isFilled({x: p.x - i, y: p.y - j})) amount++;
    }
  }

  return amount;
}
