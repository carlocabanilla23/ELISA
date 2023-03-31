import React from "react";
import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import Sidebar from "./Sidebar";
import Header from "./Header";
import '../assets/styles/CreateReservation.css';
import { useNavigate, useLocation } from "react-router-dom";
import SendNotification from "../Services/notification/Notification";

function CreateReservation () {
    const location = useLocation();
    const reservationNo = "R"+location.state.reservationCount;
    const [models,setModels] = useState([]);
    const [types,setTypes] = useState([]);
    const [items,setItems] = useState([]);


    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [schoolID,setSchoolID] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("");
    const [summary,setSummary] = useState("");
    const [currentDate,setCurrentDate] = useState("");
    const [note,setNote] = useState("N/A");

    const [type, setType] = useState('Type');
    const [model,setModel] = useState('Model');
    const [returnDate,setReturnDate] = useState("N/A");
    const [quantity,setQuantity] = useState(0);
    const [reservationCart,setReservationCart] = useState([]);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    useEffect( () => {
        console.log(location.state.reservationCount);
        API.get("inventory","/items/").then( itemRes => {
            sortItems(itemRes);
            setItems(itemRes);
        })

        setCurrentDate(`${day}-${month}-${year}`);

        let emailParam = decodeURIComponent(escape(window.atob( localStorage.getItem('email'))));
        API.get("userapi","/email/object/" + emailParam).then( res => {
            setFirstName(res.firstname);
            setLastName(res.lastname);
            setSchoolID(res.schoolID);
            setEmail(res.email);
            setRole(res.role);
        })

    },[]);

    useEffect(() => {
        if(error === 1){
            setErrorMessage('Please choose a Type and a Model');
        }else if(error === 2){
            setErrorMessage('Please choose a Type');
        }else if(error === 3){
            setErrorMessage('Please choose a Model');
        }else if(error === 4){
            setErrorMessage('Please specify amount of items you want to reserve');
        }else if(error === 5){
            setErrorMessage('Please add items to your reservation');
        }else if(error === 6){
            setErrorMessage('Return date is invalid')
        }
    },[error])

    useEffect(() => {
        const defaultValue = document.getElementById('default');
        if(reservationCart.length !== 0){
            defaultValue.style.display = 'none';
        }else{
            defaultValue.style.display = 'block';
        }
        if(note.length === 0){
            setNote('N/A');
        }
    },[reservationCart, note])

    const setModelList = (typeParam) => {
        setType(typeParam);
        const filterItems = items.filter(item => item.type !== typeParam);
        const updatedModel =  [...new Set(filterItems.map( item => item.model))];
        setModels(updatedModel);
      
    }

    const sortItems = (items) => {
        const updatedTypes =  [...new Set(items.map( item => item.type))];
        setTypes(updatedTypes);
    }


    const addItem = (e) => {
        e.preventDefault();
        if(type === 'Type' && model === 'Model'){
            throw new Error(setError(1));
        }else if(type === 'Type'){
            throw new Error(setError(2));
        }else if (model === 'Model'){
            throw new Error(setError(3));
        }else if(quantity < 1 || quantity.length === 0){
            throw new Error(setError(4));
        }
        const order = {
            type : type,
            model : model,
            quantity : quantity
        }
    
        setReservationCart([...reservationCart,order]);
        console.log(reservationCart);
       
    }

    const submitOrder = (e) => {
        e.preventDefault();
        console.log(reservationCart);
        if(reservationCart.length === 0){
            throw new Error(setError(5));
        }
        //Check return date if it is in range of two months from request date
        let returnDay = '';
        let returnMonth = '';
        let returnYear = returnDate.substring(0,4);

        if(returnDate[8] === '0'){
            returnDay = returnDate[9];
        }else{
            returnDay = returnDate.substring(8,10);
        }
        if(returnDate[5] === '0'){
            returnMonth = returnDate[6];
        }else{
            returnMonth = returnDate.substring(5,7);
        }
        //Comparing request date and return date
        if(parseInt(returnYear, 10) > (year + 1) || parseInt(returnYear, 10) < year){
            throw new Error(setError(6));
        }else{
            if(parseInt(returnYear, 10) === (year + 1)){
                if((parseInt(returnMonth, 10) + 12 - month) > 2){
                    throw new Error(setError(6));
                }else if((parseInt(returnMonth, 10) + 12 - month) === 2){
                    if(parseInt(returnDay, 10) > day){
                        throw new Error(setError(6));
                    }
                }
            }else if((parseInt(returnYear, 10) === year) && ((parseInt(returnMonth, 10) - month) > 2 ||
            (parseInt(returnMonth, 10) - month) < 0)){
                throw new Error(setError(6));
            }
            if((parseInt(returnMonth, 10) === month && parseInt(returnDay, 10) < day) ||
            (parseInt(returnMonth, 10) - month === 2 && parseInt(returnDay, 10) > day)){
                throw new Error(setError(6));
            }
        }

        API.post("reservation","/reservation", {
            body : {
            email : email,
            reservationno : reservationNo,
            summary : summary,
            status : "Open",
            requestby : firstName + " " + lastName,
            approvedby : "N/A",
            requestdate : currentDate,
            returndate : returnDate,
            }
        });

        API.post("reservationcart","/cart", {
            body : {
            reservationno : reservationNo,
            description : note,
            itemrequested : reservationCart,
            assigneditems : []
            }
        });
        // Send Email to Admin
        SendNotification("NEW_RESERVATION",reservationNo);
        ShowAlert();
        // navigate('/Reservations')
    }
    const cancelEdit = () => {
        navigate('/Reservations');
    }

    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout( () =>{
             navigate("/Reservations");
        },1500);
    }
    
    return (
        <>
            <div className="alert alert-success alert-popout" id="alert" role="alert">
                The reservation has been created successfully!
            </div>
            
            
            <div className="CreateReservationHeader">
                    <div className="content">
                        <div>
                            <button onClick={cancelEdit} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                            <label>Make a Reservation</label> 
                        </div>
                    </div>
            </div>
            <div className="CreateReservation">
                <div className="container ReservationForm">
                    <div className="row">
                        <div className="col">
                            <h1>Reservation</h1>
                        </div>
                    </div>
                    <form onSubmit={submitOrder}>
                        {/* Summary */}
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label  className="form-label">Reservation Summary</label>
                                    <input type="text"
                                    className="form-control"
                                    value={summary}
                                    onChange={ (e) => {setSummary(e.target.value); setError(''); setErrorMessage('')}}
                                    pattern='^([a-zA-Z0-9]{1,})$'
                                    onInvalid={(event) => {event.target.setCustomValidity('Please write a summary for your reservation purpose')}}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                    required={true} />
                                </div>
                            </div>
                        </div>
                        {/* Return Date */}
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label">Return Date</label>
                                    <input className="form-control dateInput"
                                    type="date"
                                    onChange={ (e) => {setReturnDate(e.target.value); setError(''); setErrorMessage('')}}
                                    onInvalid={(event) => {event.target.setCustomValidity('You can only reserve for two months at most')}}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                    required={true} />
                                </div>
                            </div>
                        </div>
                        {/* Requests */}
                        <div className="row">
                            <div className="col">
                            <label className="form-label">Request</label>
                            </div>
                        </div>
                        {/* Note */}
                        <div className="row">
                            <div className="col type">
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {type}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {types.map( (typeRes,index) => (
                                            <li key={index} className="dropdown-item" onClick={(e)=> {setModelList(typeRes); setError(''); setErrorMessage('')}}>{typeRes}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col model">
                                <div className="dropdown">
                                    <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {model}
                                    </button>
                                    <ul className="dropdown-menu">
                                        {models.map( (modelRes,index) => (
                                            <li key={index} className="dropdown-item" onClick={(e)=> {setModel(modelRes); setError(''); setErrorMessage('')}}>{modelRes}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col quantity">
                                <div className="dropdown">
                                    <input className="form-control"
                                    type="text"
                                    placeholder="Amount"
                                    onChange={ (e) => {setQuantity(e.target.value); setError(''); setErrorMessage('')}}
                                    aria-describedby="inputGroup-sizing-default"
                                    pattern='^([0-9]{1,})$'
                                    onInvalid={(event) => {event.target.setCustomValidity('Input amount of item you want to reserve')}}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                    required={true} />
                                </div>
                            </div>
                            <div className="col submit">
                                <button className="btn AddItemBtn" onClick={ (e) => addItem(e)}>
                                    <i className="fa fa-plus-circle" aria-hidden="true"> Add Item</i>
                                </button>
                            </div>
                        </div> 
                        {/* Note */}
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label  className="form-label">Note</label>
                                    <textarea className="form-control"
                                    id="NoteTextarea1"
                                    onChange={ (e) => { setNote(e.target.value); setError(''); setErrorMessage('')}}
                                    rows="3"
                                    pattern='^([a-zA-Z0-9]{1,})$'
                                    onInvalid={(event) => {event.target.setCustomValidity('Write a short note or "None" before submit the reservation form')}}
                                    onInput={(e) => e.target.setCustomValidity('')} 
                                    required={true} />
                                </div>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div className="row justify-content-end">
                            <div className="col ">
                                <button type="submit" className="btn btn-primary">
                                    Submit Order
                                </button>
                            </div>
                            <span className="errorMessage">{errorMessage}</span>
                        </div>
                    </form>
                </div>

                <div className="container CreateReservationSummary">
                    <div className="row">
                        <div className="col">
                            <h1>Summary</h1>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={firstName} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={lastName} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">School  ID</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={schoolID} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Role</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={role} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Student Email</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={email} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Request Date</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={currentDate} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Return Date</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={returnDate} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Items Requested</label>
                        <div className="col-sm-10">
                            <ul className="list-group">
                                <li className="list-group" id="default" >N/A</li>
                                {reservationCart.map ( (res,index)=> 
                                <li className="list-group" key={index}>{res.type} - {res.model} - {res.quantity }</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label  className="col-sm-2 col-form-label">Note</label>
                        <div className="col-sm-10">
                            <input type="text" readOnly className="form-control-plaintext" value={note} />
                        </div>
                    </div>
                </div>
    
            </div>  
        </>
    );
}

export default CreateReservation;