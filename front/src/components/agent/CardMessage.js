import React from "react";
import { formatDate } from "../../helpers/formatDate";

const CardMessage = ({ message }) => {
  return (
    <div className="list-agent-messages-profile">
      <p>{message.content}</p>
      <p>Status : {message.status}</p>
      <small>Envoyé le {formatDate(message.createdAt)}</small>
    </div>
  );
};

export default CardMessage;
