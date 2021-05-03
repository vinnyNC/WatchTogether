$(document).ready(function() {
    let videoPlayer = videojs("videoPlayer");
    videoPlayer.crossOrigin = "anonymous";
    videoPlayer.src([
        {type: "video/youtube", src: "http://www.youtube.com/watch?v=tI1JGPhYBS8"},
    ]);

    videoPlayer.load();
    videoPlayer.pause();

    document.getElementById("chatSendBtn").addEventListener("click", function () {
        let textVal = $v("chatText").value;
        $v("chatText").value = "";
        console.log("Sending: " + textVal);
    });
});