let reqID

function displayMsg(msg) {
    let msgDiv = document.getElementById("joinRoomMsg");
    msgDiv.innerHTML = "<p class='err'>" + msg + "</p>";
}

function joinResponse(status) {
    if (status.includes("false")) {
        displayMsg("Invalid room ID, try again.");
    } else if (status.includes("true")) {
        window.location.href = "room.html#" + reqID;
    }
}

$(document).ready(function() {

    document.getElementById("joinSubmit").addEventListener("click", function() {
        reqID = document.getElementById("txtRoomID").value;
        if (reqID === "") {
            displayMsg("Please enter a valid room ID.")
        } else {
            socketSendMessage("JOIN_REQ: " + reqID);
        }
    });

});