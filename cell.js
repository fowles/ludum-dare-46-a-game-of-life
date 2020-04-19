const CellType = {
  NORMAL: 0,
  PLAYER: 1,
  WALL: 2,
  DITCH: 3,
  END: 4,
  LOST: 5,  // the square(s) that caused the Loss
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

class Cell {
  constructor(on = false, type = CellType.NORMAL, mustStayAlive = false) {
    this.type = type;
    this.on = on;
    this.mustStayAlive = mustStayAlive;
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
      case CellType.NORMAL:{
          const count = this.lastRoundNeighborCount;
          this.on = (count == 3 || count == 2 && this.on);
        } break;
      case CellType.PLAYER: {
        this.on = true;
      } break;
      case CellType.WALL:
        this.on = true;
        break;
      case CellType.DITCH:
      case CellType.END:
        this.on = false;
        break;
    }

    if (this.mustStayAlive && !this.on) {
      gameState = State.LOST;
      this.type = CellType.LOST;
    }
  }

  _drawImpl(ctx, i, j, fillStyle, strokeStyle) {
    let drawRect = () => {
      ctx.canvas.beginPath();
      ctx.canvas.rect(
          i * ctx.cellSize, j * ctx.cellSize, ctx.cellSize, ctx.cellSize);
    };

    if (fillStyle) {
      ctx.canvas.fillStyle = fillStyle;
      drawRect();
      ctx.canvas.fill();
    }
    if (strokeStyle) {
      ctx.canvas.strokeStyle = strokeStyle;
      ctx.canvas.lineWidth = 1;
      drawRect();
      ctx.canvas.stroke();
    }
  }

  draw(ctx, i, j) {
    let fillStyle = undefined;
    let strokeStyle = undefined;
    switch (this.type) {
      case CellType.NORMAL:
        if (this.on) {
          fillStyle = 'cadetblue';
          if (this.mustStayAlive) {
            strokeStyle = 'black';
          }
        } else {
          strokeStyle = 'white';
        }
        break;
      case CellType.PLAYER:
        fillStyle = 'red';
        break;
      case CellType.WALL:
        fillStyle = 'black';
        break;
      case CellType.DITCH:
        fillStyle = 'brown';
        break;
      case CellType.END:
        fillStyle = 'green';
        break;
    }

    this._drawImpl(ctx, i, j, fillStyle, strokeStyle);
  }
}
