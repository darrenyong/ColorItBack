import _ from 'lodash';
import Nonogram from './nonogram';
import { randomBoard } from './difficulty';
// import * as MouseUtil from './mouse';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("nonogram");
  const ctx = canvas.getContext("2d")

  let testBoard = randomBoard();

  let game = new Nonogram(testBoard, ctx);
  game.render();

  // document.addEventListener("mousedown", MouseUtil.mouseDown);
  // document.addEventListener("mousemove", MouseUtil.mouseDrag);
  // document.addEventListener("mouseup", MouseUtil.mouseUp);

  window.Nonogram = Nonogram;
})