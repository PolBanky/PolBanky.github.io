// 
var iDec = document.getElementById("IDec");     // ссылка на HTML Input = i(nput)Dec(imal)
var iG   = document.getElementById('IG');
var iM   = document.getElementById('IM');
var iS   = document.getElementById('IS');
var cl   = document.getElementById('clear');    // Знак градус после децимал инпута  
    cl.onclick = clearAll;  // Клик для очистки всех инпутов
var showRad = document.getElementById('angl_in_rad_output');// Вывод значения угла в радианах
var showRadLabel = document.getElementById('in_rad_lbl');   // Лебел вывода значения угла в радианах


var txt = "";
var tmp = "";
// var numDec = 0;
var numG = 0;
var numM = 0;
var numS = 0;

var numDec = 0;         // Угол с клавы в ДЕСЯТИЧНЫХ град
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
 
function I(txt) {
    forInfo.innerHTML = txt;
}

function clearAll() {
    iDec.value = ""; numDec = 0;
    iG.value = ""; numG = 0;
    iM.value = ""; numM = 0;
    iS.value = ""; numS = 0;
}


iDec.onkeypress = iS.onkeypress = function(event) {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    var chr = event.key;
    console.log("KeyCode==" + event.keyCode + "; Which==" + event.which + "; CharCode==" + event.charCode + "; Char==" + chr);
    if (chr != '0' & chr != '1' & chr != '2' & chr != '3' & chr != '4' & chr != '5' & chr != '6' & chr != '7' & chr != '8' & chr != '9' & chr != '.' & chr != ',') {
        I("Только цифры и десятичные разделители");
        return false; }
    if((chr == ',')||(chr == '.')) {
        if (this.value.length < 1) {
            I("Десятичный разделитель не надо ставить первым - а для порядка !");
            return false; }
    if ((this.value.indexOf(",") != -1) || (this.value.indexOf(".") != -1)) {
        I("Только один десятичный разделитель");
        return false; }    
    }   // if((chr == ',')||(chr == '.'))
    tmp = this.value + chr;
    console.log("Значение tmp == " + tmp + "; type == " + typeof(tmp) + "; length of string == " + tmp.length);
switch(this) {
    case iDec:
        if(+tmp > 359.999) {
            I("Угол д.б. менее 360 град.");
            return false; }
        break;    
    case iS:
        if(+tmp >= 60) {
            I("В минуте д.б. менее 60 секунд");
            return false; }
        break;    
        default:
        break;
}   // switch (this)
    I("Ready");
}       //  onkeypress    


iG.onkeypress = iM.onkeypress = function(event) {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    var chr = event.key;
    console.log("KeyCode==" + event.keyCode + "; Which==" + event.which + "; CharCode==" + event.charCode + "; Char==" + chr);
    if (chr != '0' & chr != '1' & chr != '2' & chr != '3' & chr != '4' & chr != '5' & chr != '6' & chr != '7' & chr != '8' & chr != '9') {
        I("Только цифры");
        return false; }
    tmp = this.value + chr;
    console.log("Значение tmp == " + tmp + "; type == " + typeof(tmp) + "; length of string == " + tmp.length);
switch(this) {
    case iG:
        if(+tmp > 359) {
            I("Угол д.б. менее 360 град.");
            return false; }
        break;    
    case iM:
        if(+tmp > 59) {
            I("В градусе д.б. менее 60 минут");
            return false; }
        break;    
            default:
        break;
}   // switch (this)
    I("Ready");  
}


iDec.oninput = function(event) {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    // console.log(event);
    console.log("Значение по ссылке iDec == " + this.value + "; type == " + typeof(this.value) + "; length of string == " + this.value.length);
    txt = this.value.replace(/,/,'.');
    console.log("Значение txt == " + txt + "; type == " + typeof(txt) + "; length of string == " + txt.length);
    if((txt=="")||(txt==",")||(txt==".")) {
        clearAll();        
        return false; }
    else {
            numDec = parseFloat(txt);
        if(numDec > 359.999) {
            I("Угол д.б. менее 360 град.");
            clearAll();
            return false; }
    console.log("Значение numDec == " + numDec + "; type == " + typeof(numDec));
    Angle_Sec = numDec * 3600;   // Угол с клавы в секундах
    deg = Math.floor(numDec);    // ГРАДУСЫ
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
    iS.value = sec.toFixed(4);
    numS  = sec.toFixed(4);
    }
    I("Ready");
} // iDec.oninput


iG.oninput = iM.oninput = function(event) {        
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    console.log("Значение по ссылке " + event.target.id + " == " + this.value + "; type == " + typeof(this.value) + "; length of string == " + this.value.length);
    switch(this) {
        case iG:
            if(this.value=="") numG = 0;
            else numG = parseFloat(this.value);
            if(numG > 359) {
                I("Угол д.б. менее 360 град.");
                this.value = ""; numG = 0;
                return false; }
            console.log("numG == " + numG + "; type == " + typeof(numG));
            break;
        case iM:
            if(this.value=="") numM = 0;
            else numM = parseFloat(this.value);
            if(numM > 59) {
                I("В градусе д.б. менее 60 минут");
                this.value = ""; numM = 0;
                return false; }
            console.log("numM == " + numM + "; type == " + typeof(numM));
            break;    
        default:
            break;
    }   // switch (this)
    if((numG==0)&(numM==0)&(numS==0))
    { iDec.value = ""; numDec = 0; }
    else {            
    console.log("Значение numG == " + numG + "; type == " + typeof(numG));
    console.log("Значение numM == " + numM + "; type == " + typeof(numM));
    console.log("Значение numS == " + numS + "; type == " + typeof(numS));
    Solution();
    }
        I("Ready");
}


iS.oninput = function(event) {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    console.log("Значение по ссылке iS == " + this.value + "; type == " + typeof(this.value) + "; length of string == " + this.value.length);
    txt = this.value.replace(/,/,'.');
    console.log("Значение txt == " + txt + "; type == " + typeof(txt) + "; length of string == " + txt.length);
    if((txt=="")||(txt==",")||(txt=="."))  {
        this.value = ""; numS = 0;
    if((numG==0)&(numM==0)&(numS==0))
        iDec.value = ""; numDec = 0;
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
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    console.log("Event Button 'Calculate Angle's Trig' = " + event.type + " on " + event.currentTarget.id);
    console.log("X = " + event.clientX + " Y = " + event.clientY);
    Trig();
}

// function Event_ClickBtnTest() {
//     console.log("\nEvent Button 'Test' = " + event.type + " on " + event.currentTarget.id);
//     console.log("X = " + event.clientX + " Y = " + event.clientY);
// }


// Событие - клик по кнопке
function Trig() {
    var dFactor = Math.PI / 180;  // = 0,01745329251994329576923690768489
    console.log("\nЗначение numDec for Trig() == " + numDec + "; type == " + typeof(numDec));
    var Angle_Rad = numDec * dFactor;
    showRad.innerHTML = Angle_Rad;
    showRadLabel.innerHTML = "Угол " + numDec + "\u00B0 - в радианах";
} // function Event_PressButton()