import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CallEndIcon from "@material-ui/icons/CallEnd";

const useStyles = makeStyles(theme => ({
  root: {
    "& > svg": {
      margin: theme.spacing(2)
    }
  }
}));

export default function VideoChatBox(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <React.Fragment>
        <CssBaseline />
        <Box display="flex" justifyContent="center" bgcolor="background.paper">
          <video id="localVideo" autoPlay="true"></video>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          bgcolor="background.paper"
          sizewidth="50%"
        >
          <video id="remoteVideo" autoPlay="true"></video>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          bgcolor="background.paper"
          sizewidth="50%"
        >
          <IconButton
            aria-label="video"
            onClick={e => props.handleStopVideo(e)}
            enabled
            color="secondary"
            size="medium"
          >
            <CallEndIcon />
          </IconButton>
        </Box>
      </React.Fragment>
    </div>
  );
}
