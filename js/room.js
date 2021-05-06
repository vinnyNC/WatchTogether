let isOwner = false;
let videoPlayer = null;
let lastSrvTime = null;
let lastSrvStatus = null;

function makeOwner() {
    isOwner = true;

    videoPlayer.controlBar.progressControl.enable();
    videoPlayer.controlBar.playToggle.enable();

    videoPlayer.on("play", function() {
        sendAction("PLAY");
    });
    videoPlayer.on("pause", function() {
        sendAction("PAUSE");
    });

    videoPlayer.on("timeupdate", function() {
        sendAction("TIME=" + videoPlayer.currentTime());
    })
}

function sendAction(event) {
    socketSendMessage("ROOM_OWNER_ACTION: [" + roomID + "]" + event);
}

function manageCMD(cmd) {
    console.log(cmd);


    if (cmd === "PAUSE") {
        videoPlayer.pause();
        lastSrvStatus = "PAUSE";
        checkVidTime(lastSrvTime, "playState");
    } else if (cmd === "PLAY") {
        videoPlayer.play();
        lastSrvStatus = "PLAY";
        checkVidTime(lastSrvTime, "playState");
    } else if (cmd.includes("ROOM_CUR_TIME")) {
        let srvTime = parseFloat(cmd.split(":")[1]);
        lastSrvTime = srvTime;
        checkVidTime(srvTime, "normal");
    }
}

function checkVidTime(srvTime, reason) {
    let curTime = videoPlayer.currentTime();
    let dif = Math.abs(srvTime - curTime);
    console.log("Time dif: " + dif + " || CUR: " + curTime + " || srvTime: " + srvTime);
    dif = dif - 0.5;

    if (reason === "normal") {
        if (dif > 3) {
            console.log("CHANGE TIME");
            videoPlayer.currentTime(srvTime);
            videoPlayer.load();
        }
    } else if (reason === "playState") {
        if (dif > 0.5) {
            console.log("CHANGE TIME");
            videoPlayer.currentTime(srvTime);
            videoPlayer.load();
        }
    }
}

function addChatMsg(msg) {
    console.log(msg);
    //document.getElementById("chat").innerHTML += msg + "<br>";

    for (let i = 0; i < 200; i++) {
        document.getElementById("chat").innerHTML += msg + "<br>";
        document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
    }

}

$(document).ready(function() {
    videoPlayer = videojs("videoPlayer");
    videoPlayer.crossOrigin = "anonymous";
    videoPlayer.src([
        {type: "video/youtube", src: "http://www.youtube.com/watch?v=tI1JGPhYBS8"},
    ]);

    videoPlayer.controlBar.progressControl.disable();
    videoPlayer.controlBar.playToggle.disable();

    videoPlayer.load();

    videoPlayer.one("play", function() {
        console.log("Sending last SRV Status: " + lastSrvStatus);
        manageCMD(lastSrvStatus);
        console.log("Sending cur time: " + lastSrvTime);
        manageCMD("ROOM_CUR_TIME: " + lastSrvTime);
    });

    document.getElementById("chatSendBtn").addEventListener("click", function () {
        let textVal = $v("chatText").value;
        $v("chatText").value = "";
        console.log("Sending: " + textVal);
        socketSendMessage("CHAT_MSG: ['" + roomID + "'] " + textVal + "");
    });
    socketSendMessage("JOIN_ROOM: " + roomID);
    console.log("Room ID: " + roomID);
});