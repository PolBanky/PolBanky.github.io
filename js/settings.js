'use strict';
var widthScreen = screen.width;     // ширина 
var heightScreen = screen.height;   // высота
var widthClient=document.body.clientWidth;      // ширина клиента
var heightClient=document.body.clientHeight;    // высота клиента

var scr = document.getElementById('screen');
var cli = document.getElementById('client');
var inf = document.getElementById("forInfo");

this.addEventListener("load",where);

scr.innerHTML = widthScreen + " x " + heightScreen;
cli.innerHTML = widthClient + " x " + heightClient;


function where() {
    console.log("onload 1");
    var reg = /(iPhone|Android|iPad|RIM)/;
    if (navigator.userAgent.match(reg)) {
        inf.innerHTML = "Сайт открыт на мобильном устройстве";
    }
    else {
        inf.innerHTML = "Сайт открыт на десктопе";
    }
}   // where()
