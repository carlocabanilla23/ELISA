import React from "react";
import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import Sidebar from "./Sidebar";
import Header from "./Header";
import './styles/CreateReservation.css';
import { useNavigate, useLocation } from "react-router-dom";

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
    const [note,setNote] = useState("");

    const [type, setType] = useState('Type');
    const [model,setModel] = useState('Model');
    const [returnDate,setReturnDate] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [reservationCart,setReservationCart] = useState([]);
    const navigate = useNavigate();

    const date = new Date();


    useEffect( () => {
        console.log(location.state.reservationCount);
        API.get("inventory","/items/").then( itemRes => {
            sortItems(itemRes);
            setItems(itemRes);
        })
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

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
        const order = {
            type : type,
            model : model,
            quantity : quantity
        }
        // console.log(order);
        // setReservationCart( res => [...res,order] );

        setReservationCart([...reservationCart,order]);
        console.log(reservationCart);
       
    }

    const submitOrder = () => {  
        console.log(reservationCart); 
        API.post("reservationapi","/reservations/", {
            body : {
            firstname :firstName,
            lastname : lastName,
            role : role,
            schoolID : schoolID,
            email : email,
            reservationno : reservationNo,
            summary : summary,
            status : "Open",
            requestby : firstName + " " + lastName,
            approvedby : "N/A",
            requestdate : currentDate,
            returndate : returnDate,
            itemrequested : reservationCart,
            assigneditems : []
            }
        });

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
            <div className="alert alert-success" id="alert" role="alert">
                The reservation has been created successfully!
            </div>
            <Sidebar />
            <Header />
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
                    {/* Summary */}
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label  className="form-label">Reservation Summary</label>
                                <input className="form-control" onChange={ (e) => setSummary(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    {/* Return Date */}
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Return Date</label>
                                <input className="form-control dateInput" type="date" onChange={ (e) => setReturnDate(e.target.value)} />
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
                                        <li key={index} className="dropdown-item" onClick={(e)=> setModelList(typeRes)}>{typeRes}</li>
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
                                        <li key={index} className="dropdown-item" onClick={(e)=> setModel(modelRes)}>{modelRes}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col quantity">
                            <div className="dropdown">
                                <input className="form-control" type="text" onChange={ (e) => setQuantity(e.target.value)} aria-describedby="inputGroup-sizing-default" />
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
                                <textarea className="form-control" id="NoteTextarea1"  onChange={ (e) => setNote(e.target.value) } rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="row justify-content-end">
                        <div className="col ">
                            <button className="btn btn-primary" onClick={ (e) => {submitOrder()}}>
                                Submit Order
                            </button>
                        </div>
                    </div>
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