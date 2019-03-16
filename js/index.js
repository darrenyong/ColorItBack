import _ from 'lodash';
import Nonogram from './nonogram'

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("nonogram");
  const ctx = canvas.getContext("2d")

  let testBoard = [
  [0,1,1,1,1,1,1,1,1,0],
  [1,0,1,1,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,0,1],
  [1,0,1,1,0,1,0,0,0,1],
  [1,0,1,1,0,1,0,1,0,1],
  [1,0,1,1,0,1,0,1,0,1],
  [1,0,1,1,0,0,0,1,0,1],
  [1,0,1,1,0,0,0,1,0,1],
  [1,0,1,1,0,1,0,0,0,1],
  [1,0,1,1,0,1,0,1,0,1],
  [1,0,1,1,0,0,0,0,0,1],
  [0,1,1,1,1,1,1,1,1,0]
]

  let game = new Nonogram(testBoard, ctx);
  window.Nonogram = Nonogram;
})