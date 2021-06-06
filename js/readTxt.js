'use strict';

let v_codeChoice  = document.getElementById("codeChoice");
v_codeChoice.addEventListener("change",event_codeChoice);

let v_cell_01 = document.getElementById("cell_01"); // на каком устройстве открыт сайт
let v_cell_02 = document.getElementById("cell_02"); // какой код выбран для чтения
let v_cell_03 = document.getElementById("cell_03"); // какой код использован при чтении файла
let v_cell_04 = document.getElementById("cell_04"); // параметры инпута
let v_cell_05 = document.getElementById("cell_05"); // параметры выбранного файла
let v_cell_06 = document.getElementById("cell_06"); // результат файл ридера
let v_cell_07 = document.getElementById("cell_07");
let v_cell_08 = document.getElementById("cell_08");

let reg = /(iPhone|Android|iPad|RIM)/;
let result = navigator.userAgent.match(reg);
console.log(`navigator result = ${result}`);
if (navigator.userAgent.match(reg)) {
  v_cell_01.textContent = 'Сайт открыт на мобильном устройстве';
}
else {
  v_cell_01.textContent = 'Сайт открыт на десктопе';
}

let whatCode = 1;
v_cell_02.textContent = 'choice code = default';

  // R E A D   F I L E   ! ! !
function readFile(input) {  
  console.log(input);
  v_cell_04.textContent = `input type = ${input.type}, input.accept = ${input.accept}`;
  // console.log(`files number = ${input.files.length}`);
  let file = input.files[0];
  v_cell_05.textContent = `file name: ${file.name}, last modified: ${file.lastModifiedDate}`;
  console.log(file);
  let reader = new FileReader();
  switch (whatCode) {
    case 1:
    reader.readAsText(file);        
  v_cell_03.textContent = 'used code = default';
  break;
    case 2:
    reader.readAsText(file,"Windows-1251");
  v_cell_03.textContent = 'used code = win-1251';
    break;
    case 3:
    reader.readAsText(file,"UTF-8");
  v_cell_03.textContent = 'used code = utf-8';
    break;
    default:
        break;
}   // switch
  console.log(reader);
  reader.onload = function() {
  console.log(reader.result);           // Вывод в консоль
  v_cell_06.textContent = `${reader.result}`; // вывод в таблицу
  txtArea.textContent = reader.result;  // Вывод на страницу сайта
};
reader.onerror = function() {
  console.log(reader.error);
};  
} // function readFile(input)


function event_codeChoice() {
  switch (v_codeChoice.value) {
      case '1':
        whatCode = 1;
  v_cell_02.textContent = 'choice code = default';
  // console.log('choice code = none');
    break;
      case '2':
        whatCode = 2;
  v_cell_02.textContent = 'choice code = win-1251';
  // console.log('choice code = win-1251');
    break;
      case '3':
        whatCode = 3;
  v_cell_02.textContent = 'choice code = utf-8';
  // console.log('choice code = utf-8');
    break;
      default:
          break;
  }   // switch
  }   // event_codeChoice()