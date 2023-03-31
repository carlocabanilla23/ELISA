import React, { useEffect, useState } from 'react';
import '../assets/styles/Header.css';
import avatar from '../assets/icons/avatar_test.png';
import { useNavigate,Link,Route } from 'react-router-dom';

function Header() {
  const dropdownMenu = React.useRef(null);
  const navigate =  useNavigate();
  const [name] = useState(localStorage.getItem('name'));

  function toggleDropdownMenu() {
    dropdownMenu.current.style.display = dropdownMenu.current.style.display === 'block' ? 'none' : 'block';
  }
  useEffect ( ()=> { 
    // setName(localStorage.getItem('name'));
  },[]);
  const Logout = () => {
    localStorage.clear();
    navigate('/');

  }

  const gotoSetting = () => {
    navigate("/Setting", {
      state: {
        email: decodeURIComponent(escape(window.atob(localStorage.getItem('email'))))
      },
    });
  }

  const gotoNotification = () => {
    navigate("/Notification ", {
      state: {
        email: decodeURIComponent(escape(window.atob(localStorage.getItem('email'))))
      },
    });
  }
  return (
    <div className="navbar">
      <div className="header">
        <div className="headerprofile">
          <img src={avatar} className="avatar" alt="User Avatar" />
          <div className="dropdown">
            <button className="btn dropdown-toggle" data-bs-toggle = "dropdown" onClick={toggleDropdownMenu}>{name}</button>
            <ul className="dropdown-menu" ref={dropdownMenu}>
              <li onClick={ (e)=> gotoNotification()}>Notification</li>
              <li onClick={ (e) =>gotoSetting()}>Setting</li>
              <li onClick={ (e) =>Logout()}>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
