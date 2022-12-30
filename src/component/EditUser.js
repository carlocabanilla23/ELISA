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
    const [users, setUsers] = React.useState([]);

    useEffect( () => {
        API.get("userapi","/email/object/"+emailParam).then( res => {
              setFirstName(res.firstname);
              setLastName(res.lastname);
              setEmail(res.email);
              setRole(res.role);
              setPhone(res.phone);
              setSchoolID(res.schoolID);
          })},[]);
    
    const cancelEdit = () => {
        navigate('/Users');
    }    
    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout( () =>{
                navigate("/Inventory");
        },1500);
    }

    const EditUser = (e) => {
        e.preventDefault();
        const userList = API.get("userapi", "/email/")
            .then(res => {
                setUsers([userList,...res]);
            });
        // for(var i = 0; i < users.length; i++){
        //     if(users[i].email == email && users[i].schoolID == schoolID){
        //         throw new Error(alert("Email and schoolID are already exist"));
        //     }else if (users[i].email == email){
        //         throw new Error(alert("Email are already exist"));
        //     }
        //     else if(users[i].schoolID == schoolID){
        //         throw new Error(alert("schoolID are already exist"));
        //     }
        // }
        API.post("userapi","/email/", {
            body : {
            firstname : firstName,
            lastname : lastName,
            role : role,
            schoolID : schoolID,
            email : email,
            phone : phone,
            password : "password"
        }});

        ShowAlert();
    }

    return (
        <>
            <div class="alert alert-success" id="alert" role="alert">
                The user has been updated successfully!
            </div>
            <Sidebar />
            <Header />

            <div className="UserHeader">
                    <div className="fs-4 ms-5 fw-bold">
                        <button onClick={cancelEdit} className="PageHeaderBtn"><i class="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                        <label>Edit User</label> 
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
                        <span className="errorMessage">{firstName?"":"FirstName is required"}</span>
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
                                <span className="errorMessage">{lastName?"":"LastName is required"}</span>
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
                                <span className="errorMessage">{role==="Role"?"Choose a role":""}</span>
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
                            pattern = '^([0-9]{8})$' />
                            <span className="errorMessage">{schoolID?"schoolID must be unique":"schoolID is required"}</span>
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
                            required = {true}
                            pattern = '^([a-z0-9]{1,})@spu\.edu$' />
                            <span className="errorMessage">{email?"Email must end with @spu.edu and unique":"Email is required"}</span>
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
                            />
                            <span className="errorMessage">{phone?"Valid phone format: (111) 111-1111":"Phone is required"}</span>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="form-buttons">
                        <button type="button" onClick={cancelEdit} className="btn btn-primary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Update</button> 
                    </div>
                </form>
            </div>
        </>
        
        
    );
}

export default EditUser;