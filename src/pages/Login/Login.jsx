import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.style.css";
import { auth } from "../../Firebase/Firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // Logged in, redirect to homepage
        history.push("/");
      })
      .catch((err) => {
        document.getElementById("login-failed").innerText = `${err}`;
      });
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // Logged in, redirect to homepage
        history.push("/");
      })
      .catch((err) => {
        document.getElementById("login-failed").innerText = `${err}`;
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
          className="login__image my-3"
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form action="">
          <h5>E-mail</h5>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="login__signInButton form-control"
            onClick={login}
          >
            Sign In
          </button>

          <p className="text-danger" id="login-failed"></p>
        </form>
        <p>
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please
          see our privacy. Notice, our Cookies Notice and our interest-Based
          Ad-notice
        </p>
        <button className="login__signUpButton" onClick={register}>
          Create your amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
