import React from "react";
import "./Header.style.css";
import { Link } from "react-router-dom";

import { useStateValue } from "../../ContextApi/StateProvider";
import { auth } from "../../Firebase/Firebase";

function Header() {
  const [{ basket, user }] = useStateValue();

  const login = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div>
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
        <div className="input-group my-auto">
          <input
            type="text"
            className="form-control"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
        {/*3 Links*/}
        <div className="header__nav">
          <Link to={!user && "/login"} className="header__link">
            <div onClick={login} className="d-flex flex-column header__option">
              <span className="header__optionLine_one">Hello</span>
              <span className="header__optionLine_two">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>
          <Link to="/login" className="header__link">
            <div className="d-flex flex-column header__option">
              <span className="header__optionLine_one">Returns</span>
              <span className="header__optionLine_two">& Orders</span>
            </div>
          </Link>
          <Link to="/login" className="header__link">
            <div className="d-flex flex-column header__option">
              <span className="header__optionLine_one">Your</span>
              <span className="header__optionLine_two">Prime</span>
            </div>
          </Link>

          <Link to="/checkout" className="header__link">
            <div className="header__optionBasket">
              <span>
                <i class="fas fa-shopping-cart fa-2x"></i>
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
