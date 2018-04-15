//"use strict";
// Объект труба ПНД !!!!!!!
var pipe = {
    dia_ex: 0,  // external diameter, mm
    dia_in: 0,  // internal diameter, mm
    sdr: 0,     // SDR
    thickness: 0, // thickness, mm
    
    eval_thickness: function () // расчет толщины стенки трубы в мм
    {   // thickness = dia_ex / sdr
        this.thickness = this.dia_ex / this.sdr; // area of nofmal cut, mm2
    }, // function eval_thickness()    
    eval_dia_in: function () // расчет толщины стенки трубы в мм
    {   // thickness = dia_ex / sdr
        this.dia_in = this.dia_ex - this.thickness * 2; // area of nofmal cut, mm2
    } // function eval_thickness()    
}; // var pipe


// Вывод толщины стенки и внутреннего диаметра трубы
function Output() {
    document.getElementById('output_thickness').innerHTML = pipe.thickness.toFixed(1);
    document.getElementById('output_dia_in').innerHTML = pipe.dia_in.toFixed(1);
} // function Output()


// Событие ввод цифры Calculate Thickness
function Event_Input_Num() {
    pipe.sdr = document.getElementById('SDR_Value').value;
    pipe.dia_ex = document.getElementById('input_dia_ex').value;
    pipe.eval_thickness();
    pipe.eval_dia_in();
    Output();
} // function Event_Input_Num()

function Event_SelectChng() {
    if(pipe.dia_ex > 0) {
    Event_Input_Num();
} // function Event_SelectChng()



}

// Событие нажатие кнопки Calculate Thickness
// function Event_PressButton() {
//     pipe.sdr = document.getElementById('SDR_Value').value;
//     pipe.dia_ex = document.getElementById('input_dia_ex').value;
//     pipe.eval_thickness();
//     Output();
// } // function Event_PressButton()

