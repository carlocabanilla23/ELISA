import React from "react";
import './styles/User.css';
import { useNavigate } from "react-router-dom";

const ReservationCard = ( {reservation,updateList} ) => {
        const navigate = useNavigate();

        const gotoReservation = (e) => {
                console.log(e);
                navigate("/Reservation", {
                        state: {
                                reservationno : e
                        }
                });
            }
        return (
             
        <div className="UserRowItems">
                <div className="container-fluid">
                        <div className="row ">
                                <div className="col"> 
                                        <div onClick={ (e) => gotoReservation(reservation.reservationno)} className="clickableCol"> {reservation.reservationno} </div>
                                </div>
                                <div className="col"> {reservation.summary} </div>
                                <div className="col"> {reservation.status} </div>
                                <div className="col"> {reservation.requestby} </div>
                                <div className="col"> {reservation.approvedby} </div>
                                <div className="col"> {reservation.requestdate} </div>
                                <div className="col"> {reservation.returndate} </div>
                        </div>
                 </div>
                
        </div>    
    );

}

export default ReservationCard;