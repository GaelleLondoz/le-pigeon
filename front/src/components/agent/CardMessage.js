import React from "react";
import { Typography, Avatar } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import EventIcon from "@material-ui/icons/Event";
import { formatDate } from "../../helpers/formatDate";

const CardMessage = ({ message }) => {
  return (
    <div className="card-agent-messages-profile">
      <div className="card-agent-messages-profile-info">
        <CheckBoxIcon />
        <Typography component="p">Status : {message.status}</Typography>
      </div>
      <div className="card-agent-messages-profile-info">
        <EventIcon />
        <Typography component="p">
          Envoyé le {formatDate(message.createdAt)}
        </Typography>
      </div>
      <div
        className="card-agent-messages-profile-info"
        style={{ marginTop: "20px", alignItems: "center" }}
      >
        <Avatar alt="Remy Sharp" src={message.sender.avatar} />
        <Typography component="p">
          Par {message.sender.firstName} {message.sender.lastName}
        </Typography>
      </div>
      <Typography component="p" style={{ marginTop: "20px" }}>
        {message.content}
      </Typography>
    </div>
  );
};

export default CardMessage;
