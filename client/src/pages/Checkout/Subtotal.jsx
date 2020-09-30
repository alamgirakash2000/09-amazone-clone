import React from "react";
import "./Checkout.style.css";
import { useStateValue } from "../../ContextApi/StateProvider";
import { getBasketTotal } from "../../ContextApi/reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const [{ basket }] = useStateValue();
  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push("/shipment");
  };

  return (
    <div className="subtotal">
      <h5>
        Subtotal({basket?.length}):
        <strong> ${getBasketTotal(basket)} </strong>
      </h5>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>
      <button
        onClick={handleProceedCheckout}
        className="checkoutProduct__button form-control mt-2"
      >
        Proceed Checkout
      </button>
    </div>
  );
}

export default Subtotal;
