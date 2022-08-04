'use strict';
// если false => no debuging this
const debug = false;

let v_selectCode    = document.getElementById("selectCode");    // <select id="selectCode"> <option value='1'>UTF-8</option>
let v_inputFile     = document.getElementById("inputFile");     // <input type="file" id="inputFile"
let v_inputFileName = document.getElementById('inputFileName'); // <input type="text" id="inputFileName"
let v_selectExt     = document.getElementById("selectExt");     // <select id="selectExt"> select File extension
const v_buttonDownloadFile = document.getElementById("buttonDownloadFile"); // button Download File
let v_selectFS      = document.getElementById("selectFS");      // <select id="selectFS"> select Font size
let v_selectFC      = document.getElementById("selectFC");      // <select id="selectFC"> select Font color
const v_txtArea     = document.getElementById("txtArea");       // <textarea id="txtArea">

// здесь будет хранится файл после загрузки
// нужен для того чтобы взять из него имя загруженного файла (чтобы дать загрузить файл с таким же именем)
let file = null;
let readed = 0;
let lf;

let fileName = {
  fileFullName: 'newFile.txt',
  fileOnlyName: 'newFile',
  fileOnlyExt:  'txt',
} // fileName


  // I N S E R T   F I L E  only  N A M E   ! ! !
v_inputFileName.addEventListener("keyup", () => {
  fileName.fileOnlyName = v_inputFileName.value;
      console.log(`new File only Name = ${fileName.fileOnlyName}`);
    });   /* v_inputFileName.addEventListener */


  // W R I T E   F I L E   ! ! !
v_buttonDownloadFile.addEventListener("click", () => {
  fileName.fileFullName = `${fileName.fileOnlyName}.${fileName.fileOnlyExt}`
      console.log(`new File Name = ${fileName.fileFullName}`);
  const newFile = new File([v_txtArea.value.replace(/\n/g,"\r\n")], fileName.fileFullName, { type: "text/plain" });
  const objectURL = URL.createObjectURL(newFile);
  const link = document.createElement("a");
  link.href = objectURL;
  link.download = fileName.fileFullName;
  link.click();
  URL.revokeObjectURL(objectURL);
});


  // R E A D   F I L E   ! ! !
function readFile(inp) {  // onchange="readFile(this)" в файле readTxt.html
  lf = inp;
  readed++;
  file = inp.files[0];
  let lastPoint = file.name.lastIndexOf('.');
      // console.log(`Num last point = ${lastPoint}`);
  fileName.fileOnlyName = file.name.slice(0,lastPoint);
      console.log(`File Name = ${fileName.fileOnlyName}`);
  v_inputFileName.value = fileName.fileOnlyName;
  fileName.fileOnlyExt = file.name.slice(lastPoint+1);
      console.log(`File Ext = ${fileName.fileOnlyExt}`);
      switch(fileName.fileOnlyExt) {
        case 'txt':
          v_selectExt.value = 'txt';
      break;
        case 'html':
          v_selectExt.value = 'html';        
      break;
        case 'css':
          v_selectExt.value = 'css';        
      break;
        case 'js':
          v_selectExt.value = 'js';        
      break;
        case 'svg':
          v_selectExt.value = 'svg';        
      break;
        default:
      break;
    }   // switch(whatCode)
  if(debug) {
    console.log("\nВыведем все свойства и методы объекта file with: 'for (let prop in file)'");
    for (let prop in file) {
        console.log(`Property name = "${prop}" =>\t\t\t\t Property = "${file[prop]}"`); 
    } // for
  }   // if(debug)
  let reader = new FileReader();
  switch(v_selectCode.value) {
    case 'UTF-8':
    reader.readAsText(file,"UTF-8");
  break;
    case 'WIN-1251':
    reader.readAsText(file,"Windows-1251");
  break;
    default:
  break;
}   // switch(whatCode)
  reader.onload = function() {
  v_txtArea.textContent = reader.result; // Вывод на страницу сайта
  // console.log( v_txtArea.textContent );
  if(debug) {
    console.log("\nВыведем все свойства и методы объекта v_txtArea with: 'for (let prop in v_txtArea)'");
    for (let prop in v_txtArea) {
        console.log(`Property name = "${prop}" =>\t\t\t\t Property = "${v_txtArea[prop]}"`); 
    } // for
  }   // if(debug)
  if(debug) {
    console.log("\nВыведем все свойства и методы объекта v_inputFile with: 'for (let prop in v_inputFile)'");
    for (let prop in v_inputFile) {
        console.log(`Property name = "${prop}" =>\t\t\t\t Property = "${v_inputFile[prop]}"`); 
    } // for
  }   // if(debug)
  if(debug) {
    console.log("\nВыведем все свойства и методы объекта window.navigator with: 'for (let prop in window.navigator)'");
    for (let prop in window.navigator) {
        console.log(`Property name = "${prop}" =>\t\t\t\t Property = "${window.navigator[prop]}"`); 
    } // for
  }   // if(debug)
}     // reader.onload = function()
// console.log(reader);
reader.onerror = function() { console.log(reader.error); }  
} // function readFile(input)


  // S E L E C T   C O D E   ! ! !
v_selectCode.addEventListener("change", () => {  
  if (readed) { readFile(lf); } // if 
    console.log(`v_selectCode.value now = ${v_selectCode.value}, readed = ${readed}`);
}); // v_selectCode.addEventListener


  // S E L E C T   E X T E N S I O N   ! ! !
v_selectExt.addEventListener("change", () => {
  switch(v_selectExt.value) {
      case 'txt':
        fileName.fileOnlyExt = 'txt';
    break;
      case 'html':
        fileName.fileOnlyExt = 'html';        
    break;
      case 'css':
        fileName.fileOnlyExt = 'css';        
    break;
      case 'js':
        fileName.fileOnlyExt = 'js';        
    break;
      case 'svg':
        fileName.fileOnlyExt = 'svg';        
    break;
      default:
    break;
  } // switch(v_selectExt.value)  
    console.log(`File Extension now = ${fileName.fileOnlyExt}`);
});   // function event_codeSelect()

// S E L E C T   S I Z E   ! ! !
v_selectFS.addEventListener("change", () => {
  switch(v_selectFS.value) {
      case '0.75rem':
        v_txtArea.style.fontSize = '0.75rem';
    break;
      case '1rem':
        v_txtArea.style.fontSize = '1rem';
    break;
      case '1.25rem':
        v_txtArea.style.fontSize = '1.25rem';        
    break;
      case '1.5rem':
        v_txtArea.style.fontSize = '1.5rem';        
    break;
      case '1.75rem':
        v_txtArea.style.fontSize = '1.75rem';        
    break;
      case '2rem':
        v_txtArea.style.fontSize = '2rem';        
    break;
      default:
    break;
  } // switch(v_selectExt.value)  
    console.log(`File Extension now = ${fileName.fileOnlyExt}`);
});   // function event_codeSelect()


// S E L E C T   С O L O R   ! ! !
v_selectFC.addEventListener("change", () => {
  switch(v_selectFC.value) {
      case 'black':
        v_txtArea.style.color = 'black';        
    break;
    case 'red':
      v_txtArea.style.color = 'red';        
    break;    
    case 'green':
      v_txtArea.style.color = 'green';        
    break;    
    case 'blue':
      v_txtArea.style.color = 'blue';        
    break;    
      default:
    break;
  } // switch(v_selectExt.value)  
    console.log(`File Extension now = ${fileName.fileOnlyExt}`);
});   // function event_codeSelect()


window.addEventListener("load",page_onload);                 // onLoad

function page_onload() { // Обработчик события загрузки страницы
  console.log("page_onload()");
  console.log(`Key == ${v_txtArea.id}`);
  v_txtArea.style.fontSize = '1rem';
  console.log(`Key == ${v_txtArea.style.fontSize}`);
  }   // page_onload()

if(debug) {
  console.log("\nВыведем все свойства объекта v_txtArea with: 'for (let key in v_txtArea)'");
  for (let key in v_txtArea) { console.log(`Key "${key}" => value Of Key == "${v_txtArea[key]}"`); } // for (let key in ref)
}   // if(debug)
