import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Room from "./components/Room";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:roomNum/room" component={Room} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
