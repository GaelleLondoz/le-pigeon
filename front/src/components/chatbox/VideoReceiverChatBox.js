import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CallEndIcon from "@material-ui/icons/CallEnd";
import PhoneCallbackIcon from "@material-ui/icons/PhoneCallback";
import Alert from "@material-ui/lab/Alert";

var localVideo;
var localStream;
var remoteVideo;
var peerConnection;
var uuid;
var message;
var serverConnection;

var peerConnectionConfig = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.webkitGetUserMedia;
window.RTCPeerConnection =
  window.RTCPeerConnection ||
  window.mozRTCPeerConnection ||
  window.webkitRTCPeerConnection;
window.RTCIceCandidate =
  window.RTCIceCandidate ||
  window.mozRTCIceCandidate ||
  window.webkitRTCIceCandidate;
window.RTCSessionDescription =
  window.RTCSessionDescription ||
  window.mozRTCSessionDescription ||
  window.webkitRTCSessionDescription;

var constraints = {
  audio: true,
  video: true,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > svg": {
      margin: theme.spacing(2),
    },
  },
}));

export default function VideoReceiverChatBox(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <React.Fragment>
        <CssBaseline />
        <Alert variant="filled" severity="info">
          This is an info alert — Incoming call !!!
        </Alert>
        <Box display="flex" justifyContent="center" bgcolor="background.paper">
          <video
            id="localVideo"
            autoPlay={true}
            width={480}
            height={150}
          ></video>
        </Box>
        <Box display="flex" justifyContent="center" bgcolor="background.paper">
          <video id="remoteVideo" autoPlay={true}></video>
        </Box>
        <Box display="flex" justifyContent="center" bgcolor="background.paper">
          <div>
            <IconButton
              aria-label="video"
              onClick={(e) => callOngoing(props)}
              enabled="true"
              color="primary"
            >
              <PhoneCallbackIcon />
            </IconButton>
            <IconButton
              aria-label="callend"
              onClick={(e) => props.handleStopVideo(e)}
              enabled="true"
              color="secondary"
            >
              <CallEndIcon />
            </IconButton>
          </div>
        </Box>
        <Alert variant="filled" severity="info">
          Pick up or Hang off the call !!!
        </Alert>
      </React.Fragment>
    </div>
  );
}

async function callOngoing(props) {
  uuid = props.uuid;
  message = props.liveMessage;
  serverConnection = props.liveConnection;

  console.log({ liveMessage: message });
  console.log({ serverConnection: serverConnection });

  localVideo = document.getElementById("localVideo");
  remoteVideo = document.getElementById("remoteVideo");

  peerConnection = new RTCPeerConnection(peerConnectionConfig);
  //peerConnection.onicecandidate = gotIceCandidate;
  peerConnection.onicecandidate = function (event) {
    console.log("gotIceCandidate");
    if (event.candidate != null) {
      serverConnection.send(
        JSON.stringify({ ice: event.candidate, uuid: uuid })
      );
    } else {
      console.log("gotIceCandidate -> EVENT IS NULL");
    }
  };

  peerConnection.ontrack = (event) => {
    console.log("got remote stream");
    if (event.streams != null) {
      remoteVideo.srcObject = event.streams[0];
    } else {
      console.log("got remote stream -> EVENT IS NULL");
    }
  };

  if (navigator.mediaDevices.getUserMedia) {
    await navigator.mediaDevices
      .getUserMedia(constraints)
      .then(getUserMediaSuccess)
      .catch(errorHandler);
  } else {
    alert("Your browser does not support getUserMedia API");
  }

  gotMessageFromServer(message);
}

function getUserMediaSuccess(stream) {
  localStream = stream;
  localVideo.srcObject = stream;

  stream.getTracks().forEach(async function (track) {
    await peerConnection.addTrack(track, stream);
  });
}
async function gotMessageFromServer(message) {
  var signal = JSON.parse(message.data);
  console.log({ signal: signal });
  if (signal.uuid === uuid) {
    if (signal.sdp) {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(signal.sdp)
      );
      if (signal.sdp.type === "offer") {
        await peerConnection
          .createAnswer()
          .then(createdDescription)
          .catch(errorHandler);
      }
    }
  }
}
async function createdDescription(description) {
  const remoteStream = localStream;
  await peerConnection
    .setLocalDescription(description)
    .then(function () {
      serverConnection.send(
        JSON.stringify({
          sdp: peerConnection.localDescription,
          uuid: uuid,
          remoteStream: remoteStream,
        })
      );
    })
    .catch(errorHandler);
}

function errorHandler(error) {
  console.log(error);
}
