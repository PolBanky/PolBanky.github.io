"use strict";
const att = 'color: darkorange; font-weight: bold; font-size: 1.4em;'; // attention
const grn = 'color: green; font-weight: bold; font-size: 1.4em;';
const blu = 'color: lightblue; font-weight: bold; font-size: 1.4em;';
let num = 0; // для нумерации логов
// if debug == false => no console.log
const debug = false;

function makePage() {
    if(debug) console.log("Working Open Window",att);
    let adr = document.baseURI;
    if(debug) console.dir(adr);
    let i = adr.lastIndexOf('/');
    if(debug) console.log(`Номер последнего символа '/' == ${i}`,grn);
    let adr2 = adr.slice(0,i);
    if(debug) console.log(adr2);
    i = adr2.lastIndexOf('/');
    if(debug) console.log(`Номер последнего символа '/' == ${i}`,grn);
    adr2 = adr2.slice(0,i+1);
    if(debug) console.log(adr2);
    adr2 = adr2 + 'data/grid_001B.png'
    if(debug) console.log(adr2);

    let myWindow = window.open("","","");
    myWindow.document.title='Grid';
    let v_img01 = myWindow.document.createElement('img');
    v_img01.src=adr2;
    v_img01.alt="pic";
    v_img01.setAttribute('width','100%');
    v_img01.setAttribute('id','createElementIMG');
    if(debug) console.log(`createElement('img') == ${v_img01}`);
    if(debug) console.dir(v_img01);
    myWindow.document.body.append(v_img01);
}   // makePage()
