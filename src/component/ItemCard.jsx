import React from "react";
import "./styles/User.css";
import "./styles/OffCanvas.css";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import { API } from "aws-amplify";
import { Generate } from "./code-generator/qrcode";
import * as ReactDOM from 'react-dom/client';
import { GenerateBarcode } from "./code-generator/barcode";


const ItemCard = ({ item, updateList}) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const [name,setName] = React.useState('');
  const [serialNumber,setSerialNumber] = React.useState('');
  const [type,setType] = React.useState('');
  const [model,setModel] = React.useState('');
  const [location,setLocation] = React.useState('Location');
  const [roomNumber,setRoom] = React.useState('');
  const [status,setStatus] = React.useState('Status');
  const [allItems, setItems] = useState([]);
  const [qrcode,setQRCode] = useState();
  const [barcode,setBarcode] = useState();


  useEffect( () => {
    API.get("inventory","/items").then( itemRes => {
      setItems(itemRes);
      // setName(res.name);
        // setSerialNumber(res.serialno);
        // setType(res.type);
        // setModel(res.model);
        // setLocation(res.location);
        // setRoom(res.roomno);
        // setStatus(res.status);
        // setCreateDate(res.createdate);
        // setLastUpdate(res.lastupdate);
      })
    },[]);
  const EditItem = (e) => {
    console.log(e);
    navigate("/EditItem", {
      state: {
        serialno: e,
      },
    });
  };
  const ItemInformation = (e) => {
    console.log(e);
    navigate("/ItemInformation", {
      state: {
        serialno: e,
      },
    });
  };

  const CreateQRCode = (e) => {
    document.getElementById("item-info").style.display = "none";
    document.getElementById("qrcode").style.display = "block";
    document.getElementById("barcode").style.display = "none";
  
    console.log(item.serialno);
  let svg = Generate(item.serialno);
  setQRCode(svg);
  }
  const CreateBarcode = (e) => {
    document.getElementById("item-info").style.display = "none";
    document.getElementById("qrcode").style.display = "none";
    document.getElementById("barcode").style.display = "block";

    console.log(item.serialno);
  let svg = GenerateBarcode(item.serialno);
  setBarcode(svg);
  }

  const ViewInformation = (e) => {
    document.getElementById("item-info").style.display = "block";
    document.getElementById("qrcode").style.display = "none";
    document.getElementById("barcode").style.display = "none";

  }
  return (
    <div className="UserRowItems">
      <div className="container-fluid">
        <div className="row ">
          <div className="col"> {item.serialno} </div>
          <div className="col"> {item.name} </div>
          <div className="col"> {item.type} </div>
          <div id="model" className="col"> {item.model} </div>
          <div id="location" className="col"> {item.location} </div>
          <div id="roomNumber" className="col"> {item.roomno} </div>
          <div id="status" className="col"> {item.status} </div>
          <div className="col actions">
            <div className="row">
              <div className="col actions-column">
                <div className="dropdown p-0 m-0 sm">
                  <button
                    className="user-dropdown btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-h"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a onClick={ (e) => ViewInformation()}
                        className="dropdown-item"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                        // onClick={() => ItemInformation(item.serialno)}
                      >View Information</a>
                    </li>
                    <li style={{display: 'none'}} id="mobile">
                      <a className="dropdown-item" type="button" onClick={() => EditItem(item.serialno)}>Edit</a>
                    </li>
                    <li>
                      <a onClick={ (e) => CreateQRCode(serialNumber)}
                      className="dropdown-item"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                      >Print QR Code</a>
                    </li>
                    <li>
                      <a onClick = { (e) => CreateBarcode(serialNumber)}
                      className="dropdown-item"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                      >Print Barcode</a>
                    </li>
                    <li>
                      <a className="dropdown-item">Change Status</a>
                    </li>
                    <li style={{display: 'none'}} id="mobile">
                      <a className="dropdown-item" type="button" onClick={() => updateList(item.serialno)}>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div id="computer" className="col actions-column">
                <button className="btn" onClick={() => EditItem(item.serialno)}>
                  <i className="fa fa-pencil"></i>
                </button>
              </div>
              <div id="computer" className="col actions-column">
                <button
                  className="btn"
                  onClick={() => updateList(item.serialno)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">{item.name}</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
          <div className="offcanvas-body">
            <div id="item-info">
                {/* Serial Number */}
                <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Serial #:</label>
                        <div className = "Information col-sm-8">{item.serialno}</div>
                    </div>
                    {/* Type */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Type:</label>
                        <div className = "Information col-sm-8">{item.type}</div>
                    </div>
                    {/* Model */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Model:</label>
                        <div className = "Information col-sm-8">{item.model}</div>
                    </div>
                    {/* Manufacturer */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Manufacturer:</label>
                        <div className = "Information col-sm-8">{item.manufacturer}</div>
                    </div>
                    {/* Location */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Location:</label>
                        <div className = "Information col-sm-8">{item.location}</div>
                    </div>
                    {/* Room Number */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Room #:</label>
                        <div className = "Information col-sm-8">{item.roomno}</div>
                    </div>
                    {/* Status */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Status:</label>
                        <div className = "Information col-sm-8">{item.status}</div>
                    </div>
                    {/* Cost */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Cost:</label>
                        <div className = "Information col-sm-8">{item.cost}</div>
                    </div>
                {/* Date Created */}
                <div className = "mb-3 row">
                    <label  className = "Attribute col-sm-4">Created:</label>
                    <div className = "Information col-sm-8">{item.createdate}</div>
                </div>
                {/* Last Updated */}
                <div className = "mb-3 row">
                    <label  className = "Attribute col-sm-4">Updated:</label>
                    <div className = "Information col-sm-8">{item.lastupdated}</div>
                </div>
                {/* Dated Acquired */}
                <div className = "mb-3 row">
                    <label  className = "Attribute col-sm-4">Acquired:</label>
                    <div className = "Information col-sm-8">{item.acquiredate}</div>
                </div>
                {/* Dated Expired */}
                <div className = "mb-3 row">
                    <label  className = "Attribute col-sm-4">Expired:</label>
                    <div className = "Information col-sm-8">{item.expiredate}</div>
                </div>
            </div>

            <div id="qrcode">
                {qrcode}
            </div>

            <div id="barcode">
                {barcode}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
