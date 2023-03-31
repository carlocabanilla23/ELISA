import { Navigate } from "react-router-dom";

function ProtectedRoute({user,children}) {
  
  user = localStorage.getItem('user');

 
    if (user === null) return <Navigate to="/" replace/>  

    // else{
    //   if( document.getElementById('navi') ){
        
    //   }
      return children;
    // }
   

}

export default ProtectedRoute;