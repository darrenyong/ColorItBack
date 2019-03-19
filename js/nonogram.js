import Square from './square';

let CELL_SIZE = 20;

// This file handles all the game logic
class Nonogram {
  constructor(grid, ctx) {
    this.ctx = ctx;

    this.answerGrid = grid;
    this.guessGrid = this.buildUserGuess();
    this.row = this.rowHints();
    this.columns = this.columnHints();

    this.screenWidth = this.answerGrid[0].length * CELL_SIZE;
    this.screenHeight = this.answerGrid.length * CELL_SIZE;

    this.render();
  }

  // This builds a grid of the original that keeps track of the user's guess
  buildUserGuess() {
    let grid = [];
    
    for (let i = 0; i < this.answerGrid.length; i++) {
      let line = []
      for (let j = 0; j < this.answerGrid[0].length; j++) {
        line.push(0);
      }
      grid.push(line)
    }
    return grid;
  }

  isGameWon() {
    for (let i = 0; i < this.answerGrid.length; i++) {
      for (let j = 0; j < this.answerGrid.length; j++) {
        let guessGrid = this.guessGrid[i][j];
        let answerGrid = this.answerGrid[i][j];
        if (answerGrid === 1 && guessGrid != answerGrid || guessGrid === 1 && answerGrid != 1) {
          return false;
        }
      }
    }
    return true;
  }

  rowHints() {
    let rowHint = [];

    for (let i = 0; i < this.answerGrid.length; i++) {
      let hints = [];
      let hint = 0;
      for (let j = 0; j < this.answerGrid[i].length; j++) {
        if (this.answerGrid[i][j] === 1) {
          hint++;
          if (j === this.answerGrid[i].length - 1) {
            hints.push(hint);
          }
        } else if (hint != 0) {
          hints.push(hint);
          hint = 0;
        }
      }
      rowHint.push(hints);
    }

    return rowHint;
  }

  transpose(grid) {
    let transposeGrid = [];

    for (let i = 0; i < grid[0].length; i++) {
      let newRow = [];
      for (let j = 0; j < grid.length; j++) {
        newRow.push(grid[i][j]);
      }
      transposeGrid.push(newRow);
    }

    return transposeGrid;
  }

  columnHints() {
    let columnHint = [];
    let transposeGrid = this.transpose(this.answerGrid);

    for (let i = 0; i < transposeGrid.length; i++) {
      let hints = [];
      let hint = 0;
      for (let j = 0; j < transposeGrid[i].length; j++) {
        if (transposeGrid[i][j] === 1) {
          hint++;
          if (j === transposeGrid[i].length - 1) {
            hints.push(hint);
          }
        } else if (hint != 0) {
          hints.push(hint);
          hint = 0;
        }
      }
      columnHint.push(hints);
    }

    return columnHint;
  }

  click(x, y) {
    targetCol = Math.floor(x/CELL_SIZE);
    targetRow = Math.floor(x/CELL_SIZE);

    if (this.isValidLocation(x, y) && !this.alreadyClicked(row, col)) {
      switch(this.clickAction) {
        case "ERASE":
          this.guessGrid[targetRow][targetCol] = 0;
          break;
        case "PAINT":
          this.guessGrid[targetRow][targetCol] = 1;
          break;
        case "BLOCK":
          this.guessGrid[targetRow][targetCol] = 2;
          break;
      }
    }
  }
  
  isValidLocation(x, y) {
    return (x >= 0 && x < this.screenWidth && y >=0 && y < this.screenHeight);
  }

  alreadyClicked(row, col) {
    switch(this.clickAction) {
      case "ERASE":
        return this.guessGrid[row][col] === 0;
      case "PAINT":
        return this.guessGrid[row][col] === 1;
      case "BLOCK":
        return this.guessGrid[row][col] === 2;
    }
  }

  drawLine(startX, startY, endX, endY) {
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }

  render() {
    // for (let i = 0; i < this.guessGrid.length; i++) {
    //   for (let j = 0; j < this.guessGrid[0].length; j++) {
    //     if (this.guessGrid[i][j] === 0) {
    //       this.ctx.rect((j * 20) + 0.5, (i * 10) + 0.5, 20, 10)
    //       this.ctx.stroke();
    //     } else if (this.guessGrid[i][j] === 1) {
    //       this.fillStyle = "black";
    //       this.ctx.fillRect((j * 20) + 0.5, (i * 10) + 0.5, 20, 10)
    //     }
    //   }
    // }
    this.ctx.fillStyle = "#d9d9d9";
    this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);

    this.ctx.fillStyle = "#000000";
    for (let i = 0; i < this.guessGrid.length; i++) {
      for (let j = 0; j < this.guessGrid[i].length; j++) {
        if (this.guessGrid[i][j] === 1) {
          this.ctx.fillStyle = "#000000";
          this.ctx.fillRect(CELL_SIZE * j, CELL_SIZE * i, CELL_SIZE, CELL_SIZE);
        } else if (!this.isGameWon()) {
          if (this.guessGrid[i][j] === 2) {
            this.drawLine(20 * j, 20 * i, 20 *  (j + 1), CELL_SIZE * (i + 1));
            this.drawLine(CELL_SIZE * (j + 1), CELL_SIZE * i, CELL_SIZE * j, CELL_SIZE * (i + 1));
          }
        }
      }
    }

    if (!this.isGameWon()) {
      for (let i = 0; i < this.guessGrid.length; i++) {
        this.drawLine(0, i * CELL_SIZE, this.screenWidth, i * CELL_SIZE);
        if (i % 5 === 0) {
          this.drawLine(0, i * CELL_SIZE, this.screenWidth, i * CELL_SIZE);
        }
      }

      for (let i = 0; i < this.guessGrid[0].length; i++){
        this.drawLine(i * CELL_SIZE, 0, i * CELL_SIZE, this.screenHeight);
        if (i % 5 === 0) {
          this.drawLine(i * CELL_SIZE, 0, i * CELL_SIZE, this.screenHeight);
        }
      }
    }

    this.ctx.font = "13px Helvetica";
    this.ctx.fillStyle = "white";
  }


}

export default Nonogram;