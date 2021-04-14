let socket = new WebSocket("ws://localhost:8887");

// send message from the form
window.onload = function() {
    document.getElementById("btnSend").onclick = function () {
        let msg = document.getElementById("chatMessage").value;
        console.log("Logging in as: " + msg);
        socket.send("USER: " + msg);
    }

    document.getElementById("player").addEventListener('play', evt => {
        socket.send("HOST: PLAY");
    });

    document.getElementById("player").addEventListener('pause', evt => {
        socket.send("HOST: PAUSE");
    });
}

// message received - show the message in div#messages
socket.onmessage = function(event) {
    let message = event.data;

    let player = document.getElementById("player");
    let playerSrc = document.getElementById("videoSrc");

    let messageElem = document.createElement('div');
    messageElem.textContent = message;
    document.getElementById('messages').prepend(messageElem);

    if (message.includes("SRC")) {
        let src = message.substr(4).trim();
        console.log("Received video src: " + src);
        player.pause();
        playerSrc.src = src;
        playerSrc.type = 'video/mp4';
        player.load();
        player.play();
    }

    if(message.includes("REQ_TIME")) {
        socket.send("CUR_TIME: " + player.getCurrentTime());
    }
}

socket.onopen = function() {
    console.log("open");
}