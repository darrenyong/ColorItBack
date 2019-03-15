import _ from 'lodash';
import Nonogram from './nonogram'

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("nonogram");
  const ctx = canvas.getContext("2d")

  let game = new Nonogram(canvas, ctx);
})