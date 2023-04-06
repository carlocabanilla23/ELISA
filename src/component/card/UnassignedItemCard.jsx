import React from "react";
import '../../assets/styles/User.css';
import { useNavigate } from "react-router-dom";

const UnassignedItemCard = ({ item, updateList,ViewInformation,CreateQRCode,CreateBarcode,changeStatus,changeLocation}) => {
  const navigate = useNavigate();

  const EditItem = (e) => {
    console.log(e);
    navigate("/EditItem", {
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
          {/* <div className="col"> {item.assignedto} </div>
          <div className="col"> {item.ordernumber} </div> */}
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
                    <li onClick={ (e) => ViewInformation(item)}
                        className="dropdown-item"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight">
                       View Information
                    </li>
                    <li style={{display: 'none'}} 
                        id="mobile"
                        className="dropdown-item" 
                        type="button" 
                        onClick={() => EditItem(item.serialno)}>
                        Edit
                    </li>
                    <li onClick={ (e) => CreateQRCode(item.serialno)}
                        className="dropdown-item"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight">
                        Print QR Code
                    </li>
                    <li onClick = { (e) => CreateBarcode(item.serialno)}
                      className="dropdown-item"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight">
                      Print Barcode
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
                    <li onClick={() => updateList(item.serialno)}
                      style={{display: 'none'}} 
                      id="mobile"
                      className="dropdown-item" 
                      type="button">
                      Delete
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
