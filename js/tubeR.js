'use strict';
//  ../sopromat/stretch.html  //

var v_dia_ex     = document.getElementById("input_dia_ex");          // HTML Input
var v_dia_in     = document.getElementById("input_dia_in");          // HTML Input
var v_F_stretch  = document.getElementById("input_F_stretch");       // HTML Input
var v_N_or_kg    = document.getElementById("N_or_kg");               // HTML Select
var v_buttonRUN  = document.getElementById("buttonRUN");             // HTML Input.Button 
var v_out_thick  = document.getElementById("output_thick");          // HTML Output
var v_out_area   = document.getElementById("output_area");           // HTML Output
var v_mm_or_cm   = document.getElementById("mm_or_cm");              // HTML Select
var v_out_stress = document.getElementById("output_stress");         // HTML Output

v_dia_ex.addEventListener("input",inputIDec);               // Input
v_dia_in.addEventListener("input",inputIDec);               // Input
v_F_stretch.addEventListener("input",inputIDec);            // Input
v_buttonRUN.addEventListener("click",Event_click_Button);   // Нажатие кнопки
v_N_or_kg.addEventListener("change",Event_N_or_kg);         // Select - change  N_kg
v_mm_or_cm.addEventListener("change",Event_mm_or_cm);       // Select - change  mm_cm

var i = 0;      // номера стартов функции события


// концепт: размеры в mm, площадь в mm2, сила в N, напряжение в N/mm2 (MPa)
var cil = {       // Объект цилиндр !!!!!!!
    dia_ex: 0,    // external diameter, mm
    dia_in: 0,    // internal diameter, mm
    force: 0,     // force in normal cut, N
    thickness: 0, // thickness, mm
    area: 0,      // area of nofmal cut, mm2
    stress: 0,    // stress in normal cut, N/mm2 (MPa)
    koef_N_kg: 1,   // koef
    koef_mm_cm: 1,  // koef
    calculate_thick: function() {    // расчет толщины стенки в mm        
       if (this.dia_ex > this.dia_in) {
            this.thickness = (this.dia_ex - this.dia_in) / 2;  // mm
        } else this.thickness = 0;
    },      // function calculate_thick()
    output_thick: function() {
        v_out_thick.innerHTML = this.thickness.toFixed(3);
     },      // function output_area()
    calculate_area: function() {    // расчет площади круга в mm2        
       if (this.dia_ex > this.dia_in) {
            this.area = ((Math.PI * Math.pow(this.dia_ex, 2)) - (Math.PI * Math.pow(this.dia_in, 2))) / 4;  // mm2
        } else this.area = 0;
    },      // function calculate_area()
    output_area: function() {    // расчет площади круга в mm2        
        let areaForOut = this.area / Math.pow(this.koef_mm_cm, 2);   // areaForOut в mm2;  / Math.pow = для пересчета в cm2
        v_out_area.innerHTML = areaForOut.toFixed(3);
     },      // function output_area()
    calculate_stress: function() {             // расчет напряжения в MPa (N/mm2)
        if(this.area == 0) this.stress = 0;
        else this.stress = this.force / this.area;  // stress in normal cut, MPa (N/mm2)
    },   // function calculate_stress()
    output_stress: function() {             // расчет напряжения в MPa (N/mm2)
        v_out_stress.innerHTML = this.stress.toFixed(3);     // N/mm2
    },   // function output_stress()
    toString: function() {  // overload function toString()
        return 'It\'s cil.toString(): dia_ex = ' + this.dia_ex + '; dia_in = ' + this.dia_in
    }   // toString: function()
}       // var cil


function clearAll_sopr() {
    v_out_thick.innerHTML = '0.000';
    v_out_area.innerHTML = '0.000';
    v_out_stress.innerHTML = '0.000';
}   // clearAll_sopr()


function inputIDec(event) {    // inputIDec(event)
    console.log("\nEvent num " + ++i + ", type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id);
// debugger;
    this.value = checkFix(this.value);
}   // inputIDec()


function Event_click_Button(event) {  // Событие нажатие кнопки Calculate Stress
    console.log("\nEvent num " + ++i + ", type == " + event.type + " in Element id == " + event.target.id);
    // console.log("v_dia_ex.value  == " + v_dia_ex.value + "; type == " + typeof(v_dia_ex.value));
    cil.dia_ex = evaluate(v_dia_ex.value);    // mm
    cil.dia_in = evaluate(v_dia_in.value);    // mm
    cil.force = evaluate(v_F_stretch.value) * cil.koef_N_kg;  // cil.force в ньютонах;  * cil.koef_N_kg = для пересчета в ньютоны
if(cil.dia_ex == 0) {  // если нет наружного диаметра
    clearAll_sopr();
    v_dia_ex.focus();
    return false;
}   // if()
if(cil.dia_ex <= cil.dia_in) {   // если внутр. диа. больше наружного или равен
    v_dia_in.value = '';
    clearAll_sopr();
    v_dia_in.focus();
    return false;
}   // if()
// debugger;
    cil.calculate_thick();  // mm
    cil.calculate_area();   // mm2
    cil.calculate_stress(); // N/mm2 (MPa)
    cil.output_thick();
    cil.output_area();
    cil.output_stress();
}   // Event_click_Button


function Event_N_or_kg(event) {  // Event_N_or_kg()
    console.log("\nEvent num " + ++i + ", type = " + event.type + " in Element id == " + event.target.id + "; v_N_or_kg.value = " + v_N_or_kg.value);
    console.log(cil);
        // var force_tmp = v_F_stretch.value;
    switch (v_N_or_kg.value) {  // select
        case 'n':
        cil.koef_N_kg = 1;      
        if(v_F_stretch.value != '')
        v_F_stretch.value = v_F_stretch.value * 10; // кг вв ньютоны
            break;
        case 'kg':
        cil.koef_N_kg = 10;  
        if(v_F_stretch.value != '')        
        v_F_stretch.value = v_F_stretch.value / 10; // ньютоны в кг
            break;
        default:
        console.log("Myswitch = default");
}   // switch()
}   // Event_N_or_kg


function Event_mm_or_cm(event) { // Event_mm_or_cm()
    console.log("\nEvent num " + ++i + ", type = " + event.type + " in Element id == " + event.target.id + "; v_mm_or_cm.value = " + v_mm_or_cm.value);
    console.log(cil);
    switch (v_mm_or_cm.value) {
        case 'mm':
            cil.koef_mm_cm = 1;
            break;
        case 'cm':
            cil.koef_mm_cm = 10;
            break;
        default:
            console.log("Myswitch = default");
    } // switch(ch)
    cil.output_area();
}   // Event_mm_or_cm
