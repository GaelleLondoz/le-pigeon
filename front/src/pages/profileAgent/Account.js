import React from "react";
import {
  Container,
  Grid,
  TextField,
  Avatar,
  Typography,
} from "@material-ui/core";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Rating from "@material-ui/lab/Rating";

const Account = () => {
  {
    /* Make a state with all destinations position */
  }
  const position = [51.505, -0.09];
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
                <Map center={position} zoom={12}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>
                      A pretty CSS3 popup.
                      <br />
                      Easily customizable.
                    </Popup>
                  </Marker>
                </Map>
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
