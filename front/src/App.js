import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

// components
import Head from "./components/Head";
import Routes from "./components/navigation/Routes";
import Nav from "./components/navigation/Nav";
import Rating from "./components/rating";
import Footer from "./components/footer/Footer";

// css
import "./assets/sass/body.scss";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-viewport">
          <Head />
          <div className="container">
            <Nav />
            <Footer />
            <main>
              <Routes />
            </main>
            <Rating />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
