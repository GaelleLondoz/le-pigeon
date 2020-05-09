import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Avatar,
  Typography,
} from "@material-ui/core";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Rating from "@material-ui/lab/Rating";
import UsersAPI from "../../components/services/userAPI";

const Account = () => {
  const url = window.location.href;
  const id = +url.substring(url.lastIndexOf("/") + 1);

  const [agent, setAgent] = useState({
    User: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      avatar: "",
    },
    language: "",
    price: "",
  });

  const fetchAgent = async (id) => {
    try {
      const data = await UsersAPI.getProfileAgent(id);
      const { User, language, price } = data;
      setAgent({ User, language, price });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setAgent({ ...agent, [name]: value });
  };
  //Fix problem => how to control handleChange when Object in state
  const handleUserChange = (e) => {
    const value = e.currentTarget.value;
    setAgent({ ...agent, User: value });
  };

  useEffect(() => {
    fetchAgent(id);
  }, [id]);

  console.log(agent);

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
                  //label="Prénom"
                  variant="outlined"
                  name="firstName"
                  value={agent.User.firstName}
                  onChange={handleUserChange}
                />
                <TextField
                  id="outlined-basic"
                  //label="Nom"
                  variant="outlined"
                  name="lastName"
                  value={agent.User.lastName}
                  onChange={handleUserChange}
                />
                <TextField
                  id="outlined-basic"
                  //label="Username"
                  variant="outlined"
                  name="userName"
                  value={agent.User.userName}
                  onChange={handleUserChange}
                />
                <TextField
                  id="outlined-basic"
                  //label="Email"
                  variant="outlined"
                  name="email"
                  value={agent.User.email}
                  onChange={handleUserChange}
                />
                <TextField
                  id="outlined-basic"
                  //label="Langue"
                  variant="outlined"
                  name="language"
                  value={agent.language}
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-basic"
                  //label="Tarif"
                  variant="outlined"
                  name="price"
                  value={agent.price}
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Préférence"
                  variant="outlined"
                  name="hobby"
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
                  alt={"Pigeon | Avatar de l'agent " + agent.User.firstName}
                  src={agent.User.avatar}
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
