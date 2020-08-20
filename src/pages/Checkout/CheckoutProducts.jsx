import React from "react";
import "./Checkout.style.css";
import { useStateValue } from "../../ContextApi/StateProvider";

function CheckoutProducts({ product }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    // Remove item from the basket
    dispatch({
      type: "REMOVE",
      id: product.id,
    });
  };
  return (
    <div className="checkoutProduct d-flex my-3 py-2">
      <img src={product.image} alt="" className="checkoutProduct__image mr-3" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title m-0">
          <strong>{product.title}</strong>
        </p>
        <p className="checkoutProduct__price m-0">
          <small>$</small>
          <strong>{product.price}</strong>
        </p>
        <div className="checkoutProduct__rating d-flex m-0">
          {Array(product.rating)
            .fill()
            .map(() => (
              <p>⭐</p>
            ))}
        </div>
        <button className="checkoutProduct__button" onClick={removeFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProducts;
