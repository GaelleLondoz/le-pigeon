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

const ShowAgent = ({ match }) => {
  const id = match.params.id;
  const ITEMS_PER_PAGE = 6;

  const [agent, setAgent] = useState({
    User: {
      firstName: "",
      lastName: "",
      avatar: "",
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

  // config dialog from create state open / close
  const [open, setOpen] = useState(false);

  const handleOpenFormCreate = (status) => {
    setOpen(status);
  };

  const handleOpen = () => {
    // open Dialog
    handleOpenFormCreate(true);
  };

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

  //   console.log(agent);
  //   console.log(avgRatings);
  //   console.log(destinations);
  console.log(reviews);
  return (
    <section id="public-agent-profile">
      <Container>
        <Box className="agent-information" component="div">
          <Grid container spacing={5} justify="center">
            <Grid item xs={12} md={4}>
              <Box component="div" className="container-avatar">
                <Avatar
                  alt="Remy Sharp"
                  src={"http://localhost:5000/avatar/" + agent.User.avatar}
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
                , Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ullam illum laboriosam numquam nesciunt error, voluptas cum
                atque provident veritatis vitae.
              </Typography>
              <Box component="div" className="price">
                <Typography component="p">{agent.price} € / heure</Typography>
                <Button size="medium" variant="contained" color="secondary">
                  Réserver un rendez-vous
                </Button>
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

          <Typography component="a" onClick={handleOpen}>
            Donner votre avis
          </Typography>

          {paginatedReviews.map((review) => {
            if (review.status !== "PUBLISHED") return;
            return (
              <div key={review.id} className="card-comments-agent">
                <CardComment
                  comment={review}
                  comments={reviews}
                  agentId={id}
                  handleRefreshList={handleRefreshList}
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
            // handleRefreshList={handleRefreshList}
            open={open}
            onOpen={handleOpenFormCreate}
            // onCreate={handleCreateItem}
          />
        )}
      </Container>
    </section>
  );
};

export default ShowAgent;
