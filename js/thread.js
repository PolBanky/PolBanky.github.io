'use strict';
// window.addEventListener("load",page_onload); // onLoad
// function page_onload() { // Обработчик события загрузки страницы
//     let net = window.navigator.onLine;
//     console.log("\n%c Страница загружена;  Наличие инета = " + net, 'color: limegreen; font-weight: bold; font-size: 1.4em;');  
// } // function page_onload()
// ****************************************************************************
    // HTML Input
let v_input_d = document.getElementById("input_d"); // HTML Input
let v_input_P = document.getElementById("input_P");         // HTML Input
    // HTML OutPut
let v_cell_d2 = document.getElementById("cell_d2");         // HTML OutPut
let v_cell_L = document.getElementById("cell_L");           // HTML OutPut
let v_cell_A_rad = document.getElementById("cell_A_rad");   // HTML OutPut
let v_cell_A_grad = document.getElementById("cell_A_grad"); // HTML OutPut

const _180_divide_Pi_ = 180 / Math.PI;  // = 57,295779513082320876798154814105
let d = 0.0; // Диаметр наружный d
let P = 0.0;     // Шаг резьбы P
let d2 = 0.0;    // Диаметр средний d2
let L = 0.0;     // Длина окружности L (см. рисунок а) среднего диаметра d2
let A_rad = 0.0;
let A_grad = 0.0;

        /* function sol() */
    function sol() { // call from => function hello_inputIDec() in hello_input.js
d = v_input_d.decimal;
P = v_input_P.decimal;
d2 = d - (0.6495 * P);
L = d2 * Math.PI;    /* Длина окружности L (см. рисунок а) */
A_rad = Math.atan( P / L );
A_grad = A_rad * _180_divide_Pi_;
// console.log(event);
// console.log('function sol(): diaEx = ',diaEx,'; pitchBC = ',pitchBC,'; L = ',L.toFixed(2),'; A_grad = ',A_grad.toFixed(6));
v_cell_d2.textContent = d + ' - 0,6495 x ' + P + ' = ' + d2.toFixed(3);
v_cell_L.textContent = '3.14159 x ' + d2 + ' = ' + L.toFixed(3);
v_cell_A_rad.textContent = 'Atan( ' + P + ' / ' + L.toFixed(3) + ' ) = ' + A_rad.toFixed(5);
v_cell_A_grad.textContent = A_rad.toFixed(5) + ' x 57,29577 = ' + A_grad.toFixed(5);
} // function sol()
