import React, { Component } from "react";
import axios from 'axios';

// vers page 'Profile.js' !!!!!
// test

function UserInfo() {
  return (
  <>
  <p>Prénom: monPrénom</p>
  <p>Nom: monNom</p>
  <p>Email: MonEmail@MonEmail.com</p>
  </>
  );
}
///////////


// class UserInfo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: {
//         firstName: '',
//         lastName: '',
//         email: ''
//       }
//     };
//   }

//   componentDidMount() {
//     const userId = this.props.match.params.id;
//     this.loadUserInfo(userId);
//   }


//   loadUserInfo(userId) {
//     const url = process.env.REACT_APP_API_URL/{user.Id}  // `REACT_APP_API_URL/${user.Id}`
//     axios.get(url)
//       .then(res => {
//         const user = res.data;
//         this.setState({ user });
//       })
//   }

//   render() {
//     const user = this.state.user;
//     return (
//         <div className="UserInfo">
//           <ul>
//             <li>
//               Prénom: {user.firstName}
//             </li>
//             <li>
//               Nom: {user.lastName}
//             </li>
//             <li>
//               Email: {user.email}
//             </li>
//           </ul>
//       </div>
//     );
//   }
// }

export default UserInfo;