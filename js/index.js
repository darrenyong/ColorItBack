import _ from 'lodash';
import Nonogram from './nonogram';
import { randomBoard } from './difficulty';
// import * as MouseUtil from './mouse';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("nonogram");
  const ctx = canvas.getContext("2d")
  let CELL_SIZE = 30;
  canvas.height = CELL_SIZE * 20;
  canvas.width = CELL_SIZE * 20;

  let mousePressed = false;
  let testBoard = randomBoard();
  localStorage.setItem("alerted", "");
  let game = new Nonogram(testBoard, ctx);

  let mouseDown = (e) => {
    mousePressed = true;
    game.setClickAction(e.x, e.y);
    game.render();
  }

  let mouseDrag = (e) => {
    if (mousePressed) game.click(e.x, e.y);
    game.render();
  }

  let mouseUp = (e) => {
    mousePressed = false;
    game.click(e.x, e.y);
    game.render()
  }


  document.addEventListener("mousedown", mouseDown);
  document.addEventListener("mousemove", mouseDrag);
  document.addEventListener("mouseup", mouseUp);
  
  setInterval(() => {
    if (game.isGameWon()) {
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mousemove", mouseDrag);
      document.removeEventListener("mouseup", mouseUp);
    }
  }, 100);

  window.Nonogram = Nonogram; 
})