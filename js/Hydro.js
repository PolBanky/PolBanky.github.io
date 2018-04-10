//"use strict";
//var msg1="Загружен файл js_01.js";
//window.alert(msg1);
// window.alert( location.href );

// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ !!!
var koef_mm_cm;
var koef_N_kg;
// end of - ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ !!!


// Выбор единицы измерения длины
function eval_koef_mm_cm() {
    switch (mm_or_cm.value) // mm_or_cm - это select из stretch.html
    {
        case 'mm':
            koef_mm_cm = 1;
            //window.alert("Myswitch = mm");
            break;
        case 'cm':
            koef_mm_cm = 10;
            //window.alert("Myswitch = cm");
            break;
        default:
            window.alert("Myswitch = default");
    } // switch(ch)
} // function eval_koef_N_kg()


// Выбор единицы измерения массы
function eval_koef_N_kg() {
    switch (N_or_kg.value) // N_or_kg - это select из stretch.html
    {
        case 'n':
            koef_N_kg = 1;
            // window.alert("Myswitch = N");
            break;
        case 'kg':
            koef_N_kg = 10;
            // window.alert("Myswitch = KG");
            break;
        default:
        window.alert("Myswitch = default");
    } // switch(ch)    
} // function eval_koef_N_kg()


// Объект цилиндр !!!!!!!
var cil = {
    dia_ex: 0, // external diameter, mm
    dia_in: 0, // internal diameter, mm
    force: 0,  // force in normal cut, N
    area: 0,   // area of nofmal cut, mm2
    stress: 0, // stress in normal cut, N/mm2 (MPa)
    eval_area: function () // расчет площади круга в мм2
    {
        window.alert("dia_ex == " + this.dia_ex + ", and dia_in == " + this.dia_in);
       if (this.dia_ex > this.dia_in) {
            this.area = ((Math.PI * Math.pow(this.dia_ex, 2)) - (Math.PI * Math.pow(this.dia_in, 2))) / 4;
        } // area of nofmal cut, mm2
        //else 
        //{ this.area = 0; }
    }, // function eval_area()
    eval_stress: function () // расчет напряжения
    {
        this.stress = this.force / this.area; // stress in normal cut, N/mm2
    } // function eval_stress()
}; // var  cil


// Вывод площади сечения
function Output_Area() {
    var areaForOutput = cil.area / Math.pow(koef_mm_cm, 2);
    document.getElementById('area_output').innerHTML = areaForOutput.toFixed(3);
}   // Output_Area


// Вывод напряжения в сечении
function Output_Stress() {
    document.getElementById('stress_output').innerHTML = cil.stress.toFixed(3);
}   // Output_Stress


// Событие нажатие кнопки Calculate Stress
function Event_PressButton() {
    eval_koef_mm_cm();
    eval_koef_N_kg();
    cil.dia_ex = document.getElementById('input_dia_ex').value;
    cil.dia_in = document.getElementById('input_dia_in').value;
    cil.force = document.getElementById('force_stretch_input').value * koef_N_kg;
    cil.eval_area();
    cil.eval_stress();
    Output_Area();
    Output_Stress();
}   // Event_PressButton


function Event_Select_Profile_Changed() {
    switch(prof.value)
    {
        case 'circle_rod':
        window.open("stretch.html");
        break;
        case 'circle_tube':
        break;
        default:
        window.alert("Event - other select changed");
    }
}   // Event_Select_Profile_Changed


function Event_mm_or_cm_Changed() {
eval_koef_mm_cm();
cil.eval_area();
Output_Area();
}   // Event_mm_or_cm_Changed


function Event_N_or_kg_Changed() {    
var force_tmp = document.getElementById('force_stretch_input').value;
switch (N_or_kg.value) // N_or_kg - это select из stretch.html
{
    case 'n':    
    document.getElementById('force_stretch_input').value = force_tmp*10;        
        break;
    case 'kg':    
    document.getElementById('force_stretch_input').value = force_tmp/10;    
        break;
    default:
    window.alert("Myswitch = default");
}   // switch(ch)
}   // Event_N_or_kg_Changed