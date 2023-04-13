import '../assets/styles/Login.css';
import React, { useState, useEffect }  from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
// import logo from '../assets/icons/elisa_logo.png';
// import elisa from '../assets/icons/elisa.png';
import eyeSlashHide from '../assets/icons/eye-slash-hide.png';
import eyeSlashShow from '../assets/icons/eye-slash-show.png';
import '../assets/styles/ForgotPassword.css';

function ResetPassword() {
    const {param} = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword,setHidePassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [confirmPasswordPattern, setConfirmPasswordPattern] = useState('');
    
    const eyeShow = document.getElementById('eye-slash-show');
    const eyeHide = document.getElementById('eye-slash-hide');

    const eyeShow2 = document.getElementById('eye-slash-show2');
    const eyeHide2 = document.getElementById('eye-slash-hide2');

    useEffect(() => {
        setConfirmPasswordPattern('^(.{' + password.length + ',})$')
    }, [password])

    useEffect(() => {
        if(error !== ''){
            setErrorMessage("Confirm password not matches");
        }
    },[error])

    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout(() => {
            navigate('/');
        }, 1500);
    }

    const togglePassword = (e) => {
        if(hidePassword === false){
            eyeShow.style.display = 'none';
            eyeHide.style.display = 'block';
            setHidePassword(!hidePassword);
        }else if(hidePassword === true){
            eyeShow.style.display = 'block';
            eyeHide.style.display = 'none';
            setHidePassword(!hidePassword);
        }
    }

    const toggleConfirmPassword = (e) => {
        if(hideConfirmPassword === false){
            eyeShow2.style.display = 'none';
            eyeHide2.style.display = 'block';
            setHideConfirmPassword(!hideConfirmPassword);
        }else if(hideConfirmPassword === true){
            eyeShow2.style.display = 'block';
            eyeHide2.style.display = 'none';
            setHideConfirmPassword(!hideConfirmPassword);
        }
    }

    const ConfirmCustomValidity = (e) => {
        if(confirmPassword.length < password.length-1){
            e.target.setCustomValidity('Enter password again to confirm');
        }else if(confirmPassword.length >= password.length-1){
            e.target.setCustomValidity('');
        }
    }

    const setNewPassword = (e) => {
        e.preventDefault();
        if(confirmPassword !== password){
            throw new Error(setError(Math.random()));
        }
        API.post("useraccounts","/email/",{
            body:{
                email:param,
                password: password,
            }
        });
        ShowAlert();
    }

  return (
    <div className="Body">
        <div className="alert alert-success" id="alert" role="alert">
            Your password is successfully reset
        </div>
        <div className="ResetPassword">
            {/* <div className="reset-page">
                <div className="col">
                    <div className="row">
                        <img src={logo} className="img-fluid img-thumbnail" id="reset-page" alt="Elisa Logo" />
                    </div>
                    <div className="row">
                        <img src={elisa} className="img-fluid img-thumbnail" id="reset-page" alt="Elisa Logo" />
                    </div>
                </div>
            </div> */}
            <div className="ForgotPassword-Form">
                <div className="FormHeader">
                    <h1>Set New Password</h1>
                </div>
                <form onSubmit={setNewPassword}>
                    {/* Password */}
                    <div className = "mb-3 row">
                        <label for="Password" className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                            <input type={hidePassword ? 'password' : 'text'}
                            className="form-control"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorMessage('');
                                setError('');
                                e.target.validity.patternMismatch || e.target.value === '' ? e.target.setCustomValidity('Password must have at least 8 characters') : e.target.setCustomValidity('')
                            }}
                            id="inputPassword"
                            required={true}
                            pattern='^(.{8,})$'
                            onInvalid={(event) => {event.target.setCustomValidity('Password must have at least 8 characters')}}/>
                            <img src={eyeSlashHide} className="reset-eye-slash" id="eye-slash-hide" alt="Hide" onClick={togglePassword} />
                            <img src={eyeSlashShow} className="reset-eye-slash" id="eye-slash-show" style={{display: 'none'}} alt="Show" onClick={togglePassword} />
                        </div>
                    </div>
                    {/* Confirm Password */}
                    <div className = "mb-3 row">
                        <label for="ConfirmPassword" className="col-sm-3 col-form-label confirmPds">Confirm Password</label>
                        <div className="col-sm-9">
                            <input type={hideConfirmPassword ? 'password' : 'text'}
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value); setErrorMessage(''); setError('')}}
                            id="inputConfirmPassword"
                            required={true}
                            pattern={confirmPasswordPattern}
                            onInvalid={ConfirmCustomValidity}
                            onInput={ConfirmCustomValidity} />
                            <img src={eyeSlashHide} className="reset-eye-slash2" id="eye-slash-hide2" alt="Hide" onClick={toggleConfirmPassword} />
                            <img src={eyeSlashShow} className="reset-eye-slash2" id="eye-slash-show2" style={{display: 'none'}} alt="Show" onClick={toggleConfirmPassword} />
                        </div>
                    </div>
                    <br />
                    <div className="form-buttons" id="reset-buttons">
                        <button type="submit" className="btn btn-primary">Set Password</button>
                        <span className="errorMessage">{errorMessage}</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}



export default ResetPassword;