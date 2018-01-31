var min;
var sec;
var minTimer;
var secTimer;


$("button#submit").on("click", function () {
    getValues();
    console.log(min);
    console.log(sec);
});

$("button#reset").click(reset);
$("button#start").click(secCountDown);

function getValues() {
    min = $("#userMin").val();
    sec = $("#userSec").val();
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
    toggleDisplayClasses();
}

function toggleDisplayClasses() {
    $("#countdown").toggleClass("background2middle");
    $("#countdown").toggleClass("background1middle");
    $("h1").toggleClass("whiteText");
    $("h1").toggleClass("blackText");
    $("h2").toggleClass("whiteText");
    $("h2").toggleClass("blackText");
    $("body").toggleClass("background1");
    $("body").toggleClass("background2");
}

//function restart() {
//    stop();
//    getValues();
//    $("#min").text(min);
//    $("#sec").text(sec);
//    toggleDisplayClasses();
//}

//runs when you click "start"
function secCountDown() {
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
            //getValues();
            sec = 59;
            $("#sec").text(sec);
            if (min > 0) {
                min--;
                $("#min").text(min);
            } else {
                getValues();
                $("#min").text(min);
                $("#sec").text(sec);
                toggleDisplayClasses();
                $.playSound("assets/Ship_Bell.mp3");
            }
        }
    }, 1000);
}
