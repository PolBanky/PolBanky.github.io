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
v_iDec.addEventListener("input",kInputIDec);
v_iDec.addEventListener("keyup",kPozIDec);
v_iDec.addEventListener("click",kPozIDec);
v_iG.addEventListener("input",kInputInt);
v_iM.addEventListener("input",kInputInt);
v_iS.addEventListener("input",kInputIS);

window.onload = function ld() {
    console.log('Window loaded');
    var stor = localStorage.getItem('DecStor'); // string
    console.log("Value in local storage = " + stor + "; data type = " + typeof(stor));
    if(stor !== '0') {
    v_iDec.value = stor;
    console.log('Data from last work session = ' + v_iDec.value);
    numDec = parseFloat(v_iDec.value);
    Solution();
    I('Data from last work session');
    v_iDec.focus();
}   // if
}


window.onbeforeunload = function bULd() {
    localStorage.setItem('DecStor',numDec);
}


function I(txt) {
    inf.innerHTML = txt;
}


function clearAll() {
    console.log("\nEvent " + ++i + " function clearAll() => " + event.type + " in id = " + event.target.id);
    v_iDec.value = ""; numDec = 0;
    v_iG.value = ""; numG = 0;
    v_iM.value = ""; numM = 0;
    v_iS.value = ""; numS = 0;
}


function kPozIDec(event) {
    console.log("\nEvent " + ++i + " = " + event.type + "; event in id = " + event.target.id + "; cursor position = " + event.target.selectionStart);    
}


function kInputIDec(event) {
var curPoz = event.target.selectionStart;   // cursor position
    console.log("\nEvent " + ++i + " = " + event.type + "; event's input type = " + event.inputType + "; event in id = " + event.target.id + "; cursor position = " + curPoz);
    console.log("Value in 'this' before 'value.replace' = " + this.value + "; type = " + typeof(this.value) + "; length of string = " + this.value.length);
if(this.value.length==0) {  // Все символы удалены
    clearAll();
    return false;
}   // if
var ch = '';    // char
var di = 0;     // divider
    //  FOR - проверка каждого символа имеющейся строки
for(var a=0; a<this.value.length; a++) {    // a - это смещение от указателя
    console.log("Symbol num " + (a+1) + " = " + this.value[a] + "; this.value.length = " + this.value.length);  // num a+1 - т.к. а это не смещение
if(this.value[a]==',') {
    this.value = this.value.replace(/,/,'.'); // Если символ = comma то заменяется на dot
    console.log("After Fix comma - Symbol num " + (a+1) + " = " + this.value[a] + "; this.value.length = " + this.value.length);
}   // if
if(a==1) {  // (a==1) - т.е. смещение = 1, т.е. второй символ строки
    if((this.value[a]!='.') && (this.value[0]=='0')) {  // т.е. строка типа '04'
        this.value = this.value.replace(this.value[0],'');  // удалить ненужный ноль, => строка = '4'
        a--;
        console.log("After Fix first zero without dot - Symbol num " + (a+1) + " = " + this.value[a] + "; this.value.length = " + this.value.length);
    }   // if
}   // if
    ch = this.value[a]; // чтоб следующая строка была короче и т.д.
if (ch !== '0' & ch !== '1' & ch !== '2' & ch !== '3' & ch !== '4' & ch !== '5' & ch !== '6' & ch !== '7' & ch !== '8' & ch !== '9' & ch !== '.') {
    console.log("Error with symbol = " + this.value[a] + " => symbol deleted");
if(this.value.length==1) {  // если нецифра была единственным символом в строке то строка станет пустой после удаления нецифры
    clearAll();
    return false;
}   // if
else {  // если нецифра была НЕ единственным символом в строке
    this.value = this.value.replace(ch,''); // заменить нецифру на ничто
    a--;                                    // строка становится короче на 1 символ
    event.target.selectionStart = (curPoz-1);   // оставить курсор на месте вводившегося и удаленного символа
    window.getSelection().collapseToStart();    // уменьшить выделение до курсора
}   // else
}   // if нецифра
if(ch == '.') { // если dot
if(a==0) {      // если dot первый в строке
    this.value = this.value.replace(ch,'0.');
    a++;
}   // if  
    di++;
    console.log("Number decimal Dividers di = " + di + "; this.value.length = " + this.value.length);
}   // if dot
if(di>1) {  // если количество dot больше одного
    // this.value = this.value.replace(ch,'');
    this.value = this.value.substring( 0, this.value.length-1); // если курсор был внутри строки то она обрезается сзади
    di--;
    a--;
    console.log("Second divider deleted. Number decimal Dividers di = " + di + "; this.value.length = " + this.value.length);
}   // if
}   //  FOR
    numDec = parseFloat(this.value);
while(numDec > 359.999) {
    console.log('if-4: this.value before this.value.substring() = ' + this.value + ' >= 360');
    // var tmpTxt = this.value;
    var tmpTxt = cutty(this.value, curPoz);
    curPoz--;
    this.value = tmpTxt;
    numDec = parseFloat(this.value);
    /* do {
       this.value = this.value.substring( 0, this.value.length-1);
       numDec = parseFloat(this.value);
    } while(numDec > 359.999); */
}   // while
    Solution();    
} // kInputIDec(event)


function cutty(text, cur) {
    var txt1 = text.slice(0,cur-1);
    var txt2 = text.slice(cur);
    console.log('cutty here. Cursor poz = ' + cur + '; Half-Strings:  txt1 = ' + txt1 + '; txt2 = ' + txt2);
    return txt1 + txt2;  
}


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
    I("Ready");
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


function Solution() {
    console.log("Значение numDec == " + numDec + "; type == " + typeof(numDec));
    Angle_Sec = numDec * 3600;      // Угол с клавы в секундах
    numG = Math.floor(numDec);      // ГРАДУСЫ
    degSec = numG * 3600;           // ГРАДУСЫ - в секундах
    fracSec = Angle_Sec - degSec;   // Дробная часть градуса - в секундах
    fracMin = fracSec / 60;         // Дробная часть градуса - в минутах
    numM = Math.floor(fracMin);     // МИНУТЫ
    minSec = numM * 60;             // МИНУТЫ - в секундах
    numS = fracSec - minSec;        // СЕКУНДЫ        
    v_iG.value = numG;
    console.log("Значение v_iG.value == " + v_iG.value + "; type == " + typeof(v_iG.value));
    v_iM.value = numM;
    numS  = numS.toFixed(4);
    v_iS.value = numS;
    I("Ready");
}   // Solution()


function Solution1() {
    deg1 = numG * 3600;
    min1 = numM * 60;
    sec1 = numS * 1;
    deg1 = deg1 + min1 + sec1;
    numDec = deg1 / 3600;
    v_iDec.value = numDec;
} // Solution1()


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
