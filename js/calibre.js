'use strict';

var v_in  = document.getElementById("input_calibre");   // ссылка на HTML Input
var v_out = document.getElementById("calibre_output");  // ссылка на HTML Output

v_in.addEventListener("input",Event_Input_Num); // Decimal number

   // Объект калибр !!!!!!!
const calibre = {
    calibreINCH: 0,   // 
    calibreMM: 0,     //    
    eval_calibre: function () {
        this.calibreMM = (this.calibreINCH / 100) * 25.4;
    } // function eval_calibre()    
}; // var calibre


    // Событие ввод числа
function Event_Input_Num(event) {
    // console.log("\nEvent type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id + "; this.value = " + this.value);
    if((this.value==='')||((this.value = checkFix(this.value))==='')) { // checkFix() и вызываемые далее функции - в файле hello_input.js
        v_out.innerHTML = '0.00';
        return false;   // Если все символы удалены - maybe by input type = deleteContentBackward
}   // if(this.value==='')
    calibre.calibreINCH = parseFloat(this.value);
    calibre.eval_calibre();
    Output_Calibre();
}   // function Event_Input_Num()


    // Вывод калибра в мм
function Output_Calibre() {
    v_out.textContent = calibre.calibreMM.toFixed(2);
}   // function Output_Calibre()