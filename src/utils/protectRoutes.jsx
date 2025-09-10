
import { Navigate } from "react-router-dom";

const getToken = () => {
  return localStorage.getItem('token') 
};


export const ProtectedRoute = ({ children }) => {
  const token = getToken();
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};


export const 

PublicRoute = ({ children }) => {
  const token = getToken();
  
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};