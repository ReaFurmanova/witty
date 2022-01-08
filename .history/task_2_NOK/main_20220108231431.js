var divaci = [];

var divakStorage = [];

 

var divakDate = "";

var divakTime = "";

var divakSeat = [];

 

const countsDate = {};

var storageDateArray = [];

 

// document ready

document.addEventListener("DOMContentLoaded", function(event) {

 

    document.getElementById('send').disabled = true;

 

    //check local storage

    divakStorage = JSON.parse(localStorage.getItem('divaci')) || [];

    console.log(divakStorage);

 

    for (let i = 0, l = divakStorage.length; i < l; i++) {

   

        // one week before/after

        if (divakStorage[i].create) {

            var today = new Date();

            var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

            var lastweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

            var divakCreate = new Date(divakStorage[i].create);

            if (divakCreate < lastweek || divakCreate > nextweek) {

                divakStorage.splice(i, 1);

            }

        }

 

        // 6x denne max

        storageDateArray.push(divakStorage[i].date);

       

    }

 

});




// choose date / min date

var dateInp = document.getElementById("date");

var date = new Date();

var dd = date.getDate();

var mm = date.getMonth() + 1;

var yyyy = date.getFullYear();

 

if (dd < 10) {

    dd = '0' + dd;

}

if (mm < 10) {

    mm = '0' + mm;

}

 

var today = yyyy + '-' + mm + '-' + dd;

dateInp.setAttribute("min", today);

 

dateInp.addEventListener('change', (e) => {

    var dateVal = dateInp.value;

    divakDate = dateVal;

    storageDateArray.forEach(function (x) {

        countsDate[x] = (countsDate[x] || 0) + 1;

        if (countsDate[x] === 6) {

            if (divakDate === x) {

                alert("Termin je jiz obsazen. Vyberte prosim jiny termin");

                divakDate = "";

                dateInp.value = "";

            }

        }

    });

    availableSeats();

    validation();

 

});

 

// choose time

var timeBtns = document.querySelectorAll(".time");

for ( var counter = 0; counter < timeBtns.length; counter++)

{

    timeBtns[counter].addEventListener("click", function(){

        var timeVal = this.value;

        divakTime = timeVal;

        availableSeats();

        validation();

    });

}

 

// choose seat

var seats = document.querySelectorAll(".seats");

for ( var counter = 0; counter < seats.length; counter++)

{

    seats[counter].addEventListener("input", function(){

        var seatVal = this.value;

        divakSeat.push(seatVal);

        validation();

    });

}

 // validace inputu


    if (divakDate != "" && divakTime != "" ) {

        availableSeats();

    }



// validace inputu

function validation() {

    if (divakDate != "" && divakTime != "" && divakSeat.length > 0) {

        console.log("ok");

        document.getElementById('send').disabled = false;

    }

}

 

document.getElementById('send').onclick = function () {

    var now = new Date();

    console.log(now);

    if (divakStorage == []) {

        divaci.push({"time": divakTime, "date": divakDate, "seat": divakSeat, "create": now});

        localStorage.setItem('divaci', JSON.stringify(divaci));  

    } else {

        divakStorage.push({"time": divakTime, "date": divakDate, "seat": divakSeat, "create": now});

        localStorage.setItem('divaci', JSON.stringify(divakStorage));  

       

    }

    location.reload();

}

 

function availableSeats() {
    console.log("avail");

    if (divakDate != "" && divakTime != "") {

        // v divakStorage vyhledej stejny datum a cas

        // proloopuj pole sedacek, uloz docasne

        // v index.html sedacky se stejnou hodnotou jako ulozene state checked

        console.log(divakStorage);

        var results = [];

 

        var dateToSearch = divakDate;

        var timeToSearch = divakTime;

       

        for(var i=0; i<divakStorage.length; i++) {

            for(date in divakStorage[i]) {

                if(divakStorage[i][date].indexOf(dateToSearch)!=-1) {

                            results.push(divakStorage[i]);

                    // nedodelano

                }

            }
            for(time in divakStorage[i]) {

                if(divakStorage[i][time].indexOf(timeToSearch)!=-1) {

                            results.push(divakStorage[i]);

                    // nedodelano

                }

            }

        }

        console.log(results);

    } else {

        return;

    }

}




// ----------------------------------------------------------------------------------------------------------

// celkem dlouho jsem se zasekla na:

// vytvorila jsem si objekt divak, kteremu jsem prirazovala datum, cas, sedadlo

// a kdyz jsem pak do LS 'divaci' ulozila dalsiho divaka, prepsaly se mi hodnoty i u stareho, jelikoz jsem porad ukladala stejneho divaka

// jeste jsem delala pokus ulozit 'divak-'+ Date.now apod, to se mi darilo, ale prislo mi elegantnejsi nez mit v LS milion divak-... tak lepsi v jednom radku

 

// Zavesy k vylepseni: po nacteni stranky - otevrit, pustit video, konec videa - zavrit

 

// neukazuje to sedacky