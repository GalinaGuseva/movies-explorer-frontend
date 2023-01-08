import React from 'react';
import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/signin"/>
}

export default ProtectedRoute;
