import { Amplify, API } from "aws-amplify";
import "./styles/CreateUser.css";
import React from "react";
import awsExport from '../aws-exports';
import Sidebar from './Sidebar';
import Header from './Header';
import BackArrow from './icons/back_arrow.png';
import { Navigate, useNavigate } from 'react-router-dom'; 

Amplify.configure(awsExport);

function CreateUser() {
    
    const [firstName,setFirstName] = React.useState('');
    const [lastName,setLastName] = React.useState('');
    const [role,setRole] = React.useState('Role');
    const [schoolID,setSchoolID] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [phone,setPhone] = React.useState('');

    const [users, setUsers] = React.useState([]);

    const navigate = useNavigate();

    const AddUser = (e) => {
        e.preventDefault();
        // validate if school ID and email are already exist
        const userList = API.get("userapi", "/email/")
            .then(res => {
                setUsers([userList,...res]);
            });
        for(var i = 0; i < users.length; i++){
            if(users[i].email == email && users[i].schoolID == schoolID){
                throw new Error(alert("Email and schoolID are already exist"));
            }else if (users[i].email == email){
                throw new Error(alert("Email are already exist"));
            }else if(users[i].schoolID == schoolID){
                throw new Error(alert("schoolID are already exist"));
            }
        }
        // Add new user to the database
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
        alert("You successfully create a user");
        navigate('/Users');
    }

    return (
        <div className="CreateUserWindow">
            <Sidebar />
            <Header />
            {/* Previous Page Navigation Bar */}
            <div className="PrevNavbar">
                <a href="/Users">
                    <img src={BackArrow} className="back-arrow" alt="back arrow" />
                </a>
                <label className="prevPage">User</label>
            </div>
            <div className="CreateUserForm">
                <form onSubmit={AddUser}>
                    {/* First Name */}
                    <div className = "mb-3 row">
                        <label  for = "inputFirstName"
                                className = "col-sm-2 col-form-label">
                                First Name
                        </label>
                        <div className = "col-sm-10">
                        <input  type = "text"
                                className = "form-control"
                                value = {firstName}
                                onChange = {(e) => setFirstName(e.target.value)}
                                id="inputFirstName"
                                required={true} />
                        {/* <span className="errorMessage">{firstName?"":"FirstName is required"}</span> */}
                        </div>
                    </div>
                    {/* Last Name */}
                    <div className="mb-3 row">
                        <label  for="inputLastName"
                                className="col-sm-2 col-form-label">
                                Last Name
                        </label>
                        <div className="col-sm-10">
                        <input  type="text"
                                className="form-control"
                                value = {lastName}
                                onChange = {(e) => setLastName(e.target.value)}
                                id="inputLastName"
                                required={true} />
                        {/* <span className="errorMessage">{lastName?"":"LastName is required"}</span> */}
                        </div>
                    </div>
                    {/* Role */}
                    <div className="mb-3 row">
                        <label  for="inputRole"
                                className="col-sm-2 col-form-label">
                                Role
                        </label>
                        <div className="col-sm-10">
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
                                {/* <span className="errorMessage">{role==="Role"?"Choose a role":""}</span> */}
                                </div>
                            </div>
                    </div>
                    {/* School ID */}
                    <div className="mb-3 row">
                        <label for = "inputSchoolID" className = "col-sm-2 col-form-label">School ID</label>
                        <div className = "col-sm-10">
                            <input type = "text"
                            className = "form-control"
                            value = {schoolID}
                            onChange = {(e) => setSchoolID(e.target.value)}
                            id="schoolID"
                            required={true}
                            pattern='^([0-9]{8})$' />
                        <span className="errorMessage">{schoolID?"schoolID must be unique":""}</span>
                        </div>
                    </div>
                    {/* Email */}
                    <div className="mb-3 row">
                        <label for = "inputEmail" className = "col-sm-2 col-form-label">Email</label>
                        <div className = "col-sm-10">
                            <input type = "text"
                            className = "form-control"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            id = "inputEmail"
                            required={true}
                            pattern='^([a-z0-9]{1,})@spu\.edu$' />
                        <span className="errorMessage">{email?"Email must end with @spu.edu and unique":""}</span>
                        </div>
                    </div>      
                    {/* Phone */}
                    <div className = "mb-3 row">
                        <label for= "inputPhone" className = "col-sm-2 col-form-label">Phone</label>
                        <div className = "col-sm-10">
                            <input type = "text" 
                            className = "form-control" 
                            value = {phone}
                            onChange = {(e) => setPhone(e.target.value)}
                            id = "inputPhone" 
                            required={true}
                            pattern='^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$' />
                        <span className="errorMessage">{phone?"Valid phone format: (111) 111-1111":""}</span>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="mb-3 row">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary mb-3" onClick={() => navigate('/Users')}>Cancel</button>
                        <button type="submit" className="btn btn-primary mb-3">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
    );
}

export default CreateUser;