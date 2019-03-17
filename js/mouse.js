// This file handles all the mouse logic
let mousePress = false;

export const mouseDown = (e) => {
  mousePress = true;
  console.log(`x: ${e.x}, y: ${e.y}`)
}

export const mouseDrag = (e) => {
  if (mousePress) console.log(`x: ${e.x}, y: ${e.y}`)
  }

export const mouseUp = (e) => {
  mousePress = false;
}