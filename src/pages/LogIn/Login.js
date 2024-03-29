import '../../assets/styles/Login.css';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import React  from 'react';
import { API } from 'aws-amplify';
import logo from '../../assets/icons/elisa_logo.png';
import elisa from '../../assets/icons/elisa.png';
import StartSession from '../../Services/session/SessionInfo';
// import Hash from './bcrypt/Hash';

function Login() {
    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();

    const onSubmit = e => {
    e.preventDefault();

    API.get("useraccounts","/email/object/"+username).then( acc => {
        if (acc.email === username && acc.password === password) {
            API.get("userapi","/email/object/"+acc.email).then( res => {
                console.log(res.status);
                if (res.status !== "Verified") {
                    const err = ReactDOM.createRoot(
                        document.getElementById('prompt')
                    );
                    const element = <p className='text-danger'>Your Accout is not active please contact administrator</p>;
                      err.render(element);
                } else {
                    StartSession(res);
                    console.log(res);
                    if (res.role === "Student") {
                        navigate('/CreateReservation');
                    } else {
                        navigate('/Home');
                    }
                }
            });
        }else{
            const err = ReactDOM.createRoot(
                document.getElementById('prompt')
            );
            const element = <p className='text-danger'>Incorect Email or Password</p>;
              err.render(element);
        }
    });

  };

  return (
    <div className="Login">
      <div className="Login-Form">
        <div className='banner'>
          <img src={logo} className="img-fluid img-thumbnail" alt="Elisa Logo" />
          <img src={elisa} className="img-fluid img-thumbnail" alt="Elisa Logo" />
        </div>
        <div id="prompt"></div>

        <form onSubmit={onSubmit}>
          <div className="mb-3 row">
            <input className="login-form-control form-control" onChange={(e) => setUsername(e.target.value.toLowerCase())} id="exampleFormControlInput1" placeholder="Name@example.com" />
          </div>
          <div className="mb-3 row">
            <input type="password" className="login-form-control form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="password" id="inputPassword" />
          </div>
          <div className="mb-3 row" id="row-3">
            <div className="col">
              <label className="col col-form-label" id="forgot-pass" onClick={() => navigate('/ForgotPassword')}>Forgot password?</label>
            </div>
            <div className="col">
              <label className="col col-form-label" id="create-account" onClick={() => navigate('/Signup')}>Create account</label>
            </div>
          </div>
          <div className="mb-3 row">
            <button type="submit" className="btn btn-secondary mb-3" id = "login-text">Login</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;