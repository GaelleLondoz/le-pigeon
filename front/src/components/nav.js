import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav className="container">
          <ul>
            <li>
              <Link to="/">LE PIGEON</Link>
            </li>
            <li>
              <Link to="/connect_form">Se connecter</Link>
            </li>
            <li>
              <Link to="/help">Aide</Link>
            </li>
            <li>
              <Link to="/agent_form">Devenez agent!</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/connect_form">
            <Connect_form />
          </Route>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/agent_form">
            <Agent_form />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Le Pigeon</h2>;
}

function Connect_form() {
  return <h2>Se connexion</h2>;
}

function Help() {
  return <h2>How can we help you?</h2>;
}

function Agent_form() {
  return <h2>Devenez Agent</h2>;
}