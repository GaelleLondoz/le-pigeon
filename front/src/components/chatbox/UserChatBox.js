import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const classes = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
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
              value={this.props.name}
              aria-label="close"
              onClick={(e) => this.props.handleClose(e)}
              enabled="true"
              color="primary"
            >
              <CloseIcon />
            </IconButton>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </div>
    );
  }
}

export default UserChatBox;
