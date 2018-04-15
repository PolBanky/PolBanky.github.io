//"use strict";
// Объект труба ПНД !!!!!!!
var pipe = {
    dia_ex: 0,  // external diameter, mm
    sdr: 0,     // SDR
    thickness: 0, // thickness, mm
    
    eval_thickness: function () // расчет толщины стенки трубы в мм
    {   // thickness = dia_ex / sdr
        this.thickness = this.dia_ex / this.sdr; // area of nofmal cut, mm2
    } // function eval_area()    
}; // var pipe


// Вывод толщины стенки
function Output_Thickness() {
    document.getElementById('thickness_output').innerHTML = pipe.thickness.toFixed(2);
} // function Output_Thickness()


// Событие ввод цифры Calculate Thickness
function Event_TxtInput() {
    pipe.sdr = document.getElementById('SDR_Value').value;
    pipe.dia_ex = document.getElementById('input_dia_ex').value;
//     window.alert("SDR = " + pipe.sdr);
    pipe.eval_thickness();
    Output_Thickness();
} // function Event_TxtInput()



// Событие нажатие кнопки Calculate Thickness
// function Event_PressButton() {
//     pipe.sdr = document.getElementById('SDR_Value').value;
//     pipe.dia_ex = document.getElementById('input_dia_ex').value;
//     pipe.eval_thickness();
//     Output_Thickness();
// } // function Event_PressButton()

