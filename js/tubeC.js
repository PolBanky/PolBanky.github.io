'use strict';
//  ../sopromat/tubeC.html

    //***  КОНЦЕПТ !!!  Exist:  
// 1. Объект cil с геометрическими параметрами и материалом и напряжением в материале  
// 2. Объект load приложен извне к объекту cil
    //***  КОНЦЕПТ !!!  
// Размеры в mm, площадь в mm2, сила в N, напряжение в N/mm2 (MPa), масса в кг

let logsView = true;  // вывод в консоль нужен или нет
const format1 = new Intl.NumberFormat('ru-RU',{maximumFractionDigits: 1});
const format2 = new Intl.NumberFormat('ru-RU',{maximumFractionDigits: 2});
const format3 = new Intl.NumberFormat('ru-RU',{maximumFractionDigits: 3});


    // Объект Цилиндр !!!
let cil = {
    _Pi_: '&#960;',  // греческая буква пи
    // _Pi_: 3.14,
    PiDiv16: 0.19634954, // Pi/16
    PiDiv32: 0.09817477, // Pi/32    
    density: 0.00782,    // density, g/mm3  (7.82 g/cm3)
dia_ex: function() {
if(logsView) console.table(`Method cil.dia_ex(${v_dia_ex.value})`); else console.log(`Work without logs`);
    if((v_dia_ex.value !='') & (v_dia_ex.value !='0')) {
        return parseFloat(v_dia_ex.value);  // mm
    } // if((v_dia_ex.value !='') & (v_dia_ex.value !='0'))
    else {
        v_out_Calc_Stress.innerHTML = 'Введите наружный диаметр';
        v_dia_ex.value = '';
        v_dia_ex.focus();
        return 0;
    } // else
}, // external diameter, mm
dia_in: function() {
if(logsView) console.log(`Method cil.dia_in(${v_dia_in.value})`);
    if((v_dia_in.value !='') & (v_dia_in.value !='0')) {
        let v = parseFloat(v_dia_in.value);
        if(this.dia_ex() <= v) {
        v_out_Calc_Stress.innerHTML = 'Введите внутренний диаметр корректно';
        v_dia_in.value = '';
        v_dia_in.focus();
        return 0;
        } // if(this.dia_ex() <= v)
        else return v;
    } // if((v_dia_in.value !='') & (v_dia_in.value !='0'))
    else return 0;
}, // internal diameter, mm
length: function() {
if(logsView) console.log(`Method cil.length(${v_length.value})`);
    if((v_length.value !='') & (v_length.value !='0')) {
        return parseFloat(v_length.value);  // mm
    } // if((v_length.value !='') & (v_length.value !='0'))
    else {
        v_length.value = '';
        return 0;
    } // else
}, // length, mm    
area: function() {      // расчет площади круга (кольца) в mm2        
if(logsView) console.log(`Method cil.area()`);
    return ((Math.PI * Math.pow(this.dia_ex(), 2)) - (Math.PI * Math.pow(this.dia_in(), 2))) / 4;  // mm2
}, // area, mm2
w_axial: function() {   // расчет момента сопротивления осевого в mm3
if(logsView) console.log(`Method cil.w_axial()`);
    return Math.pow(this.dia_ex(), 3.0) * this.PiDiv32 * (1.0 - Math.pow((this.dia_in() / this.dia_ex()), 4.0)); // mm3
}, // w_axial, mm3
w_polar: function() {   // расчет момента сопротивления полярного в mm3
if(logsView) console.log(`Method cil.w_polar()`);
    return Math.pow(this.dia_ex(), 3.0) * this.PiDiv16 * (1.0 - Math.pow((this.dia_in() / this.dia_ex()), 4.0)); // mm3
}, // w_polar, mm3
stress: function() {    // S T R E S S  !!!  расчет напряжения в MPa (N/mm2)
if(logsView) console.log(`Method cil.stress( ${load.selectedLoadTxt[load.selectedLoad]}); load.selectedLoad == ${load.selectedLoad}`);
    let v = 0;  // технологическая переменная

        switch (load.selectedLoad) { // Выбранная нагрузка

    case 0: // Stretch - растяжение
        v = load.loadAction() / this.area(); // сила растяжения (N) / площадь сечения (mm2) = N/mm2 = MPa
        v_out_Calc_Stress.innerHTML =
        `Напряжение растяжения:  F / A = &sigma;, MPa (N/mm<sup>2</sup>) =<br>
        Сила растяжения `+load.loadAction()+` N / Площадь сечения `+format1.format(this.area())+` mm<sup>2</sup> = `+format2.format(v)+` MPa (N/mm<sup>2</sup>)`;
        // v_out_Calc_Stress.innerHTML =
        // "Напряжение растяжения \u03C3, MPa (N/mm\u00B2) = " + 
        // "\nСила растяжения " + load.loadAction() + " N / Площадь сечения " + format2.format(this.area()) + " mm" + "\u00B2 = " + v.toFixed(4) + " MPa (N/mm\u00B2)";
        return v;

    case 1: // Bend - изгиб
        v = load.loadAction() / this.w_axial(); // момент изгибающий (N*mm) / момент сопротивления осевой (mm3) = N/mm2 = MPa
        v_out_Calc_Stress.innerText =
        "Напряжение изгиба \u03C4, MPa (N/mm\u00B2) = " + 
        "\nМомент изгиба "+load.loadAction()+" N\u00D7mm / Момент сопротивления осевой "+this.w_axial().toFixed(2)+" mm"+"\u00B3 = "+v.toFixed(4)+" MPa (N/mm\u00B2)";
        v_out_bend_M.innerHTML = load.loadAction().toFixed(1);
        return v;

    case 2: // Twist - кручение
        v = load.loadAction() / this.w_polar(); // момент крутящий (N*mm) / момент сопротивления полярный (mm3) = N/mm2 = MPa
        v_out_Calc_Stress.innerText =
        "Напряжение кручения \u03C4, MPa (N/mm\u00B2) = " + 
        "\nМомент кручения " + load.loadAction() + " N\u00D7mm / Момент сопротивления полярный " + this.w_polar().toFixed(2) + " mm"+"\u00B3  = " + 
        v.toFixed(4) + " MPa (N/mm\u00B2)";
        return v;

    case 3:    // Cut - срез
        v = load.loadAction() / this.area(); // сила среза (N) / площадь сечения (mm2) = N/mm2 = MPa
        v_out_Calc_Stress.innerText =
        "Напряжение среза \u03C4, MPa (N/mm\u00B2) = " + 
        "\nСила среза " + load.loadAction() + " N / Площадь сечения " + this.area().toFixed(2) + " mm" + "\u00B2  = " + v.toFixed(4) + " MPa (N/mm\u00B2)";
        return v;    //  сила среза / площадь сечения   // break;

        } // switch
}, // stress: function() in N/mm2 (MPa)
thickness: function() { // расчет толщины стенки в mm        
if(logsView) console.log(`Method cil.thickness()`);
    return (this.dia_ex() - this.dia_in()) / 2;  // mm
}, // function thickness()
volume: function() {    // расчет объема трубы в mm3
if(logsView) console.log(`Method cil.volume()`);
    return this.area() * this.length();  // mm3
}, // volume()
massa: function() {     // расчет массы трубы в gramm
if(logsView) console.log(`Method cil.massa()`);
    return this.volume() * this.density;  // gramm !!!
}, // mass()

        // OUTPUT
output_steel: function() { // Обработчик события на v_steelSelector (Select марка стали)
if(logsView) console.log(`Method cil.output_steel(); v_steelSelector.selectedIndex == ${v_steelSelector.selectedIndex}`);
// при innerHTML "\n" не срабатывает
v_out_steel.innerText = 
"Марка стали = " + steels[v_steelSelector.selectedIndex][0] +
"\nВременное сопротивление = " + steels[v_steelSelector.selectedIndex][1] + " MPa" +
"\nПредел текучести = " + steels[v_steelSelector.selectedIndex][2] + " MPa\n" +
load.selectedLoadTxt[load.selectedLoad] + " допустимое напряжение = " + steels[v_steelSelector.selectedIndex][(load.selectedLoad+3)] + " MPa";
},      // output_steel()    
output_area: function() {
    if(logsView) console.log(`Method cil.output_area()`);
v_out_area.innerHTML = this._Pi_+` &times; (`+this.dia_ex()+`<sup>2</sup> - `+this.dia_in()+`<sup>2</sup>) / 4 = `+format1.format(this.area())+` mm<sup>2</sup>`; // mm2
},      // output_area()
output_w_axial: function() {
v_out_wx.innerHTML=`(`+this._Pi_+`&times;`+this.dia_ex()+`<sup>3</sup>/32)&times;(1-(`+this.dia_in()+`/`+this.dia_ex()+`)<sup>4</sup>) = `+format2.format(this.w_axial())+` mm<sup>3</sup>`; // mm3
},      // output_w_axial()
output_w_polar: function() {
v_out_wp.innerHTML=`(`+this._Pi_+`&times;`+this.dia_ex()+`<sup>3</sup>/16)&times;(1-(`+this.dia_in()+`/`+this.dia_ex()+`)<sup>4</sup>) = `+format2.format(this.w_polar())+` mm<sup>3</sup>`; // mm3
},      // output_w_axial()
output_stress: function() {
v_out_stress.innerHTML = load.loadAction()+` / `+format2.format(this.area())+` = `+format2.format(this.stress())+` N/mm<sup>2</sup>`; // mm2
},      // output_stress()
output_thick: function() {
v_out_thick.innerHTML = `(`+this.dia_ex()+` - `+this.dia_in()+`) / 2 = ` + format2.format(this.thickness())+` mm`; // mm
},      // output_thick()
output_massa: function() {
v_out_massa.innerHTML = format2.format(this.area())+` &times; `+this.length()+` &times; 0,00782 &times; 0,001 = ` + format3.format(this.massa()*0.001)+` kg`; // g -> kg
    // v_out_massa.innerHTML = (0.001 * this.massa()).toFixed(4); // g -> kg
},      // output_massa()
toString: function() {  // overload function toString()
    return 'It\'s cil.toString(): dia_ex = ' + this.dia_ex() + '; dia_in = ' + this.dia_in();
    } // toString: function()
}     // let cil


    // Объект Нагрузка на Объект Цилиндр !!!
let load = {
    measureKoef: 1.0,
    selectedLoad: -1.0, // выбранный тип нагрузки; -1.0 т.к при старте программный клик
    selectedLoadTxt: ["При растяжении ", "При изгибе ", "При кручении ", "При срезе "], // для вывода параметров стали
    outStressLblTxt: ["нормальное &#963;", "касательное &#964;"], // для вывода параметров стали
    from: 'nxm', // Для селекта с более чем двумя пунктами выбора
loadSortSet: function() { // Обработчик события на v_loadSelector (эскиз нагрузки): установка типа нагрузки (изгиб, срез и т.п) на панели ввода
    if(load.selectedLoad < 3) {
        load.selectedLoad++;
    } else load.selectedLoad = 0;
if(logsView) console.log(`Method load.loadSortSet(); Event type == ${event.type} in Element id == ${event.target.id}; load.selectedLoad == ${load.selectedLoad}`);
    switch (load.selectedLoad) {
        case 0:     // Растяжение
    v_loadSelector.setAttribute("src","../img/pic128stretch.svg");
    v_loadSelector.title  = "Растяжение";
    v_load.setAttribute("placeholder", "Stretch Force");
    v_loadLbl.textContent = "Stretch Force F,";
    // v_out_stress_lbl.innerHTML = 'Напряжение в стержне: <strong>' + load.outStressLblTxt[0] + '</strong>, MPa (N/mm<sup>2</sup>)';

    // v_measureSelector
            break;
        case 1:     // Изгиб
    v_loadSelector.setAttribute("src","../img/pic128bend.svg");
    v_loadSelector.title  = "Изгиб";
    v_load.setAttribute("placeholder", "Bend Force");
    v_loadLbl.textContent = "Bend Force F,";
    v_lbl_bend_M.style.display='inline-block';       // показать лебел окна вывода момента
    v_out_bend_M.style.display='inline-block';       // показать окно вывода момента
    v_measureSelector1.style.display='inline-block'; // показать селект окна вывода момента
    v_out_bend_M.innerHTML = load.loadAction().toFixed(1);
    // v_out_stress_lbl.innerHTML = load.selectedLoadTxt[load.selectedLoad];
    // v_out_stress_lbl.innerHTML = 'Напряжение в стержне: <strong>' + load.outStressLblTxt[1] + '</strong>, MPa (N/mm<sup>2</sup>)';
            break;
        case 2:     // Кручение
    v_measureSelector.length = 0;    
    v_measureSelector.add(new Option('N\u00D7mm', 'nxmm', false, false));
    v_measureSelector.add(new Option('N\u00D7metr', 'nxm', true, true));
    v_measureSelector.add(new Option('Kg\u00D7metr', 'kgxm', false, false));
    load.measureKoef = 1000.0;
    v_loadSelector.setAttribute("src","../img/pic128twist.svg");
    v_loadSelector.title  = "Кручение";
    v_load.setAttribute("placeholder", "Twist Moment");
    v_loadLbl.textContent = "Twist Moment M, "; // далее селектор
    v_load.value = '';
    v_out_bend_M.style.display='none';       // скрыть окно вывода момента
    v_lbl_bend_M.style.display='none';       // скрыть лебел окна вывода момента
    v_measureSelector1.style.display='none'; // скрыть селект окна вывода момента
            break;
        case 3:     // Срез
    v_measureSelector.length = 0;    
    v_measureSelector.add(new Option('N', 'n', true, true));
    v_measureSelector.add(new Option('Kg', 'kg', false, false));
    load.measureKoef = 1.0;
    v_loadSelector.setAttribute("src","../img/pic128cut.svg");
    v_loadSelector.title  = "Срез";
    v_load.setAttribute("placeholder", "Cut Force");
    v_loadLbl.textContent = "Cut Force F,";
    v_load.value = '';
            break;    
        default:
            break;
    }   // switch
    cil.output_steel();
}, // loadSortSet
loadMeasureSet: function() { // Обработчик события на v_measureSelector (Select N or Kg) Установка едициц измерения нагрузки
console.log(`Method load.loadMeasureSet(), load.from = ${load.from}`);
console.log(`Event type == ${event.type} in Element id == ${event.target.id}; v_measureSelector.value == ${v_measureSelector.value}`);
    // let from = 'nxmm';
switch (v_measureSelector.value) {  // select
    case 'n':
        load.measureKoef = 1.0;      
        if(v_load.value != '')
        v_load.value = v_load.value * 10; // кг в ньютоны (т.к переключение с кг)
            break;
    case 'kg':
        load.measureKoef = 10.0;  
        if(v_load.value != '')        
        v_load.value = v_load.value / 10; // ньютоны в кг (т.к переключение с N)
            break;
    case 'nxmm':
        load.measureKoef = 1.0;  
        if(v_load.value != '') {
            switch (load.from) {
                case 'nxm':
                    v_load.value = v_load.value * 1000; // N*metr в N*mm
                break;
                case 'kgxm':
                    v_load.value = v_load.value * 10000; // Kg*metr в N*mm
                break;
            } // switch (from)
    } // if(v_load.value != '')
    load.from = 'nxmm';
            break;
    case 'nxm':
        load.measureKoef = 1000.0;  
        if(v_load.value != '') {
            switch (load.from) {
                case 'nxmm':
                    v_load.value = v_load.value / 1000; // N*mm в N*mm
                break;
                case 'kgxm':
                    v_load.value = v_load.value * 10; // Kg*metr в N*metr
                break;
            } // switch (from)
    } // if(v_load.value != '')
    load.from = 'nxm';
            break;
    case 'kgxm':
        load.measureKoef = 10000.0;  
        if(v_load.value != '') {
            switch (load.from) {
                case 'nxmm':
                    v_load.value = v_load.value / 10000; // N*mm в Kg*metr
                break;
                case 'nxm':
                    v_load.value = v_load.value / 10; // N*metr в Kg*metr
                break;
            } // switch (from)
    } // if(v_load.value != '')
    load.from = 'kgxm';
            break;
    default:
    console.log("Myswitch = default");
            break;
    }   // switch()
if(logsView) console.log(`In Exiting Method loadMeasureSet(): let from == ${load.from}`);
}, // loadMeasureSet
loadAction: function() { // Пересчет Kg to N для расчета напряжения
if(logsView) console.log(`Method (input data) load.loadAction(${v_load.value})`);
    if((v_load.value !='') & (v_load.value !='0')) {
    let load_for_calculation = 0;
    let enteredDecimal = parseFloat(v_load.value);  // N or kg
    switch(load.selectedLoad) {
        case 0:         // Растяжение
        load_for_calculation = enteredDecimal * load.measureKoef; // if N measureKoef must be = 1.0; if Kg measureKoef must be = 10.0
            break;      
        case 1:         // Изгиб
        load_for_calculation = enteredDecimal * load.measureKoef * cil.length(); // N*mm // if N measureKoef must be = 1.0; if Kg measureKoef must be = 10.0
            break;
        case 2:         // Кручение
        load_for_calculation = enteredDecimal * load.measureKoef; // N*mm // if N*mm measureKoef must be = 1.0; if N*metr measureKoef must be = 1000.0; if Kg*metr measureKoef must be = 10000.0
            break;
        case 3:         // Срез
        load_for_calculation = enteredDecimal * load.measureKoef; // if N measureKoef must be = 1.0; if Kg measureKoef must be = 10.0
            break;
        default:
            break;
        } // switch
    return load_for_calculation;
    } // if((v_length.value !='') & (v_length.value !='0'))
    else {
        v_load.value = '';
        return 0;
    } // else
}, // loadAction, N or N*mm
}  // let load


    // Переменные = ссылки на HTML элементы
let v_loadSelector  = document.getElementById("loadSelector");       // HTML PICTURE: выбор типа нагрузки - растяжение, изгиб и т.д
let v_dia_ex        = document.getElementById("input_dia_ex");       // HTML Input: диаметр наружный
let v_dia_in        = document.getElementById("input_dia_in");       // HTML Input: диаметр внутренний
let v_length        = document.getElementById("input_length");       // HTML Input: длина
let v_steelSelector = document.getElementById("steelSelector");      // HTML Select: steelSort - выбор стали из списка
let v_out_steel     = document.getElementById("steel_data");         // HTML Output: вывод данных выбранной стали 

let v_load          = document.getElementById("inputLoad");          // HTML Input: ввод величины нагрузки в выбраных единицах измерения
let v_loadLbl       = document.getElementById("inputLoad_Label");    // HTML Label: лебел ввода величины нагрузки, меняется при смене типа нагрузки

let v_measureSelector  = document.getElementById("measureSelector"); // HTML Select: выбор единиц измерения нагрузки => N или Kg 
let v_measureSelector1 = document.getElementById("measureSelector1");// HTML Select: выбор единиц измерения нагрузки => N x mm или N x metr или Kg x metr

let v_buttonRUN   = document.getElementById("buttonRUN");        // HTML Button RUN !!!

let v_out_Calc_Stress = document.getElementById("how_calc_stress"); // HTML Output
let v_out_stress  = document.getElementById("output_stress");       // HTML Output
let v_out_stress_lbl  = document.getElementById("output_stress_lbl");       // HTML Output
let v_out_area    = document.getElementById("output_area");         // HTML Output
let v_out_wx      = document.getElementById("output_wx");           // HTML Output
let v_out_wp      = document.getElementById("output_wp");           // HTML Output
let v_out_thick   = document.getElementById("output_thick");        // HTML Output
let v_out_massa   = document.getElementById("output_massa");        // HTML Output
let v_lbl_bend_M  = document.getElementById("label_bend_M");        // HTML Label  - лебел поля вывода момента изгиба
let v_out_bend_M  = document.getElementById("output_bend_M");       // HTML Output - поле вывода момента изгиба находится справа от поля ввода силы

    // События на HTML элементах (и ссылки на функции - обработчики событий)
window.addEventListener("load",page_onload);                 // onLoad
v_loadSelector.addEventListener("click",load.loadSortSet);   // Pictures changed
v_dia_ex.addEventListener("input",inputIDec);                // Input v_dia_ex
v_dia_in.addEventListener("input",inputIDec);                // Input v_dia_in
v_length.addEventListener("input",inputIDec);                // Input v_length
v_steelSelector.addEventListener("change",cil.output_steel); // Select
v_load.addEventListener("input",inputIDec);                  // Input v_load
v_measureSelector.addEventListener("change",load.loadMeasureSet); // Select - change measure
v_buttonRUN.addEventListener("click",Event_click_Button);    // Клик на кнопке

let event1 = new Event("click");

function page_onload() { // Обработчик события загрузки страницы
    console.log("page_onload()");    
    v_loadSelector.dispatchEvent(event1); // Клик на кнопке с эскизом нагрузки. Обработчик load.loadSortSet()
}   // page_onload()


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


    // обработчик события  B U T T O N   R U N   !!!!!
function Event_click_Button() { // Событие нажатие кнопки Event_click_Button
console.log("___Event_click_Button() = RUN__!!!__");
// console.log("continue RUN:  cil.dia_ex = " + cil.dia_ex() + "; cil.dia_in = " + cil.dia_in() + "; cil.length = " + cil.length());
    clearOut_sopr();
    cil.output_area();
    cil.output_w_axial();
    cil.output_w_polar();
    cil.output_thick();
    cil.output_massa();
    cil.output_stress();  
} // Event_click_Button
