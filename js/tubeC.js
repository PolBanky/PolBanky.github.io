'use strict';
//  ../sopromat/tubeC.html
    // Переменные = ссылки на HTML элементы
var v_LOAD_choice = document.getElementById("choice_load");      // HTML Picture - меняются по клику
var v_dia_ex      = document.getElementById("input_dia_ex");     // HTML Input
var v_dia_in      = document.getElementById("input_dia_in");     // HTML Input
var v_length      = document.getElementById("input_length");     // HTML Input length
var v_St_choice   = document.getElementById("steel_sort");       // HTML Select steel - меняется при выборе другой стали из списка
var v_St_out      = document.getElementById("steel_data");       // HTML Output steel data
var v_LOAD        = document.getElementById("input_LOAD");       // HTML Input
var v_LOAD_lbl    = document.getElementById("label_input_LOAD"); // HTML Label - лебел меняется при смене нагрузки
var v_N_or_kg     = document.getElementById("N_or_kg");          // HTML Select
var v_buttonRUN   = document.getElementById("buttonRUN");        // HTML Button RUN
var v_calc_stress = document.getElementById("how_calc_stress");  // HTML Output
var v_out_stress  = document.getElementById("output_stress");    // HTML Output
var v_out_area    = document.getElementById("output_area");      // HTML Output
var v_out_wx      = document.getElementById("output_wx");        // HTML Output
var v_out_wp      = document.getElementById("output_wp");        // HTML Output
var v_out_thick   = document.getElementById("output_thick");     // HTML Output
var v_out_massa   = document.getElementById("output_massa");     // HTML Output
var v_out_bend_M  = document.getElementById("output_bend_M");    // HTML Output - поле вывода момента изгиба находится справа от поля ввода силы
var v_lbl_bend_M  = document.getElementById("label_bend_M");     // HTML Label  - лебел поля вывода момента изгиба

    // События на HTML элементах (и ссылки на функции - обработчики событий)
window.addEventListener("load",page_onload);                     // onLoad
v_LOAD_choice.addEventListener("click",Event_LOAD_choice);       // Pictures changes
v_dia_ex.addEventListener("input",inputIDec);                    // Input
v_dia_in.addEventListener("input",inputIDec);                    // Input
v_length.addEventListener("input",inputIDec);                    // Input
v_St_choice.addEventListener("change",Event_STEEL_choice);       // Select
v_LOAD.addEventListener("input",inputIDec);                      // Input
v_N_or_kg.addEventListener("change",Event_N_or_kg);              // Select - change  N_kg
v_buttonRUN.addEventListener("click",Event_click_Button);        // Клик на кнопке
    // Переменные массивы, индексы, и всякое такое
var LOAD_sort = -1; // выбранный тип нагрузки
var LOAD_sort_txt = ["При растяжении ", "При изгибе ", "При кручении ", "При срезе "]; // для вывода параметров стали

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

    //*****  КОНЦЕПТ !!!!! : размеры в mm, площадь в mm2, сила в N, напряжение в N/mm2 (MPa), масса в кг  *****//
    // Объект цилиндр !!!
var cil = {
    PiDiv16: 0.19634954,// Pi/16
    PiDiv32: 0.09817477,// Pi/32    
    density: 0.00782,   // density, g/mm3  (7.82 g/cm3)
    koef_N_kg: 1.0,
dia_ex: function() {
console.table("dia_ex(" + v_dia_ex.value + ")");
    if((v_dia_ex.value !='') & (v_dia_ex.value !='0')) {
        return parseFloat(v_dia_ex.value);  // mm
    } // if((v_dia_ex.value !='') & (v_dia_ex.value !='0'))
    else {
        v_calc_stress.innerText = 'Введите наружный диаметр';
        v_dia_ex.value = '';
        v_dia_ex.focus();
        return 0;
    } // else
}, // external diameter, mm
dia_in: function() {
console.log("dia_in(" + v_dia_in.value + ")");
    if((v_dia_in.value !='') & (v_dia_in.value !='0')) {
       let v = parseFloat(v_dia_in.value);
       if(this.dia_ex() <= v) {
        v_calc_stress.innerText = 'Введите внутренний диаметр корректно';
        v_dia_in.value = '';
        v_dia_in.focus();
        return 0;
       } // if(this.dia_ex() <= v)
       else return v;
    } // if((v_dia_in.value !='') & (v_dia_in.value !='0'))
    else return 0;
}, // internal diameter, mm
length: function() {
console.log("length(" + v_length.value + ")");
    if((v_length.value !='') & (v_length.value !='0')) {
        return parseFloat(v_length.value);  // mm
    } // if((v_length.value !='') & (v_length.value !='0'))
    else {
        v_length.value = '';
        return 0;
    } // else
}, // length, mm
load: function() {
console.log("LOAD(" + v_LOAD.value + ")");
    if((v_LOAD.value !='') & (v_LOAD.value !='0')) {
    let varload = 0;
    let v = parseFloat(v_LOAD.value);  // N or N*mm
    switch(LOAD_sort) {
        case 0:         // Растяжение
        varload = v * this.koef_N_kg;    // N
            break;      
        case 1:         // Изгиб
        varload = v * this.koef_N_kg * this.length(); // N*mm
            break;
        case 2:         // Кручение
        varload = v;    // N*mm   
            break;
        case 3:         // Срез
        varload = v;    // N   
            break;    
        default:
            break;
        } // switch
    return varload;
    } // if((v_length.value !='') & (v_length.value !='0'))
    else {
        v_LOAD.value = '';
        return 0;
    } // else
}, // load, N or N*mm
area: function() {      // расчет площади круга (кольца) в mm2        
console.log("area()");
    return ((Math.PI * Math.pow(this.dia_ex(), 2)) - (Math.PI * Math.pow(this.dia_in(), 2))) / 4;  // mm2
},      // area() mm2
w_axial: function() {   // расчет момента сопротивления осевого в mm3
console.log("w_axial()");
    return Math.pow(this.dia_ex(), 3.0) * this.PiDiv32 * (1.0 - Math.pow((this.dia_in() / this.dia_ex()), 4.0)); // mm3
},      // w_axial()
w_polar: function() {   // расчет момента сопротивления полярного в mm3
console.log("w_polar()");
    return Math.pow(this.dia_ex(), 3.0) * this.PiDiv16 * (1.0 - Math.pow((this.dia_in() / this.dia_ex()), 4.0)); // mm3
},      // w_polar()
stress: function() {    // S T R E S S  !!!  расчет напряжения в MPa (N/mm2)
console.log("stress( " + LOAD_sort_txt[LOAD_sort] + " )");
    let v = 0;  // технологическая переменная 
        switch (LOAD_sort) {                
    case 0: // Stretch - растяжение
        v = this.load() / this.area(); //сила растяжения (N) / площадь сечения (mm2) == MPa
        v_calc_stress.innerText =
        "Напряжение растяжения \u03C3, MPa (N/mm\u00B2) = " + 
        "\nСила растяжения " + this.load() + " N / Площадь сечения " + this.area().toFixed(2) + " mm" + "\u00B2 = " + v.toFixed(4) + " MPa";
        return v;
    case 1: // Bend - изгиб
        v = this.load() / this.w_axial(); //изгибающий момент (N*mm) / момент сопротивления осевой (mm3) == MPa
        v_calc_stress.innerText =
        "Напряжение изгиба \u03C3, MPa (N/mm\u00B2) = " + 
        "\nМомент изгиба " + this.load() + " N\u00D7mm / Момент сопротивления осевой " + this.w_axial().toFixed(2) + " mm" + "\u00B3 = " + v.toFixed(4) + " MPa";
        v_out_bend_M.innerHTML = this.load().toFixed(1);
        return v;
    case 2: // Twist - кручение
        v = this.load() / this.w_polar(); // this.force = момент крутящий в этом контексте
        v_calc_stress.innerText =
        "Напряжение кручения \u03C4, MPa (N/mm\u00B2) = " + 
        "\nМомент кручения " + this.load() + " N\u00D7mm / Момент сопротивления полярный " + this.w_polar().toFixed(2) + " mm"+"\u00B3  = " + 
        v.toFixed(4) + " MPa";
        return v;
    case 3:    // Cut - срез   // console.log('LOAD_sort == ' + LOAD_sort);
        v = this.load() / this.area();
        v_calc_stress.innerText =
        "Напряжение среза \u03C3, MPa (N/mm\u00B2) = " + 
        "\nСила среза " + this.load() + " N / Площадь сечения " + this.area().toFixed(2) + " mm" + "\u00B2  = " + v.toFixed(4) + " MPa";
        return v;    //  сила среза / площадь сечения   // break;         
        } // switch
},        // stress: function() in N/mm2 (MPa)
thickness: function() {    // расчет толщины стенки в mm        
console.log("thickness()");
    return (this.dia_ex() - this.dia_in()) / 2;  // mm
},      // function thickness()
volume: function() {    // расчет объема трубы в mm3
console.log("volume()");
    return this.area() * this.length();  // mm3
},      // volume()
massa: function() {    // расчет массы трубы в gramm
console.log("massa()");
    return this.volume() * this.density;  // gramm
},      // mass()
        // OUTPUT
    output_stress: function() {
        v_out_stress.innerHTML = this.stress().toFixed(4);        // N/mm2  (MPa)
    },      // output_stress()
    output_area: function() {
    console.log("output_area()");
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
toString: function() {  // overload function toString()
    return 'It\'s cil.toString(): dia_ex = ' + this.dia_ex() + '; dia_in = ' + this.dia_in();
    } // toString: function()
} // var cil


function page_onload() {
    console.log("page_onload()");    
    Event_LOAD_choice();  
}   // page_onload()


    // Обработчик выбора нагрузки (клика на картинке)
function Event_LOAD_choice() {
    console.log("Event_LOAD_choice(); Event type = " + event.type + " in Element id = " + event.target.id + "; LOAD_sort = " + LOAD_sort);
    // console.dir(v_LOAD_choice);
    if(LOAD_sort < 3) {
        LOAD_sort++;
    } else LOAD_sort = 0;
    switch (LOAD_sort) {
        case 0:     // Растяжение
    v_LOAD_choice.setAttribute("src","../images/pic128stretch.svg");
    v_LOAD_choice.title  = "Растяжение";
    v_LOAD.setAttribute("placeholder", "Stretch Force");
    v_LOAD_lbl.innerHTML = " Stretch Force F,";
            break;
        case 1:     // Изгиб
    v_LOAD_choice.setAttribute("src","../images/pic128bend.svg");
    v_LOAD_choice.title  = "Изгиб";
    v_LOAD.setAttribute("placeholder", "Bend Force");
    v_LOAD_lbl.innerHTML = " Bend Force F,";
    v_out_bend_M.style.display='inline-block';  // показать окно вывода момента
    v_lbl_bend_M.style.display='inline';        // показать лебел окна вывода момента
            break;
        case 2:     // Кручение
    v_LOAD_choice.setAttribute("src","../images/pic128twist.svg");
    v_LOAD_choice.title  = "Кручение";
    v_LOAD.setAttribute("placeholder", "Twist Moment");
    v_LOAD_lbl.innerHTML = " Twist Moment M, N &#215 mm";    
    v_out_bend_M.style.display='none';     // скрыть окно вывода момента
    v_lbl_bend_M.style.display='none';     // скрыть лебел окна вывода момента
            break;
        case 3:     // Срез
    v_LOAD_choice.setAttribute("src","../images/pic128cut.svg");
    v_LOAD_choice.title  = "Срез";
    v_LOAD.setAttribute("placeholder", "Cut Force");
    v_LOAD_lbl.innerHTML = " Cut Force F,";
            break;    
        default:
            break;
    }   // switch
    Event_STEEL_choice();
}   // Event_LOAD_choice()


function Event_N_or_kg(event) {  // Event_N_or_kg()
    console.log("\nEvent type = " + event.type + " in Element id == " + event.target.id + "; v_N_or_kg.value = " + v_N_or_kg.value);
    console.log(cil);
        // var force_tmp = v_F_stretch.value;
    switch (v_N_or_kg.value) {  // select
        case 'n':
            cil.koef_N_kg = 1.0;      
            if(v_LOAD.value != '')
            v_LOAD.value = v_LOAD.value * 10; // кг вв ньютоны
                break;
            case 'kg':
            cil.koef_N_kg = 10.0;  
            if(v_LOAD.value != '')        
            v_LOAD.value = v_LOAD.value / 10; // ньютоны в кг
                break;
        default:
        console.log("Myswitch = default");
}   // switch()
}   // Event_N_or_kg


    // Обработчик выбора материала детали
function Event_STEEL_choice() {
console.log("Event_STEEL_choice(); v_St_choice.selectedIndex = " + v_St_choice.selectedIndex);
    v_St_out.innerText = 
    "Марка стали = " + steels[v_St_choice.selectedIndex][0] +
    "\nВременное сопротивление = " + steels[v_St_choice.selectedIndex][1] + " MPa" +
    "\nПредел текучести = " + steels[v_St_choice.selectedIndex][2] + " MPa\n" +
    LOAD_sort_txt[LOAD_sort] + " допустимое напряжение = " + steels[v_St_choice.selectedIndex][(LOAD_sort+3)] + " MPa";
}   // Event_STEEL_choice()


    // Обнуление окон вывода расчетных значений
function clearOut_sopr() {  // 
    console.log("clearOut_sopr()");
    v_out_stress.innerHTML = '0.0000';
    v_out_area.innerHTML   = '0.0000';
    v_out_wx.innerHTML     = '0.0000';
    v_out_wp.innerHTML     = '0.0000';
    v_out_thick.innerHTML  = '0.0000';
    v_out_massa.innerHTML  = '0.0000';
    v_out_bend_M.innerHTML = '0.0000';
}   // clearOut_sopr()


    // inputIDec(event)
function inputIDec() {
console.log("inputIDec(); Event Type = " + event.type + "." + event.inputType + " in HTML_Element id = " + event.target.id + "; this.value = " + this.value + "; Type = " + typeof(this.value));
console.log(event);
    this.value = checkFix(this.value); // checkFix() и вызываемые далее функции - в файле float.js
}   // inputIDec(event)


    // обработчик события  B U T T O N   R U N   !!!!!
function Event_click_Button() { // Событие нажатие кнопки Event_click_Button
console.log("___Event_click_Button() = RUN__!!!__");
console.log("continue RUN:  cil.dia_ex = " + cil.dia_ex() + "; cil.dia_in = " + cil.dia_in() + "; cil.length = " + cil.length());
    clearOut_sopr();
    cil.output_area();
    cil.output_w_axial();
    cil.output_w_polar();
    cil.output_thick();
    cil.output_massa();
    cil.output_stress();  
}   // Event_click_Button
