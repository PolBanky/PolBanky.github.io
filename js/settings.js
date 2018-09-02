//"use strict";
var widthScreen = screen.width;     // ширина 
var heightScreen = screen.height;   // высота
var widthClient=document.body.clientWidth;      // ширина клиента
var heightClient=document.body.clientHeight;    // высота клиента

var scr = document.getElementById('screen');
var cli = document.getElementById('client');
var inf = document.getElementById("forInfo");

scr.innerHTML = widthScreen + " x " + heightScreen;
cli.innerHTML = widthClient + " x " + heightClient;

this.addEventListener("load",where)
//this.onload = where;
function where() {
    console.log("onload 1");
    var reg = /(iPhone|Android|iPad|RIM)/;
    if (navigator.userAgent.match(reg)) {
        inf.innerHTML = "Мобильное устройство";
    }
    else {
        inf.innerHTML = "Десктоп";
    }  
}
