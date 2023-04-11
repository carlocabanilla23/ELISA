import React from "react";
import "../../assets/styles/User.css";
import "../../assets/styles/OffCanvas.css";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item, updateList,ViewInformation,CreateQRCode,CreateBarcode,changeStatus,changeLocation,changeRFIDCode}) => {
  const navigate = useNavigate();
    
  const EditItem = (s,t) => {
    navigate("/EditItem", {
      state: {
        serialno: s,
        type: t
      },
    });
  };
 
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
          <div className="col actions rmobile">
            <div className="row">
              <div className="col actions-column">
                <div className="dropdown p-0 m-0 sm">
                  <button
                    id = "off-canvas-close-btn"
                    className="user-dropdown btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-h"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li onClick={ (e) => ViewInformation(item)}
                        className="dropdown-item"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      > View Information
                    </li>
                    <li style={{display: 'none'}} 
                        id="mobile"
                        className="dropdown-item" 
                        type="button" 
                        onClick={() => EditItem(item.serialno)}
                      > Edit
                    </li>
                    <li onClick={ (e) => CreateQRCode(item.serialno)}
                        className="dropdown-item"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      > Print QR Code
                    </li>
                    <li onClick = { (e) => CreateBarcode(item.serialno)}
                        className="dropdown-item"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      > Print Barcode
                    </li>
                    <li onClick={(e) =>  changeStatus(item)}
                        className="dropdown-item"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight">
                        Change Status
                    </li>
                    <li onClick={(e) =>  changeLocation(item)}
                        className="dropdown-item"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight">
                        Change Location
                    </li>
                    <li onClick={(e) =>  changeRFIDCode(item)}
                        className="dropdown-item"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight">
                        Change RFID Code
                    </li>
                    <li style={{display: 'none'}} 
                        id="mobile"
                        className="dropdown-item" 
                        type="button" 
                        onClick={() => updateList(item.serialno)}
                      > Delete
                    </li>
                  </ul>
                </div>
              </div>
              <div id="computer" className="col actions-column">
                <button className="btn" onClick={() => EditItem(item.serialno,item.type)}>
                  <i className="fa fa-pencil"></i>
                </button>
              </div>
              <div id="computer" className="col actions-column">
                <button
                  className="btn"
                  onClick={() => updateList(item.serialno,item.type)}
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
