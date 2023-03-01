import React from "react";
import "./styles/User.css";
import "./styles/OffCanvas.css";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import { API } from "aws-amplify";
import { Generate } from "./code-generator/qrcode";
import * as ReactDOM from 'react-dom/client';
import { GenerateBarcode } from "./code-generator/barcode";
import OffCanvasCard from "./card/OffCanvasCard";


const ItemCard = ({ item, updateList,ViewInformation,CreateQRCode,CreateBarcode,changeStatus}) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const [name,setName] = React.useState('');
  const [serialNumber,setSerialNumber] = React.useState('');
  const [type,setType] = React.useState('');
  const [model,setModel] = React.useState('');
  const [location,setLocation] = React.useState('Location');
  const [roomNumber,setRoom] = React.useState('');
  const [status,setStatus] = React.useState('Status');
  const [newnewStatus, setnewnewStatus] = useState('status');
  const [allItems, setItems] = useState([]);
  const [qrcode,setQRCode] = useState();
  const [image, setImage] = useState('');
  const [manufacturer,setManufacturer] = useState('');
  const [cost, setCost] = useState('');
  const [createdate, setCreatedate] = useState('');
  const [lastupdated, setLastdate] = useState('');
  const [acquiredate, setAcquiredate] = useState('');
  const [expiredate, setExpiredate] = useState('');
  const [itemInfo,setItemInfo] = useState();
 
  const [offItems, SetOffItems] = useState('');


  useEffect( () => {
    setStatus(item.status)
    setnewnewStatus(item.status)
    
    },[]);
    
  const EditItem = (e) => {
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

  // const CreateQRCode = (e) => {
  //   document.getElementById("item-info").style.display = "none";
  //   document.getElementById("qrcode").style.display = "block";
  //   document.getElementById("barcode").style.display = "none";
  //   document.getElementById("Offstatus").style.display = "none";
  
  //   console.log(e.serialno);
  // let svg = Generate(e.serialno);
  // setQRCode(svg);
  // }
  // const CreateBarcode = (e) => {
  //   document.getElementById("item-info").style.display = "none";
  //   document.getElementById("qrcode").style.display = "none";
  //   document.getElementById("barcode").style.display = "block";
  //   document.getElementById("Offstatus").style.display = "none";

  //   console.log(e.serialno);
  // let svg = GenerateBarcode(e.serialno);
  // setBarcode(svg);
  // }

  // const ViewInformation = (e) => {
  //   // e.preventDefault();
 
 
  //   document.getElementById("item-info").style.display = "block";
  //   document.getElementById("qrcode").style.display = "none";
  //   document.getElementById("barcode").style.display = "none";
  //   document.getElementById("Offstatus").style.display = "none";
  //   setItemInfo( <OffCanvasCard item={item} />)
  // } 
  
    
  
  // const changeStatus = () => {
  //   document.getElementById("item-info").style.display = "none";
  //   document.getElementById("qrcode").style.display = "none";
  //   document.getElementById("barcode").style.display = "none";
  //   document.getElementById("Offstatus").style.display = "block";
     
  // }

  // const newStatus = () => {
  //   const today = new Date();
  //   console.log(item);
  //   API.post("inventory","/items/", {
  //     body : {
  //        name : item.name,
  //        serialno : item.serialno, 
  //        type : item.type,
  //        model : item.model,
  //        location : item.location,
  //        roomno : item.roomno,
  //        status : newnewStatus, 
  //        manufacturer: item.manufacturer,
  //        cost: item.cost,
  //        lastupdated: today,
  //        createdate: item.createdate,
  //        expiredate: item.expiredate,
  //        image : item.image
  //       }});
  //         setStatus(newnewStatus);
  // }
  
  
  return (
    <div className="UserRowItems">
      <div className="container-fluid">
        <div className="row ">
          <div className="col"> {item.serialno} </div>
          <div className="col"> {item.name} </div>
          <div className="col"> {item.type} </div>
          <div id="model" className="col rmobile"> {item.model} </div>
          <div id="location" className="col rmobile"> {item.location} </div>
          <div id="roomNumber" className="col rmobile"> {item.roomno} </div>
          <div id="status" className="col"> {status} </div>
          <div className="col actions rmobile">
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
                      <a onClick={ (e) => ViewInformation(item)}
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
                      <a onClick={ (e) => CreateQRCode(item.serialno)}
                      className="dropdown-item"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                      >Print QR Code</a>
                    </li>
                    <li>
                      <a onClick = { (e) => CreateBarcode(item.serialno)}
                      className="dropdown-item"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                      >Print Barcode</a>
                    </li>
                    <li>           
                    <a onClick={(e) =>  changeStatus(item)}
                      className="dropdown-item"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight">
                      Change Status
                      </a>
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
      
    </div>
  );
};

export default ItemCard;
