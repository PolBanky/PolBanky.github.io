'use strict';
//  ../sopromat/tubeC.html

    // HTML Elements
var v_DN_choice  = document.getElementById("dn_choice");     // HTML Select DN
var v_PN_choice  = document.getElementById("pn_choice");     // HTML Select PN

let v_D_fl   = document.getElementById("D_fl");
let v_D1_fl  = document.getElementById("D1_fl");
let v_dv_fl  = document.getElementById("dv_fl");
let v_D2_fl  = document.getElementById("D2_fl");
let v_n_d_fl = document.getElementById("n_d_fl");
let v_b_fl   = document.getElementById("b_fl");
let v_h_fl   = document.getElementById("h_fl");

var v_DN = document.getElementById("_DN");  // HTML Output
var v_PN = document.getElementById("_PN");  // HTML Output
var v_D = document.getElementById("_D");    // HTML Output
var v_D1 = document.getElementById("_D1");  // HTML Output
var v_D2 = document.getElementById("_D2");  // HTML Output
var v_dv = document.getElementById("_dv");  // HTML Output
var v_b = document.getElementById("_b");    // HTML Output
var v_h = document.getElementById("_h");    // HTML Output
var v_d = document.getElementById("_d");    // HTML Output
var v_n = document.getElementById("_n");    // HTML Output
var v_M = document.getElementById("_M");    // HTML Output
var v_pin = document.getElementById("_pin"); // HTML Output
    // Events
window.addEventListener("load",page_onload);              // onLoad
v_DN_choice.addEventListener("change",Event_DN_choice);   // Select DN
v_PN_choice.addEventListener("change",Event_PN_choice);   // Select PN
    // DATA
var flanges6 = [    // READY
//DN,    D,   D1,   D2,   dv,  b,  h, d,   n, Масса, Шпилька
//0      1     2     3     4   5   6  7    8    9     10
[50,    140,  110,   90,   59, 16, 3, 14,  4,  1.32, 'М12'],
[65,    160,  130,  110,   78, 16, 3, 14,  4,  1.62, 'М12'],
[80,    185,  150,  128,   91, 18, 3, 18,  4,  2.43, 'М16'],
[100,   205,  170,  148,  110, 18, 3, 18,  4,  2.83, 'М16'],
[125,   235,  200,  178,  135, 20, 3, 18,  8,  3.86, 'М16'],
[150,   260,  225,  202,  161, 20, 3, 18,  8,  4.38, 'М16'],
[200,   315,  280,  258,  222, 22, 3, 18,  8,  5.87, 'М16'],
[250,   370,  335,  312,  276, 24, 3, 18, 12,  7.76, 'М16'],
[300,   435,  395,  365,  328, 24, 4, 22, 12, 10.02, 'М20'],
[350,   485,  445,  415,  380, 26, 4, 22, 12, 12.25, 'М20'],
[400,   535,  495,  465,  430, 28, 4, 22, 16, 14.66, 'М20'],
[450,   590,  550,  520,  484, 28, 4, 22, 16, 16.63, 'М20'],
[500,   640,  600,  570,  534, 30, 4, 22, 16, 19.72, 'М20'],
[600,   755,  705,  670,  634, 30, 5, 26, 20, 25.38, 'М24'],
[700,   860,  810,  775,  725, 32, 5, 26, 24, 35.33, 'М24'],
[800,   975,  920,  880,  825, 32, 5, 30, 24, 44.34, 'М27'],
[900,  1075, 1020,  980,  925, 34, 5, 30, 24, 53.11, 'М27'],
[1000, 1175, 1120, 1080, 1025, 36, 5, 30, 28, 61.92, 'М27'],
[1200, 1400, 1340, 1295, 1225, 39, 5, 33, 32, 94.47, 'М30'],
[1400, 1620, 1560, 1510, 1425, 48, 5, 33, 36, 154.6, 'М30'],
[1600, 1820, 1760, 1710, 1625, 53, 5, 33, 40, 194.4, 'М30']
];

var flanges10 = [
//DN,    D,   D1,   D2,  dв,   b,  h, d,  n, Масса, Шпилька
//0      1     2     3    4    5   6  7    8    9      10
[50,    160,  125,  102,  59,  18, 3, 18,  4,  2.06, 'М16'],
[65,    180,  145,  122,  78,  20, 3, 18,  4,  2.81, 'М16'],
[80,    195,  160,  133,  91,  20, 3, 18,  8,  3.19, 'М16'],
[100,   215,  180,  158, 110,  22, 3, 18,  8,  3.96, 'М16'],
[125,   245,  210,  184, 135,  24, 3, 18,  8,  5.41, 'М16'],
[150,   280,  240,  212, 161,  24, 3, 22,  8,  6.92, 'М20'],
[200,   335,  295,  268, 222,  24, 3, 22,  8,  8.05, 'М20'],
[250,   390,  350,  320, 276,  26, 3, 22, 12, 10.65, 'М20'],
[300,   440,  400,  370, 328,  28, 4, 22, 12, 12.90, 'М20'],
[350,   500,  460,  430, 380,  28, 4, 22, 16, 15.85, 'М20'],
[400,   565,  515,  482, 430,  30, 4, 26, 16, 21.56, 'М24'],
[450,   615,  565,  532, 484,  30, 4, 26, 20, 22.76, 'М24'],
[500,   670,  620,  585, 534,  32, 4, 26, 20, 28.70, 'М24'],
[600,   780,  725,  685, 634,  36, 5, 30, 20, 39.40, 'М27'],
[700,   895,  840,  800, 725,  39, 5, 30, 24, 59.46, 'М27'],
[800,  1010,  950,  905, 825,  42, 5, 33, 24, 79.16, 'М30'],
[900,  1110, 1050, 1005, 925,  45, 5, 33, 28, 94.13, 'М30'],
[1000, 1220, 1160, 1110, 1025, 48, 5, 36, 28, 118.4, 'М33'],
[1200, 1455, 1380, 1330, 1225, 56, 5, 39, 32, 197.4, 'М36'],
[1400, 1675, 1590, 1530, 1425, 65, 5, 45, 36, 278.9, 'М42'],
[1600, 1915, 1820, 1750, 1625, 75, 5, 52, 40, 422.6, 'М50']
];

var flanges16 = [    // READY
//DN,    D,   D1,   D2,   dв,   b,  h, d,  n, Масса, Шпилька
//0      1     2     3     4    5   6  7   8     9     10
[50,    160,  125,  102,   59, 22, 3, 18,  4,  2.57, 'М16'],
[65,    180,  145,  122,   78, 24, 3, 18,  4,  3.40, 'М16'],
[80,    195,  160,  133,   91, 24, 3, 18,  4,  3.86, 'М16'],
[100,   215,  180,  158,  116, 26, 3, 18,  8,  4.49, 'М16'],
[125,   245,  210,  184,  142, 28, 3, 18,  8,  6.00, 'М16'],
[150,   280,  240,  212,  161, 28, 3, 22,  8,  7.84, 'М20'],
[200,   335,  295,  268,  222, 30, 3, 22, 12,  9.92, 'М20'],
[250,   405,  355,  320,  277, 31, 3, 26, 12, 14.13, 'М24'],
[300,   460,  410,  370,  329, 32, 4, 26, 12, 17.16, 'М24'],
[350,   520,  470,  430,  381, 34, 4, 26, 16, 22.14, 'М24'],
[400,   580,  525,  482,  430, 38, 4, 30, 16, 29.89, 'М27'],
[450,   640,  585,  532,  484, 42, 4, 30, 20, 38.03, 'М27'],
[500,   710,  650,  585,  534, 48, 4, 33, 20, 54.80, 'М30'],
[600,   840,  770,  685,  634, 50, 5, 39, 20, 77.79, 'М36'],
[700,   910,  840,  800,  724, 52, 5, 39, 24, 80.97, 'М36'],
[800,  1020,  950,  905,  824, 54, 5, 39, 24, 102.3, 'М36'],
[900,  1120, 1050, 1005,  924, 59, 5, 39, 28, 123.8, 'М36'],
[1000, 1255, 1170, 1110, 1024, 63, 5, 45, 28, 173.3, 'М42'],
[1200, 1485, 1390, 1330, 1224, 76, 5, 52, 32, 279.3, 'М50'],
[1400, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0'],
[1600, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0']
];

var flanges = flanges10;

function page_onload() {
    Event_DN_choice();
}   // page_onload()

    // выбор DN
function Event_DN_choice() {
    v_DN.textContent = flanges[v_DN_choice.selectedIndex][0];    // подтверждение срабатывания селекта
    v_PN.textContent = v_PN_choice.value;                        // подтверждение срабатывания селекта

    v_D.textContent     = flanges[v_DN_choice.selectedIndex][1];
    v_D_fl.textContent  = `D=\u00F8${flanges[v_DN_choice.selectedIndex][1]}`;
    v_D1.textContent    = flanges[v_DN_choice.selectedIndex][2];
    v_D1_fl.textContent = `D₁=ø${flanges[v_DN_choice.selectedIndex][2]}`;
    
    v_D2.textContent    = flanges[v_DN_choice.selectedIndex][3];
    v_D2_fl.textContent = 'D\u2082=\u00F8'+ flanges[v_DN_choice.selectedIndex][3];

    v_dv.textContent    = flanges[v_DN_choice.selectedIndex][4];
    v_dv_fl.textContent = `dв=ø${flanges[v_DN_choice.selectedIndex][4]}`;

    v_b.textContent    = flanges[v_DN_choice.selectedIndex][5];
    v_b_fl.textContent = `b=${flanges[v_DN_choice.selectedIndex][5]}`;

    v_h.textContent    = flanges[v_DN_choice.selectedIndex][6];
    v_h_fl.textContent = `h=${flanges[v_DN_choice.selectedIndex][6]}`;

    v_d.textContent      = flanges[v_DN_choice.selectedIndex][7];
    v_n.textContent      = flanges[v_DN_choice.selectedIndex][8];
    v_n_d_fl.textContent = `n=${flanges[v_DN_choice.selectedIndex][8]} отв.d=ø${flanges[v_DN_choice.selectedIndex][7]}`;
    
    v_M.textContent   = flanges[v_DN_choice.selectedIndex][9];
    v_pin.textContent = flanges[v_DN_choice.selectedIndex][10];
}	// Event_DN_choice()

    // выбор PN
function Event_PN_choice() {
switch (v_PN_choice.value) {
    case '6':
    flanges = flanges6;
        break;
    case '10':
    flanges = flanges10;
        break;
    case '16':
    flanges = flanges16;
        break;
    default:
        break;
}   // switch
Event_DN_choice();
}   // Event_PN_choice()
