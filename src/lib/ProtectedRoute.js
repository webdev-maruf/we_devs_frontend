import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken} from './Common';

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        getToken() ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login",state: { from: location } }} />
        )
      }
    />
  );
};
export default ProtectedRoute;