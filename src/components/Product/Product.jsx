import React from "react";
import "./Product.style.css";
import { useStateValue } from "../../ContextApi/StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // Add item to a basket
    dispatch({
      type: "ADD",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title m-0">{title}</p>
        <p className="product__price m-0 mt-2">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating d-flex m-0">
          {Array(rating)
            .fill()
            .map(() => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="cant load" className="product__image" />
      <button className="product__button" onClick={addToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
