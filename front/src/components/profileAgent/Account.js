import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
} from "@material-ui/core";
//import Ratings from "./Ratings";

const Account = () => {
  const [valueRating, setValueRating] = useState(3);
  return (
    <section className="account-profile-agent">
      <Container>
        <Grid container>
          <Grid item xs={12} md={3}>
            <div className="form-account-profile-agent">
              <form>
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
              </form>
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h5">Mes destination</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Avatar
              style={{ width: "150px", height: "150px" }}
              alt="Remy Sharp"
              src="https://randomuser.me/api/portraits/men/22.jpg"
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default Account;
