import React, { Component } from "react";
import Nav from "./components/navigation/Nav";
import Head from "./components/Head";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/navigation/Routes";

import "./assets/sass/body.scss";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-viewport">
          <div className="container">
            <Head />
            <Nav />
            <main>
              <Routes />
            </main>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
