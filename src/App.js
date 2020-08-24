import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";

import { useStateValue } from "./ContextApi/StateProvider";
import { auth, database } from "./Firebase/Firebase";

function App() {
  const [{ user, basket }, dispatch] = useStateValue();
  const [id, setId] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        database.collection("users").onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.data().id === authUser.uid) {
              console.log(doc.id);
              setId(doc.id);
              dispatch({
                type: "ADD_ARRAY",
                array: doc.data().basket,
              });
            }
          });
        });
        // The user is logged in
        dispatch({
          type: "SET_USER",
          user: authUser.uid,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      // Any cleanup things
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (id && user) {
      let datas = database.collection("users").doc(id).update({
        basket: basket,
      });
    }
  }, [basket]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
