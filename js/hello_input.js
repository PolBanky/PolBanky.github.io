'use strict';

// var numDot_RE = /[^\d.]/;   // not g - поиск в строке из 1 символа
var a_RE = /[^\d.]/g;
// var dot_RE = /[.]/g;
var comma_RE = /[,]/g;
var notD_RE = /[^\d]/g;

//**************** superinput !!!
class HelloInput extends HTMLInputElement {
    constructor() {
      super();
      this.decimal = 0;
      this.addEventListener('focus', () => workinp());
      this.addEventListener("input",hello_inputIDec);
    } // constructor()
  } // class HelloInput
  
customElements.define('hello-input', HelloInput, {extends: 'input'});   
//**************** superinput !!!


// inputIDec(event)
function hello_inputIDec() {
    // console.log("Function hello_inputIDec(): Event Type = " + event.type + "." + event.inputType + " in HTML_Element id = " + event.target.id + "\nthis.value = " + this.value + "; typeof(this.value) = " + typeof(this.value));
    // console.log(event);
        this.value = checkFix(this.value); // checkFix() и вызываемые далее функции - в файле float.js
        if((this.value !='') & (this.value !='0')) {
            this.decimal = parseFloat(this.value);  // mm
        } // if((v_length.value !='') & (v_length.value !='0'))
        else {
            this.decimal = 0.0;
        } // else
        // console.log('this of hello-input element = ',this);
        // console.log('decimal of hello-input element = ',this.decimal,' typeof(this.decimal) = ',typeof(this.decimal));
        sol(event);  // функция где происходят требуемые расчеты и всякое что надо 
    } // hello_inputIDec()


function checkFix(inTxt) {
// console.log("Function checkFix(" + inTxt + ")  (float.js)");
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

function workinp() { // class HelloInput.addEventListener('click', () => workinp() in updateElems.js
    console.log('hello-input Input id = ',event.target.id,' on focus !');
} // function workinp()