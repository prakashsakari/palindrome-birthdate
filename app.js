var dateInput = document.querySelector("#date-input");
var checkButton = document.querySelector("#check-button");
var message = document.querySelector("#message");


function reverseString(str) {
    var listOfChar = str.split('');
    var reverseListOfChar = listOfChar.reverse();
    var reversedStr = reverseListOfChar.join('');
    return reversedStr;
}

function isPalindrome(str) {
    var reversedStr = reverseString(str);
    return str === reversedStr;
}

function convertDateToString(date) {

    var dateString = {
        day: "",
        month: "",
        year: ""
    };

    if (date.day < 10) {
        dateString.day = "0" + date.day;
    } else {
        dateString.day = date.day.toString();
    }

    if (date.month < 10) {
        dateString.month = "0" + date.month;
    } else {
        dateString.month = date.month.toString();
    }
    dateString.year = date.year.toString();
    return dateString;

}


function getAllDateFormat(date) {
    var dateString = convertDateToString(date);

    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    var mmddyyyy = dateString.month + dateString.day + dateString.year;
    var yyyymmdd = dateString.year + dateString.month + dateString.day;
    var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]

}


function checkPalindromeForAllDateFormat(date) {
    var listOfDates = getAllDateFormat(date);

    for (var i = 0; i < listOfDates.length; i++) {
        return isPalindrome(listOfDates[i]);
    }

}

function isLeapyear(year){
    
    if (year % 400 === 0){
        return  true;
    }
    if (year % 100 === 0){
        return  false;
    }
    if (year % 4 === 0){
        return  true;
    }
    
}

function getNextDate(date){

    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month === 2){
        if (isLeapyear(year)){
            if (day > 29){
                day = 1;
                month++;
            }
        }else{
            if (day > 28){
                day = 1;
                month++;
            }
        }
    }else {
        if (day > dayInMonth[month-1]){
            day = 1;
            month++;
        }
    }

    if (month > 12){
        month = 1;
        year++;

    }
    return {
        day: day,
        month: month,
        year: year
    };
}


function getNextDatePalindrome(date){
    var counter = 0;
    var nextDate = getNextDate(date);

    while(1){
        counter++;
        var checkNextDatePalindrome = checkPalindromeForAllDateFormat(nextDate);
        if (checkNextDatePalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate]

}



function clickHandler(e) {
    var birthDate = dateInput.value;
    var birthDateNumberList = birthDate.split("-");

    var date = {
        day: Number(birthDateNumberList[2]),
        month: Number(birthDateNumberList[1]),
        year: Number(birthDateNumberList[0])
    }

    if (birthDate !== "") {
        var checkPalindrome = checkPalindromeForAllDateFormat(date);
        if (checkPalindrome) {
            message.innerText = "Yaah! Your birthdate is a palindrome🥳🥳"
            
        } else {
            var [counter, nextDate] = getNextDatePalindrome(date);
            message.innerText = `Your birthdate is not a palindrome. The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days`
        }
    }
}


checkButton.addEventListener("click", clickHandler);