'use strict';

// var numDot_RE = /[^\d.]/;   // not g - поиск в строке из 1 символа
var a_RE = /[^\d.]/g;
// var dot_RE = /[.]/g;
var comma_RE = /[,]/g;
var notD_RE = /[^\d]/g;


//**********************************************************************
// 0  steelName = a1;                 // Марка стали
// 1  ultimate_Strength = a2;         // Временное сопротивление
// 2  yield_Strength = a3;            // Предел текучести
// 3  static_Stretch_Stress_Max = b1; // Stretch - растяжение
// 4  static_Bend_Stress_Max = c1;    // Bend - изгиб
// 5  static_Twist_Stress_Max = d1;   // Twist - кручение
// 6  static_Cut_Stress_Max = e1;     // Cut - срез

var steels = [
    //     0               1      2     3       4       5      6 
    ["сталь 3         ", 370.0, 245.0, 125.0, 150.0,  95.0,  75.0],  // 0	Сталь 3
    ["сталь 20 (Н)    ", 420.0, 250.0, 140.0, 170.0, 105.0,  85.0],  // 1   Сталь 20 (Н)
    ["сталь 20 (Ц-В59)", 500.0, 300.0, 165.0, 200.0, 125.0, 100.0],  // 2   Сталь 20 (Ц-В59)
    ["сталь 45 (Н)    ", 610.0, 360.0, 200.0, 240.0, 150.0, 125.0],  // 3   Сталь 45 (Н)
    ["сталь 45 (У)    ", 750.0, 450.0, 240.0, 290.0, 185.0, 145.0],  // 4   Сталь 45 (У)
    ["сталь 45 (М35)  ", 900.0, 650.0, 300.0, 360.0, 230.0, 185.0],  // 5   Сталь 45 (М35)
    ["сталь 45 (В42)  ",1000.0, 700.0, 300.0, 360.0, 230.0, 185.0],  // 6   Сталь 45 (В42)
    ["сталь 45 (В48)  ",1200.0, 950.0, 400.0, 480.0, 300.0, 240.0],  // 7   Сталь 45 (В48)
    ["сталь 45 (ТВЧ56)", 750.0, 450.0, 240.0, 290.0, 185.0, 145.0],  // 8   Сталь 45 (ТВЧ56)
    ["сталь 40Х (Н)   ", 630.0, 330.0, 200.0, 240.0, 150.0, 120.0],  // 9   Сталь 40Х (Н)
    ["сталь 40Х (У)   ", 800.0, 650.0, 270.0, 320.0, 200.0, 160.0],  // 10  Сталь 40Х (У)
    ["сталь 40Х (М39) ",1100.0, 900.0, 200.0, 450.0, 280.0, 230.0],  // 11  Сталь 40Х (М39)
    ["сталь 40Х (М48) ",1300.0,1100.0, 440.0, 530.0, 330.0, 270.0],  // 12  Сталь 40Х (М48)
    ["сталь 09Г2С	  ", 500.0, 350.0, 170.0, 200.0, 125.0, 100.0]   // 13  Сталь 09Г2С
    ];
    //**********************************************************************


function I(txt) {
    inf.innerHTML = txt;
}   // I(txt)

 
function cursorPos(event) {  // keyup & click
    // console.log("\nEvent num " + ++i + ", type = " + event.type + " in Element id = " + event.target.id + "; Cursor position = " + event.target.selectionStart);
    I('Pos=' + event.target.selectionStart);
}   // cursorPos(event)


function checkFix(inTxt) {
console.log("Function checkFix(" + inTxt + ")  (float.js)");
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


function checkFixInt(inTxt) {   // INT
    console.log("checkFixInt("+ inTxt +")  (float.js)");
if(notD_RE.test(inTxt)) {   // если нецифры
    inTxt = inTxt.replace(notD_RE,''); // Если символы = comma или dot или нецифра то заменяется на ничто; глобально - чтоб два раза не вставать
    // console.log("inTxt after replace commas, dots, letters with nothing = " + inTxt + "; length = " + inTxt.length);
}   // if(notD_RE.test)
    // ***  Ниже в инпуте уже только цифры  ***        
if(inTxt[0]=='0') { // Строка типа '04'
    inTxt = inTxt.replace(inTxt[0],'');  // удалить ненужный ноль, => строка = '4'
    // console.log("inTxt after: first zero;  inTxt = " + inTxt);
}   // if((this.value.length > 1)
    return inTxt;
}   // function checkFixInt(inTxt)


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