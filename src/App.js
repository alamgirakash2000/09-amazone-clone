import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";
import MyOrders from "./pages/MyOrders/MyOrders";
import { useStateValue } from "./ContextApi/StateProvider";
import Shipment from "./components/Shipment/Shipment";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import axios from "./axios";

function App() {
  const [{ basket }, dispatch] = useStateValue();
  const [products, setProducts] = useState([]);
  const [searchedText, setSearchedText] = useState("");

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err.msg));

    dispatch({
      type: "SET_USER",
      user: JSON.parse(localStorage.getItem("amazon_user")) || null,
    });

    dispatch({
      type: "SET_BASKET",
      basket: JSON.parse(localStorage.getItem("amazon_basket")) || [],
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("amazon_basket", JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    const setFilteredProducts = async () => {
      let filteredProducts = await products.filter((data) =>
        data.name.toLocaleLowerCase().includes(searchedText.toLocaleLowerCase())
      );
      await setProducts(filteredProducts);
    };
    setFilteredProducts();
  }, [searchedText]);

  return (
    <Router>
      <div className="app">
        <Header searchedText={searchedText} setSearchedText={setSearchedText} />
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <PrivateRoute path="/myorders">
            <MyOrders />
          </PrivateRoute>
          <Route exact path="/">
            <Home products={products} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
