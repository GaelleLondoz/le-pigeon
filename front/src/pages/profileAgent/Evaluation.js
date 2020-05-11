import React, { useState, useEffect } from "react";
import { Container, Typography, Avatar, Grid, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import UsersAPI from "../../components/services/userAPI";

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

  const fetchAvgRatings = async (id) => {
    try {
      const data = await UsersAPI.getAvgRatings(id);
      const { avgRatings, countComments } = data[0];
      setAvgRatings({ avgRatings, countComments });
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
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchAgent(id);
  }, [id]);

  useEffect(() => {
    fetchAvgRatings(id);
  }, [id]);

  //console.log(avgRatings);

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
      </Container>
    </section>
  );
};

export default Evaluation;
