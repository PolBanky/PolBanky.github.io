'use strict';
// window.addEventListener("load",page_onload); // onLoad
// function page_onload() { // Обработчик события загрузки страницы
//     let net = window.navigator.onLine;
//     console.log("\n%c Страница загружена;  Наличие инета = " + net, 'color: limegreen; font-weight: bold; font-size: 1.4em;');  
// } // function page_onload()
// ****************************************************************************
let v_percent = document.getElementById("percent"); // HTML Input
let v_srcSum  = document.getElementById("srcSum");  // HTML Input
let v_cell_10 = document.getElementById("cell_10"); // HTML ячейка таблицы
let v_cell_11 = document.getElementById("cell_11"); // HTML ячейка таблицы
let v_cell_20 = document.getElementById("cell_20"); // HTML ячейка таблицы
let v_cell_21 = document.getElementById("cell_21"); // HTML ячейка таблицы
let v_cell_30 = document.getElementById("cell_30"); // HTML ячейка таблицы
let v_cell_31 = document.getElementById("cell_31"); // HTML ячейка таблицы
let v_sumAll  = document.getElementById("sumAll");  // HTML ячейка таблицы
let v_sumProfit = document.getElementById("sumProfit"); // HTML ячейка таблицы


function percentToMonthSum (percent, sum) {
    return (percent / 12) * sum * 0.01;
} // percentToMonthSum (percent, sum)

let ar = [0,0,0,0,0,0,0,0];


function sol() { // call from => function hello_inputIDec() in hello_input.js
    // console.log('function sol(): v_percent.decimal = ',v_percent.decimal,';  v_srcSum.decimal = ',v_srcSum.decimal);
    // console.log(v_tbl);
    ar[0] = v_srcSum.decimal;
    ar[1] = percentToMonthSum(v_percent.decimal, ar[0]);
    ar[2] = ar[0] + ar[1];
    ar[3] = percentToMonthSum(v_percent.decimal, ar[2]);
    ar[4] = ar[2] + ar[3];
    ar[5] = percentToMonthSum(v_percent.decimal, ar[4]);
    ar[6] = ar[4] + ar[5];
    ar[7] = ar[1] + ar[3] + ar[5];

    v_cell_10.textContent = ar[0].toFixed(2);
    v_cell_11.textContent = ar[1].toFixed(2);
    v_cell_20.textContent = ar[2].toFixed(2);
    v_cell_21.textContent = ar[3].toFixed(2);
    v_cell_30.textContent = ar[4].toFixed(2);
    v_cell_31.textContent = ar[5].toFixed(2);
    v_sumAll.textContent  = ar[6].toFixed(2);
    v_sumProfit.textContent = ar[7].toFixed(2);
} // function sol()
