'use strict';

// var numDot_RE = /[^\d.]/;   // not g - поиск в строке из 1 символа
const a_RE = /[^\d.]/g;
// var dot_RE = /[.]/g;
const comma_RE = /[,]/g;
const notD_RE = /[^\d]/g;

//**************** superinput !!!
class HelloInput extends HTMLInputElement {
constructor() {
    super();
    this.decimal = 0.0;
    this.style.fontSize = '1.25rem';
    this.style.width = '250px';
    this.style.margin = '5px 0px';
    this.style.padding = '5px';
    this.style.color = '#b22222';
    this.style.backgroundColor = '#d4e09e40';
    this.style.border = '3px solid #33cc00';
    this.style.outline = 'none';    // без рамки появляющейся когда фокус
    this.addEventListener('focus', ()=> { 
        this.style.backgroundColor = '#ffe4b5';
        this.style.border = '3px solid #d2691e';
        if(debug) console.log(`%c${++num}. Now run: focus();  this.id = ${this.id}`,grn);
    });
    this.addEventListener('blur', ()=> { 
        this.style.backgroundColor = '#d4e09e40';
        this.style.border = '3px solid #33cc00';
        if(debug) console.log(`%c${++num}. Now run: blur();  this.id = ${this.id}`,grn);
    });
    this.addEventListener("input",inpIDec);
    this.addEventListener("input",this.run);
    } // constructor()
} // class HelloInput
  
customElements.define('hello-input', HelloInput, {extends: 'input'});
//**************** superinput !!!


// inputIDec(event)
function inpIDec() {
    if(debug) console.log(`%c${++num}. Now run: inpIDec();  this.id = ${this.id}`,grn);
    this.value = checkFix(this.value); // checkFix() и вызываемые далее функции - в этом файле ( hello_input.js )
    if((this.value !='') & (this.value !='0')) {
        this.decimal = parseFloat(this.value);  // mm
    } // if((v_length.value !='') & (v_length.value !='0'))
    else {
        this.decimal = 0.0;
    } // else
    // console.log('decimal of hello-input element = ',this.decimal,' typeof(this.decimal) = ',typeof(this.decimal));
} // inpIDec()


function checkFix(inTxt) { // inTxt == this.value
// console.log("Function checkFix(" + inTxt + ")  (hello_input.js)");
        // Если есть запятые
if(comma_RE.test(inTxt)) {
    inTxt = inTxt.replace(comma_RE,'.'); // Если символ = comma то заменяется на dot; глобально - чтоб два раза не вставать
    // console.log("inTxt after: replace commas to dots = " + inTxt + "; length = " + inTxt.length);
}   // if (comma_RE)
        // Если есть буквы
if(a_RE.test(inTxt)) {
if((inTxt = inTxt.replace(a_RE,''))==='') {
    // console.log("inTxt after: replace ALL letters with nothing = " + inTxt + "; length = " + inTxt.length);
    return '';
}   // if
    // console.log("inTxt after: replace letters with nothing = " + inTxt + "; length = " + inTxt.length);
}   // if(a_RE)
    // ***  Ниже в инпуте уже только цифры и дивидеры  ***
    var info1 = dotCount(inTxt);   // количество дивидеров and offset from pointer to divider
    // console.log("We in checkFix() again:  Info1 from dotCount() = " + info1.toString());
        // Строка типа '04'
while((inTxt.length > 1) && (inTxt[0]=='0') && (inTxt[1]!='.')) {
    inTxt = inTxt.replace(inTxt[0],'');  // удалить ненужный ноль, => строка = '4'
    // console.log("inTxt after: first zero and second not divider;  inTxt = " + inTxt);
}   // if((this.value.length > 1)
        // Если дивидеров > 1
if(info1.count > 1) {
    inTxt = dotCutter(inTxt, info1.firstPosition);
    info1 = dotCount(inTxt);
    // console.log("inTxt after: dividers > 1;  Info1 from dotCount = " + info1.toString());
}   // if(info.cnt
        // Если дивидеров = 1 и дивидер первый символ
if((info1.count == 1) && (info1.firstPosition == 0)) {
    inTxt = inTxt.replace('.','0.');
    info1 = dotCount(inTxt);
    // console.log("inTxt after: one divider and divider is first symbol;  Info1 from dotCount = " + info1.toString());
}   // if((info
    return inTxt;
}   // function checkFix(inTxt)


function cutty(text, cutter) {  // cutter - это номер символа в строке (= номер позиции курсора); или индекс смещения + 1
    var txt1 = text.slice(0,cutter-1);
    var txt2 = text.slice(cutter);
    // console.log('We in cutty(): cutter position = ' + cutter + '; string\'s parts: txt1 = ' + txt1 + '; cutted symbol = ' + text[cutter-1] + '; txt2 = ' + txt2);
    return txt1 + txt2;  
}   // function cutty(text, cutter)


function dotCount(text) {  // определяет количество дивидеров
    var info = {           // объект - чтоб можно было из функции вернуть несколько значений
        count: 0,          // count of dividers
        positions: -1,     // position of divider (нумерация символов - с нуля, т.е смещение от указателя)
        firstPosition: -1, // first position of divider (нумерация символов - с нуля, т.е смещение от указателя)
        toString: function() { // overload function toString()
return 'It\'s info.toString(): count of dividers = ' + this.count + '; offset from pointer to first divider = ' + this.firstPosition
        }   // toString: function()
    };      // var info
    // console.log("We in dotCount(): text for search dividers = " + text);
    while ((info.positions = text.indexOf('.', info.positions+1)) !== -1) { // text.indexOf() возвращает смещение от указателя (т.е позиции символов нумеруются с нуля)
        info.count++;
        if(info.count===1) info.firstPosition = info.positions;
        // console.log("We in dotCount()\'s cycle while(): now offset from pointer to divider = " + info.positions + "; count of dividers = " + info.count);
    }   // while    
    // // console.log(info);
    return info;
}   // function dotCount(text)


function dotCutter(textIn, firstDivider) {
    let poz = textIn.length;
    // console.log("dotCutter(): first Divider's position = " + firstDivider + "; position from end = " + poz);
    while ((poz = textIn.lastIndexOf('.', poz)) > firstDivider) {
        textIn = cutty(textIn, poz+1);
        // console.log("dotCutter: deleted divider's position = " + poz);
    }   // while ((poz
    return textIn;
}   // dotCutter()


function workinp() {
    console.log(`Now run: workinp();  this.id = ${this.id}`);
} // function workinp()
