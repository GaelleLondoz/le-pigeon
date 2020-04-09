import React, { Component } from "react";
import Nav from "./components/navigation/Nav";
import Head from "./components/Head";
import "./assets/sass/body.scss";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="app-viewport">
        <div className="container">
          <Head />
          <Nav />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
