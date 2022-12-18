import './Header.css';
import avatar from './icons/avatar_test.png';

function Header() {
  return (
    <div className="navbar">
      <div className = "header">
        <div className = "headerprofile">
          <img src={avatar} className="avatar" alt="User Avatar" />
          <div className="col auto dropdown">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Anthony
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Notification</a></li>
                            <li><a className="dropdown-item" href="#">Setting</a></li>
                            <li><a className="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>                
      </div>
    </div>
    </div>
  );
}

export default Header;