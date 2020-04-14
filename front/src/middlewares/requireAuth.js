import React from "react";
import { withRouter } from "react-router";
import { Cookies } from "react-cookie";
import { connect } from "react-redux";
import axios from "axios";

const cookies = new Cookies();

let headers = {
    "Content-Type": "application/json",
    Authorization: "",
};

const token = cookies.get("auth_token");

const requireAuth = (Component) => {
    class AuthenticatedComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                token,
                isAuthenticated: this.checkValidity(token),
            };
        }
        componentDidMount() {
            this.checkAuth();
        }

        async checkValidity(token) {
            headers.Authorization = token;
            const { data, status } = await axios.get("/me", {
                headers
            });
            return (status === 200);
            //{
            //   store.setAuth({
            //     payload: data.user,
            //     token: store.token
            //   });
            //   this.isAuthenticated = true;
            // }
            /* let isAuthenticated = false;
            axios
                .get("/me", {
                    headers,
                })
                .then((res) => {
                    console.log({ res });
                    if (res.status === 200) {
                        console.log({ "res.status": res.status });
                        isAuthenticated = true;

                    }
                })
                .catch((e) => console.log(e));
            return isAuthenticated; */
        };

        // const { value: label } = this

        async checkAuth() {
            /* checkAuth.check(rest.store);
  console.log({ "rest.store": rest.store.token });
  if (checkAuth.isAuthenticated === false) {
    console.log({
      "quandcetfauxcheckAuth.isAuthenticated": checkAuth.isAuthenticated,
    });
    return <Redirect to="/login" />;
  } else {
    console.log({ "checkAuth.isAuthenticated": checkAuth.isAuthenticated });
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } */
            //await this.checkValidity();
            console.log({ props: this.props });
            //const location = this.props.location;
            //const redirect = location.pathname + location.search;
            if (!this.state.isAuthenticated) {
                this.props.history.push(`/login`);
            }
        }
        render() {
            //console.log({ isAuthenticated: this.checkValidity() })
            return this.state.isAuthenticated ? < Component {...this.props }
            /> : null;
        }
    }
    AuthenticatedComponent = connect(mapStateToAuth, mapDispatchToAuth)(AuthenticatedComponent);
    return withRouter(AuthenticatedComponent);
}

const mapStateToAuth = (state) => {
    return {
        token: state.token,
        auth: state.auth,
    };
};

const mapDispatchToAuth = (dispatch) => {
    return {
        setAuth: (data) => {
            //Dispatch => role: call a action of type ...(SET_AUTH)
            const action = { type: "SET_AUTH", payload: data };
            dispatch(action);
        },
    };
};

export default requireAuth;