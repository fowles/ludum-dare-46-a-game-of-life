const CellType = {
  NORMAL: 0,
  PLAYER: 1,
  WALL: 2,
  DITCH: 3,
  STAY_ALIVE: 4,
  END: 5,
};

// Returns true if the player cannot walk through this cell-type.
function blocksPlayer(type) {
  switch (type) {
    case CellType.NORMAL:
    case CellType.END:
      return false;
    case CellType.WALL:
    case CellType.DITCH:
    case CellType.PLAYER:
      return true;
  }
}

function getFill(type) {
  switch (type) {
    case CellType.NORMAL:
      return 'cadetblue';
    case CellType.PLAYER:
      return 'red';
    case CellType.WALL:
      return 'black';
    case CellType.DITCH:
      return 'brown';
    case CellType.STAY_ALIVE:
      return 'pink';
    case CellType.END:
      return 'green';
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
      case CellType.END:
      case CellType.DITCH:
        this.on = false;
        break;
      default:
        break;
    }
  }

  update() {
    switch (this.type) {
<<<<<<< HEAD
      case CellType.NORMAL:{
          const count = this.lastRoundNeighborCount;
          this.on = (count == 3 || count == 2 && this.on);
        } break;
      case CellType.STAY_ALIVE: {
          const count = this.lastRoundNeighborCount;
          this.on = (count == 3 || count == 2 && this.on);
          if (!this.on) {
            gameState = State.LOST
          }
        } break;
      case CellType.PLAYER: {
        this.on = true;
      } break;
=======
      case CellType.NORMAL: {
        const count = this.lastRoundNeighborCount;
        this.on = (count == 3 || count == 2 && this.on);
      } break;
      case CellType.PLAYER:
>>>>>>> 5aa5b46... End location. doesn't do anything yet.
      case CellType.WALL:
        this.on = true;
        break;
      case CellType.DITCH:
      case CellType.END:
        this.on = false;
        break;
    }
  }
}
