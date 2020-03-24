import React, { Component } from "react";
import Places from './components/Places';
import Signin from './components/signin'
 
class App extends Component {

  render() {
    return (
      <div className="app-viewport">
        <div className="container">
          <Signin />
          <Places/>
        </div>
      </div>
    );
  }
}


export default App;