import React, { Component } from "react";
import Nav from './components/navigation/Nav';


class App extends Component {

  render() {
    return (
      <div className="app-viewport">
        <div className="container">
          <Nav />
        </div>
      </div>
    );
  }
}


export default App;