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
              var text = ''
              for(var i = 0; i < res.password.length; i++){
                text += '*';
              }
              setPassword(text);
          })},[]);

    const cancelEdit = () => {
        navigate('/Users');
    }

    return (
        <div>
            {/* Header and Sidebar */}
            <div className="head">
                <Sidebar />
                <Header />
                <div className="UserHeader">
                    <div className="content">
                        <div>
                        <button onClick={cancelEdit} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                        <label>User Information</label> 
                        </div>
                    </div>
            </div>
            </div>
            {/* Information Area */}
            <div className="UserInformation">
                {/* Picture */}
                <div className="PersonalInformation">
                    <div className = "mb-3 row justify-content-between">
                        <label  className = "Attribute col-sm-4">Photo:</label>
                        <div className = "Information col-sm-8">photo</div>
                    </div>
                    {/* First Name */}
                    <div className = "mb-3 row">
                        <label  className = "Attribute col-sm-4">First Name:</label>
                        <div className = "Information col-sm-8">{firstName}</div>
                    </div>
                    {/* Last Name */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Last Name:</label>
                        <div className = "Information col-sm-8">{lastName}</div>
                    </div>
                    {/* Role */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Role:</label>
                        <div className = "Information col-sm-8">{role}</div>
                    </div>
                    {/* School ID */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">School ID:</label>
                        <div className = "Information col-sm-8">{schoolID}</div>
                    </div>
                    {/* Email */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Email:</label>
                        <div className = "Information col-sm-8">{email}</div>
                    </div>      
                    {/* Phone */}
                    <div className = "mb-3 row">
                        <label  className = "Attribute col-sm-4">Phone:</label>
                        <div className = "Information col-sm-8">{phone}</div>
                    </div>
                    {/* Password */}
                    <div className = "mb-3 row">
                        <label  className = "Attribute col-sm-4">Password:</label>
                        <div className = "Information col-sm-8">{password}</div>
                    </div>
                </div>
                {/* Date Created */}
                <div className = "mb-3 row">
                    <label  className = "Attribute col-sm-4">Date Created:</label>
                    <div className = "Information col-sm-8">2022-12-21 8:00PM</div>
                </div>
                {/* Last Updated */}
                <div className = "mb-3 row">
                    <label  className = "Attribute col-sm-4">Last Updated:</label>
                    <div className = "Information col-sm-8">2022-12-21 8:00PM</div>
                </div>
            </div>
        </div>
        
        
    );
}

export default UserInformation;