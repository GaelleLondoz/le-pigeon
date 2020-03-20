import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const classes = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

class UserChatBox extends React.Component {
  render() {
    return (
      <div className="">
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={this.props.avatar} alt={this.props.name} />
            </ListItemAvatar>
            <ListItemText
              primary={this.props.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {this.props.location}
                  </Typography>
                </React.Fragment>
              }
            />
            <IconButton
              aria-label="video"
              onClick={e => this.props.handleCall(this.props.name, e)}
              enabled="true"
              color="primary"
            >
              <VideoCallIcon />
            </IconButton>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </div>
    );
  }
}

export default UserChatBox;
