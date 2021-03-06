import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Avatar,
  Typography,
  Button,
  Chip,
  Paper,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import UserAPI from "../components/services/userAPI";
import ReviewsAPI from "../components/services/reviewAPI";
import UserDestinationAPI from "../components/services/userDestinationsAPI";
import CardDestination from "../components/agent/CardDestination";
import Paginator from "../components/Pagination";
import CardComment from "../components/agent/CardComment";
import Form from "../components/reviews/Form";
import Flash from "../components/alerts/Flash";
import Booking from "../components/modals/Booking";

const ShowAgent = ({ match }) => {
  const id = match.params.id;
  const ITEMS_PER_PAGE = 6;

  const [agent, setAgent] = useState({
    User: {
      firstName: "",
      lastName: "",
      avatar: "",
      description: "",
    },
    language: "",
    price: "",
  });
  const [avgRatings, setAvgRatings] = useState({
    avgRatings: "",
    countComments: "",
  });
  const [destinations, setDestinations] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [currentDestinationPage, setCurrentDestinationPage] = useState(1);
  const [currentReviewsPage, setCurrentReviewPage] = useState(1);
  const [displayFlash, setDisplayFlash] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchAgent = async (id) => {
    try {
      const data = await UserAPI.getPublicProfileAgent(id);
      setAgent(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchAvgRatings = async (id) => {
    try {
      const data = await ReviewsAPI.getAvgRatings(id);
      const { avgRatings, countComments } = data[0];
      setAvgRatings({ avgRatings, countComments });
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchDestinationsByAgent = async (id) => {
    try {
      const data = await UserDestinationAPI.getAllDestinationsByUser(id);
      setDestinations(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchReviewsByAgent = async (id) => {
    try {
      const data = await ReviewsAPI.getCommentsByAgent(id);
      setReviews(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handlePaginationDestinationChange = (e, page) => {
    setCurrentDestinationPage(page);
    //window.scrollTo(0, 0);
  };

  const handlePaginationReviewChange = (e, page) => {
    setCurrentReviewPage(page);
    //window.scrollTo(0, 0);
  };

  const handleRefreshList = (id) => {
    fetchReviewsByAgent(id);
  };

  const handleOpenFormCreate = (status) => {
    setOpen(status);
  };

  const handleCreateItem = (status) => {
    const messageAlert =
      "Votre review a bien été ajoutée, elle sera publée une fois validée par nos administrateurs";
    loadAlertInfos(status, messageAlert);
  };

  const handleDeleteItem = (status) => {
    const messageAlert = "Votre review a bien été supprimée";
    loadAlertInfos(status, messageAlert);
    handleRefreshList(id);
  };

  const handleOpen = () => {
    handleOpenFormCreate(true);
  };

  const loadAlertInfos = (status, messageAlert) => {
    setDisplayFlash({
      status: status,
      messageAlert: messageAlert,
    });

    setTimeout(function () {
      setDisplayFlash({
        status: false,
        messageAlert: "",
      });
    }, 3000);
  };

  const paginatedDestinations = Paginator.getData(
    destinations,
    currentDestinationPage,
    ITEMS_PER_PAGE
  );

  const paginatedReviews = Paginator.getData(
    reviews,
    currentReviewsPage,
    ITEMS_PER_PAGE
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAgent(id);
  }, [id]);

  useEffect(() => {
    fetchAvgRatings(id);
  }, [id]);

  useEffect(() => {
    fetchDestinationsByAgent(id);
  }, [id]);

  useEffect(() => {
    fetchReviewsByAgent(id);
  }, [id]);

  return (
    <section id="public-agent-profile">
      <div className="alert-container">
        {displayFlash.status && (
          <Flash status="success" text={displayFlash.messageAlert} />
        )}
      </div>
      <Container>
        <Box className="agent-information" component="div">
          <Grid container spacing={5} justify="center">
            <Grid item xs={12} md={4}>
              <Box component="div" className="container-avatar">
                <Avatar
                  alt="Remy Sharp"
                  src={
                    agent.User.avatar &&
                    "http://localhost:5000/avatar/" + agent.User.avatar
                  }
                />
                <Rating
                  name="read-only"
                  value={parseInt(avgRatings.avgRatings)}
                  precision={0.5}
                  readOnly
                />
                <Typography paragraph={true}>
                  {avgRatings.countComments} commentaire(s)
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8} className="container-text">
              <Typography component="p">
                Je m'appelle{" "}
                <strong>
                  {agent.User.firstName} {agent.User.lastName}
                </strong>
                , {agent.User.description ? agent.User.description : "..."}
              </Typography>
              <Box component="div" className="price">
                <Typography component="p">{agent.price} € / heure</Typography>
                {/* <Button size="medium" variant="contained" color="secondary">
                  Réserver un rendez-vous
                </Button> */}
                <Booking agentID={id} />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="destinations" component="div">
          <Typography variant="h2">Mes destinations</Typography>

          {/* <div className="destinations-label">
            <Chip label="Laos" color="secondary" />
            <Chip label="Vietnam" color="secondary" />
            <Chip label="Australie" color="secondary" />
            <Chip label="Europe" color="secondary" />
          </div> */}
          <Grid container>
            {paginatedDestinations.map((destination) => {
              return (
                <Grid key={destination.id} item xs={12} md={4}>
                  <CardDestination destination={destination} />
                </Grid>
              );
            })}
          </Grid>
          {destinations.length > 6 && (
            <Paginator
              length={destinations.length}
              page={currentDestinationPage}
              onPageChanged={handlePaginationDestinationChange}
              itemsByPage={ITEMS_PER_PAGE}
            />
          )}
        </Box>
        <Box component="div" className="container-card-comment">
          <Typography variant="h3">
            Ce que les voyageurs disent de {agent.User.firstName}
          </Typography>
          {reviews.length < 1 && (
            <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
              Soyez le premier à laisser un commentaire !
            </p>
          )}
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            onClick={handleOpen}
          >
            Donner votre avis
          </Button>

          {paginatedReviews.map((review) => {
            return (
              <div key={review.id} className="card-comments-agent">
                <CardComment
                  comment={review}
                  agentId={id}
                  onDelete={handleDeleteItem}
                />
              </div>
            );
          })}

          {reviews.length > 6 && (
            <Paginator
              length={reviews.length}
              page={currentReviewsPage}
              onPageChanged={handlePaginationReviewChange}
              itemsByPage={ITEMS_PER_PAGE}
            />
          )}
        </Box>
        {open && (
          <Form
            id={id}
            open={open}
            onOpen={handleOpenFormCreate}
            onCreate={handleCreateItem}
          />
        )}
      </Container>
    </section>
  );
};

export default ShowAgent;
