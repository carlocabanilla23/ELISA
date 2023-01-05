import React from "react"
import { Amplify, API } from "aws-amplify";
import awsExport from '../aws-exports';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from './Sidebar';
import Header from './Header';
import "./styles/AddItem.css";

Amplify.configure(awsExport);

function AddItem() {
    const [name,setName] = React.useState('');
    const [serialNumber,setSerialNumber] = React.useState('');
    const [type,setType] = React.useState('');
    const [model,setModel] = React.useState('');
    const [location,setLocation] = React.useState('Location');
    const [roomNumber,setRoom] = React.useState('');
    const [status,setStatus] = React.useState('Status');
    // const [photo,setPhoto] = React.useState('');
    const [item, setItem] = React.useState([]);
    // const [error, setError] = React.useState('');
    // const [errorMessage, setErrorMessage] = React.useState('');

    const navigate = useNavigate();

    // React.useEffect(() => {
    //     if(error === '1'){
    //         setErrorMessage('Serial Number is already exist');
    //     }else if(error === '2'){
    //         setErrorMessage('Please choose a Location');
    //     }else if(error === '3'){
    //         setErrorMessage('Please choose a Status');
    //     }
    // },[error])


    const AddItem = (e) => {
        e.preventDefault();

        API.post("inventory","/items/", {
            body : {
                name : name,
                serialno : serialNumber,
                type : type,
                model : model,
                location : location,
                roomno : roomNumber,
                status : status,
               
            }
        });
        ShowAlert();
    }
        
    const CancelEdit = () => {
        navigate("/Inventory");
    }

    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout( () =>{
             navigate("/Inventory");
        },1500);
    }

    return (
        <>
            <div className="alert alert-success" id="alert" role="alert">
                Your item has been added successfully!
            </div>

            <Sidebar />
            <Header />

            {/* Previous Page Navigation Bar */}
            <div className="ItemHeader">
                    <div className="fs-4 ms-5 fw-bold">
                        <button onClick={CancelEdit} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                        <label>Add Item</label> 
                    </div>
            </div>
            {/* Add Item Form */}
            <div className="form-wrapper">
                <form onSubmit={AddItem}>
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
                        <label className="input-label" for="manufacturer" >Type</label>
                        <input type="text" className="text-input" id="type"
                        value={type} onChange = {(e) => {setType(e.target.value)}} required = {true}/>
                    </div>
                    {/* Model */}
                    <div className="form-input">
                        <label className="input-label" for="model" >Model</label>
                        <input type="text" className="text-input" id="model" 
                        value={model} onChange = {(e) => {setModel(e.target.value)}} required = {true}/>
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
                    {/* <div className="form-input">
                        <label className="input-label" for="photo" >Photo</label>
                        <input type="text" className="nameInput" id="name"  />
                    </div> */}
                    <div className="button-wrapper">
                        <button className="button" type = "button" onClick={CancelEdit} >Cancel</button>
                        <button className="button" type = "submit" >Save item</button>
                        {/* <span className="errormessage">{errorMessage}</span> */}
                    </div>
                  
                </form>
            </div>
        </>
    );
  }
  
  export default AddItem;