//"use strict";
var widthScreen = screen.width; // ширина 
var heightScreen = screen.height; // высота 
//alert ("Разрешение экрана: " + widthScreen + " x " + heightScreen);
document.getElementById('screen').innerHTML = widthScreen + " x " + heightScreen;
    
var widthClient=document.body.clientWidth; // ширина 
var heightClient=document.body.clientHeight; // высота
//alert ("Разрешение окна клиента: " + widthClient + " x " + heightClient);
document.getElementById('client').innerHTML = widthClient + " x " + heightClient;