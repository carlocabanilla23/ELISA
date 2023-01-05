import React from "react";
import "./../styles/User.css";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import { API } from "aws-amplify";


const UnassignedItemCard = ({ item, updateList }) => {
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
          <div className="col"> {item.assignedate} </div>
          <div className="col"> {item.returndate} </div>
          
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
        
      </div>
    </div>
  );
};

export default UnassignedItemCard;
