'use strict';
// window.addEventListener("load",page_onload); // onLoad
// function page_onload() { // Обработчик события загрузки страницы
//     let net = window.navigator.onLine;
//     console.log("\n%c Страница загружена;  Наличие инета = " + net, 'color: limegreen; font-weight: bold; font-size: 1.4em;');  
// } // function page_onload()
// ****************************************************************************
let v_inputDiaEx = document.getElementById("inputDiaEx");     // HTML Input
let v_inputPitchBC = document.getElementById("inputPitchBC"); // HTML Input
let v_cell_L = document.getElementById("cell_L");             // HTML OutPut
let v_cell_Tg_A = document.getElementById("cell_Tg_A");       // HTML OutPut
let v_cell_A_rad = document.getElementById("cell_A_rad");     // HTML OutPut
let v_cell_A_grad = document.getElementById("cell_A_grad");   // HTML OutPut

const _180_divide_Pi_ = 180 / Math.PI;
let diaEx = 0.0;
let pitchBC = 0.0;
let L = 0.0;    /* Длина окружности = АВ (см. рисунок а) */
let tgA = 0.0;
let A_rad = 0.0;
let A_grad = 0.0;

        /* function sol() */
    function sol() { // call from => function hello_inputIDec() in hello_input.js
diaEx = v_inputDiaEx.decimal;
pitchBC = v_inputPitchBC.decimal;
L = diaEx * Math.PI;    /* Длина окружности = АВ (см. рисунок а) */
tgA = pitchBC / L;
A_rad = Math.atan(tgA);
A_grad = A_rad * _180_divide_Pi_;
console.log('function sol(): diaEx = ',diaEx,'; pitchBC = ',pitchBC,'; L = ',L.toFixed(2),'; tgA = ',tgA.toFixed(6));
v_cell_L.textContent = L.toFixed(3);
v_cell_Tg_A.textContent = tgA.toFixed(6);
v_cell_Tg_A.textContent = tgA.toFixed(6);
v_cell_A_rad.textContent = A_rad.toFixed(6);
v_cell_A_grad.textContent = A_grad.toFixed(6);
} // function sol()
