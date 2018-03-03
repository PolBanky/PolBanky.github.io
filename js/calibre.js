var calibre = {
    calibreINCH: 0,  // external diameter, mm
    calibreMM: 0,     // SDR
    
    eval_calibre: function ()
    {
        this.calibreMM = (this.calibreINCH / 100) * 25.4;
    } // function eval_calibre()    
}; // var calibre


// Событие ввод числа + Enter
function Event_TxtChanged() {
    calibre.calibreINCH = document.getElementById('calibre_input').value;
    calibre.eval_calibre();
    // window.alert("Calibre = " + calibre.calibreINCH + " inch and " + calibre.calibreMM + " mm");
    Output_Calibre();
} // function Event_PressButton()


// Вывод калибра в мм
function Output_Calibre() {
    document.getElementById('calibre_output').innerHTML = calibre.calibreMM.toFixed(2);
} // function Output_Calibre()