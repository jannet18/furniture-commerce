import React from "react";
import useAuth from "../../firebase/useAuth";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { currentUser } = useAuth();
  return (
    //  currentUser ? children : <Navigate to="/login"/>
    currentUser && currentUser ? <Outlet /> : <Navigate to="/login" />
  );
}

export default ProtectedRoute;
