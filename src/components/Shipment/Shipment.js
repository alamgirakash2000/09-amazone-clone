import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useStateValue } from "../../ContextApi/StateProvider";
import { getBasketTotal } from "../../ContextApi/reducer";
import "./Shipment.style.css";
import { Link } from "react-router-dom";
import ProcessPayment from "../ProcessPayment/ProcessPayment";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51HaDbiFGo8R13963km0FIpFOdX2AL0MwaslsdgkrYdHF9NKPNVNjZy7VWFmYl0m0YoV1w2hYjtM2VR7GyWizchwk00eNge5e6E"
);

function Shipment() {
  const [{ user, basket }, dispatch] = useStateValue();
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState(false);
  const [newOrder, setNewOrder] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      email: user.email,
      phone: phone,
      address,
      items: basket.map((prod) => prod.id),
      price: parseFloat(getBasketTotal(basket)),
      shipment: getBasketTotal(basket) * 0.05,
    };

    setNewOrder(order);
    setPayment(true);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-info">Confirm your order</h1>
      <div className="row">
        <div className="col-md-6">
          {!payment ? (
            <form className="shipment__form" onSubmit={handleSubmit}>
              <TextField
                id="outlined-error-helper-text"
                label="Your name"
                variant="outlined"
                className="form-control my-3"
                value={user.name}
              />

              <TextField
                id="outlined-error-helper-text"
                label="Your email"
                variant="outlined"
                className="form-control my-3"
                value={user.email}
              />

              <TextField
                required
                id="outlined-error-helper-text"
                label="Mobile no"
                variant="outlined"
                className="form-control my-3"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <TextField
                required
                id="outlined-error-helper-text"
                label="Address"
                variant="outlined"
                className="form-control my-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <button type="submit" className="btn btn-block btn-success my-4">
                PLACE ORDER
              </button>
            </form>
          ) : (
            <Elements stripe={stripePromise}>
              <ProcessPayment newOrder={newOrder} />
            </Elements>
          )}
        </div>
        <div className="col-md-6 mt-5">
          <div className="p-3">
            <h3 className="text-primary">Your order history</h3>
            <p>
              <strong className="text-success">Total items : </strong>
              {basket.length}
            </p>
            <p>
              <strong className="text-success">Total Price :</strong> {" $ "}
              {getBasketTotal(basket)}{" "}
            </p>
            <p>
              <strong className="text-success"> Shipment Charge :</strong>
              {" $ "}
              {(getBasketTotal(basket) * 0.05).toFixed(2)}
            </p>

            <Link to="/checkout" className="btn btn-primary mt-3">
              Edit Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipment;
