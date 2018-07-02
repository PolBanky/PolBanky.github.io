// Ver. from M + (made in branch test3 )

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
    
    // Событие - ввод символа (или удаление)
    function Event_InputDeg() {
        console.log("******* Event_InputDeg() -> Start num." + ++i + " *******");
        
    var temp_Angle_Decimal = parseFloat(document.getElementById('input_deg').value);
    console.log("temp_Angle_Decimal after get Input.Value.  Type = " + typeof(temp_Angle_Decimal) + " and Value = " + temp_Angle_Decimal);
    Angle_Decimal = temp_Angle_Decimal ? temp_Angle_Decimal : Angle_Decimal;
    console.log("Angle_Decimal after z = x ? x : y   Type = " + typeof(Angle_Decimal) + " and Value = " + Angle_Decimal);
    Angle_Sec = Angle_Decimal * 3600;   // Угол с клавы в секундах
    console.log("Angle_Decimal after -> Angle_Sec = Angle_Decimal * 3600;   Type = " + typeof(Angle_Decimal) + " and Value = " + Angle_Decimal);
    deg = Math.floor(Angle_Decimal);    // ГРАДУСЫ
    degSec = deg * 3600;                // ГРАДУСЫ - в секундах
    fracSec = Angle_Sec - degSec;       // Дробная часть градуса - в секундах
    fracMin = fracSec / 60;             // Дробная часть градуса - в минутах
    min = Math.floor(fracMin);          // МИНУТЫ
    minSec = min * 60;                  // МИНУТЫ - в секундах
    sec = fracSec - minSec;             // СЕКУНДЫ    
    console.log("Angle_Sec   Type = " + typeof(Angle_Sec) + " and Value = " + Angle_Sec);
    console.log("deg   Type = " + typeof(deg) + " and Value = " + deg);
    console.log("degSec   Type = " + typeof(degSec) + " and Value = " + degSec);
    console.log("fracSec   Type = " + typeof(fracSec) + " and Value = " + fracSec);
        
    // console.log("******* After Output ********");
    document.getElementById('input_grad').value = deg;
    // console.log("deg   Type = " + typeof(deg) + " and Value = " + deg);
    document.getElementById('input_min').value = min;
    // console.log("min   Type = " + typeof(deg) + " and Value = " + min);
    document.getElementById('input_sec').value = sec.toFixed(2);
    // console.log("sec   Type = " + typeof(sec) + " and Value = " + sec);

    Trig();
} // function Event_InputDeg()


// Событие - ввод символа (или удаление)
function Event_InputGradMinSec() {
    a_dec = 0;
    deg1 = document.getElementById('input_grad').value;
    min1 = document.getElementById('input_min').value;
    sec1 = document.getElementById('input_sec').value;
    
    console.log("******* Start ********");
    console.log("deg1 = " + deg1);
    console.log("min1 = " + min1);
    console.log("sec1 = " + sec1);
    console.log("a_dec = " + a_dec);
    
    deg1 = deg1 * 3600;
    min1 = min1 * 60;
    sec1 = sec1 * 1;
    deg1 = deg1 + min1 + sec1;
    a_dec = deg1 / 3600;

    console.log("deg1 = " + deg1);
    console.log("min1 = " + min1);
    console.log("sec1 = " + sec1);
    console.log("a_dec = " + a_dec);
    
    document.getElementById('input_deg').value = a_dec;
    Trig();
} // function Event_InputGradMinSec()


function Event_Over() {
    console.log("Event Over Input");
}

function Event_Focus() {
    console.log("Event Focus in Input");    
}

function Event_KeyDown() {
    // console.log("Event KeyDown");
    console.log("Type KeyDown =  " + event.type + " on " + event.currentTarget);
}

/* function Event_KeyPress(e) */
input_min.onkeypress = input_grad.onkeypress = function(e) {   
    console.log("Type KeyPress =  " + event.type + " on " + event.currentTarget);
    e = e || event;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    var chr = getChar(e);
    console.log("var chr = " + chr);
    if (chr == null) return;
    if (chr < '0' || chr > '9') {
      return false;
    }
}

function getChar(event) {
    console.log("function getChar(event)");
    if (event.which == null) {
      if (event.keyCode < 32) return null;
      return String.fromCharCode(event.keyCode) // IE
    }
    if (event.which != 0 && event.charCode != 0) {
      if (event.which < 32) return null;
      return String.fromCharCode(event.which) // остальные
    }
    return null; // специальная клавиша
  }

// console.log("Event KeyPress");
// console.log("Type KeyPress =  " + event.type + " on " + event.currentTarget);
// var get_charCode = event.charCode;
// var symb_from_charCode = String.fromCharCode(get_charCode);
// console.log("Typed charCode = " + get_charCode + ";  and var get_charCode type = " + typeof(get_charCode));    
// console.log("Symbol from charCode = " + symb_from_charCode + "; and var symb_from_charCode type = " + typeof(symb_from_charCode));

function Event_KeyUp() {
    // console.log("Event KeyUp");
    console.log("Type KeyUp =  " + event.type + " on " + event.currentTarget);
}

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