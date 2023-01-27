import { Amplify, API } from "aws-amplify";
import React from "react";
import { useEffect } from "react";
import awsExport from '../aws-exports';
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation,useNavigate } from "react-router-dom";
import "./styles/EditItem.css"

Amplify.configure(awsExport);

function EditItem() {
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
    const [manufacturer, setManufacturer] = React.useState('');
    const [cost, setCost] = React.useState('');
    const [item, setItem] = React.useState([]);

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
        })},[]);



    const CancelEdit = () => {
        navigate('/Inventory');
    }    

    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout( () =>{
                navigate("/Inventory");
        },1500);
    }
    
    const EditItem = (e) => {
        e.preventDefault();
        const itemList = API.get("inventory","/items/")
            .then(res => {
                setItem([itemList,...res]);
            });

        //Get the current time
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();

        var today = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
        if(hour >= 12){
            today += 'PM';
        }else{
            today += 'AM';
        }
        API.post("inventory","/items/", {
            body : {
                name : name,
                serialno : serialNumber,
                type : type,
                model : model,
                location : location,
                roomno : roomNumber,
                status : status,
                manufacturer: manufacturer,
                cost: cost,
                lastupdated: today,
        }});

        ShowAlert();
    }

    return (
        <>
            <div className="alert alert-success" id="alert" role="alert">
                Your item has been updated successfully!
            </div>
            
            <Sidebar />
            <Header />

            <div className="UserHeader">
                    <div className="content">
                        <div>
                            <button onClick={CancelEdit} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                            <label>Edit Item</label> 
                        </div>
                    </div>
            </div>

            {/* Add Item Form */}
            <div className="form-wrapper">
                <form onSubmit={EditItem}>
                    {/*Name */}
                    <div className="form-input">
                        <label className="input-label" for="name" >Name</label>
                        <input type="text" className="text-input" id="name" 
                        value={name} onChange = {(e) => {setName(e.target.value); }} required={true} />
                    </div>
                    {/* Serial Number */}
                    <div className="form-input">
                        <label className="input-label" for="serialNumber" >Serial #</label>
                        <div className="serialNumber">{serialNumber}</div>
                    </div>
                    {/* Type */}
                    <div className="form-input">
                        <label className="input-label" for="type" >Type</label>
                        <input type="text" className="text-input" id="type"
                        value={type} onChange = {(e) => {setType(e.target.value)}} required = {true}/>
                    </div>
                    {/* Model */}
                    <div className="form-input">
                        <label className="input-label" for="model" >Model</label>
                        <input type="text" className="text-input" id="model" 
                        value={model} onChange = {(e) => {setModel(e.target.value)}} required = {true}/>
                    </div>
                    {/* Manufacturer */}
                    <div className="form-input">
                        <label className="input-label" for="manufacturer" >Manufacturer</label>
                        <input type="text" className="text-input" id="Manufacturer"
                        value={manufacturer} onChange = {(e) => {setManufacturer(e.target.value)}} required = {true}/>
                    </div>
                    {/* Location */}
                    <div className="form-input">
                        <label className="input-label" for="location" >Location</label>
                        <div className="col-sm-10">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {location}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={(e)=> setLocation ("Room")} > Room
                                        </a>
                                    </li>
                                    <li><a className="dropdown-item" onClick={(e)=> setLocation ("Storage")} > Storage
                                        </a>
                                    </li>
                                    <li><a className="dropdown-item" onClick={(e)=> setLocation ("Unassigned")} > Unassigned
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Room Number */}
                    <div className="form-input">
                        <label className="input-label" for="roomNumber" >Room/Storage #</label>
                        <input type="text" className="text-input" id="roomNumber" 
                        value={roomNumber} onChange = {(e) => {setRoom(e.target.value)}} required = {true} />
                    </div>
                    {/* Status */}
                    <div className="form-input">
                        <label className="input-label" for="status" >Status</label>
                        <div className="col-sm-10">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {status}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={(e)=> setStatus ("New")} > New
                                        </a>
                                    </li>
                                    <li><a className="dropdown-item" onClick={(e)=> setStatus ("Old")} > Old
                                        </a>
                                    </li>
                                    <li><a className="dropdown-item" onClick={(e)=> setStatus ("Used")} > Used
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>                    
                    </div>
                    {/* Cost */}
                    <div className="form-input">
                        <label className="input-label" for="cost" >Cost</label>
                        <input type="text" className="text-input" id="cost"
                        value={cost} onChange = {(e) => {setCost(e.target.value)}} required = {true}/>
                        <div>$</div>
                    </div>
                    {/* <div className="form-input">
                        <label className="input-label" for="photo" >Photo</label>
                        <input type="text" className="nameInput" id="name"  />
                    </div> */}
                    <div className="button-wrapper">
                        <button className="button" type = "button" onClick={CancelEdit} >Cancel</button>
                        <button className="button" type = "submit" >Update item</button>
                        {/* <span className="errormessage">{errorMessage}</span> */}
                    </div>
                  
                </form>
            </div>
        </>
    );
  }
  
  export default EditItem;