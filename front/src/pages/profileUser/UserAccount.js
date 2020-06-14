import React from "react";
import {
  Container,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  Grid,
  ListItemText,
  Typography,
  ListItemAvatar,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import FolderIcon from "@material-ui/icons/Folder";

const UserAccount = () => {
  return (
    <>
      <section id="profile-user-account-header">
        <Container>
          <div className="container-header">
            <Avatar
              alt="Remy Sharp"
              src="https://randomuser.me/api/portraits/men/35.jpg"
            />
            <div className="container-info">
              <div className="profile-user-account-info">
                <InboxIcon />
                <Typography variant="p">Jean Dubosq</Typography>
              </div>
              <div className="profile-user-account-info">
                <InboxIcon />
                <Typography variant="p">Jean Dubosq</Typography>
              </div>
              <div className="profile-user-account-info">
                <InboxIcon />
                <Typography variant="p">Jean Dubosq</Typography>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default UserAccount;
