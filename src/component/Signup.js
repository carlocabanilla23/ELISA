import React, { useState, useEffect} from 'react';
import {API, Amplify} from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import awsExport from '../aws-exports';
import './styles/Signup.css';


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
    const navigate = useNavigate();

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
        }
    }, [error])

    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout(() => {
            navigate('/');
        }, 1500);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const userList = API.get("userapi", "/email/") 
        .then(res => {
            setUserList([userList, ...res]);
        }, [error]);
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
            setError(4);
        }

        API.post("userapi","/email/", {
            body : {
            firstname : firstName,
            lastname : lastName,
            role : role,
            schoolID : schoolID,
            email : email,
            phone : phone,
            password : "password"
            }
        });

        API.post("emailsystem","/email/send", {
            body : {
            id : crypto.randomUUID(),
            email : email
            }
        });

        API.post("emailsystem","/email", {
            body : {
            id : crypto.randomUUID(),
            email : email
            }
        });
        
        console.log("success");
        ShowAlert();
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
                                onChange = {(e) => {setFirstName(e.target.value); setErrorMessage('')}}
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
                                onChange = {(e) => {setLastName(e.target.value); setErrorMessage('')}}
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
                            onChange = {(e) => {setSchoolID(e.target.value); setErrorMessage('')}}
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
                            onChange = {(e) => {setEmail(e.target.value); setErrorMessage('')}}
                            id = "inputEmail"
                            required={true}
                            // pattern='^([a-z0-9]{1,})@spu\.edu$' 
                            // onInvalid={(event) => {event.target.setCustomValidity('Email must end with @spu.edu and unique')}}
                            // onInput={e => e.target.setCustomValidity('')}
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
                            onChange = {(e) => {setPhone(e.target.value); setErrorMessage('')}}
                            id = "inputPhone" 
                            required={true}
                            pattern='^([0-9]{10})$' 
                            onInvalid={(event) => {event.target.setCustomValidity('Phone number must have 10 digits: #########')}}
                            onInput={e => e.target.setCustomValidity('')} />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="form-buttons">
                        <button type="button" onClick={cancelCreate} className="btn btn-primary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Create</button>
                        <span className="errorMessage">{errorMessage}</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;