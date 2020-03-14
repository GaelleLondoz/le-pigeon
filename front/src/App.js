import React, { Component } from "react";
import Places from './components/Places';
 
class App extends Component {

  render() {
    return (
      <div className="app-viewport">
        <div className="container">
          
          <Places/>
        </div>
      </div>
    );
  }
}


export default App;