'use strict';

const att = 'color: darkorange; font-weight: bold; font-size: 1.4em;'; // attention
const grn = 'color: green; font-weight: bold; font-size: 1.4em;';
const blu = 'color: lightblue; font-weight: bold; font-size: 1.4em;';
let num = 0; // для нумерации логов
// if debug == false => no console.log
const debug = true;
// const debug = false;

let v_percent = document.getElementById("percent");  // HTML Input
v_percent.run=percentSol;
if(debug) console.dir(v_percent);
if(debug) console.dir(v_percent.run);

let v_srcSum  = document.getElementById("srcSum");   // HTML Input
v_srcSum.run=percentSol;
if(debug) console.dir(v_srcSum);
if(debug) console.dir(v_srcSum.run);

let v_cell_0p  = document.getElementById("cell_0p"); // HTML ячейка таблицы
let v_cell_0   = document.getElementById("cell_0");  // HTML ячейка таблицы
let v_cell_1p  = document.getElementById("cell_1p"); // HTML ячейка таблицы
let v_cell_1   = document.getElementById("cell_1");  // HTML ячейка таблицы
let v_cell_2p  = document.getElementById("cell_2p"); // HTML ячейка таблицы
let v_cell_2   = document.getElementById("cell_2");  // HTML ячейка таблицы
let v_cell_3p  = document.getElementById("cell_3p"); // HTML ячейка таблицы
let v_cell_3   = document.getElementById("cell_3");  // HTML ячейка таблицы
let v_cell_4p  = document.getElementById("cell_4p"); // HTML ячейка таблицы
let v_cell_4   = document.getElementById("cell_4");  // HTML ячейка таблицы
let v_cell_5p  = document.getElementById("cell_5p"); // HTML ячейка таблицы
let v_cell_5   = document.getElementById("cell_5");  // HTML ячейка таблицы
let v_cell_6p  = document.getElementById("cell_6p"); // HTML ячейка таблицы
let v_cell_6   = document.getElementById("cell_6");  // HTML ячейка таблицы
let v_cell_7p  = document.getElementById("cell_7p"); // HTML ячейка таблицы
let v_cell_7   = document.getElementById("cell_7");  // HTML ячейка таблицы
let v_cell_8p  = document.getElementById("cell_8p"); // HTML ячейка таблицы
let v_cell_8   = document.getElementById("cell_8");  // HTML ячейка таблицы
let v_cell_9p  = document.getElementById("cell_9p"); // HTML ячейка таблицы
let v_cell_9   = document.getElementById("cell_9");  // HTML ячейка таблицы
let v_cell_10p = document.getElementById("cell_10p");// HTML ячейка таблицы
let v_cell_10  = document.getElementById("cell_10"); // HTML ячейка таблицы
let v_cell_11p = document.getElementById("cell_11p");// HTML ячейка таблицы
let v_cell_11  = document.getElementById("cell_11"); // HTML ячейка таблицы
let v_cell_12p = document.getElementById("cell_12p");// HTML ячейка таблицы
let v_cell_12  = document.getElementById("cell_12"); // HTML ячейка таблицы

let v_sumAll_03    = document.getElementById("sumAll_03");   // HTML ячейка таблицы
let v_sumProfit_03 = document.getElementById("sumProfit_03");// HTML ячейка таблицы
let v_sumAll_12    = document.getElementById("sumAll_12");   // HTML ячейка таблицы
let v_sumProfit_12 = document.getElementById("sumProfit_12");// HTML ячейка таблицы


const RE = /(\d)(?=(\d\d\d)+([^\d]|$))/g;
let ar = [
    [0,0], /* 0 */
    [0,0], /* 1 */
    [0,0], /* 2 */
    [0,0], /* 3 */
    [0,0], /* 4 */
    [0,0], /* 5 */
    [0,0], /* 6 */
    [0,0], /* 7 */
    [0,0], /* 8 */
    [0,0], /* 9 */
    [0,0], /* 10 */
    [0,0], /* 11 */
    [0,0], /* 12 */
    [0,0], /* 13 */
    [0,0]  /* 14 */
];


function percentToMonthSum (percent, sum) {
    return (percent / 12) * sum * 0.01;
} // percentToMonthSum (percent, sum)


function percentSol() {
    if(debug) console.log(`%c${++num}. Now run: percentSol()`,att);
ar[0][1] = v_srcSum.decimal; /* Исходная сумма */
ar[1][0] = percentToMonthSum(v_percent.decimal, ar[0][1]);
ar[1][1] = ar[0][1] + ar[1][0];
ar[2][0] = percentToMonthSum(v_percent.decimal, ar[1][1]);
ar[2][1] = ar[1][1] + ar[2][0];
ar[3][0] = percentToMonthSum(v_percent.decimal, ar[2][1]);
ar[3][1] = ar[2][1] + ar[3][0];
ar[4][0] = percentToMonthSum(v_percent.decimal, ar[3][1]);
ar[4][1] = ar[3][1] + ar[4][0];
ar[5][0] = percentToMonthSum(v_percent.decimal, ar[4][1]);
ar[5][1] = ar[4][1] + ar[5][0];
ar[6][0] = percentToMonthSum(v_percent.decimal, ar[5][1]);
ar[6][1] = ar[5][1] + ar[6][0];
ar[7][0] = percentToMonthSum(v_percent.decimal, ar[6][1]);
ar[7][1] = ar[6][1] + ar[7][0];
ar[8][0] = percentToMonthSum(v_percent.decimal, ar[7][1]);
ar[8][1] = ar[7][1] + ar[8][0];
ar[9][0] = percentToMonthSum(v_percent.decimal, ar[8][1]);
ar[9][1] = ar[8][1] + ar[9][0];
ar[10][0] = percentToMonthSum(v_percent.decimal, ar[9][1]);
ar[10][1] = ar[9][1] + ar[10][0];
ar[11][0] = percentToMonthSum(v_percent.decimal, ar[10][1]);
ar[11][1] = ar[10][1] + ar[11][0];
ar[12][0] = percentToMonthSum(v_percent.decimal, ar[11][1]);
ar[12][1] = ar[11][1] + ar[12][0];

ar[13][0] = ar[1][0] + ar[2][0] + ar[3][0];
ar[13][1] = ar[3][1];
ar[14][0] = ar[1][0] + ar[2][0] + ar[3][0] + ar[4][0] + ar[5][0] + ar[6][0] + ar[7][0] + ar[8][0] + ar[9][0] + ar[10][0] + ar[11][0] + ar[12][0];
ar[14][1] = ar[12][1];

v_cell_0.textContent  = ar[0][1].toFixed(2).replace(RE, '$1 ');  /* InputSum */
v_cell_1p.textContent = ar[1][0].toFixed(2).replace(RE, '$1 ');
v_cell_1.textContent  = ar[1][1].toFixed(2).replace(RE, '$1 ');
v_cell_2p.textContent = ar[2][0].toFixed(2).replace(RE, '$1 ');
v_cell_2.textContent  = ar[2][1].toFixed(2).replace(RE, '$1 ');
v_cell_3p.textContent = ar[3][0].toFixed(2).replace(RE, '$1 ');
v_cell_3.textContent  = ar[3][1].toFixed(2).replace(RE, '$1 ');
v_cell_4p.textContent = ar[4][0].toFixed(2).replace(RE, '$1 ');
v_cell_4.textContent  = ar[4][1].toFixed(2).replace(RE, '$1 ');
v_cell_5p.textContent = ar[5][0].toFixed(2).replace(RE, '$1 ');
v_cell_5.textContent  = ar[5][1].toFixed(2).replace(RE, '$1 ');
v_cell_6p.textContent = ar[6][0].toFixed(2).replace(RE, '$1 ');
v_cell_6.textContent  = ar[6][1].toFixed(2).replace(RE, '$1 ');
v_cell_7p.textContent = ar[7][0].toFixed(2).replace(RE, '$1 ');
v_cell_7.textContent  = ar[7][1].toFixed(2).replace(RE, '$1 ');
v_cell_8p.textContent = ar[8][0].toFixed(2).replace(RE, '$1 ');
v_cell_8.textContent  = ar[8][1].toFixed(2).replace(RE, '$1 ');
v_cell_9p.textContent = ar[9][0].toFixed(2).replace(RE, '$1 ');
v_cell_9.textContent  = ar[9][1].toFixed(2).replace(RE, '$1 ');
v_cell_10p.textContent = ar[10][0].toFixed(2).replace(RE, '$1 ');
v_cell_10.textContent  = ar[10][1].toFixed(2).replace(RE, '$1 ');
v_cell_11p.textContent = ar[11][0].toFixed(2).replace(RE, '$1 ');
v_cell_11.textContent  = ar[11][1].toFixed(2).replace(RE, '$1 ');
v_cell_12p.textContent = ar[12][0].toFixed(2).replace(RE, '$1 ');
v_cell_12.textContent  = ar[12][1].toFixed(2).replace(RE, '$1 ');

v_sumProfit_03.textContent = ar[13][0].toFixed(2).replace(RE, '$1 ');
v_sumAll_03.textContent = ar[13][1].toFixed(2).replace(RE, '$1 ');
v_sumProfit_12.textContent = ar[14][0].toFixed(2).replace(RE, '$1 ');
v_sumAll_12.textContent = ar[14][1].toFixed(2).replace(RE, '$1 ');
} // function percentSol()
