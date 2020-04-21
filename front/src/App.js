import React, { Component } from "react";
import Nav from "./components/navigation/Nav";
import Head from "./components/Head";
import Footer from "./components/Footer";
import RoutesNav from "./components/navigation/RoutesNav"
import { BrowserRouter as Router } from "react-router-dom";

import "./assets/sass/body.scss";


class App extends Component {
  render() {
    return (
      <div className="app-viewport">
      <Router>
        <div className="container">
          <Head />
          <Nav />
          <Footer />
        </div>
        <RoutesNav />
        </Router>
      </div>
    );
  }
}

export default App;
