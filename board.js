function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = new Array(this.width * this.height);
    for (let i = 0; i < this.cells.length; ++i) {
      this.cells[i] = new Cell();
    }
    this.player = {x: 16, y: 8};
    this.playerDirection = {x: 1, y: 0};
  }

  warpPlayer(pos) {
    this.player = pos;
  }

  movePlayer(playerVelocity) {
    if (playerVelocity.x != 0 || playerVelocity.y != 0) {
      this.playerDirection = playerVelocity
    }

    const newPos = {
      x: clamp(this.player.x + playerVelocity.x, 0, this.width - 1),
      y: clamp(this.player.y + playerVelocity.y, 0, this.height - 1)
    };

    const newCell = this.at(newPos.x, newPos.y);
    if (!blocksPlayer(newCell.type)) {
      if (newCell.type == CellType.END) {
        gameState = State.WON;
      }
      this.set(this.player.x, this.player.y, new Cell(false, CellType.NORMAL));
      this.player = newPos;
      this.set(this.player.x, this.player.y, new Cell(true, CellType.PLAYER));
    }
  }

  at(i, j) {
    return this.cells[i * this.height + j];
  }

  setType(i, j, t) {
    this.cells[i * this.height + j].type = t;
  }

  set(i, j, c) {
    this.cells[i * this.height + j] = c;
  }

  update() {
    for (let i = 0; i < this.width; ++i) {
      for (let j = 0; j < this.height; ++j) {
        this._updateNeighborCounts(i, j);
      }
    }
    for (let i = 0; i < this.width; ++i) {
      for (let j = 0; j < this.height; ++j) {
        this.cells[i * this.height + j].update();
      }
    }
  }

  _updateNeighborCounts(i, j) {
    this.cells[i * this.height + j].lastRoundNeighborCount = -this.at(i, j).on;
    for (let ii = Math.max(0, i - 1); ii <= Math.min(this.width - 1, i + 1);
         ++ii) {
      for (let jj = Math.max(0, j - 1); jj <= Math.min(this.height - 1, j + 1);
           ++jj) {
        if (this.at(ii, jj).on) {
          ++this.cells[i * this.height + j].lastRoundNeighborCount;
        }
      }
    }
  }

  draw(ctx) {
    ctx.canvas.strokeStyle = '#e1e1e1';

    for (let i = 0; i < this.width; ++i) {
      for (let j = 0; j < this.height; ++j) {
        const cell = this.at(i, j);
        ctx.canvas.fillStyle = getFill(cell.type);
        ctx.canvas.beginPath();
        ctx.canvas.rect(
            i * ctx.cellSize, j * ctx.cellSize, ctx.cellSize, ctx.cellSize);
        if (cell.on || cell.type != CellType.NORMAL) {
          ctx.canvas.fill();
        } else {
          ctx.canvas.stroke();
        }
      }
    }

    let mid = ctx.cellSize / 2
    let xPos = this.player.x * ctx.cellSize + mid;
    let yPos = this.player.y * ctx.cellSize + mid;
    let xDir = mid * this.playerDirection.x
    let yDir = mid * this.playerDirection.y
    if (xDir == 0) {
      xDir = 4;
      xPos -= 2;
    }
    if (yDir == 0) {
      yDir = 4;
      yPos -= 2;
    }
    ctx.canvas.fillStyle = 'white';
    ctx.canvas.beginPath();
    ctx.canvas.rect(xPos, yPos, xDir, yDir);
    ctx.canvas.fill();
  }
}
