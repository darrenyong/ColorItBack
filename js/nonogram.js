class Nonogram {
  constructor(canvas, ctx) {
    this.testBoard = [
      [0, 0, 0, 0, 1],
      [1, 1, 0, 1, 1],
      [0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 1, 0, 1, 0]
    ];

    this.ctx = ctx;
    this.canvas = canvas;
    this.drawObstacles();
  }

  draw(pos) {
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.rect(pos[0], pos[1], 20, 20);
    this.ctx.stroke();
  }

  drawObstacles() {
    for (let i = 0; i < this.testBoard.length; i++) {
      for (let j = 0; j < this.testBoard[0].length; j++) {
        this.draw([j * 10, i * 10]);
      }
    }
  }
}

module.exports = Nonogram;