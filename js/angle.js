var angleDec = 0;
var deg = 0;
var min = 0;
var sec = 0;

// Событие нажатие кнопки Calculate Thickness
function Event_PressButton() {
    angleDec = document.getElementById('input_angle_dec').value;
    window.alert("Angle = " + angleDec);
    // pipe.eval_thickness();
    // Output_Thickness();
} // function Event_PressButton()



// Событие ввод числа + Enter
function Event_Input_Num() {
    angleDec = document.getElementById('input_angle_dec').value;
    // window.alert("Angle = " + angleDec);
    document.getElementById('input_grad').value = angleDec;
    // window.alert("Calibre = " + calibre.calibreINCH + " inch and " + calibre.calibreMM + " mm");
    // Output_Calibre();
} // function Event_PressButton()


// Вывод калибра в мм
function Output_Calibre() {
    document.getElementById('input_grad').innerHTML = angleDec.toFixed(2);
} // function Output_Calibre()