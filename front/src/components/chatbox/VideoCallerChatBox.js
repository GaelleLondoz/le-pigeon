import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CallEndIcon from "@material-ui/icons/CallEnd";
import VideoCallIcon from "@material-ui/icons/VideoCall";

var localVideo;
var localStream;
var remoteVideo;
var peerConnection;
var uuid;
var serverConnection;
var user;

var peerConnectionConfig = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
var ConnectionConfigconstraints = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
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

async function callOngoing(props) {
  uuid = props.uuid;
  user = props.user;

  localVideo = document.getElementById("localVideo");
  remoteVideo = document.getElementById("remoteVideo");

  serverConnection = new WebSocket(process.env.REACT_APP_WEB_RTC_SERVER);

  peerConnection = new RTCPeerConnection(peerConnectionConfig);

  peerConnection.onicecandidate = (event) => {
    if (event.candidate != null) {
      serverConnection.onopen = () =>
        serverConnection.send(
          JSON.stringify({ ice: event.candidate, uuid: uuid })
        );
    } else {
      console.log("gotIceCandidate -> EVENT IS NULL");
    }
  };

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  if (navigator.mediaDevices.getUserMedia) {
    //Only for FIREFOX if needed
    //go to about: config
    //search and set to true
    //media.navigator.permission.disabled = true;
    await navigator.mediaDevices
      .getUserMedia(constraints)
      .then(getUserMediaSuccess)
      .catch(errorHandler);
  } else {
    alert("Your browser does not support getUserMedia API");
  }

  peerConnection.createOffer(
    createdDescription,
    errorHandler,
    ConnectionConfigconstraints
  );

  serverConnection.onmessage = gotMessageFromServer;
}

function getUserMediaSuccess(stream) {
  localVideo.srcObject = stream;
  localStream = stream;

  stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
}

async function gotMessageFromServer(message) {
  var signal = JSON.parse(message.data);
  //Ignore messages from ourself
  if (signal.uuid === user.id && signal.sdp) {
    if (signal.sdp.type === "answer") {
      await peerConnection
        .setRemoteDescription(new RTCSessionDescription(signal.sdp))
        .catch(errorHandler);
    } else return;
  }
  if (signal.uuid === user.id && signal.ice) {
    await peerConnection
      .addIceCandidate(signal.ice)
      .then(onAddIceCandidateSuccess)
      .catch(errorHandler);
  }
}

async function createdDescription(description) {
  const remoteStream = localStream;
  await peerConnection
    .setLocalDescription(description)
    .then(function () {
      //serverConnection.onopen = () =>
      serverConnection.send(
        JSON.stringify({
          sdp: peerConnection.localDescription,
          uuid: uuid,
          remoteStream: remoteStream,
          receiver: user.id,
        })
      );
    })
    .catch(errorHandler);
}

function errorHandler(error) {
  console.log(error);
}
function onAddIceCandidateSuccess() {
  console.log("AddIceCandidate success.");
}
