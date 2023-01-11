import React, { useEffect, useState } from 'react';
import './styles/Header.css';
import avatar from './icons/avatar_test.png';
import { useNavigate,Link,Route } from 'react-router-dom';

function Header() {
  const dropdownMenu = React.useRef(null);
  const navigate =  useNavigate();
  const [name,setName] = useState('');

  function toggleDropdownMenu() {
    dropdownMenu.current.style.display = dropdownMenu.current.style.display === 'block' ? 'none' : 'block';
  }
  useEffect ( ()=> { 
    setName(localStorage.getItem('name'));
  },[]);
  const Logout = () => {
    localStorage.clear();
    navigate('/');

  }
  return (
    <div className="navbar">
      <div className="header">
        <div className="headerprofile">
          <img src={avatar} className="avatar" alt="User Avatar" />
          <div className="dropdown">
            <button className="btn dropdown-toggle" data-bs-toggle = "dropdown" onClick={toggleDropdownMenu}>{name}</button>
            <ul className="dropdown-menu" ref={dropdownMenu}>
              <li><Link to="">Notification</Link></li>
              <li><Link to="/Setting">Setting</Link></li>
              <li onClick={ (e) =>Logout()}>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
