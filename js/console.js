'use strict';

const att = 'color: darkorange; font-weight: bold; font-size: 1.4em;'; // attention
const grn = 'color: green; font-weight: bold; font-size: 1.4em;';
const blu = 'color: lightblue; font-weight: bold; font-size: 1.4em;';
let num = 0; // для нумерации логов
// if debug == false => no console.log
const debug = true;
// const debug = false;

window.addEventListener("load",page_onload); // onLoad
    // HTML Input 1
let v_input_F = document.getElementById("input_F"); // HTML Input
v_input_F.run=solN2N1;
    if(debug) console.dir(v_input_F);
    if(debug) console.dir(v_input_F.run);
let v_input_A = document.getElementById("input_A"); // HTML Input
v_input_A.run=solN2N1;
    if(debug) console.dir(v_input_A);
    if(debug) console.dir(v_input_A.run);

    // HTML OutPut 1
let v_cell_N2 = document.getElementById("cell_N2"); // HTML OutPut
let v_cell_N1 = document.getElementById("cell_N1"); // HTML OutPut
    // LETTERS
let v_F_left  = document.getElementById("F_left");
let v_F_right = document.getElementById("F_right");
let v_N1 = document.getElementById("N1");
let v_N2 = document.getElementById("N2");
let v_Alfa = document.getElementById("Alfa");



const _180_divide_Pi_ = (180/Math.PI).toFixed(5);   // == 57,29577
const _Pi_ = Math.PI.toFixed(5);                    // ==  3,14159
    // 1 IN
let F = 0.0;        // Сила наружная F
let A = 0.0;        // Угол A
    // 1 OUT
let N2 = 0.0;       // Сила в стержне N2
let N1 = 0.0;       // Сила в стержне N1


        /* function riseThread() */
    function solN2N1() { 
    if(debug) console.log(`%c${++num}. Now run: solN2N1()`,att);
    /* присваивание заданных значений переменным */
    F = v_input_F.decimal;
v_F_left.textContent  = `F=${F} kg`;
v_F_right.textContent = `F=${F} kg`;
    A = v_input_A.decimal;
v_Alfa.textContent = `\u03B1=${A}\u00B0`;
// console.log(`A = ${A}`);
if(A > 89) {
    v_input_A.value = 45;
    v_input_A.decimal = 45;
    A = v_input_A.decimal;
    v_Alfa.textContent = `\u03B1=${A}\u00B0`;
}
if(A==0) {
    v_N2.textContent  = `N\u2082=\u221E`;
    v_N1.textContent  = `N\u2081=\u221E`;
    v_cell_N2.textContent = '0 < Angle \u03B1 \u2264 89';    
    v_cell_N1.textContent = '0 < Angle \u03B1 \u2264 89';    
    return
};
if(F==0) {
    v_N2.textContent  = `N\u2082=0.000 kg`;
    v_N1.textContent  = `N\u2081=0.000 kg`;
    v_cell_N2.textContent = 'Need force F';
    v_cell_N1.textContent = 'Need force F';
    return
};
    /* расчеты */
N2 = F / Math.sin( A / _180_divide_Pi_ );
v_N2.textContent  = `N\u2082=${N2.toFixed(3)} kg`;
N1 = F * ( 1 / Math.tan( A / _180_divide_Pi_) );
v_N1.textContent  = `N\u2081=${N1.toFixed(3)} kg`;

v_cell_N2.textContent = F + ' / ' + Math.sin( A / _180_divide_Pi_ ).toFixed(5) + ' = ' + N2.toFixed(3);
v_cell_N1.textContent = F + ' x ' + ( 1 / Math.tan( A / _180_divide_Pi_)).toFixed(5) + ' = ' + N1.toFixed(3);


} // function solN2N1()

function page_onload() { // Обработчик события загрузки страницы
    let net = window.navigator.onLine;
    console.log(`%c${++num}. Страница загружена;  Наличие инета = ` + net, att);
    // v_input_A.value = 30;
    // v_input_A.decimal = 30;
} // function page_onload()

