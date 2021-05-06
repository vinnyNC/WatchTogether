function createRoomRedirect(room_uuid) {
    console.log("ROOMCREATE_ID: " + room_uuid);
    window.location.href = "room.html#" + room_uuid;
}

$(document).ready(function() {

    document.getElementById("createSubmit").addEventListener("click", function () {
        let roomName = document.getElementById("txtRoomName").value;
        document.getElementById("txtRoomName").value = "";
        socketSendMessage("CREATE_ROOM: " + roomName);
        console.log("Creating room: " + roomName);
    });

});