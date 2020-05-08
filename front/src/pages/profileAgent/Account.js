import React from "react";
import {
  Container,
  Grid,
  TextField,
  Avatar,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const Account = () => {
  return (
    <section className="profile-agent-account">
      <Container>
        <div className="profile-agent-account-content">
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <div className="profile-agent-account-form">
                <TextField
                  id="outlined-basic"
                  label="Prénom"
                  variant="outlined"
                />
                <TextField id="outlined-basic" label="Nom" variant="outlined" />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Adresse"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Langue"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Tarif"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Préférence"
                  variant="outlined"
                />
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="profile-agent-account-destinations">
                Carte des destinations ici
              </div>
            </Grid>
            <Grid item md={3}>
              <div className="profile-agent-account-avatar">
                <Avatar
                  alt="Remy Sharp"
                  src="https://randomuser.me/api/portraits/men/36.jpg"
                />
                <Rating name="read-only" value={4} readOnly />
                <Typography component="p">29 commentaires</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
};

export default Account;
