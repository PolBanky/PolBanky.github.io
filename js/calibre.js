var calibre = {
    calibreINCH: 0,   // 
    calibreMM: 0,     //
    
    eval_calibre: function ()
    {
        this.calibreMM = (this.calibreINCH / 100) * 25.4;
    } // function eval_calibre()    
}; // var calibre


// Событие ввод числа
function Event_TxtInput() {
    calibre.calibreINCH = document.getElementById('input_calibre').value;
    calibre.eval_calibre();
    // window.alert("Calibre = " + calibre.calibreINCH + " inch and " + calibre.calibreMM + " mm");
    Output_Calibre();
} // function Event_TxtInputd()


// Вывод калибра в мм
function Output_Calibre() {
    document.getElementById('calibre_output').innerHTML = calibre.calibreMM.toFixed(2);
} // function Output_Calibre()