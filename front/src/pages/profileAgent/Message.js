import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import MessageAPI from "../../components/services/messageAPI";
import CardMessage from "../../components/agent/CardMessage";
import Paginator from "../../components/Pagination";

const Message = () => {
  const url = window.location.href;
  const id = +url.substring(url.lastIndexOf("/") + 1);

  const [messages, setMessages] = useState([]);
  const [notMessages, setNotMessages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

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

  //gestion du changement de page
  const handlePaginationChange = (e, page) => {
    setCurrentPage(page);
    //window.scrollTo(0, 0);
  };

  const paginatedMessages = Paginator.getData(
    messages,
    currentPage,
    ITEMS_PER_PAGE
  );

  useEffect(() => {
    fetchMessages(id);
  }, [id]);

  //console.log(messages);
  return (
    <section className="profile-agent-messages">
      <Container>
        <Typography variant="h5">Liste de vos messages</Typography>
        <p>Vous avez actuellement {messages.length} message(s)</p>
        {messages.length > 5 && (
          <p style={{ fontWeight: "bold" }}>Page {currentPage}</p>
        )}
        {notMessages ? (
          <p>{notMessages}</p>
        ) : (
          paginatedMessages.map((message) => (
            <CardMessage key={message.id} message={message} />
          ))
        )}
        {messages.length > 5 && (
          <Paginator
            length={messages.length}
            page={currentPage}
            onPageChanged={handlePaginationChange}
            itemsByPage={ITEMS_PER_PAGE}
          />
        )}
      </Container>
    </section>
  );
};

export default Message;
