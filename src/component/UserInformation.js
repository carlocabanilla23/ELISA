import { Amplify, API } from "aws-amplify";
import "./styles/UserInformation.css";
import React from "react";
import { useEffect } from "react";
import awsExport from '../aws-exports';
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation,useNavigate } from "react-router-dom";

Amplify.configure(awsExport);

function UserInformation(e) {
    const location = useLocation();
    const navigate = useNavigate();
    let emailParam = location.state.email;
    const [photo, setPhoto] = React.useState('');
    const [firstName,setFirstName] = React.useState('');
    const [lastName,setLastName] = React.useState('');
    const [role,setRole] = React.useState('Role');
    const [schoolID,setSchoolID] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [phone,setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [createDate, setCreateDate] = React.useState('');
    const [lastUpdate, setLastUpdate] = React.useState('');
    const [users, setUsers] = React.useState([]);
    useEffect( () => {
        API.get("userapi","/email/object/"+emailParam).then( res => {
              setFirstName(res.firstname);
              setLastName(res.lastname);
              setEmail(res.email);
              setRole(res.role);
              setPhone(res.phone);
              setSchoolID(res.schoolID);
              setPassword(res.password);
          })},[]);

    const leaveView = () => {
        navigate('/Users');
    }

    return (
        <div>
            {/* Header and Sidebar */}
            <div className="head">
                <Sidebar />
                <Header />
                <div className="UserHeader">
                        <div className="fs-4 ms-5 fw-bold">
                            <button onClick={leaveView} className="PageHeaderBtn"><i class="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                            <label className="HeaderBtnLabel">User Information</label> 
                        </div>
                </div>
            </div>
            {/* Information Area */}
            <div className="UserInformation">
                {/* Picture */}
                <div className = "mb-3 row">
                    <label  className = "col-sm-4 col-form-label">Photo:</label>
                    <div className = "Information col-sm-8 col-form-label">photo</div>
                </div>
                {/* First Name */}
                <div className = "mb-3 row">
                    <label  className = "col-sm-4 col-form-label">First Name:</label>
                    <div className = "Information col-sm-8 col-form-label">{firstName}</div>
                </div>
                {/* Last Name */}
                <div className="mb-3 row">
                    <label  className = "col-sm-4 col-form-label">Last Name:</label>
                    <div className = "Information col-sm-8 col-form-label">{lastName}</div>
                </div>
                {/* Role */}
                <div className="mb-3 row">
                    <label  className = "col-sm-4 col-form-label">Role:</label>
                    <div className = "Information col-sm-8 col-form-label">{role}</div>
                </div>
                {/* School ID */}
                <div className="mb-3 row">
                    <label  className = "col-sm-4 col-form-label">School ID:</label>
                    <div className = "Information col-sm-8 col-form-label">{schoolID}</div>
                </div>
                {/* Email */}
                <div className="mb-3 row">
                    <label  className = "col-sm-4 col-form-label">Email:</label>
                    <div className = "Information col-sm-8 col-form-label">{email}</div>
                </div>      
                {/* Phone */}
                <div className = "mb-3 row">
                    <label  className = "col-sm-4 col-form-label">Phone:</label>
                    <div className = "Information col-sm-8 col-form-label">{phone}</div>
                </div>
                {/* Password */}
                <div className = "mb-3 row">
                    <label  className = "col-sm-4 col-form-label">Password:</label>
                    <div className = "Information col-sm-8 col-form-label">{password}</div>
                </div>
                {/* Date Created */}
                <div className = "mb-3 row">
                    <label  className = "col-sm-4 col-form-label">Date Created:</label>
                    <div className = "Information col-sm-8 col-form-label">2022-12-21 8:00PM</div>
                </div>
                {/* Last Updated */}
                <div className = "mb-3 row">
                    <label  className = "col-sm-4 col-form-label">Last Update:</label>
                    <div className = "Information col-sm-8 col-form-label">2022-12-21 8:00PM</div>
                </div>
            </div>
        </div>
        
        
    );
}

export default UserInformation;