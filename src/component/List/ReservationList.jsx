import ReservationCard from "../card/ReservationCard";
import React, {useState} from "react";
import '../../assets/styles/List.css';

const ReservationList = ({reservations,updateList,ResortedList}) => {
    const [reservationno, setReservationno] = useState(true);
    const [summary, setSumamry] = useState(true);
    const [status, setStatus] = useState(true);
    const [requestby, setRequestBy] = useState(true);
    const [approvedby, setApprovedBy] = useState(true);
    const [requestdate, setRequestDate] = useState(true);
    const [returndate,setReturnDate] = useState(true);

    const reset = (title) => {
        title === 'reservationno' ? setReservationno(!reservationno) : setReservationno(true);
        title === 'summary' ? setSumamry(!summary) : setSumamry(true);
        title === 'status' ? setStatus(!status) : setStatus(true);
        title === 'requestby' ? setRequestBy(!requestby) : setRequestBy(true);
        title === 'approvedby' ? setApprovedBy(!approvedby) : setApprovedBy(true);
        title === 'requestdate' ? setRequestDate(!requestdate) : setRequestDate(true);
        title === 'returndate' ? setReturnDate(!returndate) : setReturnDate(true);
    }
 
    return (
        <>
             <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">
                            <div className="col" onClick={e => {ResortedList('reservationno',reservationno);reset('reservationno')}} style={{'cursor': 'pointer'}}> Reservation No </div>
                            <div className="col" onClick={e => {ResortedList('summary',summary);reset('summary')}} style={{'cursor': 'pointer'}}> Summary </div>
                            <div className="col" onClick={e => {ResortedList('status',status);reset('status')}} style={{'cursor': 'pointer'}}> Status </div>
                            <div className="col" onClick={e => {ResortedList('requestby',requestby);reset('requestby')}} style={{'cursor': 'pointer'}}> Requested By </div>
                            <div className="col" onClick={e => {ResortedList('approvedby',approvedby);reset('approvedby')}} style={{'cursor': 'pointer'}}> Approved By </div>
                            <div className="col" onClick={e => {ResortedList('requestdate',requestdate);reset('requestdate')}} style={{'cursor': 'pointer'}}> Request Date</div>
                            <div className="col" onClick={e => {ResortedList('returndate',returndate);reset('returndate')}} style={{'cursor': 'pointer'}}> Return Date</div>      
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