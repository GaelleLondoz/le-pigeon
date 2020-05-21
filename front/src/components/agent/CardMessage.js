import React, { useState } from "react";
import { Typography, Avatar, Button } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import EventIcon from "@material-ui/icons/Event";
import { formatDate } from "../../helpers/formatDate";
import { changeColorIconStatus } from "../../helpers/changeColorIconStatus";
import MessageAPI from "../../components/services/messageAPI";

const CardMessage = ({ message }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessageClick = async () => {
    setShowMessage(!showMessage);
    message.status = "READ";
    try {
      await MessageAPI.changeMessageStatus(message.id, { status: "READ" });
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="card-agent-messages-profile">
      <div className="card-agent-messages-profile-info">
        <CheckBoxIcon style={{ fill: changeColorIconStatus(message.status) }} />
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleShowMessageClick}
        style={{ marginTop: "20px" }}
      >
        {showMessage ? "Fermer" : "Lire le message"}
      </Button>
      {showMessage && (
        <Typography component="p" style={{ marginTop: "20px" }}>
          {message.content}
        </Typography>
      )}
    </div>
  );
};

export default CardMessage;
