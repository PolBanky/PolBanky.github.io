'use strict';
// Для совместимости с мобильными устройствами события keypress не используются, используется только событие input
// 
var v_iDec = document.getElementById("IDec");   // ссылка на HTML Input = i(nput)Dec(imal)
var v_iG   = document.getElementById('IG');
var v_iM   = document.getElementById('IM');
var v_iS   = document.getElementById('IS');

var cl   = document.getElementById('clear');    // Знак градус после децимал инпута  
var inf = document.getElementById('forInfo');
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
var fracMin = 0;        // Дробная часть градуса - в минутах
var numM = 0;           // Целых минут в дробной части
var minSec = 0;         // Целых минут в дробной части - в секундах
var numS = 0;           // Секунды - то что осталось
var deg1 = 0;           // deg в deg-min-sec
var min1 = 0;           // min в deg-min-sec
var sec1 = 0;           // sec в deg-min-sec
var angleInRad = 0;

var numDot_RE = /[^\d.]/;   // not g - поиск в строке из 1 символа
var a_RE = /[^\d.]/g;
var dot_RE = /[.]/g;
var comma_RE = /[,]/g;

cl.addEventListener("click",clearAll);
btn.addEventListener("click",calcRun);
v_iDec.addEventListener("input",kInputIDec);
v_iDec.addEventListener("keyup",kPozIDec);  // keyup
v_iDec.addEventListener("click",kPozIDec);  // click
v_iG.addEventListener("input",kInputInt);
v_iM.addEventListener("input",kInputInt);
v_iS.addEventListener("input",kInputIS);
window.addEventListener("load",ld);
window.addEventListener("beforeunload",bULd);


function ld() { // load
    console.log('Window loaded');
    // console.log(window);
if(localStorage.getItem('DecStor')) {
    var stor = localStorage.getItem('DecStor'); // string
    console.log("Value in local storage = " + stor + "; data type = " + typeof(stor));
if((stor !== '0') & (stor !== null)) {
    v_iDec.value = stor;
    numDec = parseFloat(v_iDec.value);
    Solution();
    I('Data from last work session = ' + v_iDec.value);
    v_iDec.focus();
}   // if(stor)
}   // if(DecStor)
}   // function ld()


function bULd() {   // beforeunload
    localStorage.setItem('DecStor',numDec);
}   // function bULd()


function I(txt) {
    inf.innerHTML = txt;
}   // I(txt)


function clearAll() {
    console.log("\nClear All:  Event " + ++i + "; type = " + event.type + "-" + event.inputType + " in Element id = " + event.target.id);
    v_iDec.value = ""; numDec = 0;
    v_iG.value = ""; numG = 0;
    v_iM.value = ""; numM = 0;
    v_iS.value = ""; numS = 0;
}   // clearAll()


function kPozIDec(event) {  // keyup & click
    console.log("\nEvent " + ++i + " type = " + event.type + " in Element id = " + event.target.id + "; Cursor position = " + event.target.selectionStart);
    // I('id=' + event.target.id + ' Pos=' + event.target.selectionStart);
    I('Pos=' + event.target.selectionStart);
}   // kPozIDec(event)


function kInputIDec(event) {    // kInputIDec(event)
    console.log("\nEvent " + ++i + "; type = " + event.type + "-" + event.inputType + " in Element id = " + event.target.id);
    console.log("this.value before this.value.replace = " + this.value + "; type = " + typeof(this.value) + " with length = " + this.value.length);
        // Если все символы удалены - maybe by input type = deleteContentBackward
if(this.value.length===0) {
    clearAll();
    return false;
}   // if 'this' empty
        // Если есть запятые
if(comma_RE.test(this.value)) {
    this.value = this.value.replace(comma_RE,'.'); // Если символ = comma то заменяется на dot; глобально - чтоб два раза не вставать
    console.log("this.value after replace commas to dots = " + this.value + "; length = " + this.value.length);
}   // if (comma_RE)
        // Если есть буквы
if(a_RE.test(this.value)) {
if(this.value.length===1) {
    clearAll();
    return false;    
    }
else {
    this.value = this.value.replace(a_RE,'');
    if(this.value.length===0) {
        clearAll();
        return false;    
        }
    console.log("this.value after replace letters to nothing = " + this.value + "; length = " + this.value.length);
}   // else
}   // if (a_RE)
        // ***  Ниже в инпуте уже только цифры и дивидеры  ***
    var info1 = dotCount(this.value);   // количество дивидеров and offset from pointer to divider
    console.log("kInputIDec: Info1 from dotCount = " + info1.toString());
    // console.log("kInputIDec: Info1.cnt = " + info1.cnt + "; this.lenght = " + this.value.length);
        // Если дивидеров = 1 и дивидер первый символ
if((info1.cnt == 1) && (info1.firstPoz == 0)) {
    this.value = this.value.replace('.','0.');
    info1 = dotCount(this.value);
}   // if((info
        // Строка типа '04'
if((this.value.length > 1) && (this.value[0]=='0') && (this.value[1]!='.')) {
    this.value = this.value.replace(this.value[0],'');  // удалить ненужный ноль, => строка = '4'
}   // if((this.value.length > 1)
        // Если дивидеров > 1
if(info1.cnt > 1) {
    this.value = dotCutter(this.value, info1.firstPoz);
    info1 = dotCount(this.value);
    console.log("kInputIDec: Info1 from dotCount = " + info1.toString());
}   // if(info.cnt
    numDec = parseFloat(this.value);
while(numDec > 359.999) {   // while т.к. может быть копипаста
    console.log('if-4: this.value before this.value.substring() = ' + this.value + ' >= 360');
    var tmpTxt = cutty(this.value, event.target.selectionStart);
    this.value = tmpTxt;
    numDec = parseFloat(this.value);
}   // while
    Solution();    
} // kInputIDec(event)


function cutty(text, cutter) {  // cutter - это номер символа в строке (= номер позиции курсора); или индекс смещения + 1
    var txt1 = text.slice(0,cutter-1);
    var txt2 = text.slice(cutter);
    console.log('cutty() here! cutter position = ' + cutter + '; Half-Strings:  txt1 = ' + txt1 + '; cutted = ' + text[cutter-1] + '; txt2 = ' + txt2);
    return txt1 + txt2;  
}   // function cutty(text, cutter)


function dotCount(text) {   // определяет количество дивидеров
    var info = {    // объект - чтоб можно было из функции вернуть несколько значений
        cnt: 0,     // count of dividers
        poz: -1,    // position of divider (нумерация символов - с нуля, т.е смещение от указателя)
        firstPoz: 0,// first position of divider (нумерация символов - с нуля, т.е смещение от указателя)
        toString: function() {  // overload function toString()
return 'Here dotCount()\'s inner var info\'s function = info.toString: count of dividers = ' + this.cnt + '; offset from pointer to first divider = ' + this.firstPoz
        }   // toString: function()
    };  // var info
    console.log("Here start dotCount(): text for search dividers = " + text);
    while ((info.poz = text.indexOf('.', info.poz+1)) !== -1) { // text.indexOf() возвращает смещение от указателя (т.е позиции символов нумеруются с нуля)
        info.cnt++;
        if(info.cnt === 1) info.firstPoz = info.poz;
        console.log("We in dotCount()\'s cycle while(): now offset from pointer to divider = " + info.poz + "; count of dividers = " + info.cnt);
    }   // while    
    console.log(info);
    return info;
}   // function dotCount(text)


function dotCutter(textIn, firstDivider) {
    let poz = textIn.length;
    console.log("dotCutter(): first Divider's position = " + firstDivider + "; position from end = " + poz);
    while ((poz = textIn.lastIndexOf('.', poz)) > firstDivider) {
        textIn = cutty(textIn, poz+1);
        console.log("dotCutter: deleted divider's position = " + poz);
    }   // while ((poz
    return textIn;
}   // dotCutter()


function kInputInt(event) {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    console.log("Значение по ссылке " + event.target.id + " == " + this.value + "; type == " + typeof(this.value) + "; length of string == " + this.value.length);
    switch(this) {
        case v_iG:
            if(this.value=="") numG = 0;
            else numG = parseInt(this.value);
            if(numG > 359) {
                I("Угол д.б. менее 360 град.");
                this.value = ""; numG = 0;
                event.preventDefault();
                return false; }
            console.log("Значение numG == " + numG + "; type == " + typeof(numG));
            break;
        case v_iM:
            if(this.value=="") numM = 0;
            else numM = parseInt(this.value);
            if(numM > 59) {
                I("В градусе д.б. менее 60 минут");
                this.value = ""; numM = 0;
                event.preventDefault();
                return false; }
            console.log("Значение numM == " + numM + "; type == " + typeof(numM));
            break;    
        default:
            break;
    }   // switch (this)
    if((numG==0)&(numM==0)&(numS==0))
    { v_iDec.value = ""; numDec = 0; }
    else {    
    Solution1();
    }
    // I("Ready");
}


function kInputIS(event) {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    console.log("Значение по ссылке v_iS == " + this.value + "; type == " + typeof(this.value) + "; length of string == " + this.value.length);
    txt = this.value.replace(/,/,'.');
    console.log("Значение txt == " + txt + "; type == " + typeof(txt) + "; length of string == " + txt.length);
    if((txt=="")||(txt==",")||(txt=="."))  {
        this.value = ""; numS = 0;
    if((numG==0)&(numM==0)&(numS==0))
        v_iDec.value = ""; numDec = 0;
    }
    else { 
    numS = parseFloat(txt);
    console.log("Значение numS == " + numS + "; type == " + typeof(numS));
    Solution1();
    }
}


function Solution() {   // for kInputIDec
    console.log("Значение numDec = " + numDec + "; type = " + typeof(numDec));
    Angle_Sec = numDec * 3600;      // Угол с клавы в секундах
    numG = Math.floor(numDec);      // ГРАДУСЫ
    degSec = numG * 3600;           // ГРАДУСЫ - в секундах
    fracSec = Angle_Sec - degSec;   // Дробная часть градуса - в секундах
    fracMin = fracSec / 60;         // Дробная часть градуса - в минутах
    numM = Math.floor(fracMin);     // МИНУТЫ
    minSec = numM * 60;             // МИНУТЫ - в секундах
    numS = fracSec - minSec;        // СЕКУНДЫ        
    v_iG.value = numG;
    console.log("Значение v_iG.value = " + v_iG.value + "; type = " + typeof(v_iG.value));
    v_iM.value = numM;
    numS  = numS.toFixed(4);
    v_iS.value = numS;
    // I("Ready");
}   // Solution() for kInputIDec


function Solution1() {
    deg1 = numG * 3600;
    min1 = numM * 60;
    sec1 = numS * 1;
    deg1 = deg1 + min1 + sec1;
    numDec = deg1 / 3600;
    v_iDec.value = numDec;
} // Solution1() for Deg-Min-Sec


    // КНОПКА = input type="button" id="btn_calc"
function calcRun(event) {
    console.log("\nEvent " + ++i + " => " + event.type + " in id == " + event.target.id);
    console.log("Event Button 'Calculate Angle's Trig' = " + event.type + " in id == " + event.currentTarget.id);
    console.log("X = " + event.clientX + " Y = " + event.clientY);
    gradInRad();
    sin();
    cos();
    tg();
    ctg();
}   // calcRun(event)


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
