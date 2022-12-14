import './Sidebar.css';
import logo from './icons/elisa_logo.png';
import elisa from './icons/elisa.png';
import iDashboard from "./icons/dashboard.png";
import iInventory from "./icons/inventory.png";
import iReservations from "./icons/reservation.png";
import iUsers from './icons/users.png';
import { Router,Link,Route } from 'react-router-dom';


function Sidebar() {
  return (
    <div className="sidenav">
      
        <div className='banner'>
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
              <Link to="">inventory</Link>
            </li>
            
            <div className="inventory-dropdown">
              <ul>
                <li><Link to="">All Items</Link></li>
                <li><Link to="">Storage Location</Link></li>
                <li><Link to="">Room Location</Link></li>
                
              </ul>
            </div>
            <li className="menu-list">
            <img src={iReservations} className="icon" alt="reservation icon" />
              <Link to="">Reservation</Link>
            </li>
            <li className="menu-list">
            <img src={iUsers} className="icon" alt="users icon" />
              <Link to="/Users">Users</Link>
            </li>
          </ul>
          </div>
      
    </div>
  );
}

export default Sidebar;