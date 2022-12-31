import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API } from "aws-amplify";
import './styles/Reservation.css';




function Reservation () {
    const location = useLocation();
    const reservationno = location.state.reservationno;
    const navigate = useNavigate();

    // Reservation Data 
    const [firstName,setFirstName] = useState("John");
    const [lastName,setLastName] = useState("Doe");
    const [schoolID,setSchoolID] = useState("00000001");
    const [email,setEmail] = useState("doej@spu.edu");
    const [role,setRole] = useState("Student");
    const [summary,setSummary] = useState("Item Request");
    const [currentDate,setCurrentDate] = useState("00-00-0000");
    const [note,setNote] = useState("Please give me new device"); 
    const [returnDate,setReturnDate] = useState("00-00-0000");

    const [reservationCart,setReservationCart] = useState([]);



    useEffect( () => {
        API.get("reservationapi","/reservations/object/"+reservationno).then( res => {
            setFirstName(res.firstname);
            setLastName(res.lastname);
            setSchoolID(res.schoolID);
            setEmail(res.email);
            setRole(res.role);
            setSummary(res.summary);
            setCurrentDate(res.requestdate);
            setNote(res.note);
            setReturnDate(res.returndate);
            setReservationCart(res.itemrequested);
        })
    },[]);


   
    const cancelViewReservation = () => {
        navigate('/Reservations');
    }

    return (
        <>            
            <Sidebar />
            <Header />
            <div className="ReservationHeader">
                    <div className="fs-4 ms-5 fw-bold">
                        <button onClick={cancelViewReservation} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                        <label>{reservationno} - {summary}</label> 
                    </div>
            </div>
            <div className="Reservation">
                <div className="ReservationSummary">

                    <div className="OrderList">
                        <div className="row">
                            <div className="col">
                                <p className="h5"> Item Requested</p>
                            </div>
                        </div>
                        {/* Item Requested */}
                        <div className="mb-3 row">
                            <div className="col-sm-10">
                                <ul className="list-group">
                                    <li className="list-group">
                                        <div className="row">
                                            <div className="col">
                                                Type
                                            </div>
                                            <div className="col">
                                                Model
                                            </div>
                                            <div className="col">
                                                Quantity
                                            </div>
                                        </div>
                                    </li>

                                    {reservationCart.map ( (res,index)=> 
                                    <li className="list-group" key={index}>
                                        <div className="row">
                                            <div className="col">
                                                {res.type}
                                            </div>
                                            <div className="col">
                                                {res.model}
                                            </div>
                                            <div className="col">
                                                {res.quantity}
                                            </div>
                                        </div>
                                    </li>
                                    
                                    )}
                                </ul>
                            </div>
                        </div>
                      
                       
                    </div>
                    <div className="UserInfo">
                        <div className="row">
                            <div className="col">
                                <label className="fw-bold form-label">Reservation No</label>
                                <br/>
                                <label className="form-label">{reservationno}</label>
                            </div>
                            <div className="col">
                                <label className="fw-bold form-label">Status</label>
                                <br/>
                                <label className="form-label">Pending</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="fw-bold form-label">Requested By</label>
                                <br/>
                                <label className="form-label">{firstName + " " + lastName}</label>
                            </div>
                            <div className="col">
                                <label className="fw-bold form-label">Requested Date</label>
                                <br/>
                                <label className="form-label">{currentDate}</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="fw-bold form-label">School Id</label>
                                <br/>
                                <label className="form-label">{schoolID}</label>
                            </div>
                            <div className="col">
                                <label className="fw-bold form-label">Return Date</label>
                                <br/>
                                <label className="form-label">{returnDate}</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label className="fw-bold form-label">Email</label>
                                <br/>
                                <label className="form-label">{email}</label>
                            </div>
                            <div className="col">
                                <label className="fw-bold form-label">Approved By</label>
                                <br/>
                                <label className="form-label">N/A</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}   

export default Reservation;