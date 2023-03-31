import '../assets/styles/Sidebar.css';
import logo from '../assets/icons/elisa_logo.png';
import elisa from '../assets/icons/elisa.png';
import iDashboard from "../assets/icons/dashboard.png";
import iInventory from "../assets/icons/inventory.png";
import iReservations from "../assets/icons/reservation.png";
import iUsers from '../assets/icons/users.png';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { API } from 'aws-amplify';

function Sidebar() {
  const access = localStorage.getItem('access');

  
  useEffect( () => {
    if (access === "Student") {
      
      let hide = document.getElementById("users");
      hide.style.display = "none";
    }
  },[]);

  const Transfer = (e) => {
    API.get("inventory","/items").then( itemRes => {
      itemRes.forEach(element => {
        API.post('items','/items',{
          body : element
        })
      });
    });
    alert("Transfer Success !!!")
  }
  return (
    <div className="sidenav">    
        <div className='sidebar'>
          <Link to="/Home">
            <img src={logo} className="logo1" alt="Elisa Logo" />
            </Link>
          <Link to="/Home">
            <img src={elisa} className="logo2" alt="Elisa Logo" />
          </Link>
        </div>

        <div className="menu">
          <ul>
            <li className="menu-list">
            <img src={iDashboard} className="icon" alt="dashboard icon" />
              <Link to="/Home">Dashboard</Link>
            </li>
            <li className="menu-list">
              <img src={iInventory} className="icon" alt="inventory icon" />
              <Link to="/Inventory">Inventory</Link>
            </li>
            
            <div className="inventory-dropdown">
              <ul>
                <li><Link to="/Inventory">All Items</Link></li>
                <li><Link to="/Location">Location</Link></li>
                <li><Link to="/AssignedItems">Assigned Items</Link></li>
                <li><Link to="/UnassignedItems">Unassigned Items</Link></li>
              </ul>
            </div>
            <li className="menu-list">
            <img src={iReservations} className="icon" alt="reservation icon" />
              <Link to="/Reservations">Reservations</Link>
            </li>
            <li  id="users" className="menu-list">
            <img src={iUsers} className="icon" alt="users icon" />
              <Link to="/Users">Users</Link>
            </li>

            {/* <li  onClick={e => Transfer()} className="menu-list">
                Transfer
            </li> */}
          </ul>
          </div> 
      
    </div>
  );
}

export default Sidebar;
