import React from "react";
import "./../styles/User.css";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import { API } from "aws-amplify";


const UnassignedItemCard = ({ item, updateList,ViewInformation,CreateQRCode,CreateBarcode,changeStatus,changeLocation}) => {
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
      })},[]);
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
  return (
    <div className="UserRowItems">
      <div className="container-fluid">
        <div className="row ">
          <div className="col"> {item.serialno} </div>
          <div className="col"> {item.name} </div>
          <div className="col"> {item.type} </div>
          <div className="col"> {item.model} </div>
          <div className="col"> {item.assignedto} </div>
          <div className="col"> {item.ordernumber} </div>
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
                    <li>           
                    <a onClick={(e) =>  changeLocation(item)}
                      className="dropdown-item"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight">
                      Change Location
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

export default UnassignedItemCard;
