function printRoomList(rooms) {
    console.log("Printing: " + rooms);
    let roomArray = rooms.split(" ")

    let roomTable = document.getElementById("browseTable");

    for(let i = 1; i < roomArray.length; i++) {
        let name = roomArray[i].substring(2, roomArray[i].indexOf(",") - 1).replaceAll("_", " ");
        let room_uuid = roomArray[i].substring(roomArray[i].indexOf(",") + 2, roomArray[i].length - 2);
        console.log("Room Name: " + name + " || UUID: " + room_uuid);
        let idTemp = '"' + room_uuid + '"';
        let optionsHTML = "<input type='button' class='joinBtn' onclick='joinRoom(" + idTemp + ")' value='Join Room'/>";
        let newRow = roomTable.insertRow(-1);
        let cell_uuid = newRow.insertCell(0);
        let cell_name = newRow.insertCell(1);
        let cell_options = newRow.insertCell(2);
        cell_uuid.innerHTML = room_uuid;
        cell_name.innerHTML = name;
        cell_options.innerHTML = optionsHTML;
    }
}

function joinRoom(roomID) {
    window.location.href = "room.html#" + roomID;
}


$(document).ready(function() {

    socketSendMessage("ROOMS: GET_LIST");

});