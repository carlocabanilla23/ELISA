import { API } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/ViewItemInfo.css';
import logo from '../icons/elisa_logo.png';



function ViewItemInfo () {
    const [data,setData] = useState();
    const {param} = useParams();

    const [name,setName] = useState('');
    const [serialNumber,setSerialNumber] = useState('');
    const [type,setType] = useState('');
    const [model,setModel] = useState('');
    const [location,setLocation] = useState('Location');
    const [roomNumber,setRoom] = useState('');
    const [status,setStatus] = useState('Status');
    const [manufacturer, setManufacturer] = useState('');
    const [cost, setCost] = useState('');
    const [createDate, setCreatedDate] = useState('');
    const [lastUpdate, setLastUpdated] = useState('');
    const [acquiredDate, setAcquiredDate] = useState('');
    const [expiredDate, setExpiredDate] = useState('');
    const [image,setImage] = useState('');

    useEffect( () => {
        API.get("inventory","/items/object/"+param).then(res => {
            setName(res.name);
            setSerialNumber(res.serialno);
            setType(res.type);
            setModel(res.model);
            setLocation(res.location);
            setRoom(res.roomno);
            setStatus(res.status);
            setManufacturer(res.manufacturer);
            setCost(res.cost);
            setCreatedDate(res.createdate);
            setLastUpdated(res.lastupdated);
            setAcquiredDate(res.acquiredate);
            setExpiredDate(res.expiredate);
            setImage(res.image);
        })},[]);


    return (
        <>
            <div className="ViewInfo">
                <div className="p-3 mb-4 bg-light border">
                    <img src={logo} className="logo1" alt="Elisa Logo" />
                    <p className="h1 text-center"> Item Information</p>
                </div>
                {/* Image */}
                <img src={image} width="150" height="150" alt="" />
                {/* Serial Number */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Serial #:</label>
                    <div className = "Information col-sm-8">{serialNumber}</div>
                </div>
                {/* Type */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Type:</label>
                    <div className = "Information col-sm-8">{type}</div>
                </div>
                {/* Model */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Model:</label>
                    <div className = "Information col-sm-8">{model}</div>
                </div>
                {/* Manufacturer */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Manufacturer:</label>
                    <div className = "Information col-sm-8">{manufacturer}</div>
                </div>
                {/* Location */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Location:</label>
                    <div className = "Information col-sm-8">{location}</div>
                </div>
                {/* Room Number */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Room #:</label>
                    <div className = "Information col-sm-8">{roomNumber}</div>
                </div>
                {/* Status */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Status:</label>
                    <div className = "Information col-sm-8">{status}</div>
                </div>
                {/* Cost */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Cost:</label>
                    <div className = "Information col-sm-8">{cost}</div>
                </div>
                {/* Date Created */}
                <div className = "mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Created:</label>
                    <div className = "Information col-sm-8">{createDate}</div>
                </div>
                {/* Last Updated */}
                <div className = "mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Updated:</label>
                    <div className = "Information col-sm-8">{lastUpdate}</div>
                </div>
                {/* Date Acquired */}
                <div className = "mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Acquired:</label>
                    <div className = "Information col-sm-8">{acquiredDate}</div>
                </div>
                {/* Date Expired */}
                <div className = "mx-2 mb-3 row">
                    <label  className = "Attribute col-sm-4">Expired:</label>
                    <div className = "Information col-sm-8">{expiredDate}</div>
                </div>
            </div>
        </>
      
    );
    
}

export default ViewItemInfo;