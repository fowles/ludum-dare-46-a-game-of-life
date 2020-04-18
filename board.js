class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = new Array(this.width * this.height);
    for (let i = 0; i < this.cells.length; ++i) {
      this.cells[i] = new Cell();
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
        if (i == 36 && j == 4) console.log(this.cells[i * this.height + j]);
        this.cells[i * this.height + j].updateNeighborCounts(i, j);
        if (i == 36 && j == 4) console.log(this.cells[i * this.height + j]);
      }
    }
    for (let i = 0; i < this.width; ++i) {
      for (let j = 0; j < this.height; ++j) {
        if (i == 36 && j == 4) console.log(this.cells[i * this.height + j]);
        this.cells[i * this.height + j].update();
        if (i == 36 && j == 4) console.log(this.cells[i * this.height + j]);
      }
    }
  }

  draw() {
    canvas.clearRect(0, 0, this.width * 8, this.height * 8);
    canvas.strokeStyle = '#e1e1e1';
    canvas.fillStyle = 'cadetblue';

    for (let i = 0; i < this.width; ++i) {
      for (let j = 0; j < this.height; ++j) {
        canvas.beginPath();
        canvas.rect(i * 8, j * 8, 8, 8);
        if (this.at(i, j).on) {
          canvas.fill();
        } else {
          canvas.stroke();
        }
      }
    }

    canvas.fillStyle = 'red';
    canvas.beginPath();
    canvas.rect(player.x * 8, player.y * 8, 8, 8);
    canvas.fill();
  }
}
