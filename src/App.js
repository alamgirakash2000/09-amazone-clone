import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <h2>Wait for the Checkout Page</h2>
          </Route>
          <Route path="/login">
            <h2>Wait for the Login Page</h2>
          </Route>
          <Route exact path="/">
            <Header />
            <h2>HOME Page!!!</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
