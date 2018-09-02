// 
var iDec = document.getElementById("IDec");     // ссылка на HTML Input = i(nput)Dec(imal)
var iG   = document.getElementById('IG');
var iM   = document.getElementById('IM');
var iS   = document.getElementById('IS');
var cl   = document.getElementById('clear');    // Знак градус после децимал инпута  
    /* cl.onclick = clearAll; */                // Клик для очистки всех инпутов
var btn = document.getElementById('btn_calc');
var showRad = document.getElementById('angl_in_rad_output');    // Вывод значения угла в радианах
var showRadLabel = document.getElementById('in_rad_lbl');       // Лебел вывода значения угла в радианах
var showSin = document.getElementById('sin_output');
var showCos = document.getElementById('cos_output');
var showTg = document.getElementById('tg_output');
var showCtg = document.getElementById('ctg_output');

var txt = "";
var tmp = "";
var i = 0;              // номера стартов функции события

var numDec = 0;         // Угол с клавы в ДЕСЯТИЧНЫХ град
var Angle_Sec = 0;      // Угол с клавы в секундах
var numG = 0;           // Целых градусов в угле
var degSec = 0;         // Целых градусов в угле - в секундах
var fracSec = 0;        // Дробная часть градуса - в секундах
var FracMin = 0;        // Дробная часть градуса - в минутах
var numM = 0;           // Целых минут в дробной части
var minSec = 0;         // Целых минут в дробной части - в секундах
var numS = 0;           // Секунды - то что осталось
var deg1 = 0;           // deg в deg-min-sec
var min1 = 0;           // min в deg-min-sec
var sec1 = 0;           // sec в deg-min-sec
var angleInRad = 0;

cl.addEventListener("click",clearAll);
btn.addEventListener("click",calcRun);


function I(txt) {
    forInfo.innerHTML = txt;
}

function clearAll() {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
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
        if(+tmp > 359.999999) {
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
    Angle_Sec = numDec * 3600;      // Угол с клавы в секундах
    numG = Math.floor(numDec);      // ГРАДУСЫ
    degSec = numG * 3600;           // ГРАДУСЫ - в секундах
    fracSec = Angle_Sec - degSec;   // Дробная часть градуса - в секундах
    fracMin = fracSec / 60;         // Дробная часть градуса - в минутах
    numM = Math.floor(fracMin);     // МИНУТЫ
    minSec = numM * 60;             // МИНУТЫ - в секундах
    numS = fracSec - minSec;        // СЕКУНДЫ        
    iG.value = numG;
    console.log("Значение iG.value == " + iG.value + "; type == " + typeof(iG.value));
    iM.value = numM;
    numS  = numS.toFixed(4);
    iS.value = numS;
    }
    I("Ready");
} // iDec.oninput


iG.oninput = iM.oninput = function(event) {        
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    console.log("Значение по ссылке " + event.target.id + " == " + this.value + "; type == " + typeof(this.value) + "; length of string == " + this.value.length);
    switch(this) {
        case iG:
            if(this.value=="") numG = 0;
            else numG = parseInt(this.value);
            if(numG > 359) {
                I("Угол д.б. менее 360 град.");
                this.value = ""; numG = 0;
                return false; }
            console.log("Значение numG == " + numG + "; type == " + typeof(numG));
            break;
        case iM:
            if(this.value=="") numM = 0;
            else numM = parseInt(this.value);
            if(numM > 59) {
                I("В градусе д.б. менее 60 минут");
                this.value = ""; numM = 0;
                return false; }
            console.log("Значение numM == " + numM + "; type == " + typeof(numM));
            break;    
        default:
            break;
    }   // switch (this)
    if((numG==0)&(numM==0)&(numS==0))
    { iDec.value = ""; numDec = 0; }
    else {    
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
    deg1 = numG * 3600;
    min1 = numM * 60;
    sec1 = numS * 1;
    deg1 = deg1 + min1 + sec1;
    numDec = deg1 / 3600;
    iDec.value = numDec;
} // function Solution()


// *************************************


    // КНОПКА = input type="button" id="btn_calc"
/* btn_calc.onclick =  */
function calcRun(event) {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    console.log("Event Button 'Calculate Angle's Trig' = " + event.type + " in id == " + event.currentTarget.id);
    console.log("X = " + event.clientX + " Y = " + event.clientY);
    gradInRad();
    sin();
    cos();
    tg();
    ctg();
}


function gradInRad() {
    var dFactor = Math.PI / 180;  // = 0,01745329251994329576923690768489
    console.log("\nЗначение numDec for gradInRad() == " + numDec + "; type == " + typeof(numDec));
    angleInRad = numDec * dFactor;
    showRad.innerHTML = angleInRad.toFixed(6);
    showRadLabel.innerHTML = "Угол " + numDec + "\u00B0 - в радианах";
} // function Event_PressButton()


function sin() {
    var sin1 = Math.sin(angleInRad).toFixed(6); 
    showSin.innerHTML = sin1;
}


function cos() {
    var cos1 = Math.cos(angleInRad).toFixed(6); 
    showCos.innerHTML = cos1;
}


function tg() {
    var tg1 = Math.tan(angleInRad).toFixed(6); 
    showTg.innerHTML = tg1;
}


function ctg() {
    var ctg1 = (1/Math.tan(angleInRad)).toFixed(6); 
    showCtg.innerHTML = ctg1;
}
