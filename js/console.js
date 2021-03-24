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
let v_cell_N2 = document.getElementById("cell_N2");         // HTML OutPut
let v_cell_N1 = document.getElementById("cell_N1");         // HTML OutPut


const _180_divide_Pi_ = 180 / Math.PI;  // = 57,29577951
const _Pi_ = 3.14159;
    // 1 IN
let F = 0.0;        // Сила наружная F
let A = 0.0;        // Угол A
    // 1 OUT
let N2 = 0.0;       // Сила в стержне N2
let N1 = 0.0;       // Сила в стержне N1


        /* function sol() */
function sol() {
    console.log(`Now run: sol();  this.id = ${this.id}`);
switch (this.id) {
    case 'input_F':
        solN2N1();        
        break;
    case 'input_A':
        solN2N1();        
        break;    
    default:
        break;
} // switch (inp)
} // function sol()


        /* function riseThread() */
    function solN2N1() { 
        console.log(`Now run: solN2N1()`);
    /* присваивание заданных значений переменным */
F = v_input_F.decimal;
A = v_input_A.decimal;
console.log(`A = ${A}`);
if(A==0) {
    v_cell_N2.textContent = '';    
    v_cell_N1.textContent = '';    
    return
};
/* расчеты */
// N2 = F / sin α
N2 = F / Math.sin( A / _180_divide_Pi_ );
N1 = F * ( 1 / Math.tan( A / _180_divide_Pi_) );
// v_cell_N2.textContent = 'N2 = ' + N2.toFixed(3);
// v_cell_N2.textContent = F + ' / sin( '+ A + ' ) = ' + N2.toFixed(3);
v_cell_N2.textContent = F + ' / ' + Math.sin( A / _180_divide_Pi_ ).toFixed(5) + ' = ' + N2.toFixed(3);
v_cell_N1.textContent = F + ' x ' + ( 1 / Math.tan( A / _180_divide_Pi_)).toFixed(5) + ' = ' + N1.toFixed(3);

// d2 = d - (0.6495 * P);              /* Диаметр средний d2 */
// L2 = d2 * Math.PI;                  /* Длина окружности L2 (см. рисунок а) */
// A_rad = Math.atan( P / L2 );        /* Угол подъема резьбы в радианах */
// A_grad = A_rad * _180_divide_Pi_;   /* Угол подъема резьбы в градусах */
    /* показ результатов расчетов */
// v_cell_d2.textContent = d + ' - ( 0.6495 x ' + P + ' ) = ' + d2.toFixed(3);
// v_cell_L2.textContent = _Pi_ + ' x ' + d2.toFixed(3) + ' = ' + L2.toFixed(3);
// if(P) {
    // v_cell_A_rad.textContent = 'Atan( ' + P + ' / ' + L2.toFixed(3) + ' ) = ' + A_rad.toFixed(5);
    // v_cell_A_grad.textContent = A_rad.toFixed(5) + ' x 57.29577 = ' + A_grad.toFixed(5);
// }
} // function solN2N1()

