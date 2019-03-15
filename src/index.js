import _ from 'lodash';

let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

let ctx = canvas.getContext('2d');
ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
ctx.fillRect(100, 100, 100, 100)
ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
ctx.fillRect(400, 100, 100, 100)
ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
ctx.fillRect(300, 300, 100, 100)

ctx.beginPath();
ctx.moveTo(50, 300);
ctx.lineTo(300, 100);
ctx.lineTo(400,300);
ctx.strokeStyle = "#fa34a3";
ctx.stroke();