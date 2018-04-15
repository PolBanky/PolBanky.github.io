//'use strict';
// Программа пересчета цельсия в фаренгейт или наоборот

// Объект Температура c_f  !!!!!!!
var c_f = {
    t_in: 0,  // Температура с клавы
    t_out: 0, // Температура пересчитанная
    eval_c_to_f: function () {   
        this.t_out = (this.t_in * 1.8) + 32.0; //
    }, // function eval_c_to_f()    
    eval_f_to_c: function () {   
        this.t_out = (this.t_in - 32.0) * 0.5555555; //
    } // function eval_f_to_c()
}; // var  c_f


// Вывод результата расчета
function Output_Temperature () {
//    window.alert("Output_Temperature " + c_f.t_out);
    document.getElementById('temperature_output').innerHTML = c_f.t_out.toFixed(3);
} // function Output_Temperature()


function Event_SelectChanged () {
   var ch = document.getElementById('c_or_f').value;
    switch (ch) // c_or_f - это select из index.html
    {
        case 'c':
            document.getElementById('input_grad').title = "\u00B0C";            //  \u00B0 ГРАДУС в JS  !!!!!!
            document.getElementById('input_grad').placeholder = "Цельсий";      // окно ввода
            document.getElementById('calc').value = "Calculate \u00B0C to \u00B0F"; // button
            document.getElementById('lbl_grad_out').innerHTML = " \u00B0F";         // Label after OUT
            break;
        case 'f':
            document.getElementById('input_grad').title = "Градусов Фаренгейта";    // окно ввода
            document.getElementById('input_grad').placeholder = "Фаренгейт";        // окно ввода
            document.getElementById('calc').value = "Calculate \u00B0F to \u00B0C"; // button
            document.getElementById('lbl_grad_out').innerHTML = " \u00B0C";         // Label after OUT
            break;
        default:
            window.alert("Myswitch = default");
    } // switch(ch)
} // function Event_SelectChanged()


// Событие нажатие кнопки Calculate
function Event_PressButton() {
c_f.t_in = document.getElementById('input_grad').value;
var ch = document.getElementById('c_or_f').value;
    
    switch (ch) // c_or_f - это select из index.html
    {
        case 'c':
            if(c_f.t_in<-273.15)
            {
            window.alert("Абсолютный ноль по Цельсию = -273.15 град.");
            document.getElementById('input_grad').value = -273.15;
            c_f.t_in = document.getElementById('input_grad').value;
            }
            break;
        case 'f':
            if(c_f.t_in<-459.67)
            {
            window.alert("Абсолютный ноль по Фаренгейту = -459.67 град.");
            document.getElementById('input_grad').value = -459.67;
            c_f.t_in = document.getElementById('input_grad').value;
            }
            break;
        default:
            window.alert("Myswitch = default");
    } // switch(ch)
    
    switch (ch) // c_or_f - это select из index.html
    {
        case 'c':
            c_f.eval_c_to_f();
            break;
        case 'f':
            c_f.eval_f_to_c();
            break;
        default:
            window.alert("Myswitch = default");
    } // switch(ch)
    Output_Temperature();
} // function Event_PressButton()
