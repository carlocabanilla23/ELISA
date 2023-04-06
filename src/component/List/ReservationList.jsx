import ReservationCard from "../card/ReservationCard";
import React from "react";
import '../../assets/styles/List.css';

const ReservationList = ({reservations,updateList}) => {
 
    return (
        <>
             <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">
                            <div className="col"> Reservation No </div>
                            <div className="col"> Summary </div>
                            <div className="col"> Status </div>
                            <div className="col"> Requested By </div>
                            <div className="col"> Approved By </div>
                            <div className="col"> Request Date</div>
                            <div className="col"> Return Date</div>      
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { reservations.map( (reservation,index) => (
                    <li key={index}>
                        <ReservationCard reservation={reservation} key={index} updateList={updateList} />
                    </li>
                ))}
            </ul>
        </>
       
    )
}
export default ReservationList;