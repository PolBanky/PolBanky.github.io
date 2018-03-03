//"use strict";
function fullScreen(objFS) {
    var el = document.getElementById(objFS); // Получаем элемент
    if (el.webkitRequestFullscreen) el.webkitRequestFullscreen(); // Chrome, Opera, Safari
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen(); // Firefox
    else if (el.msRequestFullscreen) el.msRequestFullscreen(); // Internet Explorer, Edge
    else if (el.requestFullscreen) el.requestFullscreen(); // Стандарт
   }