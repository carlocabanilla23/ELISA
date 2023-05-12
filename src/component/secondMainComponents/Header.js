import React, { useEffect, useState } from 'react';
import '../../assets/styles/Header.css';
import avatar from '../../assets/icons/avatar_test.png';
import { useNavigate } from 'react-router-dom';
import elisa from '../../assets/icons/elisa.png';


function Header() {
  const dropdownMenu = React.useRef(null);
  const dropdownMenu2 = React.useRef(null);

  const navigate =  useNavigate();
  const [name] = useState(localStorage.getItem('name'));
  const [email] = useState(decodeURIComponent(escape(window.atob(localStorage.getItem('email')))))

  function toggleDropdownMenu() {
    // dropdownMenu.current.style.display = dropdownMenu.current.style.display === 'block' ? 'none' : 'block';
  }

  const toggleDropdownMenu2 = () => {
    let obj = document.getElementById('mobile-dropdown-menu');

    if ( obj.style.display === 'block') {
      obj.style.display = 'none';
      document.getElementById('mobile-close-dropdown').style.display = "none";
      document.getElementById('mobile-open-dropdown').style.display = "block";
    } else {
      obj.style.display = 'block'
      document.getElementById('mobile-close-dropdown').style.display = "block";
      document.getElementById('mobile-open-dropdown').style.display = "none";
    }
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

  const gotoHome = (e) => {
    let access = localStorage.getItem('access');

    if (access === "Admin") {
      navigate("/Home", {
        state: {
          email: email
        },
      });
    } else {
      navigate("/CreateReservation", {
        state: {
          email: email
        },
      });
    }
    
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
          <div onClick={ e => gotoHome()} className='mobile-logo-header'>
            <img src={elisa} className="mobile-logo2" alt="Elisa Logo" />
          </div>
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

        <div className="hamburgermenu">
          <div className="dropdown" >
            <button id="mobile-open-dropdown" className="hamburgermenuBtn btn dropdown-toggle" data-bs-toggle="dropdown2" onClick={ e => toggleDropdownMenu2()}  >
                <i class="fa fa-bars"></i>
            </button>
            <button id="mobile-close-dropdown" className="hamburgermenuBtn btn dropdown-toggle" data-bs-toggle="dropdown2" onClick={ e => toggleDropdownMenu2()}  >
                <i class="fa fa-times"></i>
            </button>
            <ul id="mobile-dropdown-menu" className="hamburgermenuDropDown dropdown-menu" ref={dropdownMenu2} >
              <li onClick={ (e)=> {gotoMyReservation();toggleDropdownMenu2()}}>My Reservation</li>
              <li onClick={ (e)=> {gotoNotification();toggleDropdownMenu2()}}>Notification</li>
              <li onClick={ (e) =>{gotoSetting();toggleDropdownMenu2()}}>Setting</li>
              <li onClick={ (e) =>{Logout();toggleDropdownMenu2()}}>Logout</li>
            </ul>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Header;
