
import authService from "../scripts/authServices.js";
import restApi from "../scripts/REST_API.service.js";

var auth = new authService();
var api = new restApi();

var id;

let appId, channelId, channelName;

jQuery(document).ready(async () => {

    let params = new URLSearchParams(window.location.search);
    id = params.get("id");

    let credentials = (await api.startAppointment(id)).data;

    appId = "2e0dc5c62ed046e89c1133c91f36a8ca";
    channelName = credentials.channel_name
    channelId = credentials.token;

    console.log(credentials);

    // Handle errors.
    let handleError = function (err) {
        console.log("Error: ", err);
    };

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

    rtc.client.on("onTokenPrivilegeWillExpire", function () {
        // 30 seconds to expiry
    })

    rtc.client.on("onTokenPrivilegeDidExpire", function () {
        // finish
    })

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

    setInterval(() => {
        rtc.client.getSessionStats((stats) => {
            let duration = parseInt(stats.Duration)
            let s = ("0" + duration % 60).slice(-2);
            let m = ("0" + parseInt(duration / 60)).slice(-2);
            $("#call-duration").text(m + " : " + s)
        });
    }, 1000)

});

$("#close").on("click", function () {


    let user_type = localStorage.getItem('user_type');

    swal({
        title: "Are you sure?",
        text: "Once you click ok, you will not be able to access this call again!",
        icon: "warning",
        buttons: true,
    })
        .then((willEnd) => {
            if (willEnd) {
                if (user_type === 'patient') {

                    ask().then();
                } else {
                    location.href = 'add-after-call-info.html?id=' + id;
                }
            }
        });


    return false;
})

async function ask() {
    let wrap = document.createElement('div');
    wrap.setAttribute('class', 'text-muted');
    wrap.innerHTML = `
    <button onclick="reply(1)" type="button" value="sad" class="btn feel">
        <i class="fa fa-frown fa-3x rating 1"></i>
    </button>
    <button onclick="reply(3)" type="button" value="neutral" class="btn feel">
        <i class="fa fa-meh fa-3x rating 3"></i>
    </button>
    <button onclick="reply(5)" type="button" value="happy" class="btn feel">
        <i class="fa fa-smile fa-3x rating 5"></i>
    </button>
    <hr>`

    await swal({
        title: "",
        text: "Give your doctor the rating (he/she) deserve!",
        icon: "info",
        className: '',
        closeOnClickOutside: false,
        content: {
            element: wrap
        },
        buttons: {
            confirm: {
                text: "Next",
                value: '',
                visible: true,
                closeModal: true,
            }
        },
    });

    let message = await swal({
        text: 'Tell us more about your appointment',
        content: "input",
        closeOnClickOutside: false,
        button: {
            text: "Send",
            closeModal: true,
        },
    });

    debugger;

    await api.sendRating(rating/* global variable declared in video-call.html -> script */, message ? message : '', id);

}
