import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../ContextApi/StateProvider";

function ProcessPayment({ newOrder }) {
  const [{ user, basket }, dispatch] = useStateValue();
  const history = useHistory();
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const totalPrice = (
    parseFloat(newOrder.price) + parseFloat(newOrder.shipment)
  ).toFixed(2);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    // Handle the errors and place order
    if (error) {
      setError(error.message);
      console.log("[error]", error);
    } else {
      setError(null);

      await axios
        .post("/api/order", {
          ...newOrder,
          paymentInfo: { id: paymentMethod.id, card: paymentMethod.card },
        })
        .then((res) => {
          alert("Order placed successfully");
          dispatch({
            type: "SET_BASKET",
            basket: [],
          });

          history.replace("/myorders");
        })
        .catch((err) => err.message);
    }
  };

  return (
    <div>
      <div className="title text-center">
        <h3>Make Payment</h3>
      </div>

      <div className="payment__details w-75 mx-auto mt-5">
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button
            type="submit"
            className=" btn btn-block btn-success my-4"
            disabled={!stripe}
          >
            {!stripe ? <p>Processing...</p> : <p>PAY ${totalPrice}</p>}
          </button>
          {error && <p className="text-danger">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ProcessPayment;
