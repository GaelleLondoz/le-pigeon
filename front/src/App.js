import React, { Component } from "react";
import Places from './components/Places';
import Avatars from './components/avatars';
 
class App extends Component {

  render() {
    return (
      <div className="app-viewport">
        <div className="container">

          <Avatars />
          
          <Places/>
        </div>
      </div>
    );
  }
}


export default App;