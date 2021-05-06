let $v = function (id) { return document.getElementById(id); };

/**
 * Variables we will use throughout the javascript file
 */
let roomID = "invalid";
let socket = new WebSocket("ws://localhost:8887");
let loStorage = window.localStorage;
let UUID = loStorage.getItem("UUID");

/**
 * Gets the current active page based on path
 */
function getActive() {
    let curPage = window.location.pathname;
    curPage = curPage.split("/").pop();

    if (curPage === "index.html") {
        $("#nav_home").toggleClass("navActive");
    } else if (curPage === "create_room.html") {
        $("#nav_create_room").toggleClass("navActive");
    } else if (curPage === "login.html") {
        $("#nav_login").toggleClass("navActive");
    } else if (curPage === "register.html") {
        $("#nav_register").toggleClass("navActive");
    } else if (curPage === "join_room.html") {
        $("#nav_join_room").toggleClass("navActive");
    } else if (curPage === "browse.html") {
        $("#nav_browse").toggleClass("navActive");
    }
}

/**
 * Gets room code which is at end of the URL after # (ex: room.html#333 - 333 is room code)
 * @returns {string|string}
 */
function getRoomFromURL() {
    let curPage = window.location.href;
    if (curPage.includes("#")) {
        curPage = curPage.split("#").pop();
    } else {
        curPage = "invalid";
    }
    return curPage;
}

$(document).ready(function() {

    //Set events
    $v("nav_home").onclick = function(event) {
        event.preventDefault();
        window.location.href = "index.html";
    }

    $v("nav_create_room").onclick = function(event) {
        event.preventDefault();
        window.location.href = "create_room.html";
    }

    $v("nav_login").onclick = function () {
        event.preventDefault();
        //window.location.href = "login.html";

    }

    $v("nav_register").onclick = function() {
        event.preventDefault();
        window.location.href = "register.html";
    }

    $v("nav_join_room").onclick = function() {
        event.preventDefault();
        window.location.href = "join_room.html";
    }

    $v("nav_browse").onclick = function() {
        event.preventDefault();
        window.location.href = "browse.html";
    }

    //Execute functions
    getActive();
    roomID = getRoomFromURL();

    //Get user UUID
    checkID();

});


//Socket functions
/**
 * Checks to see if a unique user ID exists or we generate it
 */
function checkID() {
    if (loStorage.getItem("UUID") !== null) {
        socketSendMessage("UUID: " + loStorage.getItem("UUID"));
    } else {
        socketSendMessage("UUID: generate");
        console.log("Requesting UUID from server");
    }
}

function waitForSocketConnection(socket, callback) {
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                //console.log("Server Connection Established");
                if (callback != null) { callback(); }
            } else {
                console.log("Waiting for connection... readyState: " + socket.readyState);
                if (socket.readyState === 3) {
                    console.log("Failed to connect...");
                } else {
                    waitForSocketConnection(socket, callback);
                }
            }
        }, 500);
}

function socketSendMessage(msg) {
    waitForSocketConnection(socket, function() {
        console.log("Sending Socket MSG: " + msg);
        socket.send(msg);
    })
}

socket.onmessage = function(event) {
    let message = event.data;
    console.log("[MSG REC] " + message);

    if (message.includes("ASSIGN_USER_UUID")) {
        message = message.split(":")
        let userUUID = message[1].trim();
        console.log("User UUID: " + userUUID);
        loStorage.setItem("UUID", userUUID);
    } else if (message.includes("[ROOM_LIST]")) {
        printRoomList(message);
    } else if (message.includes("isOwner")) {
        makeOwner();
    } else if (message.includes("[ROOM_CMD]")) {
        if (!isOwner) {
            manageCMD(message.substring(message.indexOf("'") + 1, message.indexOf("'", message.indexOf("'") + 1)));
        }

        if (message.includes("src")) {
            manageCMD(message.substring(message.indexOf("'") + 1, message.indexOf("'", message.indexOf("'") + 1)));
        }
    } else if (message.includes("[CHAT_MSG]")) {
        let author = message.substring(message.indexOf("'") + 1, message.indexOf("]", message.indexOf("G") + 3) - 1);
        let chatmsg = message.substring(message.indexOf("]", message.indexOf("G") + 3) + 2);
        addChatMsg(author + ": " + chatmsg);
    } else if (message.includes("JOIN_REQ_RESP")) {
        joinResponse(message.substring(message.indexOf(":") + 1));
    } else if (message.includes("CREATE_ROOM_SUCCESS")) {
        createRoomRedirect(message.substring(message.indexOf(":") + 2));
    }
}