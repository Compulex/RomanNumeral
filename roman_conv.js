var main = document.getElementById("main");
var roman_numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
var rn_tens = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]; 
var spc = ["C", "CD", "D", "CM", "M"];
var spcn = ["100", "400", "500", "900", "1000"];
var here = false;

function makeTable(){
    var table = document.createElement("table");
    var num = document.createElement("tr");
    num.setAttribute("id", "headers");

    //numeral headers 0 - 9
    for(let i = 0; i < 11; i++){
        var th = document.createElement("th");
        if(i == 0){

            th.appendChild(document.createTextNode(" "));
            num.appendChild(th);
        }
        else{
            th.appendChild(document.createTextNode(i-1));
            num.appendChild(th);
        }
    }
    //table headers
    table.appendChild(num);
    
    //side headers 10 - 100 by 10s
    for(let j = 0; j < 100; j += 10){
        var row = document.createElement("tr");
        var td = document.createElement("td");
        td.setAttribute("class", "sideHeaders");
        if(j == 0){
            td.appendChild(document.createTextNode(" "));
            row.appendChild(td);
            tData(row, j); //1 - 9
        }
        else{
            td.appendChild(document.createTextNode(j.toString()));
            row.appendChild(td);
            tData(row, j/10);
        }
       
        table.appendChild(row);
    }

    //special cases
    for(let h = 0; h < spc.length; h++){
        //extra rows for 100, 400, 500, 900, 1000
        var sprow = document.createElement("tr");
        var hund = document.createElement("td");
        hund.setAttribute("class", "sideHeaders");
        hund.appendChild(document.createTextNode(spcn[h]));
        
        //roman numeral for 100, 400, 500, 900, 1000
        var hrn = document.createElement("td");
        hrn.appendChild(document.createTextNode(spc[h]));

        sprow.appendChild(hund);
        sprow.appendChild(hrn);

        if(h == 0){
            //fills in table
            var placeholder = document.createElement("td");
            placeholder.setAttribute("id", "test");
            placeholder.style.textAlign = "center";

            placeholder.rowSpan = 5;
            placeholder.colSpan = 9;

            //text in cell
            var h3 = document.createElement("h3");
            h3.appendChild(document.createTextNode("See the Pattern??"));

            placeholder.appendChild(h3);

            placeholder.onmouseover = function(){
                
                //fun test
                h3.innerHTML = "Prove It";
                h3.style.cursor = "pointer";
                
                h3.onclick = function(){ guess(); };
            };
            placeholder.onmouseout = function(){
                h3.innerHTML = "See the Pattern??";
                h3.style.cursor = "default";
            }

            sprow.appendChild(placeholder);
        }

        table.appendChild(sprow);
    }

    main.appendChild(table);
}//makeTable

//roman numerals
function tData(tr, tens){
    var rn = "";
    //special case for first data column
    if(tens == 0){
        var pl = document.createElement("td");
        pl.appendChild(document.createTextNode("Nulla"));
        tr.appendChild(pl);
    }
    else{
        var td_tens = document.createElement("td");
        rn = rn_tens[tens-1];
        td_tens.appendChild(document.createTextNode(rn));
        tr.appendChild(td_tens);
    }
    
    for(let i = 0; i < roman_numerals.length; i++){
        var td = document.createElement("td");
        var rn_str = rn.concat(roman_numerals[i]);
        td.appendChild(document.createTextNode(rn_str));
        tr.appendChild(td);
    }
}//tData

function guess(){
    //random number 100 - 3000
    var rand_num = 100 + Math.floor((Math.random() * 3000) + 1);

    //avoid appending more than once
    if(!here){
        var div = document.createElement("div");
        div.setAttribute("id", "rn_test");

        //number display
        var p = document.createElement("p");
        p.setAttribute("id", "number");
        div.appendChild(p);

        //input
        var input = document.createElement("input");
        input.setAttribute("id", "rn");
        input.type = "text";
        input.maxLength = "15"; 
        div.appendChild(input);
        
        //check button
        var btn = document.createElement("button");
        btn.appendChild(document.createTextNode("Check"));
        btn.onclick = function(){ check(p.innerHTML, input); }
        div.appendChild(btn);

        main.appendChild(div);

        here = true;
    }

    //keeps changing number
    document.getElementById("number").innerHTML = rand_num;
    
}//guess

function check(p, input){
    var rnum = "";
    var str = input.value;

    //do the work the right answer
    for(let i = 0; i < p.length; i++){
        let num = parseInt(p[i]);
        
        if(p.length == 4){
            if(i == 0){ //thousands place
                rnum = rnum.concat(insertRoman(num, "M"));
            }
            //hundreds place
            else if(i == 1){ 
                if(num < 4){
                    rnum = rnum.concat(insertRoman(num, "C"));
                }
                else if(num == 4){
                    rnum = rnum.concat("CD"); //100 before 500->400
                }
                else if(num == 5){
                    rnum = rnum.concat("D");
                }
                else if(num == 9){
                    rnum = rnum.concat("CM"); //100 before 1000->900
                }
                else{
                    rnum = rnum.concat("D");
                    rnum = rnum.concat(insertRoman(num-5, "C")); //100 after 500
                }
            }
            //tens place
            else if(i == 2){ 
                if(num < 4){
                    rnum = rnum.concat(insertRoman(num, "X"));
                }
                else if(num == 4){
                    rnum = rnum.concat("XL"); //10 before 50->40
                }
                else if(num == 5){
                    rnum = rnum.concat("L");
                }
                else if(num == 9){
                    rnum = rnum.concat("XC"); //10 before 100->90
                }
                else{
                    rnum = rnum.concat("L");
                    rnum = rnum.concat(insertRoman(num-5, "X")); //10 after 50
                }
            }
            //ones place
            else if(i == 3){ 
                if(num < 4){
                    rnum = rnum.concat(insertRoman(num, "I"));
                }
                else if(num == 4){
                    rnum = rnum.concat("IV"); //1 before 5->4
                }
                else if(num == 5){
                    rnum = rnum.concat("V");
                }
                else if(num == 9){
                    rnum = rnum.concat("IX"); //1 before 10->9
                }
                else{
                    rnum = rnum.concat("V");
                    rnum = rnum.concat(insertRoman(num-5, "I")); //1 after 5
                }
            }
        }//len == 4
        
        else{
            //hundreds place
            if(i == 0){ 
                if(num < 4){
                    rnum = rnum.concat(insertRoman(num, "C"));
                }
                else if(num == 4){
                    rnum = rnum.concat("CD"); //100 before 500->400
                }
                else if(num == 5){
                    rnum = rnum.concat("D");
                }
                else if(num == 9){
                    rnum = rnum.concat("CM"); //100 before 1000->900
                }
                else{
                    rnum = rnum.concat("D");
                    rnum = rnum.concat(insertRoman(num-5, "C")); //100 after 500
                }
            }
            //tens place
            else if(i == 1){ 
                if(num < 4){
                    rnum = rnum.concat(insertRoman(num, "X"));
                }
                else if(num == 4){
                    rnum = rnum.concat("XL"); //10 before 50->40
                }
                else if(num == 5){
                    rnum = rnum.concat("L");
                }
                else if(num == 9){
                    rnum = rnum.concat("XC"); //10 before 100->90
                }
                else{
                    rnum = rnum.concat("L");
                    rnum = rnum.concat(insertRoman(num-5, "X")); //10 after 50
                }
            }
            //ones place
            else if(i == 2){ 
                if(num < 4){
                    rnum = rnum.concat(insertRoman(num, "I"));
                }
                else if(num == 4){
                    rnum = rnum.concat("IV"); //1 before 5->4
                }
                else if(num == 5){
                    rnum = rnum.concat("V");
                }
                else if(num == 9){
                    rnum = rnum.concat("IX"); //1 before 10->9
                }
                else{
                    rnum = rnum.concat("V");
                    rnum = rnum.concat(insertRoman(num-5, "I")); //1 after 5
                }
            }
        }//len == 3
    }//for

    console.log(rnum);

    if(rnum == str.toUpperCase()){
        alert("Great job!");

        input.value = ""; //clear input value
        guess(); //next random number
    }
    else{
        alert("Not quite, try again");
    }
}//check

//insert the amount of times to put the roman numeral
function insertRoman(num, rn){
    var roman = "";
    for(let i = 0; i < num; i++){
        roman = roman.concat(rn);
    }
    return roman;
}//insertRoman