import { Amplify, API } from "aws-amplify";
import "./styles/ItemInformation.css";
import React from "react";
import { useEffect } from "react";
import awsExport from '../aws-exports';
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation,useNavigate } from "react-router-dom";

Amplify.configure(awsExport);

function ItemInformation() {
    const loc = useLocation();
    const navigate = useNavigate();
    let serialParam = loc.state.serialno;
    const [name,setName] = React.useState('');
    const [serialNumber,setSerialNumber] = React.useState('');
    const [type,setType] = React.useState('');
    const [model,setModel] = React.useState('');
    const [location,setLocation] = React.useState('Location');
    const [roomNumber,setRoom] = React.useState('');
    const [status,setStatus] = React.useState('Status');
    const [manufacturer, setManufacturer] = React.useStatus('');
    const [cost, setCost] = React.useStatus('');
    // const [item, setItem] = React.useState([]);
    const [createdDate, setCreateDate] = React.useState('');
    const [lastUpdate, setLastUpdate] = React.useState('');
    const [image, setImage] = React.useState('');
    useEffect( () => {
        API.get("inventory","/items/object/"+serialParam).then(res => {
            setName(res.name);
            setSerialNumber(res.serialno);
            setType(res.type);
            setModel(res.model);
            setLocation(res.location);
            setRoom(res.roomno);
            setStatus(res.status);
            setManufacturer(res.manufacturer);
            setCost(res.cost);
            setCreateDate(res.createdate);
            setLastUpdate(res.lastupdated);
            setImage(res.Image);
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
                <button onClick={cancelEdit} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                <label>Back</label> 
            </div>
            </div>
            {/* Information Area */}
            <div className="ItemInformation">
                    {/* Image */}
                    <div className = "mb-3 row">
                        <img src={image} width="150" height="150" alt="" />
                    </div>
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
                    {/* Manufacturer */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Manufacturer:</label>
                        <div className = "Information col-sm-8">{manufacturer}</div>
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
                    {/* Cost */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Cost:</label>
                        <div className = "Information col-sm-8">{cost}</div>
                    </div>
                {/* Date Created */}
                <div className = "mb-3 row">
                    <label  className = "Attribute col-sm-4">Create Date:</label>
                    <div className = "Information col-sm-8">{createdDate}</div>
                </div>
                {/* Last Updated */}
                <div className = "mb-3 row">
                    <label  className = "Attribute col-sm-4">Last Updated:</label>
                <div className = "Information col-sm-8">{lastUpdate}</div>
                </div>
            </div>    
        </>        
    );
}

export default ItemInformation;