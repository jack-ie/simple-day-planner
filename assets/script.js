//time, date, day variables
const time = moment().format('H:mm a');
const date = moment().format("MMMM Do YYYY");
const day = moment().format('dddd');
//to catch the current hour
const currentHour = moment().format('H');

// schedule time choices
const hour = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
]

// time, date, day variables prints to html
$("#currentDate").text(date);
$("#currentDay").text(day);

//for loop for the every hour, creating div-p, and the save button
for (let i = 0; i < hour.length; i++) {
    //All block for the scheduler div's
    let timeBlockDiv = $("<div>");
    //for hour variable
    let pTag = $("<p>");
    // to catch the actual time zone hour variable starts with 8am = 0+8 = i + 8
    let hr = i + 8;
    timeBlockDiv.addClass("row time-block hour");
    timeBlockDiv.attr("data-hour", hour[i]);
    pTag.text(hour[i]).addClass("col-sm-2 hour");

    // textarea
    let note = $("<textarea>").addClass(`col-sm-8 textarea-${i + 8} textbox`);

    // savebutton 
    let save = $("<div>").addClass("col-sm-2 saveBtn").attr("data-hour", hour[i]).text("SAVE");

    // Appending the buttons that created on line 40, 49, 51---
    timeBlockDiv.append(pTag, note, save);
    $(".container").append(timeBlockDiv);

    //if - else conditions
    if (hr < currentHour) {
        console.log("past time");
        timeBlockDiv.addClass("past");
    }
    else if (hr > currentHour) {
        console.log("future time");
        timeBlockDiv.addClass("future");
    }
    else {
        console.log("present time");
        timeBlockDiv.addClass("present");
    }

    //GetItem on the page if even its refresh(it stays in for loop)
    var toDo = localStorage.getItem(hour[i]);
    note.val(toDo);
}

$('.saveBtn').on("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    location.reload()
});


//SetItem in the localstorage which given by user
$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    var toDo = $(this).siblings("textarea").val();
    var actualHour = $(this).siblings("p").text();
    localStorage.setItem(actualHour, toDo)
});
