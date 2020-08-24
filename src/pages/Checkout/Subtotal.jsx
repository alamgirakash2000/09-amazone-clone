import React from "react";
import "./Checkout.style.css";
import { useStateValue } from "../../ContextApi/StateProvider";
import { getBasketTotal } from "../../ContextApi/reducer";

function Subtotal() {
  const [{ basket }] = useStateValue();
  return (
    <div className="subtotal">
      <h5>
        Subtotal{` (${basket?.length} items)`}:
        <strong>$ {getBasketTotal(basket).toFixed(2)}</strong>
      </h5>
      <small className="subtotal__gift">
        <input type="checkbox" /> This order contains a gift
      </small>
      <button className="checkoutProduct__button form-control mt-2">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
