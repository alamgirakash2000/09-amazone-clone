import React from "react";
import "./Header.style.css";
import { Link } from "react-router-dom";

import { useStateValue } from "../../ContextApi/StateProvider";
import { auth } from "../../Firebase/Firebase";

function Header({ searchedText, setSearchedText }) {
  const [{ basket, user }, dispatch] = useStateValue();

  const login = () => {
    localStorage.removeItem("id");
    dispatch({
      type: "EMPTY",
    });
    if (user) {
      auth.signOut();
      dispatch({
        type: "SET_USER",
        user: null,
      });
      localStorage.removeItem("amazon_user");
    }
  };

  return (
    <div className="position-sticky sticky-top">
      <nav className="header">
        {/*Logo on the left ->img*/}
        <Link to="/">
          <img
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt=""
            className="header__logo"
          />
        </Link>
        {/*Search Box*/}
        <div className="input-group my-auto d-md-flex d-none">
          <input
            type="text"
            className="form-control"
            aria-describedby="basic-addon2"
            value={searchedText}
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
        {/*3 Links*/}
        <div className="header__nav ml-auto">
          <Link to={!user && "/login"} className="header__link">
            <div onClick={login} className="d-flex flex-column header__option">
              <span className="header__optionLine_one">Hello {user?.name}</span>
              <span className="header__optionLine_two">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>
          <Link to="/myorders" className="header__link">
            <div className="d-flex flex-column header__option">
              <span className="header__optionLine_one">Returns</span>
              <span className="header__optionLine_two">& Orders</span>
            </div>
          </Link>
          <Link to="/checkout" className="header__link">
            <div className="header__optionBasket">
              <span>
                <i className="fas fa-shopping-cart fa-2x"></i>
              </span>
              <span className="mx-2">{basket?.length}</span>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
