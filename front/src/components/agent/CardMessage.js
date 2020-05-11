import React from "react";
import { Typography } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import EventIcon from "@material-ui/icons/Event";
import { formatDate } from "../../helpers/formatDate";

const CardMessage = ({ message }) => {
  return (
    <div className="card-agent-messages-profile">
      <Typography component="p" style={{ marginBottom: "20px" }}>
        {message.content}
      </Typography>
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
    </div>
  );
};

export default CardMessage;
