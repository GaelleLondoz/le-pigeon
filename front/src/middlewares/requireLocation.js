import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

/* If redirect to Login page but already Connected then 
Stay on the current page
*/

const requireLocation = (Component) => {
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: this.checkIfConnected(),
      };
    }
    componentDidMount() {
      this.checkAuth();
    }

    checkIfConnected(token) {
      return this.props.auth !== null;
    }

    // const { value: label } = this

    checkAuth() {
      if (this.state.isAuthenticated) {
        this.props.history.push(`/`);
      }
    }
    render() {
      return !this.state.isAuthenticated ? <Component {...this.props} /> : null;
    }
  }
  AuthenticatedComponent = connect(
    mapStateToAuth,
    mapDispatchToAuth
  )(AuthenticatedComponent);
  return withRouter(AuthenticatedComponent);
};

const mapStateToAuth = (state) => {
  return {
    token: state.token,
    auth: state.auth,
  };
};

const mapDispatchToAuth = (dispatch) => {
  return {
    setAuth: (data) => {
      const action = { type: "SET_AUTH", payload: data };
      dispatch(action);
    },
  };
};

export default requireLocation;
