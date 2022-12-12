import { API } from "aws-amplify";
import "./CreateUser.css";
import React from "react";

function CreateUser() {
   
    const [firstName,setFirstName] = React.useState('');
    const [lastName,setLastName] = React.useState('');
    const [role,setRole] = React.useState('Role');
    const [schoolID,setSchoolID] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [phone,setPhone] = React.useState('');

    API.post("userapi","/email/", {
        body : {
        firstname : firstName,
        lastname : lastName,
        role : role,
        schoolID : schoolID,
        email : "1111",
        phone : phone,
        password : "password"
        }
    });
    const AddUser = (e) => {
        e.preventDefault();
        console.log("asdsada");
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
    }

    return (
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
                            id="inputFirstName" />
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
                            id="inputLastName" />
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
                        id="schoolID" />
                    </div>
                </div>
                {/* Email */}
                <div className="mb-3 row">
                    <label for = "inputEmail" className = "col-sm-2 col-form-label">Email</label>
                    <div className = "col-sm-10">
                        <input type = "text"
                        className = "form-control"
                        value = {email}
                        onChange = {(e) => { console.log(e.target.value);setEmail(e.target.value)}}
                        id = "inputEmail" />
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
                        id = "inputPhone" />
                    </div>
                </div>
                {/* Submit Button */}
                <div className="mb-3 row">
                    <div className="col-sm-10">
                    <button type="submit" class="btn btn-primary mb-3">Create</button>
                    </div>
                </div>
            </form>
            
        </div>
        
    );
}

export default CreateUser;