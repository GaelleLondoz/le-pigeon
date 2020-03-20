import React from "react";
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton
} from "@material-ui/core";

import ChatIcon from "@material-ui/icons/Chat";

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
export default function ContactBox(props) {
  return (
    <div>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={props.user.name} src={props.user.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={props.user.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Bruxelles
                </Typography>
              </React.Fragment>
            }
          />
          <IconButton
            value={props.user.name}
            aria-label="chat"
            onClick={e => props.handleChange(props.user, e)}
            enabled="true"
            color="primary"
          >
            <ChatIcon />
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
}

//export default ContactBox;
