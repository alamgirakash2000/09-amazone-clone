import React from "react";
import "./Product.style.css";
import { useStateValue } from "../../ContextApi/StateProvider";

function Product({ props }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // Add item to a basket
    dispatch({
      type: "ADD",
      item: {
        id: props.key,
        title: props.name,
        image: props.img,
        price: props.price,
        rating: props.star,
      },
    });
  };

  return (
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
            .map(() => (
              <p className="my-auto">⭐</p>
            ))}
        </div>
        <small>({props.starCount})</small>
      </div>
      <img src={props.img} alt="cant load" className="product__image" />
      <div className="d-flex">
        <a target="_blank" className=" mx-3 btn btn-primary" href={props.url}>
          See Details
        </a>
        <button className="product__button" onClick={addToBasket}>
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default Product;
