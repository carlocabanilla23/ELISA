import './Sidebar.css';
import logo from './elisa_logo.png';
import elisa from './elisa.png';
import iDashboard from "./dashboard.png";
import iInventory from "./inventory.png";
import iReservations from "./reservation.png";
import iUsers from "./users.png";


function Sidebar() {
  return (
    <div className="Sidebar">
      <div className='banner'>
        <img src={logo} className="logo1" alt="Elisa Logo" />
        <img src={elisa} className="logo2" alt="Elisa Logo" />
      </div>
      <div className="menu">
        <ul>
          <li className="menu-list">
          <img src={iDashboard} className="icon" alt="dashboard icon" />
            <a href="#">Dashboard</a>
          </li>
          <li className="menu-list">
          <img src={iInventory} className="icon" alt="inventory icon" />
            <a href="#">Inventory</a>
          </li>
          
          <div className="inventory-dropdown">
            <ul>
              <li><a href="#">All items</a></li>
              <li><a href="#">Storage Location</a></li>
              <li><a href="#">Room Location</a></li>
              
            </ul>
          </div>
          <li className="menu-list">
          <img src={iReservations} className="icon" alt="reservation icon" />
            <a href="#">Reservations</a>
          </li>
          <li className="menu-list">
          <img src={iUsers} className="icon" alt="users icon" />
            <a href="#">Users</a>
          </li>
        </ul>
        </div>
    </div>
  );
}

export default Sidebar;