let $v = function (id) { return document.getElementById(id); };

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
    console.log(curPage);
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
        window.location.href = "login.html";
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
});