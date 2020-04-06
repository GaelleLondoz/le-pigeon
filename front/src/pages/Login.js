import React, { Component } from "react";
import axios from "axios";
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
    const { data } = await axios.post("/login", payload);

    /*axios.post(apiBaseUrl + "login", payload).then(function(response) {
      console.log(response);
    });*/
  }
  async componentDidMount() {
    // Load async data.
    const { data } = await axios.get("/users");
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

export default Login;
