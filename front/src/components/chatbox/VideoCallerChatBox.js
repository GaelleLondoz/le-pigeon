import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CallEndIcon from "@material-ui/icons/CallEnd";
import VideoCallIcon from "@material-ui/icons/VideoCall";

var localVideo;
//var localStream;
var remoteVideo;
var peerConnection;
var uuid;
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

var constraints = {
  audio: true,
  video: true,
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > svg": {
      margin: theme.spacing(2),
    },
  },
}));

export default function VideoCallerChatBox(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <React.Fragment>
        <CssBaseline />
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
              <VideoCallIcon />
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
      </React.Fragment>
    </div>
  );
}

function callOngoing(props) {
  //uuid = createUUID();
  uuid = props.uuid;
  localVideo = document.getElementById("localVideo");
  remoteVideo = document.getElementById("remoteVideo");

  serverConnection = new WebSocket(
    "wss://" + window.location.hostname + ":10443"
  );
  console.log("CALLER -> Before Start");
  start(props.isCaller);
  console.log("CALLER -> After Start");

  serverConnection.onmessage = gotMessageFromServer;

  if (navigator.mediaDevices.getUserMedia) {
    //Only for FIREFOX if needed
    //go to about: config
    //search and set to true
    //media.navigator.permission.disabled = true;
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
  console.log({ stream: stream });
  localVideo.srcObject = stream;
  stream.getTracks().forEach(function (track) {
    console.log("getUserMediaSuccess -> ADD TRACT");
    peerConnection.addTrack(track, stream);
  });
  console.log("getUserMediaSuccess END");
  //peerConnection.addStream(stream);
}

function start(isCaller) {
  console.log("ENTER => Start function");
  peerConnection = new RTCPeerConnection(peerConnectionConfig);
  console.log({ peerConnection: peerConnection });
  //peerConnection.onicecandidate = gotIceCandidate;
  peerConnection.onicecandidate = (event) => {
    console.log("gotIceCandidate");
    if (event.candidate != null) {
      console.log({ eventCandidate: event });
      serverConnection.onopen = () =>
        serverConnection.send(
          JSON.stringify({ ice: event.candidate, uuid: uuid })
        );
    } else {
      console.log("gotIceCandidate -> EVENT IS NULL");
    }
  };
  //peerConnection.ontrack = gotRemoteStream;
  peerConnection.ontrack = (event) => {
    console.log("START -> ONTRACK()");
    remoteVideo.srcObject = event.streams[0];
  };
  //peerConnection.addStream(localStream);

  if (isCaller) {
    console.log("ENTER => Start BEGIN isCALLER");
    peerConnection.createOffer(
      createdDescription,
      errorHandler,
      ConnectionConfigconstraints
    );
    console.log("ENTER => Start END isCALLER");
  }
  console.log("ENTER => Start function");
}

function gotMessageFromServer(message) {
  console.log("gotMessageFromServer");
  if (!peerConnection) start(false);

  console.log({ message: message });
  var signal = JSON.parse(message.data);
  //Ignore messages from ourself
  if (signal.uuid === uuid && signal.sdp) {
    if (signal.sdp.type === "answer") {
      console.log("ANSWER ARRIVED");
      peerConnection
        .setRemoteDescription(new RTCSessionDescription(signal.sdp))
        .catch(errorHandler);
    } else return;
  }
}

function gotIceCandidate(event) {
  console.log("gotIceCandidate");
  if (event.candidate != null) {
    console.log({ eventCandidate: event });
    serverConnection.onopen = () =>
      serverConnection.send(
        JSON.stringify({ ice: event.candidate, uuid: uuid })
      );
  } else {
    console.log("gotIceCandidate -> EVENT IS NULL");
  }
}

function createdDescription(description) {
  console.log("got description");

  peerConnection
    .setLocalDescription(description)
    .then(function () {
      serverConnection.onopen = () =>
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
