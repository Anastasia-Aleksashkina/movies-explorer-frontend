import React from "react";
import { Redirect } from "react-router-dom";
import { PAGES } from "../../utils/constants";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Redirect to={PAGES.MAIN} />;
};

export default ProtectedRoute;
