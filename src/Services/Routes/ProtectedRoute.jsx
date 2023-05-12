import { Navigate } from "react-router-dom";
import Sidebar from "../../component/secondMainComponents/Sidebar";
import Header from "../../component/secondMainComponents/Header";
import '../../assets/styles/Sidebar.css';
import '../../assets/styles/Header.css';

function ProtectedRoute({user,children}) {
 const style = {
        position : "fixed",
        width : "100%",
        top : "0",
        left : "0%"
 }
  user = localStorage.getItem('user');
  let access = localStorage.getItem("access");
  console.log(access)
  if (user === null) { return <Navigate to="/" replace/> }
  else if (user !== null && access === "Student" ) {
        // document.getElementById("CreateReservationHeader").style.display = "none";
        return(
            <>
                    <div id="right-content" style={style}>
                    <Header />
                    {children}
                    </div>
            </>
            );
  }else {
    return  (
        <>
          <div id="right-content">
            <Sidebar />
            <Header />
            {children}
            </div>
        </>
          );
  }
}

export default ProtectedRoute;