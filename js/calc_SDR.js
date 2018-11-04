'use strict';

var v_sl   = document.getElementById("SDR_Value");          // ссылка на HTML Select
var v_in   = document.getElementById("input_dia_ex");       // ссылка на HTML Input
var v_out1 = document.getElementById("output_thickness");   // ссылка на HTML Output
var v_out2 = document.getElementById("output_dia_in");      // ссылка на HTML Output

v_sl.addEventListener("change",Event_SelectChng);   // SDR
v_in.addEventListener("input",Event_Input_Num);     // Decimal number

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
    }, // function eval_thickness()
    toString: function() {  // overload function toString()
        return 'pipe.toString(): dia_ex = ' + this.dia_ex + '; dia_in = ' + this.dia_in + '; thickness = ' + this.thickness
                }   // toString: function() 
}; // var pipe


    // Вывод толщины стенки и внутреннего диаметра трубы
function Output() {
    console.log("Output(): event type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id);  
    v_out1.innerHTML = pipe.thickness.toFixed(1);
    v_out2.innerHTML = pipe.dia_in.toFixed(1);
} // function Output()


    // Событие ввод цифры Calculate Thickness
function Event_Input_Num() {
    console.log("\n  Event_Input_Num(): event type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id + "; this.value = " + this.value);
if((this.value==='')||((this.value = checkFixInt(this.value))==='')) {
    v_out1.innerHTML = '0.00';
    v_out2.innerHTML = '0.00';
    return false;   // Если все символы удалены - maybe by input type = deleteContentBackward
}   // if(this.value==='')
    Solution();
} // function Event_Input_Num()


function Solution() {
    console.log("Solution(): event type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id);
    pipe.sdr = v_sl.value;
    pipe.dia_ex = v_in.value;
    pipe.eval_thickness();
    pipe.eval_dia_in();
    Output();
}   // Solution()


    // Изменение выбора SDR
function Event_SelectChng() {
    console.log("\nEvent_SelectChng(): event type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id + "; this.value = " + this.value);
if(pipe.dia_ex > 0) {
    Solution();
} // if
} // function Event_SelectChng()
