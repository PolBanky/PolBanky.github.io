'use strict';
// Для совместимости с мобильными устройствами события keypress не используются, используется только событие input
    // Переменные = ссылки на HTML элементы
let v_iDec = document.getElementById("IDec");   // HTML Input = i(nput)Dec(imal)
let v_iG   = document.getElementById('IG');
let v_iM   = document.getElementById('IM');
let v_iS   = document.getElementById('IS');
let cl  = document.getElementById('clear');     // элемент legend панели ввода данных
let inf = document.getElementById('forInfo');   // строка состояния
let btn = document.getElementById('btn_calc');  // кнопка считать тригенометрию
let showRad = document.getElementById('angl_in_rad_output');    // Вывод значения угла в радианах
let showRadLabel = document.getElementById('in_rad_lbl');       // Лебел вывода значения угла в радианах
let showSin = document.getElementById('sin_output');
let showCos = document.getElementById('cos_output');
let showTg  = document.getElementById('tg_output');
let showCtg = document.getElementById('ctg_output');

    // События на HTML элементах (и ссылки на функции - обработчики событий)
cl.addEventListener("click",clearAll_angle);
btn.addEventListener("click",calcRun);      // Нажатие кнопки считать тригенометрию

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

window.addEventListener("load",ld);             // load page angle.html
window.addEventListener("beforeunload",bULd);   // unload page angle.html

let i = 0;          // номера стартов функции события

let angleDec = 0;   // Угол с клавы в ДЕСЯТИЧНЫХ град
let Angle_Sec = 0;  // Угол с клавы в секундах
let numG = 0;       // Целых градусов в угле
let degSec = 0;     // Целых градусов в угле - в секундах
let fracSec = 0;    // Дробная часть градуса - в секундах
let fracMin = 0;    // Дробная часть градуса - в минутах
let numM = 0;       // Целых минут в дробной части
let minSec = 0;     // Целых минут в дробной части - в секундах
let numS = 0;       // Секунды - то что осталось
let deg1 = 0;       // deg в deg-min-sec
let min1 = 0;       // min в deg-min-sec
let sec1 = 0;       // sec в deg-min-sec
let angleInRad = 0; // Угол angleDec в радианах

let digits = 5;     // знаков после разделителя при выводе чисел


function I(txt) {
    inf.textContent = txt;
}   // I(txt)
 
function cursorPos(event) {  // keyup & click
    // console.log("\nEvent num " + ++i + ", type = " + event.type + " in Element id = " + event.target.id + "; Cursor position = " + event.target.selectionStart);
    I('Pos=' + event.target.selectionStart);
}   // cursorPos(event)


function ld() { // load
    console.log('Window loaded');
    // console.log(window);
if(localStorage.getItem('DecStor')) {
    let stor = localStorage.getItem('DecStor'); // string
    console.log("Value in local storage = " + stor + "; data type = " + typeof(stor));
if((stor !== '0') & (stor !== null)) {
    v_iDec.value = stor;
    angleDec = parseFloat(v_iDec.value);
    Solution();
    I('Data from last work session = ' + v_iDec.value);
    v_iDec.focus();
}   // if(stor)
}   // if(DecStor)
}   // function ld()


function bULd() {   // beforeunload
    localStorage.setItem('DecStor',angleDec);
}   // function bULd()


function clearAll_angle() {
    // console.log("\nClear All:  Event num " + ++i + ", type = " + event.type + "." + event.inputType + " in Element id = " + event.target.id);
    v_iDec.value = ""; angleDec = 0;
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
    angleDec = parseFloat(this.value);
while(angleDec > 359.999) {   // while т.к. может быть копипаста
    console.log('if-4: this.value before this.value.substring() = ' + this.value + ' >= 360');
    let tmpTxt = cutty(this.value, event.target.selectionStart);
    this.value = tmpTxt;
    angleDec = parseFloat(this.value);
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
    let tmpTxt = cutty(this.value, event.target.selectionStart);
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
    let tmpTxt = cutty(this.value, event.target.selectionStart);
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
    let tmpTxt = cutty(this.value, event.target.selectionStart);
    this.value = tmpTxt;
    numS = parseFloat(this.value);
    console.log("Значение numS == " + numS + "; type == " + typeof(numS));
}   // while
    Solution1();
}   // inputIS(event)


function Solution() {   // for inputIDec
    console.log("Значение angleDec = " + angleDec + "; type = " + typeof(angleDec));
    Angle_Sec = angleDec * 3600;      // Угол с клавы в секундах
    numG = Math.floor(angleDec);      // ГРАДУСЫ
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
    angleDec = deg1 / 3600;
    v_iDec.value = angleDec;
} // Solution1() for Deg-Min-Sec


    // КНОПКА = input type="button" id="btn_calc"
function calcRun(event) {
    // console.log("\nEvent num " + ++i + ", type = " + event.type + " in Element id == " + event.target.id);
    // console.log("X = " + event.clientX + " Y = " + event.clientY);
    gradInRad();
    sin();
    cos();
    tg();
    ctg();
}   // calcRun(event)


function gradInRad() {
    let dFactor = Math.PI / 180;  // = 0,01745329251994329576923690768489
    // console.log("\nЗначение angleDec for gradInRad() = " + angleDec + "; type = " + typeof(angleDec));
    angleInRad = angleDec * dFactor;
    /* showRad.textContent = `${angleDec} \u00D7 (\u03C0 / 180) = ${angleInRad.toFixed(digits)}`; */ // \u00D7=multSign  \u03C0=Pi
    showRad.textContent = `${angleDec} \u00D7 0,017453 = ${angleInRad.toFixed(digits)}`;
    showRadLabel.textContent = `Угол ${angleDec}\u00B0 - в радианах`;
} // function gradInRad()


function sin() {
    let sin1 = Math.sin(angleInRad).toFixed(digits); 
    showSin.textContent = sin1;
    return sin1;
} // sin


function cos() {
    let cos1 = Math.cos(angleInRad).toFixed(digits); 
    showCos.textContent = cos1;
    return cos1;
} // cos


function tg() {
    let tg1 = Math.tan(angleInRad).toFixed(digits); 
    showTg.textContent = `${sin()} / ${cos()}  = ${tg1}`;
} // tg


function ctg() {
    let ctg1 = 'Infinity';
if((Math.tan(angleInRad).toFixed(digits))!=0)
    ctg1 = (1/Math.tan(angleInRad)).toFixed(digits);
    showCtg.textContent = `${cos()} / ${sin()}  = ${ctg1}`;
} // ctg
