
let appId, channelId, channelName;

let getVideoCredentials = function (err) {
    // get credentials here
};

// Handle errors.
let handleError = function (err) {
    console.log("Error: ", err);
};

getVideoCredentials()

var rtc = {
    client: null,
    videoEnabled: true,
    audioEnabled: true,
    localStream: null,
}

rtc.client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
});

rtc.client.init(appId);

// Join a channel
rtc.client.join(channelId, channelName, null, (uid) => {


    rtc.localStream = AgoraRTC.createStream({
        audio: true,
        video: true,
    });

    // Initialize the local stream
    rtc.localStream.init(() => {
        // Play the local stream
        rtc.localStream.play("my-video");
        // Publish the local stream
        
        rtc.client.publish(rtc.localStream, handleError);
    }, handleError);
}, handleError);


// Subscribe to the remote stream when it is published
rtc.client.on("stream-added", function (evt) {
    rtc.client.subscribe(evt.stream, handleError);
});

// Play the remote stream when it is subsribed
rtc.client.on("stream-subscribed", function (evt) {
    let stream = evt.stream;
    $("<div/>", {
        id: "remote_video_panel"
      }).appendTo("#user-video")

    stream.play("remote_video_panel");
});

// Remove the corresponding view when a remote user unpublishes.
rtc.client.on("stream-removed", function (evt) {
    let stream = evt.stream;
    stream.close();
    $("#remote_video_panel").remove()
});

// Remove the corresponding view when a remote user leaves the channel.
rtc.client.on("peer-leave", function (evt) {
    let stream = evt.stream;
    stream.close();
    $("#remote_video_panel").remove()
});

$("#audio-button").on("click", function (e) {
    e.preventDefault()
    if (rtc.audioEnabled) {
        rtc.audioEnabled = false
        rtc.localStream.muteAudio()
    } else {
        rtc.audioEnabled = true
        rtc.localStream.unmuteAudio()
    }
});

// Unpublishes the video feed from Agora
$("#video-button").on("click", function (e) {
    e.preventDefault()
    if (rtc.videoEnabled) {
        rtc.videoEnabled = false
        rtc.localStream.muteVideo()
    } else {
        rtc.videoEnabled = true
        rtc.localStream.unmuteVideo()
    }
});