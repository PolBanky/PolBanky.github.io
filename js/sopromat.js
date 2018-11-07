'use strict';
//  ../sopromat/stretch.html  //

var v_dia_ex        = document.getElementById("input_dia_ex");          // HTML Input
var v_dia_in        = document.getElementById("input_dia_in");          // HTML Input
var v_force_stretch = document.getElementById("input_force_stretch");   // HTML Input
var v_select_N_kg   = document.getElementById("N_or_kg");               // HTML Select
var v_buttonRUN     = document.getElementById("buttonRUN");             // HTML Input.Button 
var v_out_area      = document.getElementById("output_area");           // HTML Output
var v_select_mm_cm  = document.getElementById("mm_or_cm");              // HTML Select
var v_out_stress    = document.getElementById("output_stress");         // HTML Output

v_dia_ex.addEventListener("input",inputIDec);                       // Input
v_dia_in.addEventListener("input",inputIDec);                       // Input
v_force_stretch.addEventListener("input",inputIDec);                // Input
v_buttonRUN.addEventListener("click",Event_click_Button);           // Нажатие кнопки
v_select_N_kg.addEventListener("change",Event_N_or_kg_Changed);     // Select - change N_kg
v_select_mm_cm.addEventListener("change",Event_mm_or_cm_Changed);   // Select - change mm_cm

var i = 0;          // номера стартов функции события

var koef_N_kg;
var koef_mm_cm;


var cil = {     // Объект цилиндр !!!!!!!
    dia_ex: 0,  // external diameter, mm
    dia_in: 0,  // internal diameter, mm
    force: 0,   // force in normal cut, N
    area: 0,    // area of nofmal cut, mm2
    stress: 0,  // stress in normal cut, N/mm2 (MPa)
    calculate_area: function () {    // расчет площади круга в мм2
        console.log("calculate_area:  dia_ex == " + this.dia_ex + ", dia_in == " + this.dia_in);
       if (this.dia_ex > this.dia_in) {
            this.area = ((Math.PI * Math.pow(this.dia_ex, 2)) - (Math.PI * Math.pow(this.dia_in, 2))) / 4;
        } // area of nofmal cut, mm2  else { this.area = 0; }
    }, // function calculate_area()
    calculate_stress: function () {  // расчет напряжения
        this.stress = this.force / this.area; // stress in normal cut, N/mm2
    } // function calculate_stress()
}; // var  cil


function inputIDec(event) {    // inputIDec(event)
    console.log("\nEvent num " + ++i + ", type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id);
if((this.value==='')||((this.value = checkFix(this.value))==='')) {
    clearAll();
    return false;   // Если все символы удалены - maybe by input type = deleteContentBackward
}   // if(this.value==='')
}   // function inputIDec


function Event_click_Button(event) {  // Событие нажатие кнопки Calculate Stress
    console.log("\nEvent num " + ++i + ", type == " + event.type + " in Element id == " + event.target.id);
    eval_koef_N_kg();
    eval_koef_mm_cm();
    // console.log("v_dia_ex.value == " + v_dia_ex.value + "; type == " + typeof(v_dia_in.value));
if(v_dia_ex.value == '') {
    v_dia_ex.focus();
    // event.preventDefault();
    return false; 
}   // if
    cil.dia_ex = v_dia_ex.value;
if(v_dia_ex.value < v_dia_in.value)
    v_dia_in.value = 0;
    cil.dia_in = v_dia_in.value;
    cil.force = v_force_stretch.value * koef_N_kg;
    cil.calculate_area();
    cil.calculate_stress();
    Output_Area();
    Output_Stress();
}   // Event_click_Button


function Event_N_or_kg_Changed() {  // Event_N_or_kg_Changed()
    console.log("\nEvent num " + ++i + ", type = " + event.type + " in Element id == " + event.target.id + "; v_select_N_kg.value = " + v_select_N_kg.value);
        var force_tmp = v_force_stretch.value;
    switch (N_or_kg.value) {
        case 'n':    
        v_force_stretch.value = force_tmp * 10;        
            break;
        case 'kg':    
        v_force_stretch.value = force_tmp / 10;    
            break;
        default:
        console.log("Myswitch = default");
    }   // switch(ch)
    }   // Event_N_or_kg_Changed
    
    
function Event_mm_or_cm_Changed() { // Event_mm_or_cm_Changed()
    console.log("\nEvent num " + ++i + ", type = " + event.type + " in Element id == " + event.target.id + "; v_select_mm_cm.value = " + v_select_mm_cm.value);
    eval_koef_mm_cm();
    cil.calculate_area();
    Output_Area();
    }   // Event_mm_or_cm_Changed


function eval_koef_N_kg() { // Выбор единицы измерения массы
    switch (v_select_N_kg.value) {
        case 'n':
            koef_N_kg = 1;
            break;
        case 'kg':
            koef_N_kg = 10;
            break;
        default:
        console.log("Myswitch = default");
    } // switch(ch)
    console.log('eval_koef_N_kg = ' + v_select_N_kg.value);
} // function eval_koef_N_kg()


function eval_koef_mm_cm() {    // Выбор единицы измерения длины
    switch (v_select_mm_cm.value) {
        case 'mm':
            koef_mm_cm = 1;
            break;
        case 'cm':
            koef_mm_cm = 10;
            break;
        default:
            console.log("Myswitch = default");
    } // switch(ch)
    console.log('eval_koef_mm_cm = ' + v_select_mm_cm.value);
} // function eval_koef_N_kg()


function Output_Area() {    // Вывод площади сечения
    let areaForOutput = cil.area / Math.pow(koef_mm_cm, 2);
    v_out_area.innerHTML = areaForOutput.toFixed(3);
}   // Output_Area


function Output_Stress() {  // Вывод напряжения в сечении
    v_out_stress.innerHTML = cil.stress.toFixed(3);
}   // Output_Stress


// function Event_Select_Profile_Changed() {
//     switch(prof.value)
//     {
//         case 'circle_rod':
//         window.open("stretch.html");
//         break;
//         case 'circle_tube':
//         break;
//         default:
//         window.alert("Event - other select changed");
//     }
// }   // Event_Select_Profile_Changed
