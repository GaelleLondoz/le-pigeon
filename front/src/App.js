import React, { Component } from "react";
import Places from './components/Places';
import Nav from './components/Nav';


class App extends Component {

  render() {
    return (
      <div className="app-viewport">
        <div className="container">
          <Nav />
          <Places/>
        </div>
      </div>
    );
  }
}


export default App;