'use strict';
window.addEventListener("load",page_onload); // onLoad
function page_onload() { // Обработчик события загрузки страницы
    let net = window.navigator.onLine;
    console.log("\n%c Страница загружена;  Наличие инета = " + net, 'color: green; font-weight: bold; font-size: 1.4em;');  
} // function page_onload()
// ****************************************************************************
    // HTML Input 1
let v_input_F = document.getElementById("input_F");         // HTML Input
let v_input_A = document.getElementById("input_A");         // HTML Input
    // HTML OutPut 1
let v_cell_d2 = document.getElementById("cell_d2");         // HTML OutPut
let v_cell_L2 = document.getElementById("cell_L2");         // HTML OutPut
let v_cell_A_rad = document.getElementById("cell_A_rad");   // HTML OutPut
let v_cell_A_grad = document.getElementById("cell_A_grad"); // HTML OutPut


const _180_divide_Pi_ = 180 / Math.PI;  // = 57,29577951
const _Pi_ = 3.14159;
    // 1 IN
let d = 0.0;        // Диаметр наружный d
let P = 0.0;        // Шаг резьбы P
    // 1 OUT
let d2 = 0.0;       // Диаметр средний d2
let L2 = 0.0;       // Длина окружности L2 (см. рисунок а) среднего диаметра d2
let A_rad = 0.0;    // Угол подъема резьбы в радианах
let A_grad = 0.0;   // Угол подъема резьбы в градусах


        /* function sol() */
function sol() {
    console.log(`Now run: sol();  this.id = ${this.id}`);
switch (this.id) {
    case 'input_F':
        riseThread();        
        break;
    case 'input_A':
        riseThread();        
        break;    
    default:
        break;
} // switch (inp)
} // function sol()


        /* function riseThread() */
    function riseThread() { // console.log(`Now run: riseThread()`);
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
    function axeForce() { //console.log(`Now run: axeForce()`); // console.log(`B_grad = ${B_grad}`);
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