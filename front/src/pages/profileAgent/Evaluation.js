import React, { useState, useEffect } from "react";
import { Container, Typography, Avatar, Grid, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import UsersAPI from "../../components/services/userAPI";
import CardComment from "../../components/agent/CardComment";

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

  const fetchAvgRatings = async (id) => {
    try {
      const data = await UsersAPI.getAvgRatings(id);
      const { avgRatings, countComments } = data[0];
      setAvgRatings({ avgRatings, countComments });
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchComments = async (id) => {
    try {
      const data = await UsersAPI.getCommentsByAgent(id);
      setComments(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchAgent = async (id) => {
    try {
      const data = await UsersAPI.getProfileAgent(id);
      const { User } = data;
      setAgent({ User });
    } catch (error) {
      if (error.response.status === 404) {
        setNoComments("Vous n'avez aucun commentaires...");
      }
      console.log(error.response);
    }
  };

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
          comments.map((comment) => (
            <CardComment key={comment.id} comment={comment} />
          ))
        )}
      </Container>
    </section>
  );
};

export default Evaluation;
