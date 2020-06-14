import React, { useState, useEffect } from "react";
import { Container, Avatar, Typography } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EmailIcon from "@material-ui/icons/Email";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import UserAPI from "../../components/services/userAPI";

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

  const fetchUser = async (id) => {
    try {
      const data = await UserAPI.getInfoUser(id);
      const { firstName, lastName, userName, email, avatar, createdAt } = data;
      setUser({ firstName, lastName, userName, email, avatar, createdAt });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  console.log(user);

  return (
    <>
      <section id="profile-user-account-header">
        <Container>
          <div className="container-header">
            <Avatar
              alt="Remy Sharp"
              src="https://randomuser.me/api/portraits/men/35.jpg"
            />
            <div className="container-info">
              <div className="profile-user-account-info">
                <AccountBoxIcon />
                <Typography component="p">Jean Dubosq</Typography>
              </div>
              <div className="profile-user-account-info">
                <EmailIcon />
                <Typography component="p">Email</Typography>
              </div>
              <div className="profile-user-account-info">
                <AssignmentIndIcon />
                <Typography component="p">Username</Typography>
              </div>
              <div className="profile-user-account-info">
                <CalendarTodayIcon />
                <Typography component="p">Membre depuis le </Typography>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default UserAccount;
