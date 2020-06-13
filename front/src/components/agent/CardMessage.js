import React, { useState } from "react";
import { Typography, Avatar, Button, TextField } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import EventIcon from "@material-ui/icons/Event";
import { formatDate } from "../../helpers/formatDate";
import { changeColorIconStatus } from "../../helpers/changeColorIconStatus";
import MessageAPI from "../../components/services/messageAPI";
import { changeStatusMessageToFrench } from "../../helpers/changeStatusToFrench";
import LoaderButton from "../../components/loaders/LoaderButton";

const CardMessage = ({ message }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newMessage, setNewMessage] = useState({
    content: "",
  });
  const [status, setStatus] = useState(message.status);
  const [newMessageLoading, setNewMessageLoading] = useState(false);

  const handleShowMessageClick = async () => {
    setShowMessage(!showMessage);
    status === "ANSWERED" ? setStatus("ANSWERED") : setStatus("READ");
    try {
      if (status === "ANSWERED") return;
      await MessageAPI.changeMessageStatus(message.id, "read");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleShowNewMessageClick = () => {
    setShowNewMessage(!showNewMessage);
  };

  const handleMessageChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setNewMessage({ ...newMessage, [name]: value });
  };

  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();
    setNewMessageLoading(true);
    try {
      await MessageAPI.create(message.senderID, newMessage);
      await MessageAPI.changeMessageStatus(message.id, "answered");
      setNewMessageLoading(false);
      setStatus("ANSWERED");
      setNewMessage({ content: "" });
      setShowNewMessage(false);
      setShowMessage(false);
    } catch (error) {
      setNewMessageLoading(false);
      console.log(error.response);
    }
  };
  return (
    <>
      <div className="card-agent-messages-profile">
        <div className="card-agent-messages-profile-info">
          <CheckBoxIcon style={{ fill: changeColorIconStatus(status) }} />
          <Typography component="p">
            Status : {changeStatusMessageToFrench(status)}
          </Typography>
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowMessageClick}
            style={{ marginTop: "20px", marginRight: "10px" }}
          >
            {showMessage ? "Fermer" : "Lire le message"}
          </Button>
          {showMessage && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleShowNewMessageClick}
              style={{ marginTop: "20px" }}
            >
              {showNewMessage ? "Ne plus répondre" : "Répondre"}
            </Button>
          )}
        </div>

        {showMessage && (
          <Typography component="p" style={{ marginTop: "20px" }}>
            {message.content}
          </Typography>
        )}
        {showNewMessage && (
          <div className="form-send-message" style={{ marginTop: "20px" }}>
            <form onSubmit={handleNewMessageSubmit}>
              <TextField
                placeholder={
                  "Envoyer votre message à " + message.sender.firstName
                }
                onChange={handleMessageChange}
                value={newMessage.content}
                name="content"
                multiline
                variant="outlined"
                fullWidth
                rows="4"
              />
              <div
                className="form-send-message-buttons"
                style={{ marginTop: "20px" }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleShowNewMessageClick}
                  style={{ marginRight: "10px" }}
                >
                  Fermer
                </Button>
                {/* <Button type="submit" variant="contained" color="primary">
                  Envoyer
                </Button> */}
                <LoaderButton
                  loadingButton={newMessageLoading}
                  text="Envoyer"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default CardMessage;
