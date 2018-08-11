// 
var iDec = document.getElementById("IDec");    // ссылка на HTML Input = i(nput)Dec(imal)
var iG   = document.getElementById('IG');
var iM   = document.getElementById('IM');
var iS   = document.getElementById('IS');

var txt = "";
var tmp = "";
var numDec = 0;
var numG = 0;
var numM = 0;
var numS = 0;

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
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    var chr = event.key;
    console.log("KeyCode==" + event.keyCode + "; Which==" + event.which + "; CharCode==" + event.charCode + "; Char==" + chr);
    if (chr != '0' & chr != '1' & chr != '2' & chr != '3' & chr != '4' & chr != '5' & chr != '6' & chr != '7' & chr != '8' & chr != '9' & chr != '.' & chr != ',') {
    console.log("Entered Symbol out of Range and now will be returned value == false");
    return false;
}   // if
if((chr == ',')||(chr == '.')) {
    var r = txt.indexOf(",");
    console.log("Index of ',' == " + r);
    if(r != -1) return false;
    r = txt.indexOf(".");
    console.log("Index of '.' == " + r);
    if(r != -1) return false;
}   // if((chr == ',')||(chr == '.'))
tmp = this.value + chr;
console.log("Значение tmp == " + tmp + "; type == " + typeof(tmp) + "; length of string == " + tmp.length);
switch (this) {
    case iDec:
    if(+tmp > 359.999) {
        console.log("Угол д.б. менее 360 град. and now will be returned value == false");
        return false; }
        break;    
    case iS:
    if(+tmp >= +60) {
        console.log("В минуте д.б. менее 60 секунд and now will be returned value == false");
        return false; }
        break;    
    default:
        break;
    }   // switch (this)
}       //  onkeypress    


iG.onkeypress = iM.onkeypress = function(event) {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    var chr = event.key;
    console.log("KeyCode==" + event.keyCode + "; Which==" + event.which + "; CharCode==" + event.charCode + "; Char==" + chr);
    if (chr != '0' & chr != '1' & chr != '2' & chr != '3' & chr != '4' & chr != '5' & chr != '6' & chr != '7' & chr != '8' & chr != '9') {
    console.log("Entered Symbol out of Range and now will be returned value == false");
    return false;
    }
    tmp = this.value + chr;
console.log("Значение tmp == " + tmp + "; type == " + typeof(tmp) + "; length of string == " + tmp.length);
switch (this) {
    case iG:
    if(+tmp > +359) {
        console.log("Угол д.б. менее 360 град. and now will be returned value == false");
        return false; }
        break;    
    case iM:
    if(+tmp > +59) {
        console.log("В градусе д.б. менее 60 минут and now will be returned value == false");
        return false; }
        break;    
    default:
        break;
    }   // switch (this)
}


iDec.oninput = function(event) {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id + " data == " + event.data + " type == " + typeof(event.data));
    console.log(event);
    console.log("Значение по ссылке iDec == " + this.value + "; type == " + typeof(this.value) + "; length of string == " + this.value.length);
    txt = this.value.replace(/,/,'.');
    console.log("Значение txt == " + txt + "; type == " + typeof(txt) + "; length of string == " + txt.length);
    if((txt=="")||(txt==",")||(txt==".")) {
    numDec = 0;
    iG.value = ""; numG = 0;
    iM.value = ""; numM = 0;
    iS.value = ""; numS = 0;
    }
    else {
    numDec = parseFloat(txt);
    console.log("Значение numDec == " + numDec + "; type == " + typeof(numDec));
    Angle_Decimal = numDec;
    console.log("Значение Angle_Decimal == " + Angle_Decimal + "; type == " + typeof(Angle_Decimal));
    Angle_Sec = Angle_Decimal * 3600;   // Угол с клавы в секундах
    deg = Math.floor(Angle_Decimal);    // ГРАДУСЫ
    degSec = deg * 3600;                // ГРАДУСЫ - в секундах
    fracSec = Angle_Sec - degSec;       // Дробная часть градуса - в секундах
    fracMin = fracSec / 60;             // Дробная часть градуса - в минутах
    min = Math.floor(fracMin);          // МИНУТЫ
    minSec = min * 60;                  // МИНУТЫ - в секундах
    sec = fracSec - minSec;             // СЕКУНДЫ        
    iG.value = deg;
    numG = deg;
    console.log("Значение iG.value == " + iG.value + "; type == " + typeof(iG.value));
    iM.value = min;
    numM = min;
    iS.value = sec.toFixed(2);
    numS  = sec.toFixed(2);
    }
} // function Event_InputDeg()


iG.oninput = iM.oninput = function(event) {        
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    console.log("Значение по ссылке " + event.target.id + " == " + this.value + "; type == " + typeof(this.value) + "; length of string == " + this.value.length);
    switch (this) {
        case iG:
        if(this.value=="")
            numG = 0;
        else{
            numG = parseFloat(this.value);
            }
            console.log("numG == " + numG + "; type == " + typeof(numG));
            break;    
        case iM:
        if(this.value=="")
            numM = 0;
        else{
            numM = parseFloat(this.value);
        }
        console.log("numM == " + numM + "; type == " + typeof(numM));
            break;    
        default:
            break;
    }   // switch (this)
    if((numG==0)&(numM==0)&(numS==0)) {
    iDec.value = "";
    }
    else
    {            
    console.log("Значение numG == " + numG + "; type == " + typeof(numG));
    console.log("Значение numM == " + numM + "; type == " + typeof(numM));
    Solution();
    }    
}


iS.oninput = function(event) {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    console.log("Значение по ссылке iS == " + this.value + "; type == " + typeof(this.value) + "; length of string == " + this.value.length);
    txt = this.value.replace(/,/,'.');
    console.log("Значение txt == " + txt + "; type == " + typeof(txt) + "; length of string == " + txt.length);
    if((txt=="")||(txt==",")||(txt=="."))  {
    numS = 0;
    if((numG==0)&(numM==0)&(numS==0))
        iDec.value = "";
    }
    else { 
    numS = parseFloat(txt);
    console.log("Значение numS == " + numS + "; type == " + typeof(numS));
    Solution();
    }
}


function Solution() {
    a_dec = 0;
    deg1 = numG;
    min1 = numM;
    sec1 = numS;
        
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