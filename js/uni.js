"use strict";

let v_ex   = document.getElementById("example1");
    // Events
window.addEventListener("load",page_onload);   // onLoad

let a1=2, b1=25;

function mult(a, b) {
    return a * b;
}

function page_onload() {
    v_ex.textContent = `D\u2081 = \u00F8${mult(a1, b1)} - \u03B1 - \u2205`;
}   // page_onload()
