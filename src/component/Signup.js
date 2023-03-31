import React, { useState, useEffect} from 'react';
import {API, Amplify} from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import awsExport from '../aws-exports';
import '../assets/styles/Signup.css';
import eyeSlashHide from '../assets/icons/eye-slash-hide.png';
import eyeSlashShow from '../assets/icons/eye-slash-show.png';

Amplify.configure(awsExport);

function Signup () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('Role');
    const [email, setEmail] = useState('');
    const [schoolID, setSchoolID] = useState('');
    const [phone, setPhone] = useState('');
    const [users, setUserList] = useState('');
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword,setHidePassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [confirmPasswordPattern, setConfirmPasswordPattern] = useState('');
    const navigate = useNavigate();

    const eyeShow = document.getElementById('eye-slash-show');
    const eyeHide = document.getElementById('eye-slash-hide');

    const eyeShow2 = document.getElementById('eye-slash-show2');
    const eyeHide2 = document.getElementById('eye-slash-hide2');

    const cancelCreate = e => {
        navigate('/');
    }

    useEffect(() => {
        if(error === 1){
            setErrorMessage("Email and SchoolID are already existed");
        }else if(error === 2){
            setErrorMessage("Email is already existed");
        }else if(error === 3){
            setErrorMessage("SchoolID is already existed");
        }else if(error === 4){
            setErrorMessage("Please choose a role");
        }else if(error === 5){
            setErrorMessage("Confirm password not matches");
        }
    }, [error])

    useEffect(() => {
        API.get("userapi","/email").then(res => {
            setUserList([...users,...res]);
        })
    },[])

    useEffect(() => {
        setConfirmPasswordPattern('^(.{' + password.length + ',})$')
    }, [password])

    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout(() => {
            navigate('/');
        }, 1500);
    }
    const onSubmit = (e) => {
        let id = crypto.randomUUID();
        e.preventDefault();
        for(var i = 0; i < users.length; i++){
            if(users[i].email === email && users[i].schoolID === schoolID){
                throw new Error(setError(1));
            }else if(users[i].email === email){
                throw new Error(setError(2));
            }else if(users[i].schoolID === schoolID){
                throw new Error(setError(3));
            }
        }
        if(role === "Role"){
            throw new Error(setError(4));
        }else if(confirmPassword !== password){
            throw new Error(setError(5));
        }

        //Encrypted the password
        // var saltRound = 512;
        // var decimal = Math.floor(Math.random() * 36);
        // var salt = '';
        // var saltList = [];
        // var curSaltedPassword, curHashedPassword;
        // curHashedPassword = password;
        // while(saltRound > 0){
        //     for(var i = 0; i < 11; i++){
        //         if(decimal <= 9){
        //             //HTML ASCII: 48 = digit '0'
        //             salt += String.fromCharCode(decimal + 48);
        //         }else{
        //             //HTML ASCII: 97 = alphabet 'a'
        //             salt += String.fromCharCode(decimal + 87);
        //         }
        //         decimal = Math.floor(Math.random() * 37);
        //     }
        //     saltList.push(salt);
        //     curSaltedPassword = curHashedPassword + salt;
        //     curHashedPassword = Hash({curSaltedPassword});
        //     saltRound--;
        //     salt = '';
        // }

        API.post("userapi","/email/", {
            body : {
            firstname : firstName,
            lastname : lastName,
            role : role,
            schoolID : schoolID,
            email : email,
            phone : phone,
            status : "inactive",
            }
        });

        API.post("useraccounts","/email/",{
            body:{
                email:email,
                password:password
            }
        });

        API.post("notificationapi","/sid/", {
            body : {
               sid : schoolID,
               newitem : false,
               newmember : false,
               outofstock : false,
               reservationrequest : false,
               email : email,
               emailnotification : false       
            }
        });

        API.post("emailsystem","/email/send", {
            body : {
            email : email,
            message: "Thank you for registering to Elisa Please click the link below to verify your account. \n \n https://dev.djno0p84ctg6u.amplifyapp.com/verify/"+email
            }
        });

        API.post("emailsystem","/email", {
            body : {
            id : id,
            email : email
            }
        });
        
        console.log("success");
        ShowAlert();
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

    return (
        <div className="Body">
            <div className="alert alert-success" id="alert" role="alert">
                The user has been created successfully
            </div>
            <div className="UserInputForm">
                <div className="FormHeader">
                    Create Account
                </div>
                <form onSubmit={onSubmit}>
                    {/* First Name */}
                    <div className = "mb-3 row">
                        <label  for = "inputFirstName"
                                className = "col-sm-3">
                                First Name
                        </label>
                        <div className = "col-sm-9">
                        <input  type = "text"
                                className = "firstName form-control"
                                value = {firstName}
                                onChange = {(e) => {setFirstName(e.target.value); setErrorMessage(''); setError('')}}
                                id="inputFirstName"
                                required={true} />
                        </div>
                    </div>
                    {/* Last Name */}
                    <div className="mb-3 row">
                        <label  for="inputLastName"
                                className="col-sm-3 col-form-label">
                                Last Name
                        </label>
                        <div className="col-sm-9">
                        <input  type="text"
                                className="form-control"
                                value = {lastName}
                                onChange = {(e) => {setLastName(e.target.value); setErrorMessage(''); setError('')}}
                                id="inputLastName"
                                required={true} />
                        </div>
                    </div>
                    {/* Role */}
                    <div className="mb-3 row">
                        <label  for="inputRole"
                                className="col-sm-3 col-form-label">
                                Role
                        </label>
                        <div className="col-sm-9">
                            <div className="dropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    {role}
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className = "dropdown-item"
                                        onClick={(e)=> setRole("Student")}>
                                        Student
                                        </a>
                                    </li>
                                    <li>
                                        <a className = "dropdown-item"
                                        onClick={(e)=> setRole("TA")}>
                                        TA
                                        </a>
                                    </li>
                                    <li>
                                        <a className = "dropdown-item"
                                        onClick={(e)=> setRole("Professor")}>
                                        Professor
                                        </a>
                                    </li>
                                </ul>
                                </div>
                            </div>
                    </div>
                    {/* School ID */}
                    <div className="mb-3 row">
                        <label for = "inputSchoolID" className = "col-sm-3 col-form-label">School ID</label>
                        <div className = "col-sm-9">
                            <input type = "text"
                            className = "form-control"
                            value = {schoolID}
                            onChange = {(e) => {setSchoolID(e.target.value); setErrorMessage(''); setError('')}}
                            id="schoolID"
                            required={true}
                            pattern='^([0-9]{9})$'
                            onInvalid={e => e.target.setCustomValidity('schoolID must be 9 digits and unique')} 
                            onInput={e => e.target.setCustomValidity('')} />
                        </div>
                    </div>
                    {/* Email */}
                    <div className="mb-3 row">
                        <label for = "inputEmail" className = "col-sm-3 col-form-label">Email</label>
                        <div className = "col-sm-9">
                            <input type = "text"
                            className = "email form-control"
                            value = {email}
                            onChange = {(e) => {setEmail(e.target.value); setErrorMessage(''); setError('')}}
                            id = "inputEmail"
                            required={true}
                            pattern='^([a-zA-Z0-9]{1,})@spu\.edu$'
                            onInvalid={(event) => {event.target.setCustomValidity('Email must end with @spu.edu and unique')}}
                            onInput={e => e.target.setCustomValidity('')}
                            />
                        </div>
                    </div>      
                    {/* Phone */}
                    <div className = "mb-3 row">
                        <label for= "inputPhone" className = "col-sm-3 col-form-label">Phone</label>
                        <div className = "col-sm-9">
                            <input type = "text" 
                            className = "form-control" 
                            value = {phone}
                            onChange = {(e) => {setPhone(e.target.value); setErrorMessage(''); setError('')}}
                            id = "inputPhone" 
                            required={true}
                            pattern='^([0-9]{10})$' 
                            onInvalid={(event) => {event.target.setCustomValidity('Phone number must have 10 digits: #########')}}
                            onInput={e => e.target.setCustomValidity('')} />
                        </div>
                    </div>
                    {/* Password */}
                    <div className = "mb-3 row">
                        <label for="Password" className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                            <input type={hidePassword ? 'password' : 'text'}
                            className="form-control"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); setErrorMessage(''); setError('')}}
                            id="inputPassword"
                            required={true}
                            pattern='^(.{8,})$'
                            onInvalid={(event) => {event.target.setCustomValidity('Password must have at least 8 characters')}}
                            onInput={e => e.target.setCustomValidity('')} />
                            <img src={eyeSlashHide} className="eye-slash" id="eye-slash-hide" alt="Hide" onClick={togglePassword} />
                            <img src={eyeSlashShow} className="eye-slash" id="eye-slash-show" style={{display: 'none'}} alt="Show" onClick={togglePassword} />
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
                            <img src={eyeSlashHide} className="eye-slash2" id="eye-slash-hide2" alt="Hide" onClick={toggleConfirmPassword} />
                            <img src={eyeSlashShow} className="eye-slash2" id="eye-slash-show2" style={{display: 'none'}} alt="Show" onClick={toggleConfirmPassword} />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="form-buttons">
                        <button type="button" onClick={cancelCreate} className="btn btn-primary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Create</button>
                        {/* <button type="button" onClick={Hashing} className="btn btn-primary">Hash Password</button> */}
                        <span className="errorMessage">{errorMessage}</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
