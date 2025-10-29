'use strict';
	// Indexing Border
const att = 'color: darkorange; font-weight: bold; font-size: 1.4em;'; // attention
const grn = 'color: green; font-weight: bold; font-size: 1.4em;';
const blu = 'color: dodgerblue; font-weight: bold; font-size: 1.4em;';
let num = 0;  // для нумерации логов

window.addEventListener("load", function() {
	console.log(`%c\n${++num}.  game6_3.html is loaded !\n`,att);
	window.document.body.style.border = "3px solid #00aa00";
}); // window.addEventListener("load"

window.addEventListener("focus", function() {
	console.log(`%c${++num}. focus`,att);
	window.document.body.style.border = "3px solid #00aa00";
}); // window.addEventListener("focus"

window.addEventListener("blur", function() {
	console.log(`%c${++num}. blur`,att);
	window.document.body.style.border = "3px solid #aa0000";
}); // window.addEventListener("blur"

function printProps(ob) {
	console.log(`%c${++num}. printProps(${ob}) works`,att);
	console.log(`%c${++num}. ${ob} is ${typeof(ob)}`,blu);
	for (let p in ob) {
		console.log (`${++num}.   ${p} :  ${ob[p]}\n`);
	} // for
} // printProps(ob)

let v_result = document.getElementById('res');	 	 // result
   const cnv = document.getElementById("canvasId");  // canvas
const width = cnv.width = 400;
const height = cnv.height = 400;
// console.log(`%c${++num}. Set sizes canvas: cnv.width == ${width}; cnv.height == ${height}`,grn);
	const ctx = cnv.getContext("2d"); // context
const blockSize = 20; // set blockSize
const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;
// console.log(`%c${++num}. Sizes canvas in blocks: widthInBlocks == ${widthInBlocks}; heightInBlocks == ${heightInBlocks}`,grn);
ctx.lineWidth = 1;			// толщина линии
ctx.strokeStyle = "#00f";   // цвет линии RGB
ctx.fillStyle = "#14f";     // цвет заливки

let v_top = document.getElementById('top');
let v_right = document.getElementById('right');
let v_down = document.getElementById('down');
let v_left = document.getElementById('left');
let v_pause = document.getElementById('pause');