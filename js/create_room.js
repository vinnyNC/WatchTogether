$(document).ready(function() {

    document.getElementById("createSubmit").addEventListener("click", function () {
        let roomName = document.getElementById("txtRoomName").value;
        document.getElementById("txtRoomName").value = "";
        console.log("Creating room: " + roomName);
    });

});