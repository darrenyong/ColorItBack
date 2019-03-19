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

  tranpose(grid) {
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

  render() {
    for (let i = 0; i < this.guessGrid.length; i++) {
      for (let j = 0; j < this.guessGrid[0].length; j++) {
        if (this.guessGrid[i][j] === 0) {
          this.ctx.rect((j * 20) + 0.5, (i * 10) + 0.5, 20, 10)
          this.ctx.stroke();
        } else if (this.guessGrid[i][j] === 1) {
          this.fillStyle = "black";
          this.ctx.fillRect((j * 20) + 0.5, (i * 10) + 0.5, 20, 10)
        }
      }
    }
  }


}

export default Nonogram;