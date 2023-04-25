import { API } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../assets/styles/ViewItemInfo.css';
import logo from '../assets/icons/elisa_logo.png';



function ViewItemInfo () {
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
    const navigate = useNavigate();

    useEffect( () => {
        API.get("items","/items/object/"+param).then(res => {
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

        const reserveItem = () => {
            navigate("/CreateReservation/"+type +"/"+serialNumber);
        }
    return (
        <>
            <div className="p-3 mb-4 border mobile-header">
                    <img src={logo} className="mobile-header-logo1" alt="Elisa Logo" />
                    <p className="h1 text-center mobile-header-text"> Item Information</p>
            </div>

            <div className="mobile-ViewInfo">
                {/* Image */}
                <div className="text-center mobile-item-img">
                    <img  src={image} width="150" height="150" alt="" />
                </div>
                {/* Name */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col">Name:</label>
                    <div className = "Information col">{name}</div>
                </div>
                {/* Serial Number */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col">Serial #:</label>
                    <div className = "Information col">{serialNumber}</div>
                </div>
                {/* Type */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col">Type:</label>
                    <div className = "Information col">{type}</div>
                </div>
                {/* Model */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col">Model:</label>
                    <div className = "Information col">{model}</div>
                </div>
                {/* Manufacturer */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col">Manufacturer:</label>
                    <div className = "Information col">{manufacturer}</div>
                </div>
                {/* Location */}
                {/* <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col">Location:</label>
                    <div className = "Information col">{location}</div>
                </div> */}
                {/* Room Number */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col">Room #:</label>
                    <div className = "Information col">{roomNumber}</div>
                </div>
                {/* Status */}
                <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col">Status:</label>
                    <div className = "Information col">{status}</div>
                </div>
                {/* Cost */}
                {/* <div className="mx-2 mb-3 row">
                    <label  className = "Attribute col">Cost:</label>
                    <div className = "Information col">{cost}</div>
                </div> */}
                {/* Date Created */}
                {/* <div className = "mx-2 mb-3 row">
                    <label  className = "Attribute col">Created:</label>
                    <div className = "Information col">{createDate}</div>
                </div> */}
                {/* Last Updated */}
                {/* <div className = "mx-2 mb-3 row">
                    <label  className = "Attribute col">Updated:</label>
                    <div className = "Information col">{lastUpdate}</div>
                </div> */}
                {/* Date Acquired */}
                {/* <div className = "mx-2 mb-3 row">
                    <label  className = "Attribute col">Acquired:</label>
                    <div className = "Information col">{acquiredDate}</div>
                </div> */}
                {/* Date Expired */}
                {/* <div className = "mx-2 mb-3 row">
                    <label  className = "Attribute col">Expired:</label>
                    <div className = "Information col">{expiredDate}</div>
                </div> */}

                <button onClick={ e=> { reserveItem()}} className='mobile-btn btn btn-dark'>Reserve Item</button>

            </div>
        </>
      
    );
    
}

export default ViewItemInfo;