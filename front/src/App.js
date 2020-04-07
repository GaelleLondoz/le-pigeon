import React, { Component } from "react";
<<<<<<< HEAD
import Nav from "./components/navigation/Nav";
import Head from "./components/Head";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/navigation/Routes";

=======
import { BrowserRouter } from "react-router-dom";

// components
import Head from "./components/Head";
import Routes from "./components/navigation/Routes";
import Nav from "./components/navigation/Nav";
import Rating from "./components/rating";
import Footer from "./components/footer/Footer";

// css
>>>>>>> eb78c5d8467edf35933c12bf0698f5b398af416a
import "./assets/sass/body.scss";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-viewport">
<<<<<<< HEAD
          <div className="container">
            <Head />
            <Nav />
            <main>
              <Routes />
            </main>
=======
          <Head />
          <div className="container">
            <Nav />
            <Footer />
            <main>
              <Routes />
            </main>
            <Rating />
>>>>>>> eb78c5d8467edf35933c12bf0698f5b398af416a
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
