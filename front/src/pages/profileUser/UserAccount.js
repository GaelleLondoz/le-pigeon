import React, { useState, useEffect } from "react";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EmailIcon from "@material-ui/icons/Email";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import UserAPI from "../../components/services/userAPI";
import { formatDate } from "../../helpers/formatDate";
import { getBase64 } from "../../helpers/getBase64";
import LoaderButton from "../../components/loaders/LoaderButton";
import Flash from "../../components/alerts/Flash";
import AvatarDefault from "../../assets/images/avatar_default.png";

const UserAccount = ({ match }) => {
  const { id } = match.params;
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    avatar: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showBecomeAgentFlash, setShowBecomeAgentFlash] = useState(false);
  const [showButtonBecomeAgent, setShowButtonBecomeAgent] = useState(true);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const fetchUser = async (id) => {
    try {
      const data = await UserAPI.getInfoUser(id);
      const { firstName, lastName, userName, email, avatar, createdAt } = data;
      setUser({ firstName, lastName, userName, email, avatar, createdAt });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await UserAPI.editProfileUser(id, user);
      setLoading(false);
      setErrors({});
      setShowFlash(true);
      fetchUser(id);
      setTimeout(() => {
        setShowFlash(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      const { errors } = error.response.data;
      if (errors) {
        const apiErrors = {};
        errors.forEach((error) => {
          apiErrors[error.target] = error.msg;
        });
        setErrors(apiErrors);
      }
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleAvatarChange = async (e) => {
    const files = e.target.files || e.dataTransfer.files;
    await getBase64(files[0]).then((result) => {
      setUser({ ...user, avatar: result });
    });
  };

  const handleBecomeAgentClick = async () => {
    try {
      await UserAPI.becomeAgent();
      setShowBecomeAgentFlash(true);
      setShowButtonBecomeAgent(false);
      setTimeout(() => {
        setShowBecomeAgentFlash(false);
      }, 5000);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  return (
    <>
      <section id="profile-user-account-header">
        <Container>
          <div className="container-header">
            <Avatar
              alt={"Le Pigeon | Avatar de " + user.firstName}
              src={
                user.avatar
                  ? process.env.REACT_APP_BASE_URL + "/avatar/" + user.avatar
                  : AvatarDefault
              }
            />
            <div className="container-info">
              <div className="profile-user-account-info">
                <AccountBoxIcon />
                <Typography component="p">
                  {user.firstName} {user.lastName}
                </Typography>
              </div>
              <div className="profile-user-account-info">
                <AssignmentIndIcon />
                <Typography component="p">{user.userName}</Typography>
              </div>
              <div className="profile-user-account-info">
                <EmailIcon />
                <Typography component="p">{user.email}</Typography>
              </div>
              <div className="profile-user-account-info">
                <CalendarTodayIcon />
                <Typography component="p">
                  Membre depuis le {formatDate(user.createdAt)}
                </Typography>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section id="profile-user-account-form">
        <Container>
          {showFlash && (
            <Flash status="success" text="Votre profil a bien été mis à jour" />
          )}
          {showBecomeAgentFlash && (
            <Flash
              status="success"
              text="Vous êtes désormais un agent. Veuillez vous reconnectez et compléter votre profil."
            />
          )}
          {window.location.search.includes("become-agent") &&
            showButtonBecomeAgent && (
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleBecomeAgentClick}
                >
                  Cliquer et devenez agent dès aujourd'hui !
                </Button>
              </div>
            )}
          <Typography variant="h5" align="center">
            Vous souhaitez modifier votre profil {user.firstName} ?
          </Typography>
          <div className="container-form">
            <form onSubmit={handleSubmit}>
              <TextField
                error={errors.firstName ? true : false}
                helperText={errors.firstName && errors.firstName}
                variant="outlined"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                error={errors.lastName ? true : false}
                helperText={errors.lastName && errors.lastName}
                variant="outlined"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                variant="outlined"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                error={errors.email ? true : false}
                helperText={errors.email && errors.email}
                variant="outlined"
                name="email"
                value={user.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                variant="outlined"
                name="avatar"
                //value={user.avatar}
                onChange={handleAvatarChange}
                type="file"
                fullWidth
              />
              <LoaderButton text="Mettre à jour" loadingButton={loading} />
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default UserAccount;
