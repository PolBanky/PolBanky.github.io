'use strict';
    // Для: indexRootHelp --- js/indexRootHelp.js

let widthScreen  = screen.width;               // ширина 
let heightScreen = screen.height;              // высота
let widthClient  = document.body.clientWidth;  // ширина клиента
let heightClient = document.body.clientHeight; // высота клиента

let scr = document.getElementById('screenHere');
let cli = document.getElementById('clientHere');
let inf = document.getElementById("forInfo");
let inf1 = document.getElementById("forInfo1");
let inf2 = document.getElementById("forInfo2");
let bs = document.getElementById("whatBase");

this.addEventListener("load",where);

scr.textContent = widthScreen + " x " + heightScreen;
cli.textContent = widthClient + " x " + heightClient;


function where() {
let txt = document.baseURI;
bs.textContent = txt;
let reg = /(iPhone|Android|iPad|RIM)/;
// console.log(reg);
// console.log(navigator.userAgent.match(reg));
if (navigator.userAgent.match(reg)) {
    inf.textContent = "Сайт открыт на мобильном устройстве";
} // if
else {
    inf.textContent = "Сайт открыт на десктопе";
} // else
inf1.textContent = navigator.userAgent;
inf2.textContent = navigator.platform;
} // function where()