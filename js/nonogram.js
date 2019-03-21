let CELL_SIZE = 30;

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
        newRow.push(grid[j][i]);
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

  setClickAction(x, y) {
    switch(this.tileAt(x, y)) {
      case 0:
        this.clickAction = "PAINT";
        break;
      case 1:
        this.clickAction = "BLOCK";
        break;
      case 2:
        this.clickAction = "ERASE";
        break;
    }
  }

  tileAt(x, y) {
    let col = Math.floor(x/CELL_SIZE);
    let row = Math.floor(y/CELL_SIZE);

    return this.guessGrid[row][col];
  }

  click(x, y) {
    let targetCol = Math.floor(x/CELL_SIZE);
    let targetRow = Math.floor(y/CELL_SIZE);

    if (this.isValidLocation(x, y) && !this.alreadyClicked(targetRow, targetCol)) {
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

  drawLine(startX, startY, endX, endY, color) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }

  render() {
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
            this.drawLine(20 * j, 20 * i, 20 *  (j + 1), CELL_SIZE * (i + 1), "#72a3d4");
            this.drawLine(CELL_SIZE * (j + 1), CELL_SIZE * i, CELL_SIZE * j, CELL_SIZE * (i + 1), "#72a3d4");
          }
        }
      }
    }

    if (!this.isGameWon()) {
      for (let i = 0; i < this.guessGrid.length; i++) {
        this.drawLine(0, i * CELL_SIZE, this.screenWidth, i * CELL_SIZE, "#72a3d4");
        if (i !== 0 && i % 5 === 0) {
          this.drawLine(0, i * CELL_SIZE, this.screenWidth, i * CELL_SIZE, "#fe4642");
        }
      }

      for (let i = 0; i < this.guessGrid[0].length; i++){
        this.drawLine(i * CELL_SIZE, 0, i * CELL_SIZE, this.screenHeight, "#72a3d4");
        if (i !== 0 && i % 5 === 0) {
          this.drawLine(i * CELL_SIZE, 0, i * CELL_SIZE, this.screenHeight, "#fe4642");
        }
      }
    }

    this.ctx.font = "15px Helvetica";
    this.ctx.fillStyle = "black";

    // Row hints
    for (let i = 0; i < this.row.length; i++) {
      let hint = "  ";
      for (let j = 0; j < this.row[i].length; j++) {
        hint += this.row[i][j] + "  ";
      }
      if (hint === "  ") {
        hint = " 0 ";
      }
      this.ctx.fillText(hint, this.screenWidth + 10, CELL_SIZE * (i + 1) - 7);
    }


    // Column hints
    let hint = "";
    this.ctx.fillText(hint, 0, this.screenHeight + 10);

    for (let i = 0; i < this.columns.length; i++) {
      for (let j = 0; j < this.columns[i].length; j++) {
        hint = this.columns[i][j];
        if (hint === "") {
          hint = 0;
        }
        this.ctx.fillText(hint, CELL_SIZE * i + 9, this.screenHeight + 15 * (j + 1) + 7);
      }
    }

    // if (this.isGameWon()) {
    //   alert("You won!");
    // }
  }


}

export default Nonogram;