import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import MessageAPI from "../../components/services/messageAPI";
import CardMessage from "../../components/agent/CardMessage";

const Message = () => {
  const url = window.location.href;
  const id = +url.substring(url.lastIndexOf("/") + 1);

  const [messages, setMessages] = useState([]);
  const [notMessages, setNotMessages] = useState("");

  const fetchMessages = async (id) => {
    try {
      const data = await MessageAPI.getAllMessageByUser(id);
      setMessages(data);
    } catch (error) {
      if (error.response.status === 404) {
        setNotMessages("Vous n'avez aucun message...");
      }
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchMessages(id);
  }, [id]);

  //console.log(messages);
  return (
    <section className="profile-agent-messages">
      <Container>
        <Typography variant="h5">Liste de vos messages</Typography>
        <p>Vous avez actuellement {messages.length} message(s)</p>
        {notMessages ? (
          <p>{notMessages}</p>
        ) : (
          messages.map((message) => (
            <CardMessage key={message.id} message={message} />
          ))
        )}
      </Container>
    </section>
  );
};

export default Message;
