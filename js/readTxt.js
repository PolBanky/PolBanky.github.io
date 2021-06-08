'use strict';

let v_codeChoice  = document.getElementById("codeChoice");
v_codeChoice.addEventListener("change",event_codeChoice);

// let reg = /(iPhone|Android|iPad|RIM)/;
// let result = navigator.userAgent.match(reg);
// console.log(`navigator result = ${result}`);
// if (navigator.userAgent.match(reg)) {
//   v_cell_01.textContent = 'Сайт открыт на мобильном устройстве';
// }
// else {
//   v_cell_01.textContent = 'Сайт открыт на десктопе';
// }

let readed = 0;
let whatCode = 1;
let lf;
// v_cell_02.textContent = 'choice code = default';

  // R E A D   F I L E   ! ! !
function readFile(inp) {
  lf = inp;
  console.log(lf);
  readed++;
  console.log(`whatCode now = ${whatCode}, readed = ${readed}`);
  // v_cell_04.textContent = `input type = ${input.type}, input.accept = ${input.accept}`;
  // console.log(`files number = ${input.files.length}`);
  let file = inp.files[0];
  // v_cell_05.textContent = `file name: ${file.name}, last modified: ${file.lastModifiedDate}`;
  console.log(inp.files[0]);
  let reader = new FileReader();
  switch (whatCode) {
    case 1:
    reader.readAsText(file);        
  break;
    case 2:
    reader.readAsText(file,"Windows-1251");
  break;
    case 3:
    reader.readAsText(file,"UTF-8");
  break;
    default:
  break;
}   // switch
  reader.onload = function() {
  txtArea.textContent = reader.result; // Вывод на страницу сайта
};
console.log(reader);
reader.onerror = function() {
  console.log(reader.error);
};  
} // function readFile(input)


function event_codeChoice() {
  switch (v_codeChoice.value) {
      case '1':
        whatCode = 1;
    break;
      case '2':
        whatCode = 2;
    break;
      case '3':
        whatCode = 3;
    break;
      default:
          break;
  }   // switch
  if (readed) {
    readFile(lf);
  } // if 
    console.log(`whatCode now = ${whatCode}, readed = ${readed}`);
  }   // event_codeChoice()