'use strict';

const att = 'color: darkorange; font-weight: bold; font-size: 1.4em;'; // attention
const grn = 'color: green; font-weight: bold; font-size: 1.4em;';
const blu = 'color: dodgerblue; font-weight: bold; font-size: 1.4em;';
let num = 0;  // для нумерации логов

let v_top = document.getElementById('top');
v_top.addEventListener("mousedown", () => {
	// console.log(`%c${++num}. Click down ${v_top.innerText}`,grn);
	v_top.style.backgroundColor='green';
	// printProps(v_top);
	// snake.setDirection(keyActions.ArrowUp);
}); // v_top.addEventListener

v_top.addEventListener("mouseup", () => {
	// console.log(`%c${++num}. Click up ${v_top.innerText}`,grn);
	v_top.style.backgroundColor='orange';
	// printProps(v_top);
}); // v_top.addEventListener



let v_right = document.getElementById('right');
v_right.addEventListener("click", () => {
	console.log(`%c${++num}. Click ${v_right.innerText}`,grn);
}); // v_top.addEventListener

let v_down = document.getElementById('down');
v_down.addEventListener("click", () => {
	console.log(`%c${++num}. Click ${v_down.innerText}`,grn);
}); // v_top.addEventListener

let v_left = document.getElementById('left');
v_left.addEventListener("click", () => {
	console.log(`%c${++num}. Click ${v_left.innerText}`,grn);
}); // v_top.addEventListener

let v_pause = document.getElementById('pause');
v_pause.addEventListener("click", () => {
	console.log(`%c${++num}. Click ${v_pause.innerText}`,grn);
}); // v_top.addEventListener

function printProps(ob) {
	console.log(`%c${++num}. Function printProps(${ob}) is works`,att);
	console.log(`%c${++num}. ${ob} is ${typeof(ob)}`,blu);
	for (let p in ob) {
		console.log (`${++num}.   ${p} :  ${ob[p]}\n`);
	} // for
} // printProps(ob)

window.addEventListener("load", function() {
	console.log(`%c\n${++num}.  html.html is loaded !\n`,att);
	console.log(`%c${++num}. v_top.textContent == ${v_top.textContent}; v_top.id == ${v_top.id}`,blu);
	// printProps(v_top);
}); // window.addEventListener("load"


