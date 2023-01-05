import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({user,children}) {
  console.log(user)

 
    if (user === null) return <Navigate to="/" replace/>  
  
    return children;


}

export default ProtectedRoute;