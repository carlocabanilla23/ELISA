import React, { useEffect, useState } from 'react';
import '../../assets/styles/Header.css';
import avatar from '../../assets/icons/avatar_test.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  const dropdownMenu = React.useRef(null);
  const navigate =  useNavigate();
  const [name] = useState(localStorage.getItem('name'));
  const [email] = useState(decodeURIComponent(escape(window.atob(localStorage.getItem('email')))))

  function toggleDropdownMenu() {
    dropdownMenu.current.style.display = dropdownMenu.current.style.display === 'block' ? 'none' : 'block';
  }
  useEffect ( ()=> {
    // setName(localStorage.getItem('name'));
  },[]);
  const Logout = (e) => {
    localStorage.clear();
    navigate('/');
  }

  document.addEventListener("DOMContentLoaded", function () {
      // your code here
    });
  const gotoMyReservation = (e) => {
    navigate("/OrderHistory/"+email, {
      state: {
        email: email
      },
    });
  }

  const gotoSetting = (e) => {
    navigate("/Setting", {
      state: {
        email: email
      },
    });
  }

  const gotoNotification = (e) => {
    navigate("/Notification", {
      state: {
        email: email
      },
    });
  }
  return (
    <div className="navbar">
      <div className="header">
        <div className="headerprofile">
          <img src={avatar} className="avatar" alt="User Avatar" />
          <div className="dropdown" onMouseLeave={toggleDropdownMenu}>
            <button className="btn dropdown-toggle" data-bs-toggle = "dropdown" onClick={toggleDropdownMenu}  >{name}</button>
            <ul className="dropdown-menu" ref={dropdownMenu}>
              <li onClick={ (e)=> gotoMyReservation()}>My Reservation</li>
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
