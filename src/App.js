import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/09-amazone-clone/checkout">
            <h2>Wait for the Checkout Page</h2>
          </Route>
          <Route path="/09-amazone-clone/login">
            <h2>Wait for the Login Page</h2>
          </Route>
          <Route path="/09-amazone-clone/">
            <h2>HOME Page!!!</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
