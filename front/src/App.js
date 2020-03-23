import React, { Component } from "react";
import Nav from './components/navigation/Nav';
import Head from './components/Head';


class App extends Component {

  render() {
    return (
      <div className="app-viewport">
        <div className="container">
        <Head />
        
          <Nav />
        </div>
      </div>
    );
  }
}


export default App;