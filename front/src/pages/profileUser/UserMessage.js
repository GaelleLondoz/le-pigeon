import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import MessageAPI from "../../components/services/messageAPI";
import CardMessage from "../../components/agent/CardMessage";
import Paginator from "../../components/Pagination";

const UserMessage = ({ match }) => {
  const { id } = match.params;

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
  return (
    <section id="profile-user-messages">
      <Container>
        <Typography variant="h5">Liste de vos messages</Typography>
        <Typography component="p" style={{ marginBottom: "30px" }}>
          John Doe, vous avez actuellement <strong>{messages.length}</strong>{" "}
          messages.
        </Typography>
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

export default UserMessage;
