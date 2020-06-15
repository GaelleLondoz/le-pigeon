import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Avatar,
  Typography,
  Slide,
} from "@material-ui/core";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Rating from "@material-ui/lab/Rating";
import Alert from "@material-ui/lab/Alert";
import UsersAPI from "../../components/services/userAPI";
import ReviewsAPI from "../../components/services/reviewAPI";
import EditAgentModal from "../../components/modals/EditAgentModal";
import userDestinationsAPI from "../../components/services/userDestinationsAPI";
import { getBase64 } from "../../helpers/getBase64";

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

  const [avgRatings, setAvgRatings] = useState({
    avgRatings: "",
    countComments: "",
  });

  const [destinations, setDestinations] = useState([]);

  const [sendEditAgentLoading, setSendEditAgentLoading] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const fetchAvgRatings = async (id) => {
    try {
      const data = await ReviewsAPI.getAvgRatings(id);
      const { avgRatings, countComments } = data[0];
      setAvgRatings({ avgRatings, countComments });
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchAgent = async (id) => {
    try {
      const data = await UsersAPI.getProfileAgent(id);
      const { User, language, price } = data;
      setAgent({ User, language, price });
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchDestinationsByAgent = async (id) => {
    try {
      const data = await userDestinationsAPI.getAllDestinationsByUser(id);
      setDestinations(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEditAgentSubmit = async (e) => {
    e.preventDefault();
    setSendEditAgentLoading(true);
    try {
      await UsersAPI.editProfileAgent(id, agent);
      setSendEditAgentLoading(false);
      setShowFlash(true);
      fetchAgent(id);
    } catch (error) {
      setSendEditAgentLoading(false);
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setAgent({ ...agent, [name]: value });
  };
  const handleUserChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setAgent({
      ...agent,
      User: {
        ...agent.User,
        [name]: value,
      },
    });
  };

  const handleFileChange = async (event) => {
    const files = event.target.files || event.dataTransfer.files;
    await getBase64(files[0]).then((result) => {
      setAgent({
        ...agent,
        User: {
          ...agent.User,
          avatar: result,
        },
      });
    });
  };

  useEffect(() => {
    fetchAgent(id);
  }, [id]);

  useEffect(() => {
    fetchAvgRatings(id);
  }, [id]);

  useEffect(() => {
    fetchDestinationsByAgent(id);
  }, [id]);

  const initialPosition = [];

  if (destinations.length > 0) {
    destinations.map(
      (destination, index) =>
        destination &&
        index === 0 &&
        initialPosition.push([
          destination.Destination.lat,
          destination.Destination.lng,
        ])
    );
  } else {
    initialPosition.push([50.503887, 4.469936]);
  }

  // destinations.map((destination, index) =>
  //   destination && index === 0
  //     ? initialPosition.push([
  //         destination.Destination.lat,
  //         destination.Destination.lng,
  //       ])
  //     : initialPosition.push([50.503887, 4.469936])
  // );

  console.log(initialPosition[0]);
  return (
    <section className="profile-agent-account">
      <Container>
        {showFlash ? (
          <Slide direction="down" in={showFlash} mountOnEnter unmountOnExit>
            <Alert variant="filled" severity="success">
              Votre compte a bien été modifié
            </Alert>
          </Slide>
        ) : null}
        <Typography variant="h5" style={{ marginBottom: "30px" }}>
          Bonjour {agent.User.lastName}, comment allez-vous aujourd'hui ?
        </Typography>
        <EditAgentModal
          agent={agent}
          onChange={handleChange}
          onChangeUser={handleUserChange}
          onSubmit={handleEditAgentSubmit}
          sendEditAgentLoading={sendEditAgentLoading}
          onHandleFileChange={handleFileChange}
        />
        <div className="profile-agent-account-content">
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <div className="profile-agent-account-form">
                <TextField
                  //label="Prénom"
                  variant="outlined"
                  name="firstName"
                  value={agent.User.firstName}
                  onChange={handleUserChange}
                />
                <TextField
                  //label="Nom"
                  variant="outlined"
                  name="lastName"
                  value={agent.User.lastName}
                  onChange={handleUserChange}
                />
                <TextField
                  //label="Username"
                  variant="outlined"
                  name="userName"
                  value={agent.User.userName}
                  onChange={handleUserChange}
                />
                <TextField
                  //label="Email"
                  variant="outlined"
                  name="email"
                  value={agent.User.email}
                  onChange={handleUserChange}
                />
                <TextField
                  //label="Langue"
                  variant="outlined"
                  name="language"
                  value={agent.language}
                  onChange={handleChange}
                />
                <TextField
                  //label="Tarif"
                  variant="outlined"
                  name="price"
                  value={agent.price}
                  onChange={handleChange}
                />
                <TextField label="Préférence" variant="outlined" name="hobby" />
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="profile-agent-account-destinations">
                <Typography variant="h5" style={{ marginBottom: "15px" }}>
                  Mes destinations
                </Typography>
                <Map center={initialPosition[0]} zoom={1}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {destinations.map((destination) => (
                    <Marker
                      key={destination.id}
                      position={[
                        destination.Destination.lat,
                        destination.Destination.lng,
                      ]}
                    >
                      <Popup>{destination.Destination.name}</Popup>
                    </Marker>
                  ))}
                </Map>
              </div>
            </Grid>
            <Grid item md={3}>
              <div className="profile-agent-account-avatar">
                <Avatar
                  alt={"Pigeon | Avatar de l'agent " + agent.User.firstName}
                  src={"http://localhost:5000/avatar/" + agent.User.avatar}
                />
                <Rating
                  name="read-only"
                  value={+avgRatings.avgRatings}
                  readOnly
                  precision={0.5}
                />
                <Typography component="p">
                  {avgRatings.countComments} commentaire(s)
                </Typography>
                <Typography
                  component="p"
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    marginTop: "20px",
                    fontSize: "20px",
                  }}
                >
                  {agent.price} € / heure
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
};

export default Account;
