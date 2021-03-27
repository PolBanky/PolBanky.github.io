'use strict';
window.addEventListener("load",page_onload); // onLoad
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
    v_cell_N2.textContent = 'Need angle A';    
    v_cell_N1.textContent = 'Need angle A';    
    return
};
// if(F==0) {
//     v_cell_N2.textContent = 'Need force F';
//     v_cell_N1.textContent = 'Need force F';
//     return
// };
    /* расчеты */
N2 = F / Math.sin( A / _180_divide_Pi_ );
N1 = F * ( 1 / Math.tan( A / _180_divide_Pi_) );
v_cell_N2.textContent = F + ' / ' + Math.sin( A / _180_divide_Pi_ ).toFixed(5) + ' = ' + N2.toFixed(3);
v_cell_N1.textContent = F + ' x ' + ( 1 / Math.tan( A / _180_divide_Pi_)).toFixed(5) + ' = ' + N1.toFixed(3);

} // function solN2N1()

function page_onload() { // Обработчик события загрузки страницы
    let net = window.navigator.onLine;
    console.log("%c Страница загружена;  Наличие инета = " + net, 'color: green; font-weight: bold; font-size: 1.4em;');
    // v_input_A.value = 30;
    // v_input_A.decimal = 30;
} // function page_onload()

