var min;
var sec;
var minTimer;
var secTimer;
var colors;
var sound;
var firstTime = true;
var audio;

$("button#reset").click(reset);
$("button#start").click(startCountDown);

var colorSets = [
    {
        id: "purpleGreen",
        background1: "purple",
        text1: "#fff",
        background2: "green",
        text2: "#000"
    },
    {
        id: "blackWhite",
        background1: "#fff",
        text1: "#000",
        background2: "#000",
        text2: "#fff"
    },
    {
        id: "redBlue",
        background1: "red",
        text1: "#000",
        background2: "blue",
        text2: "#fff"
    },
    {
        id: "pinkTeal",
        background1: "pink",
        text1: "#000",
        background2: "teal",
        text2: "#fff"
    }
]

function getValues() {
    min = $("#userMin").val();
    sec = $("#userSec").val();
    colors = $("#colorDisplay").val();
    assignColors();
    sound = $("#sound").val();
    audio = document.getElementById(sound);
}

function assignColors() {
    colorSets.forEach(function (color) {
        if (color.id == colors) {
            if (firstTime === true) {
                $("h2").css("background-color", color.background1);
                $("h2").css("color", color.text1);
                firstTime = false;
            } else {
                $("h2").css("background-color", color.background2);
                $("h2").css("color", color.text2);
                firstTime = true;
            }
        }
    });
}

function disableStart() {
    $("#start").prop("disabled", true);
}

function enableStart() {
    $("#start").prop("disabled", false);
}

function reset() {
    clearInterval(secTimer);
    enableStart();
    getValues();
    $("#min").text(min);
    $("#sec").text(sec);
    assignColors();
}

//runs when you click "start"
function startCountDown() {
    disableStart();
    getValues();
    //display starting number
    $("#min").text(min);
    $("#sec").text(sec);
    //count down and change number display
    secTimer = setInterval(function () {
        //if sec is > 0, then countdown
        if (sec > 0 && min >= 0) {
            sec--;
            $("#sec").text(sec);
        } else if (sec == 0 && min >= 0) {
            // if sec = 0, subtract 1 from min and restart sec to 59
            sec = 59;
            $("#sec").text(sec);
            if (min > 0) {
                min--;
                $("#min").text(min);
            } else {
                getValues();
                $("#min").text(min);
                $("#sec").text(sec);
                audio.play();
            }
        }
    }, 1000);
}
