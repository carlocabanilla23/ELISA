import React, { useEffect,useState } from "react"
import { Amplify, API } from "aws-amplify";
import awsExport from '../aws-exports';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from './Sidebar';
import Header from './Header';
import "./styles/AddItem.css";
import SendNotification from "../Services/notification/Notification";
import { DefaultDeviceLogo } from "../assets/base64imgs";
Amplify.configure(awsExport);

function AddItem() {
    const [name,setName] = React.useState('');
    const [serialNumber,setSerialNumber] = React.useState('');
    const [type,setType] = React.useState('');
    const [model,setModel] = React.useState('');
    const [location,setLocation] = React.useState('Location');
    const [roomNumber,setRoom] = React.useState('');
    const [status,setStatus] = React.useState('Status');
    const [manufacturer, setManufacturer] = React.useState('');
    const [cost, setCost] = React.useState('');
    const [acquiredDate, setAcquiredDate] = useState('');
    const [expiredDate, setExpiredDate] = useState('N/A');
    const [image, setImage] = useState(DefaultDeviceLogo());

    const [items, setItems] = React.useState([]);
    const [error, setError] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setErrorMessage('');
        setError('');
    }, [name,serialNumber,type,model,location,roomNumber,status,manufacturer,cost])

    useEffect(() => {   
        if(error === '1'){
            setErrorMessage('Serial Number is already exist!');
        }else if(error === '2'){
            setErrorMessage('Please choose a Location!');
        }else if(error === '3'){
            setErrorMessage('Please choose a Status!');
        }else if(error === '4'){
            setErrorMessage('Unassigned item has no room number!');
        }else if(error === '5'){
            setErrorMessage('Room number is associated with different location type!');
        }
    },[error])
    
    useEffect(() => {
        API.get("items", "/items").then(res => {
            setItems([...items,...res]);
        })
    }, []);

    const AddItem = (e) => { //// AddItem function is called when the form is submitted
        e.preventDefault();

        //Get the current time the item is add
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

        /*
            Validation check for the new item:
            1. Check if serialNumber is already exist
            2 and 3. Check if user choose a location or a status for the item
            4. Check if user set a room for the unassigned item. Unassigned item will have no room
            5. Check if the room number is already exist as a different location type
        */
        for(var i = 0; i < items.length; i++){
            if(items[i].serialno === serialNumber){
                throw new Error(setError('1'));
            }else if(location === "Location"){
                throw new Error(setError('2'));
            }else if(status === "Status"){
                throw new Error(setError('3'));
            }else if(location === "Unassigned" && roomNumber != ''){
                throw new Error(setError('4'));
            }else if(items[i].roomno === roomNumber && items[i].location != location){
                throw new Error(setError('5'));
            }
        }

        API.post("items","/items/", {  // call the API to post the item's information to the inventory
            body : {
                name : name,
                serialno : serialNumber,
                type : type,
                model : model,
                manufacturer: manufacturer,
                location : location,
                roomno : roomNumber,
                status : status,
                cost: cost,
                createdate: today,
                lastupdated: today,
                acquiredate: acquiredDate,
                expiredate: expiredDate,
                image : image
            }
        });
        ShowAlert();
        SendNotification("NEW_ITEM",type) // call the ShowAlert function to display a success message
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
        console.log(reader.result); //base64encoded string
        };

   
    }

    return (
        <>
            <div className="alert alert-success" id="alert" role="alert">
                Your item has been added successfully!
            </div>

            <Sidebar />
            <Header />

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
                        {/* Image */}
                        <div className="form-input">
                            <label className="input-label" for="photo" >Photo</label>
                            <input type="file" className="text-input" id="photo" 
                            onChange={(e) => { encodeImage(e)}} required={true} />
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