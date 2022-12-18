import React from 'react';
import './Header.css';
import avatar from './icons/avatar_test.png';
import { Router,Link,Route } from 'react-router-dom';


function Header() {
  const dropdownMenu = React.useRef(null);

  function toggleDropdownMenu() {
    dropdownMenu.current.style.display = dropdownMenu.current.style.display === 'block' ? 'none' : 'block';
  }

  return (
    <div className="navbar">
      <div className="header">
        <div className="headerprofile">
          <img src={avatar} className="avatar" alt="User Avatar" />
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdownMenu}>Anthony</button>
            <ul className="dropdown-menu" ref={dropdownMenu}>
              <li><Link to="">Notification</Link></li>
              <li><Link to="">Setting</Link></li>
              <li><Link to="/Login">Logout</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
