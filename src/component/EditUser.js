import { Amplify, API } from "aws-amplify";
import "./styles/EditUser.css";
import React from "react";
import { useEffect } from "react";
import awsExport from '../aws-exports';
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation,useNavigate } from "react-router-dom";

Amplify.configure(awsExport);

function EditUser() {
    const location = useLocation();
    const navigate = useNavigate();
    let emailParam = location.state.email;
    const [firstName,setFirstName] = React.useState('');
    const [lastName,setLastName] = React.useState('');
    const [role,setRole] = React.useState('Role');
    const [schoolID,setSchoolID] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [phone,setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [users, setUsers] = React.useState([]);
    const [error, setError] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    let studentLastName, studentFirstName;

    useEffect( () => {
        API.get("userapi","/email/object/"+emailParam).then( res => {
            setFirstName(res.firstname);
            setLastName(res.lastname);
            setEmail(res.email);
            setRole(res.role);
            setPhone(res.phone);
            setSchoolID(res.schoolID);
            setPassword(res.password);
            studentFirstName = res.firstname;
            studentLastName = res.lastname;
        })
        API.get("userapi", "/email").then(res => {
            setUsers([...users,...res]);
        })
    },[]);

    const cancelEdit = () => {
        navigate('/Users');
    }
    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout( () =>{
                navigate("/Users");
        },1500);
    }

    React.useEffect(() => {
        if(error === '1'){
            setErrorMessage('schoolID is already exist');
        }
    }, [error])

    const EditUser = (e) => {
        e.preventDefault();
        for(var i = 0; i < users.length; i++){
            if(users[i].firstName == studentFirstName && users[i].lastName == studentLastName){
                continue;
            }
            if(users[i].schoolID == schoolID){
                throw new Error(setError('1'));
            }
        }
        API.post("userapi","/email/", {
            body : {
            firstname : firstName,
            lastname : lastName,
            role : role,
            schoolID : schoolID,
            email : email,
            phone : phone,
            password : password,
        }});

        ShowAlert();
    }

    return (
        <>
            <div className="alert alert-success" id="alert" role="alert">
                The user has been updated successfully!
            </div>
            <Sidebar />
            <Header />

            <div className="UserHeader">
                    <div className="content">
                        <div>
                        <button onClick={cancelEdit} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                        <label>Edit User</label> 
                        </div>
                    </div>
            </div>


            <div className="EditUserForm">
                <form onSubmit={EditUser}>
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
                            required = {true}
                            pattern = '^([0-9]{9})$'
                            onInvalid={e => e.target.setCustomValidity('schoolID must be 9 digits and unique')} 
                            onInput={e => e.target.setCustomValidity('')} />
                        </div>
                    </div>
                    {/* Email */}
                    <div className="mb-3 row">
                        <label for = "inputEmail" className = "col-sm-2 col-form-label">Email</label>
                        <div className = "col-sm-10">
                            <div className = "emailInfo">{email}</div>
                            {/* <input type = "text"
                            className = "form-control"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            id = "inputEmail"
                            required = {true}
                            pattern = '^([a-z0-9]{1,})@spu\.edu$' /> */}
                        </div>
                    </div>
                    {/* Phone */}
                    <div className = "mb-3 row">
                        <label for = "inputPhone" className = "col-sm-2 col-form-label">Phone</label>
                        <div className = "col-sm-10">
                            <input type = "text"
                            className = "form-control"
                            value = {phone}
                            onChange = {(e) => setPhone(e.target.value)}
                            id = "inputPhone"
                            required = {true}
                            pattern='^([0-9]{10})$'
                            onInvalid={(event) => {event.target.setCustomValidity('Phone number must have 10 digits: #########')}}
                            onInput={e => e.target.setCustomValidity('')}
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div className = "mb-3 row">
                        <label for="Password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="text"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="inputPassword"
                            required={true}
                            pattern='^(.{8,})$'
                            onInvalid={(event) => {event.target.setCustomValidity('Password must have at least 8 characters')}}
                            onInput={e => e.target.setCustomValidity('')} />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="form-buttons">
                        <button type="button" onClick={cancelEdit} className="btn btn-primary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Update</button> 
                        <span className="errorMessage">{errorMessage}</span>
                    </div>
                </form>
            </div>
        </>
        
        
    );
}

export default EditUser;