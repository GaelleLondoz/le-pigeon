import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import MessageAPI from "../../components/services/messageAPI";
import CardMessage from "../../components/agent/CardMessage";

const UserMessage = ({ match }) => {
  const { id } = match.params;

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

  console.log(messages);
  return (
    <section id="profile-user-messages">
      <Container>
        <Typography variant="h5">Liste de vos messages</Typography>
        <Typography component="p" style={{ marginBottom: "30px" }}>
          John Doe, vous avez actuellement <strong>{messages.length}</strong>{" "}
          messages
        </Typography>
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

export default UserMessage;
