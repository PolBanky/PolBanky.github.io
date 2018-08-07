// 
var iDec = document.getElementById("IDec");    // ссылка на HTML Input = i(nput)Dec(imal)
var iG   = document.getElementById('IG');
var iM   = document.getElementById('IM');
var iS   = document.getElementById('IS');

var txt = "";
var num = 0;

var Angle_Decimal = 0;  // Угол с клавы в ДЕСЯТИЧНЫХ град
var Angle_Sec = 0;      // Угол с клавы в секундах
var deg = 0;            // Целых градусов в угле
var degSec = 0;         // Целых градусов в угле - в секундах
var fracSec = 0;        // Дробная часть градуса - в секундах
var FracMin = 0;        // Дробная часть градуса - в минутах
var min = 0;            // Целых минут в дробной части
var minSec = 0;         // Целых минут в дробной части - в секундах
var sec = 0;            // Секунды - то что осталось
var deg1 = 0;           // deg в deg-min-sec
var min1 = 0;           // min в deg-min-sec
var sec1 = 0;           // sec в deg-min-sec
var a_dec = 0;          // из deg-min-sec в ДЕСЯТИЧНЫЕ град

var i = 0;              // номера стартов функции события
    

iDec.onkeypress = iS.onkeypress = function(event) {
    var chr = event.key;
    if (chr != '0' & chr != '1' & chr != '2' & chr != '3' & chr != '4' & chr != '5' & chr != '6' & chr != '7' & chr != '8' & chr != '9' & chr != '.' & chr != ',') {
    return false;
    }   // if
    if((chr == ',')||(chr == '.')) {
    var r = txt.indexOf(",");
    if(r != -1) return false;
    r = txt.indexOf(".");
    if(r != -1) return false;
    }   // if
}   //  onkeypress    


iM.onkeypress = iG.onkeypress = function(event) {   
    var chr = event.key;
    if (chr != '0' & chr != '1' & chr != '2' & chr != '3' & chr != '4' & chr != '5' & chr != '6' & chr != '7' & chr != '8' & chr != '9') return false;
}


iDec.oninput = function(event) {
    txt = this.value.replace(/,/,'.');
    if((txt=="")||(txt==",")||(txt==".")) {
    num = 0;
    iG.value = "";
    iM.value = "";
    iS.value = "";
    }
    else {
    num = parseFloat(txt);    
    Angle_Decimal = num;
    Angle_Sec = Angle_Decimal * 3600;   // Угол с клавы в секундах
    deg = Math.floor(Angle_Decimal);    // ГРАДУСЫ
    degSec = deg * 3600;                // ГРАДУСЫ - в секундах
    fracSec = Angle_Sec - degSec;       // Дробная часть градуса - в секундах
    fracMin = fracSec / 60;             // Дробная часть градуса - в минутах
    min = Math.floor(fracMin);          // МИНУТЫ
    minSec = min * 60;                  // МИНУТЫ - в секундах
    sec = fracSec - minSec;             // СЕКУНДЫ        
    iG.value = deg;
    iM.value = min;
    iS.value = sec.toFixed(2);
    }
} // function Event_InputDeg()


iG.oninput = iM.oninput = function(event) {
    Solution();
}


iS.oninput = function(event) {
    txt = this.value.replace(/,/,'.');
    if((txt=="")||(txt==",")||(txt==".")) num = 0;
    else num = parseFloat(txt);
    this.value = num;
    Solution();
}


function Solution() {
    a_dec = 0;
    deg1 = iG.value;
    min1 = iM.value;
    sec1 = iS.value;
        
    deg1 = deg1 * 3600;
    min1 = min1 * 60;
    sec1 = sec1 * 1;
    deg1 = deg1 + min1 + sec1;
    a_dec = deg1 / 3600;

    iDec.value = a_dec;
} // function Event_InputGradMinSec()


// *************************************


    // КНОПКА = input type="button" id="btn_calc"
btn_calc.onclick = function(event) {
    console.log("Event Button 'Calculate Angle's Trig' = " + event.type + " on " + event.currentTarget);
    console.log("X = " + event.clientX + " Y = " + event.clientY);
}

function Event_ClickBtnTest() {
    console.log("Event Button 'Test' = " + event.type + " on " + event.currentTarget);
    console.log("X = " + event.clientX + " Y = " + event.clientY);
}


// Событие - клик по кнопке
function Trig() {
    var dFactor = Math.PI / 180;  // = 0,01745329251994329576923690768489

    
} // function Event_PressButton()