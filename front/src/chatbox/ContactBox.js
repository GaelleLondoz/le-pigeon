import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ChatIcon from "@material-ui/icons/Chat";
import Avatar from "@material-ui/core/Avatar";
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
const ContactBox = props => (
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
          enabled
          color="primary"
        >
          <ChatIcon />
        </IconButton>
      </ListItem>
    </List>
  </div>
);

export default ContactBox;
