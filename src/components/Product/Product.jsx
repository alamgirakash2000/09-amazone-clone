import React from "react";
import "./Product.style.css";
import { useStateValue } from "../../ContextApi/StateProvider";

function Product({ props }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // Add item to a basket
    dispatch({
      type: "SET_BASKET",
      basket: [
        ...basket,
        {
          id: props.key,
          title: props.name,
          image: props.img,
          price: props.price,
          rating: props.star,
        },
      ],
    });
  };

  return (
    <div className="col-lg-4 col-md-6">
      <div className="product">
        <div className="product__info">
          <p className="product__title m-0">{props.name}</p>
          <p className="product__price m-0 mt-2">
            <small>$</small>
            <strong>{props.price}</strong>
          </p>
          <p>Stock : {props.stock}</p>
          <div className="product__rating d-flex m-0">
            {Array(props.star)
              .fill()
              .map((arr, index) => (
                <p key={index} className="my-auto">
                  ⭐
                </p>
              ))}
          </div>
          <small>({props.starCount})</small>
        </div>
        <img src={props.img} alt="cant load" className="product__image" />
        <div className="d-flex">
          <button className="product__button" onClick={addToBasket}>
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
