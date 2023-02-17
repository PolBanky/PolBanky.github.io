"use strict";

function makePage() {
    console.log("Working Open Window");
    let adr = document.baseURI;
    console.dir(adr);
    let i = adr.lastIndexOf('/');
    console.log(`Номер последнего символа '/' == ${i}`);
    let adr2 = adr.slice(0,i);
    console.log(adr2);
    i = adr2.lastIndexOf('/');
    console.log(`Номер последнего символа '/' == ${i}`);
    adr2 = adr2.slice(0,i+1);
    console.log(adr2);
    adr2 = adr2 + 'data/grid_001B.png'
    console.log(adr2);

    let myWindow = window.open("","","");
    myWindow.document.title='Grid';
    let v_img01 = myWindow.document.createElement('img');
    v_img01.src=adr2;
    v_img01.alt="pic";
    v_img01.setAttribute('width','100%');
    v_img01.setAttribute('id','createElementIMG');
    console.log(`createElement('img') == ${v_img01}`);
    console.dir(v_img01);
    myWindow.document.body.append(v_img01);
}   // makePage()
