import React, { useState, useEffect } from "react";
import { Container, Typography, Avatar, Grid } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import UsersAPI from "../../components/services/userAPI";
import ReviewsAPI from "../../components/services/reviewAPI";
import CardComment from "../../components/agent/CardComment";
import Paginator from "../../components/Pagination";

const Evaluation = () => {
  const url = window.location.href;
  const id = +url.substring(url.lastIndexOf("/") + 1);

  const [agent, setAgent] = useState({
    User: {
      firstName: "",
      lastName: "",
      avatar: "",
    },
  });
  const [avgRatings, setAvgRatings] = useState({
    avgRatings: "",
    countComments: "",
  });
  const [comments, setComments] = useState([]);
  const [noComments, setNoComments] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const fetchAvgRatings = async (id) => {
    try {
      const data = await ReviewsAPI.getAvgRatings(id);
      const { avgRatings, countComments } = data[0];
      setAvgRatings({ avgRatings, countComments });
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchComments = async (id) => {
    try {
      const data = await ReviewsAPI.getCommentsByAgent(id);
      setComments(data);
    } catch (error) {
      if (error.response.status === 404) {
        setNoComments("Vous n'avez aucun commentaires...");
      }
      console.log(error.response);
    }
  };

  const fetchAgent = async (id) => {
    try {
      const data = await UsersAPI.getProfileAgent(id);
      const { User } = data;
      setAgent({ User });
    } catch (error) {
      console.log(error.response);
    }
  };

  //gestion du changement de page
  const handlePaginationChange = (e, page) => {
    setCurrentPage(page);
    //window.scrollTo(0, 0);
  };

  const paginatedComments = Paginator.getData(
    comments,
    currentPage,
    ITEMS_PER_PAGE
  );

  useEffect(() => {
    fetchAgent(id);
  }, [id]);

  useEffect(() => {
    fetchAvgRatings(id);
  }, [id]);

  useEffect(() => {
    fetchComments(id);
  }, [id]);

  //console.log(avgRatings);
  //console.log(comments);

  return (
    <section className="profile-agent-evaluation">
      <Container>
        <div className="profile-agent-evaluation-content">
          <Grid container direction="column" justify="center">
            <Grid item xs={12}>
              <Typography variant="h4">
                Evaluation de {agent.User.lastName}
              </Typography>
              <Typography component="p">
                Actuellement, votre évaluation est calculée sur{" "}
                {avgRatings.countComments} commentaire(s).
              </Typography>
              <div className="profile-agent-evaluation-info">
                <Avatar alt="Remy Sharp" src={agent.User.avatar} />
                <Rating
                  name="read-only"
                  value={+avgRatings.avgRatings}
                  readOnly
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <Typography variant="h5">Liste de vos messages</Typography>

        {noComments ? (
          <Typography component="p">{noComments}</Typography>
        ) : (
          paginatedComments.map((comment) => (
            <CardComment key={comment.id} comment={comment} />
          ))
        )}
        {comments.length > 5 && (
          <Paginator
            length={comments.length}
            page={currentPage}
            onPageChanged={handlePaginationChange}
            itemsByPage={ITEMS_PER_PAGE}
          />
        )}
      </Container>
    </section>
  );
};

export default Evaluation;
