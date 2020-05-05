import React, { useState, useEffect } from "react";
import MessageAPI from "../../../components/services/messageAPI";
import { formatDate } from "../../../helpers/formatDate";

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

  console.log(messages);

  return (
    <>
      <h2>Liste de vos messages</h2>
      <p>Retrouvez ci dessous la liste de vos messages</p>
      {notMessages ? (
        <p>{notMessages}</p>
      ) : (
        messages.map((message) => (
          <div key={message.id} className="list-messages-agent-profile">
            <p>{message.content}</p>
            <p>Status : {message.status}</p>
            <p>Envoyé le {formatDate(message.createdAt)}</p>
          </div>
        ))
      )}
    </>
  );
};

export default Message;
