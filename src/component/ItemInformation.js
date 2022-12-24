import { Amplify, API } from "aws-amplify";
import "./styles/ItemInformation.css";
import React from "react";
import { useEffect } from "react";
import awsExport from '../aws-exports';
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation,useNavigate } from "react-router-dom";

Amplify.configure(awsExport);

function UserInformation(e) {
    const loc = useLocation();
    const navigate = useNavigate();
    let SerialNumberParam = loc.state.serialno;
    const [name,setName] = React.useState('');
    const [serialNumber,setSerialNumber] = React.useState('');
    const [type,setType] = React.useState('');
    const [model,setModel] = React.useState('');
    const [location,setLocation] = React.useState('Location');
    const [roomNumber,setRoom] = React.useState('');
    const [status,setStatus] = React.useState('Status');
    const [items, setItem] = React.useState([]);
    const [createDate, setCreateDate] = React.useState('');
    const [lastUpdate, setLastUpdate] = React.useState('');
    useEffect( () => {
        API.get("inventory","/serialno/object"+SerialNumberParam).then(res => {
            setName(res.name);
            setSerialNumber(res.serialNumber);
            setType(res.type);
            setModel(res.model);
            setLocation(res.location);
            setRoom(res.roomNumber);
            setStatus(res.status);
          })},[]);

    const cancelEdit = () => {
        navigate('/Inventory');
    }

    return (
        <>
        <Sidebar />
        <Header />
        <div className="UserHeader">
            <div className="fs-4 ms-5 fw-bold">
                <button onClick={cancelEdit} className="PageHeaderBtn"><i class="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                <label>Item Information</label> 
            </div>
            </div>
            {/* Information Area */}
            <div className="ItemInformation">
                    {/* Name*/}
                    <div className = "mb-3 row">
                        <label  className = "Attribute col-sm-4">Name:</label>
                        <div className = "Information col-sm-8">{name}</div>
                    </div>
                    {/* Serial Number */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Serial Number:</label>
                        <div className = "Information col-sm-8">{serialNumber}</div>
                    </div>
                    {/* Type */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Type:</label>
                        <div className = "Information col-sm-8">{type}</div>
                    </div>
                    {/* Model */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Model:</label>
                        <div className = "Information col-sm-8">{model}</div>
                    </div>
                    {/* Location */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Location:</label>
                        <div className = "Information col-sm-8">{location}</div>
                    </div>
                    {/* Room Number */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Room Number:</label>
                        <div className = "Information col-sm-8">{roomNumber}</div>
                    </div>
                    {/* Status */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Status:</label>
                        <div className = "Information col-sm-8">{status}</div>
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
        </>        
    );
}

export default UserInformation;