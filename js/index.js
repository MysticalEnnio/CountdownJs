/*******************************************************************************
Copyright © 2021 Ennio Marke
 ____    ____  ____  ____   ______   _________  
|_   \  /   _||_  _||_  _|.' ____ \ |  _   _  | 
  |   \/   |    \ \  / /  | (___ \_||_/ | | \_| 
  | |\  /| |     \ \/ /    _.____`.     | |     
 _| |_\/_| |_    _|  |_   | \____) |   _| |_    
|_____||_____|  |______|   \______.'  |_____| 
*******************************************************************************/

document.addEventListener("DOMContentLoaded", () => {

(function() {
    var mouseTimer = null, cursorVisible = true;

    function disappearCursor() {
        mouseTimer = null;
        document.body.style.cursor = "none";
        cursorVisible = false;
    }
    
    document.onmousemove = function() {
        if (mouseTimer) {
            window.clearTimeout(mouseTimer);
        }
        if (!cursorVisible) {
            document.body.style.cursor = "default";
            cursorVisible = true;
        }
        mouseTimer = window.setTimeout(disappearCursor, 2000);
    };
})();


//init vars
const CDNumber = document.querySelector("#CDNumber")
let CdT = {
    Years: undefined,
    Month: undefined,
    Days: undefined,
    Hours: undefined,
    Minutes: undefined,
    Seconds: undefined
};

let hourSub = 0;
let minuteSub = 0;
let secondSub = 0;
let CdDate;
let Error;

//check for local storage. When no local storage ask for input
if (localStorage.getItem("Countdown") == null) {
    getUserInput();
} else {
    CdT = JSON.parse(localStorage.getItem("Countdown"));
}

//check for keypress
function control(e) {
    if (e.keyCode == 13) {
        getUserInput();
        let Tick = setInterval(update, 1000);
    }
  }
  document.addEventListener("keydown", control);

//get user input
function getUserInput() {
    CdDate = 0;
    while(!CdDate) {
        CdDate = prompt("What date do you want to set the Countdown to?(DD.MM.YY)");
        if(checkDate(CdDate).code != 100) { 
            Error = checkDate(CdDate);
            console.error(Error.msg)
            CdDate = 0;
            alert( "Error: " + Error.code + "\n" + Error.msg ); 
        } else {
            prcDate(CdDate);
        }
    }

    CdTime = 0;
    var CdTime;
    while(!CdTime) {
        CdTime = prompt("What time do you want to set the Countdown to?(HH:MM)(include 0's)");
        if(checkTime(CdTime).code != 100) {
            Error = checkTime(CdTime);
            console.error(Error.msg)
            CdTime = 0;
            alert( "Error: " + Error.code + "\n" + Error.msg ); 
        } else {
            prcTime(CdTime);
        }
    }
    localStorage.setItem("Countdown", JSON.stringify(CdT));
}

//process functions
function prcDate(CdDate) {
    CdT.Days = CdDate.slice( 0, CdDate.indexOf(".") ).replace(/^.{0}0/, '');
    CdT.Month = CdDate.slice( CdDate.indexOf(".") + 1, CdDate.lastIndexOf(".")).replace(/^.{0}0/, '');
    CdT.Years = CdDate.slice( CdDate.lastIndexOf(".") + 1, CdDate.length ).replace(/^0+/, '');
    console.log(
        "Year: " + CdT.Years + "\n" +
        "Month: " + CdT.Month + "\n" +
        "Day: " + CdT.Days
    );
}

function prcTime(CdTime) {
    CdT.Hours = CdTime.slice( 0, CdTime.indexOf(":") ).replace(/^.{0}0/, '');
    CdT.Minutes = CdTime.slice( CdTime.indexOf(":") + 1, CdTime.length ).slice( 0, CdTime.indexOf(":") ).replace(/^.{0}0/, '');
    CdT.Seconds = 0;//CdTime.slice( CdTime.indexOf(":") + 1, CdTime.length ).slice( CdTime.indexOf(":") + 1, CdTime.length ).replace(/^.{0}0/, '');
    console.log(
        "Hour: " + CdT.Hours + "\n" +
        "Minute: " + CdT.Minutes/*+ "\n" +
        "Second: " + CdT.Seconds*/
    );
}


//validation functions
function checkDate(CdDate) {
    if(/[^\d\.]/.test(CdDate)) {
        return {
            code: "001", 
            msg: "Date includes invalid chars"
        };
    } else
    if((CdDate.split(".").length - 1) != 2) {
        return {
            code: "002", 
            msg: "Invalid ammount of dots"
        };
    } else 
    if( CdDate.indexOf(".") != 1 && CdDate.indexOf(".") != 2 ) {
        return {
            code: "003", 
            msg: "Day Invalid"
        };
    } else 
    if( CdDate.slice( CdDate.indexOf(".") + 1, CdDate.length).indexOf(".") != 1 && 
        CdDate.slice( CdDate.indexOf(".") + 1, CdDate.length).indexOf(".") != 2 ) {
            console.error(CdDate.slice( CdDate.indexOf(".") + 1, CdDate.length))
            return {
                code: "004", 
                msg: "Month Invalid"
            };
    } else
    if( CdDate.slice( CdDate.lastIndexOf(".") + 1, CdDate.length ).length != 4 ) {
        return {
            code: "005", 
            msg: "Year Invalid"
        };
    } else {
        return {
            code: "100", 
            msg: "All Valid"
        };
    }
}

function checkTime(CdTime) {
    if(/[^\d\:]/.test(CdTime)) {
        return {
            code: "001", 
            msg: "Time includes invalid chars"
        };
    } else
    if((CdTime.split(":").length - 1) != 1) {
        return {
            code: "002", 
            msg: "Invalid ammount of colons"
        };
    } else 
    if( CdTime.indexOf(":") != 1 && CdTime.indexOf(":") != 2 ) {
        return {
            code: "003", 
            msg: "Hours Invalid"
        };
    } else 
    if( CdTime.slice( CdTime.indexOf(":") + 1, CdTime.length).length != 1 && 
        CdTime.slice( CdTime.indexOf(":") + 1, CdTime.length).length != 2 ) {
            return {
                code: "004", 
                msg: "Minutes Invalid"
            };
    } /*else
    if( CdTime.slice( CdTime.indexOf(":") + 1, CdTime.length ).slice( CdTime.indexOf(":") + 1, CdTime.length ).length != 1 && 
        CdTime.slice( CdTime.indexOf(":") + 1, CdTime.length ).slice( CdTime.indexOf(":") + 1, CdTime.length ).length != 2 ) {
            return {
                code: "005", 
                msg: "Seconds Invalid"
            };
    } */else {
        return {
            code: "100", 
            msg: "All Valid"
        };
    }
}

//convert object with date to date
function toDate(CdT) {
    return new Date(CdT.Years, CdT.Month, CdT.Days, CdT.Hours, CdT.Minutes, CdT.Seconds, 0)
}

function getDaysOfMonth(month,year) {
    return new Date(year, month, 0).getDate();
 }

//get days between two times
function getDays( currentdate, CdT ) {
    let Date2 = toDate(CdT);
    let nowForDays = new Date( currentdate );
    nowForDays.setHours(0, 0, 0, 0);
    Date2.setHours(0, 0, 0, 0);

    let diff = Date2.getTime() - nowForDays.getTime();
    let msInDay = 1000 * 3600 * 24;

    return Math.floor( (diff/msInDay) - getDaysOfMonth(CdT.Month, CdT.Years) - hourSub );
}

//get hours between two times
function getHours( currentdate, CdT ) {
    let Date2 = toDate(CdT);
    let nowForHours = new Date( currentdate );

    nowForHours.setFullYear(2000, 1, 1);
    Date2.setFullYear(2000, 1, 1);

    var hourDiff = Date2.getHours() - nowForHours.getHours();
    if(hourDiff < 0) {
        hourDiff += 24;
        hourSub = 1;
    }

    return hourDiff - minuteSub;
} 

function getMinutes( currentdate, CdT ) {
    let Date2 = toDate(CdT);
    let nowForMinutes = new Date( currentdate );

    nowForMinutes.setFullYear(2000, 1, 1);
    Date2.setFullYear(2000, 1, 1);

    var minuteDiff = Date2.getMinutes() - nowForMinutes.getMinutes();
    if(minuteDiff < 0) {
        minuteDiff += 60;
        minuteSub = 1;
    }

    return minuteDiff - secondSub;
}

function getSeconds( currentdate, CdT ) {
    let Date2 = toDate(CdT);
    let nowForSeconds = new Date( currentdate );

    nowForSeconds.setFullYear(2000, 1, 1);
    Date2.setFullYear(2000, 1, 1);

    var secondDiff = Date2.getSeconds() - nowForSeconds.getSeconds();
    if(secondDiff < 0) {
        secondDiff += 60;
        secondSub = 1;
    }

    return secondDiff;
}

//tick function
let Tick = setInterval(update, 1000);

function update() {
    var currentdate = new Date();
    diffSeconds = getSeconds( currentdate, CdT );
    diffMinutes = getMinutes( currentdate, CdT );
    diffHours = getHours( currentdate, CdT );
    diffDays = getDays( currentdate, CdT );
    if ( ( diffSeconds == 0 && diffMinutes == -1 && diffHours == 0 && diffDays == 0 ) || ( diffSeconds < 0 || diffMinutes < 0 || diffHours < 0 || diffDays < 0 ) ) {
        clearInterval(Tick)
        CDNumber.innerHTML = "0" + "&ensp;" + "0" + "&ensp;" + "0" + "&ensp;" + "0"
        setTimeout(function(){
            alert("TIME OVER!")
        }, 1);
    } else {
        CDNumber.innerHTML = diffDays + "&ensp;" + diffHours + "&ensp;" + diffMinutes + "&ensp;" + diffSeconds
    }
}

})