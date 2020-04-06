import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CallEndIcon from "@material-ui/icons/CallEnd";
import PhoneCallbackIcon from "@material-ui/icons/PhoneCallback";
import Alert from "@material-ui/lab/Alert";

var localVideo;
//var localStream;
var remoteVideo;
var peerConnection;
var uuid;
var message;
var serverConnection;

var peerConnectionConfig = {
  iceServers: [
    { urls: "stun:stun.stunprotocol.org:3478" },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};
var ConnectionConfigconstraints = {
  mandatory: { OfferToReceiveAudio: true, OfferToReceiveVideo: true },
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
          <video id="localVideo" autoPlay={true}></video>
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

function callOngoing(props) {
  console.log("callOngoing");
  //uuid = createUUID();
  uuid = props.uuid;
  message = props.liveMessage;
  serverConnection = props.liveConnection;

  console.log({ liveMessage: message });
  console.log({ serverConnection: serverConnection });

  localVideo = document.getElementById("localVideo");
  remoteVideo = document.getElementById("remoteVideo");
  /*serverConnection = new WebSocket(
    "wss://" + window.location.hostname + ":10443"
  );*/
  //start(false);
  //serverConnection.onmessage = gotMessageFromServer;
  gotMessageFromServer(message);
  /*serverConnection.onmessage = message => {
    console.log("gotMessageFromServer");
    if (!peerConnection) start(false);
  };*/

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(getUserMediaSuccess)
      .catch(errorHandler);
  } else {
    alert("Your browser does not support getUserMedia API");
  }
}

function getUserMediaSuccess(stream) {
  console.log("getUserMediaSuccess START");
  //localStream = stream;
  localVideo.srcObject = stream;
  console.log({ localStream: stream });
  //peerConnection.addStream(stream);
  stream.getTracks().forEach(function (track) {
    console.log("getUserMediaSuccess -> ADD TRACT");
    peerConnection.addTrack(track, stream);
  });
  console.log("getUserMediaSuccess END");
}

function start(isCaller) {
  console.log("start");
  peerConnection = new RTCPeerConnection(peerConnectionConfig);
  peerConnection.onicecandidate = gotIceCandidate;
  //peerConnection.ontrack = gotRemoteStream;
  peerConnection.ontrack = function (event) {
    console.log("START -> ON TRACK()");
    remoteVideo.srcObject = event.streams[0];
  };
  //peerConnection.addStream(localStream);
  console.log("start END");
  if (isCaller) {
    console.log("start - CALLER");
    peerConnection.createOffer(
      createdDescription,
      errorHandler,
      ConnectionConfigconstraints
    );
  }
}

function gotMessageFromServer(message) {
  console.log("gotMessageFromServer");
  console.log({ peerConnection: peerConnection });
  if (!peerConnection) start(false);

  var signal = JSON.parse(message.data);
  console.log({ signal: signal });
  if (signal.uuid === uuid) {
    console.log("gotMessageFromServer -> It's me");
    if (signal.sdp) {
      console.log("gotMessageFromServer -> SDP");
      peerConnection
        .setRemoteDescription(new RTCSessionDescription(signal.sdp))
        .then(function () {
          // Only create answers in response to offers
          if (signal.sdp.type === "offer") {
            console.log("gotMessageFromServer -> OFFER");
            peerConnection
              .createAnswer()
              .then(createdDescription)
              .catch(errorHandler);
          }
        })
        .catch(errorHandler);
    } else if (signal.ice) {
      console.log({ ice: signal.ice });
      /*peerConnection
        .addIceCandidate(new RTCIceCandidate(signal.ice))
        .catch(errorHandler);*/
      peerConnection
        .addIceCandidate(signal.ice)
        .then(onAddIceCandidateSuccess)
        .catch(errorHandler);
    }
  }
}

function gotIceCandidate(event) {
  console.log("gotIceCandidate");
  if (event.candidate != null) {
    console.log("gotIceCandidate -> EVENT NOT NULL");
    serverConnection.send(JSON.stringify({ ice: event.candidate, uuid: uuid }));
  } else {
    console.log("gotIceCandidate -> EVENT IS NULL");
  }
}

function createdDescription(description) {
  console.log("got description");
  peerConnection
    .setLocalDescription(description)
    .then(function () {
      serverConnection.send(
        JSON.stringify({ sdp: peerConnection.localDescription, uuid: uuid })
      );
    })
    .catch(errorHandler);
}

/* function gotRemoteStream(event) {
  console.log("got remote stream");
  remoteVideo.srcObject = event.streams[0];
} */

function errorHandler(error) {
  console.log(error);
}
function onAddIceCandidateSuccess() {
  console.log("AddIceCandidate success.");
}
