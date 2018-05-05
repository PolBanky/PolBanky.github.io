var deg = 0;
var deg_Int = 0;
var deg_Frac = 0;
var min = 0;
var min_Int = 0;
var min_Frac = 0;
var sec = 0;

var deg1 = 0;
var min1 = 0;
var sec1 = 0;
var degDec = 0;

// Событие - ввод символа (или удаление)
function Event_InputDeg() {
    deg = document.getElementById('input_deg').value;
    deg_Int = Math.floor(deg);
    deg_Frac = deg - deg_Int;
    deg_Frac = deg_Frac.toFixed(6);
    min = deg_Frac * 60;
    min_Int = Math.floor(min);
    min_Frac = min - min_Int;
    min_Frac = min_Frac.toFixed(6);
    sec = min_Frac * 60;
    sec = sec.toFixed(2);

    console.log("deg = " + deg);
    console.log("deg_Int = " + deg_Int);
    console.log("deg_Frac = " + deg_Frac);
    console.log("min = " + min);
    console.log("min_Int = " + min_Int);
    console.log("min_Frac = " + min_Frac);
    console.log("sec = " + sec);
    
    document.getElementById('input_grad').value = deg_Int;
    document.getElementById('input_min').value = min_Int;
    document.getElementById('input_sec').value = sec;
} // function Event_InputDeg()


// Событие - ввод символа (или удаление)
function Event_InputGradMinSec() {
    deg1 = document.getElementById('input_grad').value;
    min1 = document.getElementById('input_min').value;
    sec1 = document.getElementById('input_sec').value;
    
    console.log("deg1 = " + deg1);
    console.log("min1 = " + min1);
    console.log("sec1 = " + sec1);
    
    min1 = min1 / 60;
    sec1 = sec1 / 3600;    
    console.log("min1/60 = " + min1);
    console.log("sec1/3600 = " + sec1);
    
    degDec = (+deg1) + (+min1) + (+sec1);    
    console.log("degDec = " + degDec);

    document.getElementById('input_deg').value = degDec;
} // function Event_InputGradMinSec()


// Событие - клик по кнопке
function Event_PressButton() {

    

} // function Event_PressButton()