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
}
