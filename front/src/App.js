import React from 'react';
import Nav from './components/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Connect from './pages/Connect';
import Help from './pages/Help';
import BecomeAgent from './pages/BecomeAgent';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Router>
      <Nav />
        <Switch>
          <Route path="/connect" component={Connect} />         
          <Route path="/help" component={Help} />
          <Route path="/become-agent" component={BecomeAgent} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
