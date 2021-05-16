// Variable to store and loop through the Scheduler
var theDay = [
    
    {id: "0",
     hour: "09",
     time: "09",
     meridiem: "am",
     reminder: ""},
    
    {id: "1",
    hour: "10",
    time: "10",
    meridiem: "am",
    reminder: ""},
    
    {id: "2",
    hour: "11",
    time: "11",
    meridiem: "am",
    reminder: ""},
    
    {id: "3",
    hour: "12",
    time: "12",
    meridiem: "pm",
    reminder: ""},
    
    {id: "4",
    hour: "01",
    time: "13",
    meridiem: "pm",
    reminder: ""},
    
    {id: "5",
    hour: "02",
    time: "14",
    meridiem: "pm",
    reminder: ""},
    
    {id: "6",
    hour: "03",
    time: "15",
    meridiem: "pm",
    reminder: ""},
    
    {id: "7",
    hour: "04",
    time: "16",
    meridiem: "pm",
    reminder: ""},
    
    {id: "8",
    hour: "05",
    time: "17",
    meridiem: "pm",
    reminder: ""},
]
// Sets the Date for the Day
function getDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}
// Saves entries to localStorage
function saveEntries() {
    localStorage.setItem("theDay", JSON.stringify(theDay));
}
// Gets entries that were saved to localStorage
function displayEntries() {
    theDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}
// Function that displays saved entries from localStorage
function init() {
    var storedDay = JSON.parse(localStorage.getItem("theDay"));
    if (storedDay) {
        theDay = storedDay;
    }
    saveEntries();
    displayEntries();
}
// Displays the Date
getDate();

// Functions for Creating and Displaying the Actual Scheduler
theDay.forEach(function(thisHour) {
    // Creates row for the "Time Blocks"
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // Creates the Time Field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // Sets the Colors Based on the Times of Day
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // Save Button Creation
    var saveButton = $("<i class='fas fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// Calls to get any and all saved entries from localStorage
init();


// Function for saving entries to localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".past, .present, .future").attr("id");
    theDay[saveIndex].reminder = $(this).siblings(".description").children(".past, .present, .future").val();
    console.log(saveIndex);
    saveEntries();
    displayEntries();
})