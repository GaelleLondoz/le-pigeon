import React from "react";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import Connect from "../../pages/Connect";
import Help from "../../pages/Help";
import BecomeAgent from "../../pages/BecomeAgent";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Messages from "../../pages/Messages";
import { Component } from "react";

// 1 //after created each pages, create paths:
// export to Nav.js

// this function is called only once, before application initially starts to render react-route and any of its related DOM elements
// it can be used to add init config settings to the application

let headers = {
  "Content-Type": "application/json",
  Authorization: ""
};

const compose = (fn, ...rest) =>
  rest.length === 0 ? fn : (...args) => fn(compose(...rest)(...args));

function applyMiddleware(...middlewares) {
  // Middleware handlers are all side-effect,
  // so if we reach the last we don't need to do anything
  const finish = undefined;
  // Middlewares will be called from left to right
  // until one of them doesn't call `next(nextState, transition)`
  console.log(compose);
  const handler = compose(...middlewares);

  return function (nextState, transition) {
    return handler(nextState, transition);
  };
}

const checkAuth = {
  isAuthenticated: false,
  check(store) {
    console.log({ store });
    headers.Authorization = store.token;
    // const { data, status } = axios.get("/me", {
    //   headers
    // });
    // if (status === 200) {
    //   store.setAuth({
    //     payload: data.user,
    //     token: store.token
    //   });
    //   this.isAuthenticated = true;
    // }
    axios
      .get("/me", {
        headers
      })
      .then(res => {
        console.log({ res })
        if (res.status === 200) {
          console.log({ 'res.status': res.status })
          this.isAuthenticated = true;
        }
      }).catch(e => console.log(e));
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const { value: label } = this
  checkAuth.check(rest.store);
  console.log({ "rest.store": rest.store.token });
  if (checkAuth.isAuthenticated === false) {
    console.log({ 'quandcetfauxcheckAuth.isAuthenticated': checkAuth.isAuthenticated })
    return <Redirect to="/login" />;
  } else {
    console.log({ 'checkAuth.isAuthenticated': checkAuth.isAuthenticated })
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
};

// const supertest = async function (props) {
//   headers.Authorization = props.token;
//   const { data, status } = await axios.get("/me", { headers });
//   console.log({ data, status })
//   if (status === 200) {
//     console.log({ data });
//     props.setAuth({
//       payload: data.user,
//       token: props.token
//     });
//   }

//   // return next()
// };

// Auth middleware
// async function requireAuth(props, next) {
//   console.log("ma fonction à moi");
//   if (props.token === null) return;
//   await function(finish) {
//     console.log("await fonction")
//     headers.Authorization = props.token;
//     axios
//       .get("/me", {
//         headers: headers
//       })
//       .then(checkAuth => {
//         console.log({ checkAuth: checkAuth });
//         if (checkAuth.status == "200") {
//           console.log("REDIRECT ON GOING");
//           let data = {
//             payload: checkAuth.data.user,
//             token: props.token
//           };
//           props.setAuth(data);
//           // transition.to('/', null, { redirect: nextState.location });
//           // window.location = "/";
//           console.log("window location");
//           return next();
//         }
//       })
//       .catch(error => console.log(error.response));
//     return finish();
//   };
//   //return next();

//   // async function (nextState, transition) {
//   // if (!auth.isLoggedIn()) {
//   //   transition.to('/login', null, { redirect: nextState.location });
//   //   return;
//   // }
//   // console.log("ma fonction à moi")
//   // if (props.token === null) return
//   // try {
//   //   headers.Authorization = props.token;
//   //   const checkAuth = await axios.get("/me", {
//   //     headers: headers,
//   //   });
//   //   console.log({ checkAuth: checkAuth });
//   //   if (checkAuth.status == "200") {
//   //     console.log("REDIRECT ON GOING");
//   //     let data = {
//   //       payload: checkAuth.data.user,
//   //       token: props.token
//   //     }
//   //     props.setAuth(data)
//   //     // transition.to('/', null, { redirect: nextState.location });
//   //     window.location = "/"
//   //   }
//   // } catch (error) {
//   //   console.log(error.response);
//   // }

//   // next(nextState, transition);
//   //};
// }

// async function onAppInit(props) {
//   if (props.token === null) return
//   try {
//     headers.Authorization = props.token;
//     const checkAuth = await axios.get("/me", {
//       headers: headers,
//     });
//     console.log({ checkAuth: checkAuth });
//     if (checkAuth.status == "200") {
//       console.log("REDIRECT ON GOING");
//       let data = {
//         payload: checkAuth.data.user,
//         token: props.token
//       }
//       props.setAuth(data)
//       return <Redirect to="/" />;
//     }
//   } catch (error) {
//     console.log(error.response);
//   }
// }

let RoutesNav = props => {
  return (
    <>
      <Route exact path="/connect" component={Connect} />
      <Route exact path="/help">
        <Help />
      </Route>
      <Route exact path="/message">
        <Messages />
      </Route>
      <Route exact path="/become-agent" component={BecomeAgent} />
      <Route exact path="/login" component={Login} />

      <PrivateRoute exact path="/" store={props} component={Home} />
      {/* <Route exact path="/" component={Home} /> */}
    </>
  );
};

const mapStateToAuth = state => {
  return {
    token: state.token,
    auth: state.auth
  };
};

const mapDispatchToAuth = dispatch => {
  return {
    setAuth: data => {
      //Dispatch => role: call a action of type ...(SET_AUTH)
      const action = { type: "SET_AUTH", payload: data };
      dispatch(action);
    }
  };
};

RoutesNav = connect(mapStateToAuth, mapDispatchToAuth)(RoutesNav);

export default RoutesNav;
