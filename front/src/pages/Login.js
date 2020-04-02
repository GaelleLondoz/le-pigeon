import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
//import { Divider, Input } from "@material-ui/core";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: "",
    password: ""
  };
  async handleLogin(event) {
    event.preventDefault();
    var payload = {
      login: {
        email: this.state.email,
        password: this.state.password
      }
    };
    const { data, status } = await axios.post("/login", payload);
    if (status === 200) {
      console.log({ props: this.props });
      this.props.login(data);
    }
    /*axios.post(apiBaseUrl + "login", payload).then(function(response) {
      console.log(response);
    });*/
  }
  async componentDidMount() {
    // Load async data.
    //const { data } = await axios.get("/users");
  }
  render() {
    return (
      <div className="container">
        <div>
          <form>
            <label htmlFor="email">Enter e-mail:</label>
            <input
              type="text"
              placeholder="Enter email"
              id="email"
              name="email"
              onChange={event => this.setState({ email: event.target.value })}
            />
            <label htmlFor="password">Enter Password:</label>
            <input
              type="text"
              placeholder="Enter password"
              id="password"
              name="password"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
            <button onClick={event => this.handleLogin(event)}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToAuth = dispatch => {
  return {
    login: data => {
      //Dispatch => role: call a action of type ...(SET_AUTH)
      const action = { type: "SET_AUTH", payload: data };
      dispatch(action);
    }
  };
};
Login = connect(null, mapDispatchToAuth)(Login);
export default Login;
