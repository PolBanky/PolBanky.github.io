'use strict';

let v_codeChoice  = document.getElementById("codeChoice");
v_codeChoice.addEventListener("change",event_codeChoice);
const txtArea = document.getElementById("txtArea");
const downloadBtn = document.getElementById("downloadFile");
// здесь будет хранится файл после загрузки
// нужен для того чтобы взять из него имя загруженного файла (чтобы дать загрузить файл с таким же именем)
let file = null;

downloadBtn.addEventListener("click", () => {
  const newFileName = file ? file.name : "newFile.txt"
  const newFile = new File([txtArea.value.replace(/\n/g,"\r\n")], newFileName, { type: "text/plain" });
  const objectURL = URL.createObjectURL(newFile);
  const link = document.createElement("a");
  link.href = objectURL;
  link.download = newFileName;
  link.click();
  URL.revokeObjectURL(objectURL);
});


let readed = 0;
let whatCode = 1;
let lf;


  // R E A D   F I L E   ! ! !
function readFile(inp) {
  lf = inp;
  // console.log(lf);
  readed++;
  // console.log(`whatCode now = ${whatCode}, readed = ${readed}`);
  file = inp.files[0];
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
  // console.log( txtArea.textContent );
};
// console.log(reader);
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
  } // switch
  if (readed) {
    readFile(lf);
  } // if 
    console.log(`whatCode now = ${whatCode}, readed = ${readed}`);
  } // event_codeChoice()
