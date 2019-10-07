'use strict';
//  ../sopromat/tubeC.html

var v_LOAD_choice = document.getElementById("choice_load");      // HTML Picture
var v_dia_ex      = document.getElementById("input_dia_ex");     // HTML Input
var v_dia_in      = document.getElementById("input_dia_in");     // HTML Input
var v_length      = document.getElementById("input_length");     // HTML Input
var v_St_choice   = document.getElementById("steel_sort");       // HTML Select steel
var v_St_out      = document.getElementById("steel_data");       // HTML Output steel data
var v_LOAD        = document.getElementById("input_LOAD");       // HTML Input
var v_LOAD_lbl    = document.getElementById("label_input_LOAD"); // HTML Label

var v_buttonRUN   = document.getElementById("buttonRUN");        // HTML Button RUN

var v_calc_stress = document.getElementById("how_calc_stress");  // HTML Output
var v_out_stress  = document.getElementById("output_stress");    // HTML Output
var v_out_area    = document.getElementById("output_area");      // HTML Output
var v_out_wx      = document.getElementById("output_wx");        // HTML Output
var v_out_wp      = document.getElementById("output_wp");        // HTML Output
var v_out_thick   = document.getElementById("output_thick");     // HTML Output
var v_out_massa   = document.getElementById("output_massa");     // HTML Output
var v_out_bend_M  = document.getElementById("output_bend_M");    // HTML Output
var v_lbl_bend_M  = document.getElementById("label_bend_M");     // HTML Label

window.addEventListener("load",page_onload);                     // onLoad
v_LOAD_choice.addEventListener("click",Event_F_choice);          // Picture
v_dia_ex.addEventListener("input",inputIDec);                    // Input
v_dia_in.addEventListener("input",inputIDec);                    // Input
v_length.addEventListener("input",inputIDec);                    // Input
v_St_choice.addEventListener("change",Event_St_choice);          // Select
v_LOAD.addEventListener("input",inputIDec);                      // Input
v_buttonRUN.addEventListener("click",Event_click_Button);        // Клик на кнопке

//**********************************************************************
// 0  steelName = a1;                 // Марка стали
// 1  ultimate_Strength = a2;         // Временное сопротивление
// 2  yield_Strength = a3;            // Предел текучести
// 3  static_Stretch_Stress_Max = b1; // Stretch - растяжение
// 4  static_Bend_Stress_Max = c1;    // Bend - изгиб
// 5  static_Twist_Stress_Max = d1;   // Twist - кручение
// 6  static_Cut_Stress_Max = e1;     // Cut - срез

var steels = [
//     0               1      2     3       4       5      6 
["сталь 3         ", 370.0, 245.0, 125.0, 150.0,  95.0,  75.0],  // 0	Сталь 3
["сталь 20 (Н)    ", 420.0, 250.0, 140.0, 170.0, 105.0,  85.0],  // 1   Сталь 20 (Н)
["сталь 20 (Ц-В59)", 500.0, 300.0, 165.0, 200.0, 125.0, 100.0],  // 2   Сталь 20 (Ц-В59)
["сталь 45 (Н)    ", 610.0, 360.0, 200.0, 240.0, 150.0, 125.0],  // 3   Сталь 45 (Н)
["сталь 45 (У)    ", 750.0, 450.0, 240.0, 290.0, 185.0, 145.0],  // 4   Сталь 45 (У)
["сталь 45 (М35)  ", 900.0, 650.0, 300.0, 360.0, 230.0, 185.0],  // 5   Сталь 45 (М35)
["сталь 45 (В42)  ",1000.0, 700.0, 300.0, 360.0, 230.0, 185.0],  // 6   Сталь 45 (В42)
["сталь 45 (В48)  ",1200.0, 950.0, 400.0, 480.0, 300.0, 240.0],  // 7   Сталь 45 (В48)
["сталь 45 (ТВЧ56)", 750.0, 450.0, 240.0, 290.0, 185.0, 145.0],  // 8   Сталь 45 (ТВЧ56)
["сталь 40Х (Н)   ", 630.0, 330.0, 200.0, 240.0, 150.0, 120.0],  // 9   Сталь 40Х (Н)
["сталь 40Х (У)   ", 800.0, 650.0, 270.0, 320.0, 200.0, 160.0],  // 10  Сталь 40Х (У)
["сталь 40Х (М39) ",1100.0, 900.0, 200.0, 450.0, 280.0, 230.0],  // 11  Сталь 40Х (М39)
["сталь 40Х (М48) ",1300.0,1100.0, 440.0, 530.0, 330.0, 270.0],  // 12  Сталь 40Х (М48)
["сталь 09Г2С	  ", 500.0, 350.0, 170.0, 200.0, 125.0, 100.0]   // 13  Сталь 09Г2С
];
//**********************************************************************


var LOAD_sort = -1;
var LOAD_sort_txt = ["При растяжении ", "При изгибе ", "При кручении ", "При срезе "];

    // концепт: размеры в mm, площадь в mm2, сила в N, напряжение в N/mm2 (MPa)
var cil = {     // Объект цилиндр !!!!!!!
    dia_ex: 0,          // external diameter, mm
    dia_in: 0,          // internal diameter, mm
    lenght: 0,          // lenght, mm
    density: 0.00782,   // density, g/mm3
    force: 0,           // force, N
    moment: 0,          // moment, kg*mm
    PiDiv16: 0.19634954, // Pi/16
    PiDiv32: 0.09817477, // Pi/32    
area: function() {          // расчет площади круга в mm2        
    if (this.dia_ex > this.dia_in) {
        return ((Math.PI * Math.pow(this.dia_ex, 2)) - (Math.PI * Math.pow(this.dia_in, 2))) / 4;  // mm2
    } else return 0;
},      // area() of nofmal cut, mm2
w_axial: function() {       // расчет момента сопротивления осевого в mm3
    return Math.pow(this.dia_ex, 3.0) * this.PiDiv32 * (1.0 - Math.pow((this.dia_in / this.dia_ex), 4.0));
},      // w_axial()
w_polar: function() {       // расчет момента сопротивления полярного в mm3
    return Math.pow(this.dia_ex, 3.0) * this.PiDiv16 * (1.0 - Math.pow((this.dia_in / this.dia_ex), 4.0));
},      // w_polar()
stress: function() {        // S T R E S S  !!!  расчет напряжения в MPa (N/mm2)
    var t = 0;
        if(this.area() == 0)
            return 0;
        else {
            switch (LOAD_sort) {                
        case 0:    // Stretch - растяжение  // console.log('LOAD_sort == ' + LOAD_sort);
            t = this.force / this.area();    //  сила растяжения N / площадь сечения mm2  //  v_calc_stress
            v_calc_stress.innerText =
            "Напряжение растяжения \u03C3, MPa (N/mm\u00B2) = " +
            "\nСила растяжения " + this.force + " N / Площадь сечения " + this.area().toFixed(2) + " mm" + "\u00B2  = " + t.toFixed(4) + " MPa";
            return t;
        case 1:    // Bend - изгиб  // console.log('LOAD_sort == ' + LOAD_sort);
            t = this.bend_moment() / this.w_axial();
            v_calc_stress.innerText =
            "Напряжение изгиба \u03C3, MPa (N/mm\u00B2) = " +
            "\nМомент изгиба " + this.bend_moment() + " N\u00D7mm / Момент сопротивления осевой " + this.w_axial().toFixed(2) + " mm" + "\u00B3  = " +
            t.toFixed(4) + " MPa";
            return t;
        case 2:    // Twist - кручение // console.log('LOAD_sort == ' + LOAD_sort);
            t = this.force / this.w_polar(); // this.force = момент крутящий в этом контексте
            v_calc_stress.innerText =
            "Напряжение кручения \u03C4, MPa (N/mm\u00B2) = " +
            "\nМомент кручения " + this.force + " N\u00D7mm / Момент сопротивления полярный " + this.w_polar().toFixed(2) + " mm" + "\u00B3  = " +
            t.toFixed(4) + " MPa";
            return t;
        case 3:    // Cut - срез   // console.log('LOAD_sort == ' + LOAD_sort);
            t = this.force / this.area();
            v_calc_stress.innerText =
            "Напряжение среза \u03C3, MPa (N/mm\u00B2) = " +
            "\nСила среза " + this.force + " N / Площадь сечения " + this.area().toFixed(2) + " mm" + "\u00B2  = " + t.toFixed(4) + " MPa";
            return t;    //  сила среза / площадь сечения   // break;         
        default:
                break;
            } // switch
        }     // else
    },        // stress: function() in N/mm2 (MPa)
    thickness: function() {    // расчет толщины стенки в mm        
        if (this.dia_ex > this.dia_in) {
            return (this.dia_ex - this.dia_in) / 2;  // mm
        } else return 0;
    },      // function thickness()
    volume: function() {    // расчет объема трубы в mm3
            return this.area() * this.lenght;  // mm3
    },      // volume()
    massa: function() {    // расчет массы трубы в gramm
            return this.volume() * this.density;  // gr
    },      // mass()
    bend_moment: function() {    // изгибающий момент: force (N) x length (mm) => N x mm
            return this.force * this.lenght;  // N x mm
    },      // mass()
        // OUTPUT
    output_stress: function() {
        v_out_stress.innerHTML = this.stress().toFixed(4);        // N/mm2
    },      // output_stress()
    output_area: function() {
        v_out_area.innerHTML = (0.01 * this.area()).toFixed(4);   // mm2 -> cm2
    },      // output_area()
    output_w_axial: function() {
        v_out_wx.innerHTML = (0.001 * this.w_axial()).toFixed(4); // mm3 -> cm3
    },      // output_w_axial()
    output_w_polar: function() {
        v_out_wp.innerHTML = (0.001 * this.w_polar()).toFixed(4); // mm3 -> cm3
    },      // output_w_axial()
    output_thick: function() {
        v_out_thick.innerHTML = this.thickness().toFixed(4);      // mm
    },      // output_thick()
    output_massa: function() {
        v_out_massa.innerHTML = (0.001 * this.massa()).toFixed(4);// g -> kg
    },      // output_massa()
    output_bend_moment: function() {
        v_out_bend_M.innerHTML = (0.0001 * this.bend_moment()).toFixed(4); // 
    },      // output_bend_moment()
    toString: function() {  // overload function toString()
        return 'It\'s cil.toString(): dia_ex = ' + this.dia_ex + '; dia_in = ' + this.dia_in
    }       // toString: function()
}           // var cil


function page_onload() {
    Event_F_choice();  
}   // page_onload()


    // для размеров в миллиметрах
function evaluate(val) {
    if(val == '') return 0;
    else return parseFloat(val);
}   // evaluate(val)


    // для сил и моментов
function evaluateLOAD(val) {
        var v;
    if(val == '') {
        cil.force = 0;
        cil.moment = 0;
    }
    else { v = parseFloat(val);
        switch(LOAD_sort) {
    case 0:         // Растяжение
        cil.force = v * 10; // kg -> N
        break;      
    case 1:         // Изгиб
        cil.force = v * 10; // kg -> N
        cil.moment = cil.force * cil.lenght; // kg * mm
        break;
    case 2:         // Кручение
        cil.moment = v * 10;// kg * mm -> N * mm   
        break;
    case 3:         // Срез
        cil.force = v * 10; // kg -> N   
        break;    
    default:
        break;
    }   // switch
}       // else    
    // return v;
}   // evaluate(val)


    // Выбор типа нагружения детали
function Event_F_choice() {
    if(LOAD_sort < 3) {
        LOAD_sort++;
    } else LOAD_sort = 0;
    switch (LOAD_sort) {
        case 0:     // Растяжение
    v_LOAD_choice.src    = "../images/pic128stretch.svg";
    v_LOAD_choice.title  = "Растяжение";
    v_LOAD.placeholder  = "Stretch Force";
    v_LOAD_lbl.innerHTML = " Stretch Force F, kg";
            break;
        case 1:     // Изгиб
    v_LOAD_choice.src    = "../images/pic128bend.svg";
    v_LOAD_choice.title  = "Изгиб";
    v_LOAD.placeholder  = "Bend Force";
    v_LOAD_lbl.innerHTML = " Bend Force F, kg";
    v_out_bend_M.style.display='inline-block';
    v_lbl_bend_M.style.display='inline';
            break;
        case 2:     // Кручение
    v_LOAD_choice.src    = "../images/pic128twist.svg";
    v_LOAD_choice.title  = "Кручение";
    v_LOAD.placeholder  = "Twist Moment";
    v_LOAD_lbl.innerHTML = " Twist Moment M, kg &#215 mm";    
    v_out_bend_M.style.display='none';
    v_lbl_bend_M.style.display='none';
            break;
        case 3:     // Срез
    v_LOAD_choice.src    = "../images/pic128cut.svg";
    v_LOAD_choice.title  = "Срез";
    v_LOAD.placeholder  = "Cut Force";
    v_LOAD_lbl.innerHTML = " Cut Force F, kg";
            break;    
        default:
            break;
    }   // switch
    Event_St_choice();
}   // Event_LOAD_choice()


    // Выбор материала детали
function Event_St_choice() {
    v_St_out.innerText = 
    "Марка стали = " + steels[v_St_choice.selectedIndex][0] +
    "\nВременное сопротивление = " + steels[v_St_choice.selectedIndex][1] + " MPa" +
    "\nПредел текучести = " + steels[v_St_choice.selectedIndex][2] + " MPa\n" +
    LOAD_sort_txt[LOAD_sort] + " допустимое напряжение = " + steels[v_St_choice.selectedIndex][(LOAD_sort+3)] + " MPa";
}   // Event_St_choice()


    // Очистка окон вывода расчетных значений
function clearOut_sopr() {  // 
    v_out_stress.innerHTML = '0.0000';
    v_out_area.innerHTML   = '0.0000';
    v_out_wx.innerHTML     = '0.0000';
    v_out_wp.innerHTML     = '0.0000';
    v_out_thick.innerHTML  = '0.0000';
    v_out_massa.innerHTML  = '0.0000';
    v_out_bend_M.innerHTML = '0.0000';
}   // clearOut_sopr()


function inputIDec() {    // inputIDec(event)
    // console.log("\nEvent num " + ++i + ", type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id);
    this.value = checkFix(this.value);
}   // inputIDec()


    //  B U T T O N      !!!!!
function Event_click_Button() { // Событие нажатие кнопки Event_click_Button
    cil.dia_ex = evaluate(v_dia_ex.value);  // mm; функция evaluate в файле float.js !!! - уже не там а в этом файле
    cil.dia_in = evaluate(v_dia_in.value);  // mm
    cil.lenght = evaluate(v_length.value);  // mm
    evaluateLOAD(v_LOAD.value);  // cil.force в ньютонах;  * cil.koef_N_kg = для пересчета в ньютоны
if(cil.dia_ex == 0) {  // если нет наружного диаметра
    clearOut_sopr();
    v_dia_ex.focus();
    return false;
}   // if(cil.dia_ex == 0)
if(cil.dia_ex <= cil.dia_in) {   // если внутренний диаметр больше наружного ( или равен )
    v_dia_in.value = '';
    clearOut_sopr();
    v_dia_in.focus();
    return false;
}   // if(cil.dia_ex <= cil.dia_in)
    cil.output_stress();
    cil.output_area();
    cil.output_w_axial();
    cil.output_w_polar();
    cil.output_thick();
    cil.output_massa();
        if(LOAD_sort==1)
    cil.output_bend_moment();
        else
    v_out_bend_M.innerHTML = '0.0000';
}   // Event_click_Button
