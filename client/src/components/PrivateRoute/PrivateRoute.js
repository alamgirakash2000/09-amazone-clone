import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useStateValue } from "../../ContextApi/StateProvider";

function PrivateRoute({ children, ...rest }) {
  const [{ user }] = useStateValue();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
