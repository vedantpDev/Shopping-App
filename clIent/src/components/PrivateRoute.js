import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { email } = useSelector((store) => store.userData);
  return email ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
