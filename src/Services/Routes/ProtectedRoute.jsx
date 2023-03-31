import { Navigate } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";
import '../../assets/styles/Sidebar.css';
import '../../assets/styles/Header.css';
import { Suspense } from "react";
function ProtectedRoute({user,children}) {
  
  user = localStorage.getItem('user');

    if (user === null) return <Navigate to="/" replace/>  

      return  (
      <>
          <Sidebar /> 
          <Header />
          {children}    
      </>
      );
   

}

export default ProtectedRoute;