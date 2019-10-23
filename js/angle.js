'use strict';
// Для совместимости с мобильными устройствами события keypress не используются, используется только событие input
    // Переменные = ссылки на HTML элементы
var v_iDec = document.getElementById("IDec");   // HTML Input = i(nput)Dec(imal)
var v_iG   = document.getElementById('IG');
var v_iM   = document.getElementById('IM');
var v_iS   = document.getElementById('IS');
var cl  = document.getElementById('clear');     // элемент legend панели ввода данных
var inf = document.getElementById('forInfo');   // строка состояния
var btn = document.getElementById('btn_calc');  // кнопка считать тригенометрию
var showRad = document.getElementById('angl_in_rad_output');    // Вывод значения угла в радианах
var showRadLabel = document.getElementById('in_rad_lbl');       // Лебел вывода значения угла в радианах
var showSin = document.getElementById('sin_output');
var showCos = document.getElementById('cos_output');
var showTg  = document.getElementById('tg_output');
var showCtg = document.getElementById('ctg_output');

    // События на HTML элементах (и ссылки на функции - обработчики событий)
cl.addEventListener("click",clearAll_angle);
btn.addEventListener("click",calcRun);      // Нажатие кнопки

v_iDec.addEventListener("input",inputIDec); // Dec
v_iDec.addEventListener("keyup",cursorPos); // keyup
v_iDec.addEventListener("click",cursorPos); // click

v_iS.addEventListener("input",inputIS);     // Sec
v_iS.addEventListener("keyup",cursorPos);   // keyup
v_iS.addEventListener("click",cursorPos);   // click

v_iG.addEventListener("input",inputIG);     // Grad
v_iG.addEventListener("keyup",cursorPos);   // keyup
v_iG.addEventListener("click",cursorPos);   // click

v_iM.addEventListener("input",inputIM);     // Min
v_iM.addEventListener("keyup",cursorPos);   // keyup
v_iM.addEventListener("click",cursorPos);   // click

window.addEventListener("load",ld);
window.addEventListener("beforeunload",bULd);

var i = 0;          // номера стартов функции события

var numDec = 0;     // Угол с клавы в ДЕСЯТИЧНЫХ град
var Angle_Sec = 0;  // Угол с клавы в секундах
var numG = 0;       // Целых градусов в угле
var degSec = 0;     // Целых градусов в угле - в секундах
var fracSec = 0;    // Дробная часть градуса - в секундах
var fracMin = 0;    // Дробная часть градуса - в минутах
var numM = 0;       // Целых минут в дробной части
var minSec = 0;     // Целых минут в дробной части - в секундах
var numS = 0;       // Секунды - то что осталось
var deg1 = 0;       // deg в deg-min-sec
var min1 = 0;       // min в deg-min-sec
var sec1 = 0;       // sec в deg-min-sec
var angleInRad = 0; // Угол numDec в радианах


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


function clearAll_angle() {
    // console.log("\nClear All:  Event num " + ++i + ", type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id);
    v_iDec.value = ""; numDec = 0;
    v_iG.value = ""; numG = 0;
    v_iM.value = ""; numM = 0;
    v_iS.value = ""; numS = 0;
    I('Ready');
}   // clearAll_angle()


function inputIDec(event) {    // inputIDec(event)
    console.log("\nEvent num " + ++i + ", type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id);
        //  Вызов общей функции
    // событие в котором все символы были удалены ИЛИ символы были но недопустимые и они были удалены в checkFix()    
if((this.value==='')||((this.value = checkFix(this.value))==='')) {
    clearAll_angle();
    return false;   // Если все символы удалены - maybe by input type = deleteContentBackward
}   // if(this.value==='')
    numDec = parseFloat(this.value);
while(numDec > 359.999) {   // while т.к. может быть копипаста
    console.log('if-4: this.value before this.value.substring() = ' + this.value + ' >= 360');
    var tmpTxt = cutty(this.value, event.target.selectionStart);
    this.value = tmpTxt;
    numDec = parseFloat(this.value);
}   // while
    Solution();    
}   // inputIDec(event)


function inputIG(event) {
    console.log("\nEvent num " + ++i + ", type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id);
        //  Вызов общей функции
    // событие в котором все символы были удалены ИЛИ символы были но недопустимые и они были удалены в checkFix()
if((this.value==='')||((this.value = checkFixInt(this.value))==='')) {
if((numM==0)&&(numS==0)){
    clearAll_angle();
    return false; 
}   // if((v_iM.value==='0')
numG = 0;
}   // if(this.value==='')
    else numG = parseInt(this.value);
while(numG > 359) {   // while т.к. может быть копипаста
    console.log('if-4: this.value before this.value.substring() = ' + this.value + ' > 359');
    var tmpTxt = cutty(this.value, event.target.selectionStart);
    this.value = tmpTxt;
    numG = parseInt(this.value);
    console.log("Значение numG == " + numG + "; type == " + typeof(numG));
}   // while
    Solution1();
}   // inputIG(event)


function inputIM(event) {
    console.log("\nEvent num " + ++i + ", type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id);
        //  Вызов общей функции
    // событие в котором все символы были удалены ИЛИ символы были но недопустимые и они были удалены в checkFix()
if((this.value==='')||((this.value = checkFixInt(this.value))==='')) {
if((numG==0)&&(numS==0)){
    clearAll_angle();
    return false; 
}   // if((v_iG.value==='0')
numM = 0;
}   // if(this.value==='')
    else numM = parseInt(this.value);
while(numM > 59) {   // while т.к. может быть копипаста
    console.log('if-4: this.value before this.value.substring() = ' + this.value + ' > 59');
    var tmpTxt = cutty(this.value, event.target.selectionStart);
    this.value = tmpTxt;
    numM = parseInt(this.value);
    console.log("Значение numM == " + numM + "; type == " + typeof(numM));
}   // while
    Solution1();
}   // inputIM(event)


function inputIS(event) {
    console.log("\nEvent num " + ++i + ", type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id);
        //  Вызов общей функции
    // событие в котором все символы были удалены ИЛИ символы были но недопустимые и они были удалены в checkFix()
if((this.value==='')||((this.value = checkFix(this.value))==='')) {
if((numG==0)&&(numM==0)){
    clearAll_angle();
    return false; 
}   // if((v_iG.value==='0')
numS = 0;
}   // if(this.value==='')
    else numS = parseFloat(this.value);
while(numS > 59.99999) {   // while т.к. может быть копипаста
    console.log('if-4: this.value before this.value.substring() = ' + this.value + ' >= 60');
    var tmpTxt = cutty(this.value, event.target.selectionStart);
    this.value = tmpTxt;
    numS = parseFloat(this.value);
    console.log("Значение numS == " + numS + "; type == " + typeof(numS));
}   // while
    Solution1();
}   // inputIS(event)


function Solution() {   // for inputIDec
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
}   // Solution() for inputIDec


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
    console.log("\nEvent num " + ++i + ", type = " + event.type + " in Element id == " + event.target.id);
    console.log("X = " + event.clientX + " Y = " + event.clientY);
    gradInRad();
    sin();
    cos();
    tg();
    ctg();
}   // calcRun(event)


function gradInRad() {
    var dFactor = Math.PI / 180;  // = 0,01745329251994329576923690768489
    console.log("\nЗначение numDec for gradInRad() = " + numDec + "; type = " + typeof(numDec));
    angleInRad = numDec * dFactor;
    showRad.innerHTML = angleInRad.toFixed(6);
    showRadLabel.innerHTML = "Угол " + numDec + "\u00B0 - в радианах";
} // function gradInRad()


function sin() {
    var sin1 = Math.sin(angleInRad).toFixed(6); 
    showSin.innerHTML = sin1;
}   // sin


function cos() {
    var cos1 = Math.cos(angleInRad).toFixed(6); 
    showCos.innerHTML = cos1;
}   // cos


function tg() {
    var tg1 = Math.tan(angleInRad).toFixed(6); 
    showTg.innerHTML = tg1;
}   // tg


function ctg() {
    var ctg1 = 'ctg = 1 / 0';
if((Math.tan(angleInRad).toFixed(6))!=0)
    ctg1 = (1/Math.tan(angleInRad)).toFixed(6);
    showCtg.innerHTML = ctg1;
}   // ctg