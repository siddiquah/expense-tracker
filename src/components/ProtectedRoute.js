import { Navigate } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useGetUserInfo();

  if (!isAuth) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
