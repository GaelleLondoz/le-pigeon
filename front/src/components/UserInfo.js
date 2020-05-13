import React, { Component } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom"

// vers page 'Profile.js' !!!!!
// test

// function UserInfo() {
//   return (
//   <>
//   <p>Prénom: monPrénom</p>
//   <p>Nom: monNom</p>
//   <p>Email: MonEmail@MonEmail.com</p>
//   </>
//   );
// }
// ///////////


// const { id } = useParams()
// console.log(`id= ${id}`)


class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: ''
      }
    };
  }

  componentDidMount() {
    // const { id } = useParams()
    // console.log({id})
    const userId = this.props.match.params.id;
    console.log(`userId= ${userId}`)
    this.loadUserInfo(userId);
  }

  

  loadUserInfo(id) {
    const url = `${process.env.REACT_APP_API_URL}/user/${id}` 
    axios.get(url)
      .then(res => {
        const user = res.data;
        this.setState({ user });
      })
  }

  render() {
    const user = this.state.user;
    return (
        <div className="UserInfo">
          <ul>
            <li>
              Prénom: {user.firstName}
            </li>
            <li>
              Nom: {user.lastName}
            </li>
            <li>
              Email: {user.email}
            </li>
          </ul>
      </div>
    );
  }
}

export default UserInfo;