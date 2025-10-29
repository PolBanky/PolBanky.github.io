'use strict';
	// Indexing Border
document.addEventListener('keydown', function(event) {
	// Click body for activate moving and function keyDown !!!!!
// console.log(`%c${++num}. event.keyCode == ${event.keyCode}`,att);
console.log(`%c${++num}. event.code == ${event.code}`,grn);
	let newDirection = keyActions[event.code]; // tmp variable
	if (newDirection != undefined) { snake.setDirection(newDirection); } // if
}  // function(event)
); // document.body.addEventListener("keydown"

const keyActions = {
	'ArrowLeft':  "left",
	'ArrowUp':    "up",
	'ArrowRight': "right",
	'ArrowDown':  "down",
} // keyActions

let score = 0;	// Счет в игре

const dead = new Audio();
const eat = new Audio();

dead.src = "../audio/dead.mp3";
eat.src = "../audio/eat.mp3";

let drawScore = function () {
	v_result.innerHTML = "Счет: " + score;
} // drawScore()

	//  B l o c k
let Block = function (col, row) {
	this.col = col;
	this.row = row;
} // Block
Block.prototype.drawSquare = function (color) {
	let x = this.col * blockSize;
	let y = this.row * blockSize;
	ctx.fillStyle = color;
	ctx.fillRect(x, y, blockSize, blockSize);
	ctx.strokeRect(x, y, blockSize, blockSize);
} // Block.prototype.drawSquare
Block.prototype.circle = function (x, y, radius, fillCircle) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	if (fillCircle) { ctx.fill(); }   // if
			   else { ctx.stroke(); } // else
} // Block.prototype.circle
Block.prototype.drawCircle = function (color) {
	let centerX = this.col * blockSize + blockSize / 2;
	let centerY = this.row * blockSize + blockSize / 2;
	ctx.fillStyle = color;
	this.circle(centerX, centerY, blockSize / 2, true);
} // Block.prototype.drawCircle
Block.prototype.equal = function (otherBlock) {
	return this.col === otherBlock.col && this.row === otherBlock.row;
} // Block.prototype.equal
		// Block.prototypes
		
	//  S n a k e
let Snake = function () {
	this.segments = [
	new Block(4, 5),
	new Block(3, 5),
	new Block(2, 5),
	];
	this.direction = "right";
	this.nextDirection = "right";
} // Snake
Snake.prototype.draw = function () {
	for (let i = 0; i < this.segments.length; i++) {
		if(i==0) this.segments[i].drawSquare("#27a");
		else this.segments[i].drawSquare("orangered");
	} // for
} // Snake.prototype.draw
Snake.prototype.move = function () {
	let head = this.segments[0];
	let newHead;
	this.direction = this.nextDirection;
	if (this.direction === "right") {
		newHead = new Block(head.col + 1, head.row);
	} else if (this.direction === "down") {
		newHead = new Block(head.col, head.row + 1);
	} else if (this.direction === "left") {
		newHead = new Block(head.col - 1, head.row);
	} else if (this.direction === "up") {
		newHead = new Block(head.col, head.row - 1);
	} // else if
	if (this.checkCollision(newHead)) {
	gameOver();
	return;
} // if
this.segments.unshift(newHead);
if (newHead.equal(apple.position)) {
score++;
		eat.play(); // eat.play()
apple.move();
} else { this.segments.pop(); }
} // Snake.prototype.move
Snake.prototype.checkCollision = function (head) {
	let leftCollision = (head.col === -1);
	let topCollision = (head.row === -1);
	let rightCollision = (head.col === widthInBlocks);
	let bottomCollision = (head.row === heightInBlocks);
	let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
	let selfCollision = false;
	for (let i = 0; i < this.segments.length; i++) {
	if (head.equal(this.segments[i])) { selfCollision = true; }
	} // for
	return wallCollision || selfCollision;
} // Snake.prototype.checkCollision
Snake.prototype.setDirection = function (newDirection) {
// console.log(`%c${++num}.  inside snake.setDirection()`,att);
if (this.direction === "up" && newDirection === "down") {
	return;
} else if (this.direction === "right" && newDirection === "left") {
	return;
} else if (this.direction === "down" && newDirection === "up") {
	return;
} else if (this.direction === "left" && newDirection === "right") {
	return;
}
	this.nextDirection = newDirection;
// console.log(`%c${++num}. snake.nextDirection == ${this.nextDirection}`,grn);
// console.log(`%c${++num}. snake.direction == ${this.direction}`,grn);
} // Snake.prototype.setDirection
		// S n a k e . p r o t o t y p e s

	//  A p p l e
let Apple = function () {
	this.position = new Block(10, 10);
} // Apple
Apple.prototype.draw = function () {
	this.position.drawCircle("#ff8c00"); // darkorange
} // Apple.prototype.draw
Apple.prototype.move = function () {
	let done = false;
	let randomCol = 0;
	let randomRow = 0;
	do {
		done = false;
	randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
	randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
	for (let i = 0; i < snake.segments.length; i++) {
		if (randomCol === snake.segments[i].col && randomRow === snake.segments[i].row) {
			console.log(` !!! Apple collision in snake's segment ${i}, col==${randomCol}, row==${randomRow}`);
			done = false;
			break; // break from for - works
		} // if
		else { done = true;	} // else
	} // for (let i = 0
} while(done != true); // do ... while
	this.position = new Block(randomCol, randomRow);
} // Apple.prototype.move
		// A p p l e . p r o t o t y p e s

	//		A C T I O N
let snake = new Snake();
console.dir(snake);
let apple = new Apple();
console.dir(apple);

	// G a m e  S t a r t
let intervalId = setInterval( function() {
	ctx.clearRect(0, 0, width, height);
	drawScore();
	snake.move();
	snake.draw();
	apple.draw();
}, 150);

	// G a m e  O v e r
let gameOver = function() {
	clearInterval(intervalId);
	intervalId = null;
	v_result.innerText = `Счет = ${score} and Game Over`;
	console.log(`%c${++num}. Game Over`,att);
			dead.play(); // dead.play()
} // gameOver()

		// C L I C K

v_top.addEventListener("click", () => {
	console.log(`%c${++num}. Click ${v_top.innerText}`,grn);
	snake.setDirection(keyActions.ArrowUp);
}); // v_top.addEventListener

v_right.addEventListener("click", () => {
	console.log(`%c${++num}. Click ${v_right.innerText}`,grn);
	snake.setDirection(keyActions.ArrowRight);
}); // v_right.addEventListener

v_down.addEventListener("click", () => {
	console.log(`%c${++num}. Click ${v_down.innerText}`,grn);
	snake.setDirection(keyActions.ArrowDown);
}); // v_down.addEventListener

v_left.addEventListener("click", () => {
	console.log(`%c${++num}. Click ${v_left.innerText}`,grn);
	snake.setDirection(keyActions.ArrowLeft);
}); // v_left.addEventListener

v_pause.addEventListener("click", () => {
	console.log(`%c${++num}. Click ${v_pause.innerText}`,grn);
}); // v_pause.addEventListener