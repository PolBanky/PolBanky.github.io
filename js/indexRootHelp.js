'use strict';
    // Для: indexRootHelp --- js/indexRootHelp.js

var widthScreen  = screen.width;               // ширина 
var heightScreen = screen.height;              // высота
var widthClient  = document.body.clientWidth;  // ширина клиента
var heightClient = document.body.clientHeight; // высота клиента

var scr = document.getElementById('screenHere');
var cli = document.getElementById('clientHere');
var inf = document.getElementById("forInfo");
var inf1 = document.getElementById("forInfo1");
var bs = document.getElementById("whatBase");

this.addEventListener("load",where);

scr.innerHTML = widthScreen + " x " + heightScreen;
cli.innerHTML = widthClient + " x " + heightClient;


function where() {
var txt = document.baseURI;
bs.innerHTML = txt;
let reg = /(iPhone|Android|iPad|RIM)/;
console.log(reg);
console.log(navigator.userAgent.match(reg));

if (navigator.userAgent.match(reg)) {
    inf.innerHTML = "Сайт открыт на мобильном устройстве";
}
else {
    inf.innerHTML = "Сайт открыт на десктопе";
}
// let br = navigator.platform;
inf1.innerHTML = navigator.userAgent;
// inf1.innerHTML = navigator.platform;
}   // where()