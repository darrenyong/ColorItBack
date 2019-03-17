// This file handles all the game logic

class Nonogram {
  constructor(grid, ctx) {
    this.ctx = ctx;
    this.answerGrid = grid;
    this.guessGrid = this.buildUserGuess();
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

  gameWon() {
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



}

export default Nonogram;