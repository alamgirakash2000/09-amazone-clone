import React from "react";
import "./Checkout.style.css";
import CheckoutProducts from "./CheckoutProducts";
import Subtotal from "./Subtotal";

import { useStateValue } from "../../ContextApi/StateProvider";

function Checkout() {
  const [{ basket }] = useStateValue();
  return (
    <div className="checkout container">
      <div className="row">
        <div className="col-md-9">
          <img
            className="checkout__ad"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
          />
          {basket?.length === 0 ? (
            <div>
              <h2>Your Basket is Empty</h2>
              <p>
                To buy one or more item, please click the "Add to Basket" button
                placed next to the item.
              </p>
            </div>
          ) : (
            <div>
              <h2>Your Basket have these items in the Basket</h2>
              <hr />

              {/* List out all the checkout items */}
              {basket?.map((item) => (
                <CheckoutProducts product={item} />
              ))}
            </div>
          )}
        </div>
        <div className="col-md-3">{basket.length > 0 && <Subtotal />}</div>
      </div>
    </div>
  );
}

export default Checkout;
