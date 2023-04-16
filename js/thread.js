'use strict';

const att = 'color: darkorange; font-weight: bold; font-size: 1.4em;'; // attention
const grn = 'color: green; font-weight: bold; font-size: 1.4em;';
const blu = 'color: lightblue; font-weight: bold; font-size: 1.4em;';
let num = 0; // для нумерации логов
// if debug == false => no console.log
const debug = true;
// const debug = false;
// window.addEventListener("load",page_onload); // onLoad
// function page_onload() { // Обработчик события загрузки страницы
//     let net = window.navigator.onLine;
//     if(debug) console.log(`\n%c${++num}. Страница tech/index.html загружена; Наличие инета == ` + net, att);
// } // function page_onload()
// ****************************************************************************

    // HTML Input 1
let v_input_d = document.getElementById("input_d");         // HTML Input
v_input_d.run=riseThread;
if(debug) console.dir(v_input_d);
if(debug) console.dir(v_input_d.run);
let v_input_P = document.getElementById("input_P");         // HTML Input
v_input_P.run=riseThread;
    // HTML OutPut 1
let v_cell_d2 = document.getElementById("cell_d2");         // HTML OutPut
let v_cell_L2 = document.getElementById("cell_L2");         // HTML OutPut
let v_cell_A_rad = document.getElementById("cell_A_rad");   // HTML OutPut
let v_cell_A_grad = document.getElementById("cell_A_grad"); // HTML OutPut
    // HTML Input 2
let v_input_L_lever = document.getElementById("input_L_lever"); // HTML Input = Длина рычага
v_input_L_lever.run=axeForce;
let v_input_F_in = document.getElementById("input_F_in");       // HTML Input = Cила F_in приложенная к рычагу, кг
v_input_F_in.run=axeForce;
let v_input_angle_B = document.getElementById("input_angle_B"); // HTML Input = Угол основания клина B, град
v_input_angle_B.run=axeForce;
    // HTML OutPut 2
let v_cell_L_F_in = document.getElementById("cell_L_F_in"); // HTML OutPut
let v_cell_N = document.getElementById("cell_N");           // HTML OutPut
let v_cell_F_out = document.getElementById("cell_F_out");   // HTML OutPut = Cила F_out по оси винта, кг
let v_cell_h_k = document.getElementById("cell_h_k");       // HTML OutPut = Подъем клина за оборот винта, мм
let v_cell_N_k = document.getElementById("cell_N_k");       // HTML OutPut = Передаточное число клина
let v_cell_F_out_2 = document.getElementById("cell_F_out_2"); // HTML OutPut = Сила F_out_2 подъема клина, кг

const _180_divide_Pi_ = (180/Math.PI).toFixed(5);   // == 57,29577
const _Pi_ = Math.PI.toFixed(5);                    // ==  3,14159
    // 1 IN
let d = 0.0;        // Диаметр наружный d
let P = 0.0;        // Шаг резьбы P
    // 1 OUT
let d2 = 0.0;       // Диаметр средний d2
let L2 = 0.0;       // Длина окружности L2 (см. рисунок а) среднего диаметра d2
let A_rad = 0.0;    // Угол подъема резьбы в радианах
let A_grad = 0.0;   // Угол подъема резьбы в градусах
    // 2 IN
let L_lever = 0.0;  // Длина рычага от оси винта до точки приложения силы F_in, мм
let F_in = 0.0;     // Cила F_in приложенная к рычагу, кг
let B_grad = 0.0;   // Угол основания клина B, град
    // 2 OUT
let L_F_in = 0.0;   // Длина хода силы F_in за оборот, мм
let N = 0.0;        // Передаточное число винта
let F_out = 0.0;    // Cила F_out по оси винта, кг
let h_k = 0.0;      // Подъем клина за оборот винта, мм
let N_k = 0.0;      // Передаточное число клина
let F_out_2 = 0.0;  // Cила F_out_2 подъема клина, кг


        /* function riseThread() */
    function riseThread() { 
    if(debug) console.log(`%c${++num}. Now run: riseThread()`,grn);
    /* присваивание заданных значений переменным */
d = v_input_d.decimal;
P = v_input_P.decimal;
    /* расчеты */
d2 = d - (0.6495 * P);              /* Диаметр средний d2 */
L2 = d2 * Math.PI;                  /* Длина окружности L2 (см. рисунок а) */
A_rad = Math.atan( P / L2 );        /* Угол подъема резьбы в радианах */
A_grad = A_rad * _180_divide_Pi_;   /* Угол подъема резьбы в градусах */
    /* показ результатов расчетов */
v_cell_d2.textContent = d + ' - ( 0.6495 x ' + P + ' ) = ' + d2.toFixed(3);
v_cell_L2.textContent = _Pi_ + ' x ' + d2.toFixed(3) + ' = ' + L2.toFixed(3);
// if(P) {
    v_cell_A_rad.textContent = 'Atan( ' + P + ' / ' + L2.toFixed(3) + ' ) = ' + A_rad.toFixed(5);
    v_cell_A_grad.textContent = A_rad.toFixed(5) + ' x 57.29577 = ' + A_grad.toFixed(5);
// }
} // function riseThread()


        /* function axeForce() */
    function axeForce() { 
    if(debug) console.log(`%c${++num}. Now run: axeForce()`,grn);
    // console.log(`B_grad = ${B_grad}`);
    /* присваивание заданных значений переменным */
L_lever = v_input_L_lever.decimal;
F_in = v_input_F_in.decimal;
B_grad = v_input_angle_B.decimal;
    /* расчеты */
L_F_in = 2 * L_lever * Math.PI; // L_F_in = длина окружности с радиусом = L_lever
N = L_F_in / P;                 // Передаточное отношение
F_out = F_in * N;               // Cила F_out по оси винта
h_k = P * Math.tan(B_grad / _180_divide_Pi_); // Подъем клина за оборот винта, мм  // console.log(`h_k = ${h_k}`);
N_k = P / h_k;          // Передаточное число клина
F_out_2 = F_out * N_k;  // Cила F_out_2 подъема клина, кг
    /* показ результатов расчетов */
v_cell_L_F_in.textContent = '2 x ' + L_lever + ' x ' + _Pi_ + ' = ' + L_F_in.toFixed(2);
v_cell_N.textContent = L_F_in.toFixed(2) + ' / ' + P + ' = ' + N.toFixed(2);
/* if(F_in) */ v_cell_F_out.textContent = F_in + ' x ' + N.toFixed(2) + ' = ' + F_out.toFixed(2);
// if(B_grad) {
    v_cell_h_k.textContent = P + ' x Tan( ' + B_grad + ' / 57,2957 ) = ' + h_k.toFixed(5);
    v_cell_N_k.textContent = P + ' / ' + h_k.toFixed(5) + ' = ' + N_k.toFixed(2);
    v_cell_F_out_2.textContent = F_out.toFixed(2) + ' x ' + N_k.toFixed(2) + ' = ' + F_out_2.toFixed(2);
// }
} // function axeForce()