'use strict';

let v_txtInput = document.getElementById("txtInput"); // HTML Input
let v_table = document.getElementById("tblGOST");     // HTML Table
let v_tr = v_table.getElementsByTagName("tr");
let i, td, filter, txtValue;

v_txtInput.addEventListener("keyup", () => {
filter = v_txtInput.value.toUpperCase();
for (i=0; i<v_tr.length; i++) {
    td = v_tr[i].getElementsByTagName("td")[1];
    if(td) {
        txtValue = td.textContent || td.innerText;
        if(txtValue.toUpperCase().indexOf(filter)>-1) {
            v_tr[i].style.display = "";
        } else { v_tr[i].style.display = "none"; }
        } /* if(td) */
    } /* for */
});   /* v_txtInput.addEventListener */