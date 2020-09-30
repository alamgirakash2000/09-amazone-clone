import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useStateValue } from "../../ContextApi/StateProvider";
import { getBasketTotal } from "../../ContextApi/reducer";
import "./Shipment.style.css";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";

function Shipment() {
  const [{ user, basket }, dispatch] = useStateValue();
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      email: user.email,
      phone: phone,
      address,
      timestamp: new Date(),
      items: basket.map((prod) => prod.id),
      price: getBasketTotal(basket),
      shipment: getBasketTotal(basket) * 0.05,
    };

    await axios
      .post("/api/order", order)
      .then((res) => {
        alert("Order placed successfully");
        dispatch({
          type: "SET_BASKET",
          basket: [],
        });

        history.replace("/myorders");
      })
      .catch((err) => alert(err.message));

    console.log(order);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-info">Confirm your order</h1>
      <div className="row">
        <div className="col-md-6">
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
              {getBasketTotal(basket) * 0.05}
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
