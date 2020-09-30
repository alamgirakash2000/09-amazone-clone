import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Login.style.css";
import { auth } from "../../Firebase/Firebase";
import { TextField } from "@material-ui/core";
import { useStateValue } from "../../ContextApi/StateProvider";

function Login() {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [isLogin, setIsLogin] = useState(true);
  const [{ user }, dispatch] = useStateValue();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        const { displayName, email, phoneNumber } = auth.user;
        dispatch({
          type: "SET_USER",
          user: {
            name: displayName,
            email,
            phone: phoneNumber,
          },
        });

        localStorage.setItem(
          "amazon_user",
          JSON.stringify({
            name: displayName,
            email,
            phone: phoneNumber,
          })
        );
        // Logged in, redirect to homepage
        history.replace(from);
      })
      .catch((err) => {
        document.getElementById("login-failed").innerText = `${err}`;
      });
  };

  const register = (e) => {
    e.preventDefault();
    document.getElementById("login-failed").innerHTML = "";

    if (
      !name ||
      !re.test(email) ||
      !password ||
      password !== confirmPassword ||
      phone.length < 11
    ) {
      document.getElementById("login-failed").innerHTML =
        "Please enter all information correctly";
      alert("Resitration failed, try again");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (newUser) => {
        let currentUser = auth.currentUser;
        await currentUser
          .updateProfile({
            displayName: name,
            phoneNumber: phone,
          })
          .then((authUser) => {
            const { displayName, email, phoneNumber } = auth.currentUser;
            dispatch({
              type: "SET_USER",
              user: {
                name: displayName,
                email,
                phone: phoneNumber,
              },
            });
            localStorage.setItem(
              "amazon_user",
              JSON.stringify({
                name: displayName,
                email,
                phone: phoneNumber,
              })
            );
          });

        alert("Successfully registered");
        history.replace(from);
      })
      .catch((err) => {
        document.getElementById("login-failed").innerText = `${err}`;
        alert("Resitration failed, try again");
      });
  };

  return (
    <div className="login">
      <div className="login__container text-center">
        {isLogin ? (
          <form action="">
            <h1>Sign In</h1>
            <TextField
              required
              error={!re.test(email)}
              id="outlined-error-helper-text"
              label="Enter email"
              variant="outlined"
              className="form-control my-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              required
              error={password.length > 0 && password.length < 6}
              id="outlined-error-helper-text"
              label="Enter password"
              variant="outlined"
              type="password"
              className="form-control my-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="login__signInButton form-control my-4"
              onClick={login}
            >
              Sign In
            </button>
            <p className="text-danger" id="login-failed"></p>
            <p className="text-center">
              No account?{" "}
              <button
                className="btn bg-none text-primary"
                onClick={(e) => setIsLogin(false)}
              >
                Sign up
              </button>
              now.
            </p>
          </form>
        ) : (
          <form action="">
            <h1>Sign Up</h1>
            <TextField
              required
              id="outlined-error-helper-text"
              label="Enter your name"
              variant="outlined"
              className="form-control my-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              required
              error={!re.test(email)}
              id="outlined-error-helper-text"
              label="Enter email"
              variant="outlined"
              className="form-control my-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              required
              error={phone.length < 11 && phone.length > 0}
              id="outlined-error-helper-text"
              label="Enter Mobile no"
              variant="outlined"
              className="form-control my-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <TextField
              required
              error={password.length > 0 && password.length < 6}
              id="outlined-error-helper-text"
              label="Enter password"
              variant="outlined"
              type="password"
              className="form-control my-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              required
              error={confirmPassword.length > 0 && password !== confirmPassword}
              id="outlined-error-helper-text"
              label="Confirm password"
              variant="outlined"
              type="password"
              className="form-control my-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="login__signUpButton btn btn-success mt-4"
              onClick={register}
            >
              Create your amazon account
            </button>

            <p className="text-danger" id="login-failed"></p>
            <p className="text-center">
              Already registered?{" "}
              <button
                className="btn bg-none text-primary"
                onClick={(e) => setIsLogin(true)}
              >
                Login
              </button>
              here.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
