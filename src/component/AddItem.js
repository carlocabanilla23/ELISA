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
    const [name,setName] = useState('');
    const [serialNumber,setSerialNumber] = useState('');
    const [type,setType] = useState('');
    const [model,setModel] = useState('');
    const [location,setLocation] = useState('Location');
    const [roomNumber,setRoom] = useState('');
    const [status,setStatus] = useState('Status');
    const [manufacturer, setManufacturer] = useState('');
    const [cost, setCost] = useState('');
    const [acquiredDate, setAcquiredDate] = useState('');
    const [RFIDCode, setRFIDCode] = useState('');
    const [RFIDCode2, setRFIDCode2] = useState('');
    const [image, setImage] = useState(DefaultDeviceLogo());
    const today = GetDateToday();
    // const [items, setItems] = useState([]);
    // const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { items } = useItems();

    const navigate = useNavigate();
    // console.log(items);

    // useEffect(() => {
    //     setErrorMessage('');
    //     setError('');
    // }, [name,serialNumber,type,model,location,roomNumber,status,manufacturer,cost])

    // useEffect(() => {   
    //     if(error === '1'){
    //         setErrorMessage('Serial Number is already exist!');
    //     }else if(error === '2'){
    //         setErrorMessage('');
    //     }else if(error === '3'){
    //         setErrorMessage('');
    //     }else if(error === '4'){
    //         setErrorMessage('');
    //     }else if(error === '5'){
    //         setErrorMessage('');
    //     }
    // },[error])
    
    // useEffect(() => {
    //     API.get("items", "/items").then(res => {
    //         setItems([...items,...res]);
    //     })
    // }, []);

    const AddItem = (e) => { // AddItem function is called when the form is submitted
        e.preventDefault();

        //Get the current time the item is add
        // var date = new Date();
        // var year = date.getFullYear();
        // var month = date.getMonth()+1;
        // var day = date.getDate();
        // var hour = date.getHours();
        // var minutes = date.getMinutes();
        // var today = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
        // if(hour >= 12){
        //     today += 'PM';
        // }else{
        //     today += 'AM';
        // }

        /*
            Validation check for the new item:
            1. Check if serialNumber is already exist
            2 and 3. Check if user choose a location or a status for the item
            4. Check if user set a room for the unassigned item. Unassigned item will have no room
            5. Check if the room number is already exist as a different location type
        */
        // for(var i = 0; i < items.length; i++){
        //     if(items[i].serialno === serialNumber){
        //         throw new Error(setError('1'));
        //     }else if(location === "Location"){
        //         throw new Error(setError('2'));
        //     }else if(status === "Status"){
        //         throw new Error(setError('3'));
        //     }else if(location === "Unassigned" && roomNumber !== ''){
        //         throw new Error(setError('4'));
        //     }else if(items[i].roomno === roomNumber && items[i].location !== location){
        //         throw new Error(setError('5'));
        //     }
        // }

        let data = {
            serialNumber,
            location,
            status,
            roomNumber,
            RFIDCode,
            RFIDCode2
        }

        let err = Validate(items,data);

        let rm;
        if (location === "Unassigned") {
            rm = "NA";
        }else {
            rm = roomNumber;
        }
        if (err.length > 0) {
            setErrorMessage(err);
        } else {
            API.post("items","/items/", {  // call the API to post the item's information to the inventory
                body : {
                    name : name,
                    serialno : serialNumber,
                    type : type,
                    model : model,
                    manufacturer: manufacturer,
                    location : location,
                    roomno : rm,
                    status : status,
                    cost: cost,
                    createdate: today,
                    lastupdated: today,
                    acquiredate: acquiredDate,
                    rfidcode: RFIDCode,
                    image : image
                }
            });
            // call the ShowAlert function to display a success message
            ShowAlert();
            SendNotification("NEW_ITEM",type) 
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
            setImage(reader.result);
        };

   
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
                            value={name} onChange = {(e) => {setName(e.target.value); }} required={true} />
                        </div>
                        {/* Serial Number */}
                        <div className="form-input">
                            <label className="input-label" for="serialNumber" >Serial #</label>
                            <input type="text" className="text-input" id="serialNumber"  
                            value={serialNumber} onChange = {(e) => {setSerialNumber(e.target.value); }} required = {true} />
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
                            <label className="input-label" for="manufacturer">Manufacturer</label>
                            <input type="text" className="text-input" id="manufacturer"
                            value={manufacturer} onChange={(e) => {setManufacturer(e.target.value)}} required={true} />
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
                                        <li>
                                            <button type="button" className="dropdown-item" onClick={(e) => setLocation("Room")}>Room</button>
                                        </li>
                                        <li>
                                            <button type="button" className="dropdown-item" onClick={(e) => setLocation("Storage")}>Storage</button>
                                        </li>
                                        <li>
                                            <button type="button" className="dropdown-item" onClick={(e) => setLocation("Unassigned") }>Unassigned</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Room Number */}
                        <div className="form-input">
                            <label className="input-label" for="roomNumber" >Room/Storage #</label>
                            <input type="text" className="text-input" id="roomNumber" 
                            value={roomNumber} onChange = {(e) => {setRoom(e.target.value)}} required={location !== "Unassigned"} />
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
                                        <li>
                                            <button type="button" className="dropdown-item" onClick={(e) => setStatus("New")}>New</button>
                                        </li>
                                        <li>
                                            <button type="button" className="dropdown-item" onClick={(e) => setStatus("Old")}>Old</button>
                                        </li>
                                        <li>
                                            <button type="button" className="dropdown-item" onClick={(e) => setStatus("Used")}>Used</button>
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
                            <input type="text" className="text-input" id="cost"
                            value={cost} onChange={(e) => {setCost(e.target.value)}} required={true} />
                            <div>$</div>
                        </div>
                        {/* Date Acquired */}
                        <div className="form-input">
                            <label className="input-label" for="dateAcquried" >Date Acquired</label>
                            <input type="date" className="text-input" id="dateAcquired" 
                            value={acquiredDate} onChange={(e) => {setAcquiredDate(e.target.value)}} required={true} />
                        </div>
                        {/* RFID Code */}
                        <div className="form-input">
                            <label className="input-label" for="RFIDCode" >RFID Code</label>
                            <input type="text" className="text-input" id="RFIDCode" 
                            value={RFIDCode} onChange={(e) => {setRFIDCode(e.target.value)}}/>
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
                            <input type="file" className="text-input" id="photo" 
                            onChange={(e) => { encodeImage(e)}} />
                        </div>
                        <img src={image} width="150" height="150" alt="" />
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