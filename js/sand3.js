'use strict';

var k=1;
document.write("Параметры объекта = window<br><br>");
for(var prop in window) {
document.write("<b>"+k+"</b>:  "+prop+"<br>");
k++;
} // for

// console.log(window.Attr);
console.log(window.screen);
// console.log(window.name);
console.log(window.navigator);


k=1;
document.write("<br>Параметры объекта = document<br><br>");
for(var prop in document) {
document.write("<b>"+k+"</b>:  "+prop+"<br>");
k++;
} // for

// console.log(document.location);
// console.log(document.designMode);
// console.log(document.children);

// document.write("<br>HTMLAnchorElement<br><br>");
// k=1;
// for(var prop in HTMLAnchorElement) {
// // for(var prop in HTMLElement) {
// document.write("<b>"+k+"</b>:  "+prop+"<br>");
// k++;
// } // for

// document.write("<br>HTMLInputElement<br><br>");
// k=1;
// for(var prop in HTMLInputElement) {
// // for(var prop in HTMLElement) {
// document.write("<b>"+k+"</b>:  "+prop+"<br>");
// k++;
// } // for

k=1;
document.write("<br>Параметры объекта = HTMLElement<br><br>");
for(var prop in HTMLElement) {
document.write("<b>"+k+"</b>:  "+prop+"<br>");
k++;
} // for

console.log(window.document);

// document.write("<br>HTMLObjectElement<br><br>");
// k=1;
// for(var prop in HTMLObjectElement) {
// // for(var prop in HTMLElement) {
// document.write("<b>"+k+"</b>:  "+prop+"<br>");
// k++;
// } // for

