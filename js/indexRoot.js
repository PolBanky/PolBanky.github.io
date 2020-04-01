'use strict';
    // Для: Info &amp; calculations --- ROOT/index.html

let net = window.navigator.onLine;

window.addEventListener("load",page_onload);
let v_menu3 = document.getElementById('menu3');
console.log('Третий слева пункт меню  id = menu3'); 
console.log(v_menu3); 

if(!net) {
// console.log("\nНаличие инета = " + net);
// document.getElementById("menu3").disabled = true;
// document.getElementById("menu1").hidden = true;
// v_menu3.setAttribute('disabled', true);
// v_menu3.disabled = true;
// document.getElementById("menu1").innerText = 'No Inet';

document.getElementById("menu1").hidden = true;
document.getElementById("menu2").hidden = true;
// document.getElementById("menu3").hidden = true;
v_menu3.hidden = true;
}

function page_onload() { // Обработчик события загрузки страницы
    console.log("\nStart page loaded !  Наличие инета = " + net); 
}   // page_onload()

// document.write("<br>window<br><br>");
// var k=1;
// for(var prop in window) {
// console.log( k + ")  " + prop);
// // console.log("<b>"+k+"</b>: "+prop+"<br>");
// k++;
// } // for

