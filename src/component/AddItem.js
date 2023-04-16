import React, { useEffect,useState } from "react"
import { Amplify, API } from "aws-amplify";
import awsExport from '../aws-exports';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from './Sidebar';
import Header from './Header';
import "../assets/styles/AddItem.css";
import SendNotification from "../Services/notification/Notification";
import { DefaultDeviceLogo } from "../assets/base64/base64imgs";
import useItems from "../hooks/useItems";
import { GetDateToday } from "../Services/etc/GetDateToday";
import Validate from "../Services/form-validation/error-codes";
Amplify.configure(awsExport);

function AddItem() {
    const [RFIDCode2, setRFIDCode2] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const { items } = useItems();
    const navigate = useNavigate();

    const [data,setData] = useState({
        name : "",
        serialno : "",
        type : "",
        model : "",
        location : "Room",
        roomno : "101",
        status : "Available",
        manufacturer : "",
        cost : 200,
        acquiredate : GetDateToday(),
        createdate: GetDateToday(),
        lastupdated: GetDateToday(),
        rfidcode : "",
        image : DefaultDeviceLogo(),
        manufacturer : "",
        condition : "New"
    });

    const AddItem = (e) => { // AddItem function is called when the form is submitted
        e.preventDefault();
    
        let param = { RFIDCode2 }
        let err = Validate(items,data,param);
        let rm;
        data.location === "Unassigned" ?  rm = "NA" :  rm = data.roomno;

        if (err.length > 0) {
            setErrorMessage(err);
        } else {
            // call the API to post the item's information to the inventory
            API.post("items","/items/", {  
                body : data 
            });
            // call the ShowAlert function to display a success message
            ShowAlert();
            SendNotification("NEW_ITEM",data.type) 
        }   
    }
        
    const CancelEdit = () => { //// CancelEdit function navigates the user back to the inventory page
        navigate("/Inventory");
    }

    const ShowAlert = () => { // ShowAlert function displays a success message to the user
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout( () =>{  // navigate the user back to the inventory page after 1.5 seconds
             navigate("/Inventory");
        },1500);
    }

    const encodeImage = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setData({
                ...data,
                [e.target.name] : reader.result
            });
        };
   
    }

    const ChangeData = (e) => {
        // e.preventDefault();
        setData({
            ...data,
            [e.target.name] : e.target.value
        });
    }

    return (
        <>
            <div className="alert alert-success" id="alert" role="alert">
                Your item has been added successfully!
            </div>

          

            {/* Previous Page Navigation Bar */}
            <div className="UserHeader">
                    <div className="content">
                        <div>
                        <button onClick={CancelEdit} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                        <label>Add Item</label> 
                        </div>
                    </div>
            </div>
            {/* Add Item Form */}
            <div className="form-wrapper">
                <form onSubmit={AddItem}>
                    <div className="test">
                        {/*Name */}
                        <div className="form-input">
                            <label className="input-label" for="name" >Name</label>
                            <input type="text" className="text-input" id="name" 
                            defaultValue={data.name} name="name" onChange={ e => ChangeData(e)} required={true} />
                        </div>
                        {/* Serial Number */}
                        <div className="form-input">
                            <label className="input-label" for="serialNumber" >Serial #</label>
                            <input type="text" className="text-input" id="serialNumber"  
                            value={data.serialno} name="serialno" onChange = {e => ChangeData(e)} required = {true} />
                        </div>
                        {/* Type */}
                        <div className="form-input">
                            <label className="input-label" for="type" >Type</label>
                            <input type="text" className="text-input" id="type"
                            value={data.type} name="type" onChange = { e => ChangeData(e)} required = {true}/>
                        </div>
                        {/* Model */}
                        <div className="form-input">
                            <label className="input-label" for="model" >Model</label>
                            <input type="text" className="text-input" id="model" 
                            value={data.model} name="model" onChange = { e => ChangeData(e)} required = {true}/>
                        </div>
                        {/* Manufacturer */}
                        <div className="form-input">
                            <label className="input-label" for="manufacturer">Manufacturer</label>
                            <input type="text" className="text-input" id="manufacturer"
                            value={data.manufacturer} name="manufacturer" onChange={e => ChangeData(e)} required={true} />
                        </div>
                        {/* Location */}
                        <div className="form-input">
                            <label className="input-label" for="location" >Location</label>
                            <div className="col-sm-10">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {data.location}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button type="button" name="location" className="dropdown-item" value="Room" onClick={e => ChangeData(e)}>Room</button>
                                        </li>
                                        <li>
                                            <button type="button" name="location" className="dropdown-item" value="Storage" onClick={e => ChangeData(e)}>Storage</button>
                                        </li>
                                        <li>
                                            <button type="button" name="location" className="dropdown-item" value="Unassigned" onClick={e => ChangeData(e)}>Unassigned</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Room Number */}
                        <div className="form-input">
                            <label className="input-label" for="roomNumber" >Room/Storage #</label>
                            <input type="text" className="text-input" id="roomNumber" name="roomno"
                            value={data.roomno} onChange = {e => ChangeData(e)} required={data.location !== "Unassigned"} />
                        </div>
                        {/* Status */}
                        <div className="form-input">
                            <label className="input-label" for="status" >Status</label>
                            <div className="col-sm-10">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {data.status}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button type="button" className="dropdown-item" value="Reserved" name="status" onClick={e => ChangeData(e)}>Reserved</button>
                                        </li>
                                        <li>
                                            <button type="button" className="dropdown-item" value="Available" name="status" onClick={e => ChangeData(e)}>Available</button>
                                        </li>
                                        <li>
                                            <button type="button" className="dropdown-item" value="In Repair" name="status" onClick={e => ChangeData(e)}>In Repair</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>                    
                        </div>
                        {/* Condition */}
                        <div className="form-input">
                            <label className="input-label" for="Condition" >Condition</label>
                            <div className="col-sm-10">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {data.condition}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button type="button" className="dropdown-item" value="New" name="condition" onClick={e => ChangeData(e)}>New</button>
                                        </li>
                                        <li>
                                            <button type="button" className="dropdown-item" value="Old" name="condition" onClick={e => ChangeData(e)}>Old</button>
                                        </li>
                                        <li>
                                            <button type="button" className="dropdown-item" value="Used" name="condition" onClick={e => ChangeData(e)}>Used</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>                    
                        </div>
                    </div>
                    <div className="addItemColumn" id="rightCol">
                        {/* Cost */}
                        <div className="form-input">
                            <label className="input-label" for="cost">Cost</label>
                            <input type="text" className="text-input" id="cost" name="cost"
                            value={data.cost} onChange={ e => ChangeData(e)} />
                            <div>USD</div>
                        </div>
                        {/* Date Acquired */}
                        <div className="form-input">
                            <label className="input-label" for="dateAcquried" >Date Acquired</label>
                            <input type="date" className="text-input" id="dateAcquired" name="acquiredate"
                            value={data.acquiredate} onChange={ e => ChangeData(e)}/>
                        </div>
                        {/* RFID Code */}
                        <div className="form-input">
                            <label className="input-label" for="RFIDCode" >RFID Code</label>
                            <input type="text" className="text-input" id="RFIDCode" name="rfidcode"
                            value={data.rfidcode} onChange={ e => ChangeData(e)}/>
                        </div>
                        {/* Re-enter RFID Code */}
                        <div className="form-input">
                            <label className="input-label" for="RFIDCode2" style={{"fontSize":"10.8pt"}}>Re-enter RFID Code</label>
                            <input type="text" className="text-input" id="RFIDCode2" 
                            value={RFIDCode2} onChange={(e) => {setRFIDCode2(e.target.value)}}/>
                        </div>
                        {/* Image */}
                        <div className="form-input">
                            <label className="input-label" for="photo" >Photo</label>
                            <input type="file" className="text-input" id="photo" name="image"
                            onChange={(e) => { encodeImage(e)}} />
                        </div>
                        <img src={data.image} width="150" height="150" alt="" />
                        {/* <div className="form-input">
                            <label className="input-label" for="photo" >Photo</label>
                            <input type="text" className="nameInput" id="name"  />
                        </div> */}
                        <span id="lastCheck" className="errormessage">{errorMessage}</span>
                        <div id="lastCheck" className="button-wrapper">
                            <button className="button" type = "button" onClick={CancelEdit} >Cancel</button>
                            <button className="button" type = "submit" >Save item</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
  }
  
  export default AddItem;