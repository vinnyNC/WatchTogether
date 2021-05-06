function displayMsg(msg) {
    let msgDiv = document.getElementById("joinRoomMsg");
    msgDiv.innerHTML = "<p class='err'>" + msg + "</p>";
}

$(document).ready(function() {

    document.getElementById("joinSubmit").addEventListener("click", function() {
        let reqID = document.getElementById("txtRoomID").value;
        if (reqID === "") {
            displayMsg("Please enter a valid room ID.")
        } else {
            socketSendMessage("JOIN_REQ: " + reqID);
        }
    });

});