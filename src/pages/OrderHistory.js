import React, { useEffect,useState } from "react"
import { Amplify, API } from "aws-amplify";
import awsExport from '../aws-exports';
import { useNavigate, useParams } from 'react-router-dom';
import "../assets/styles/Notification.css"
Amplify.configure(awsExport);

function OrderHistory() {
    const {param} = useParams();
    const navigate = useNavigate();
    const [data,setData] = useState([]);

    useEffect(()=>{
        API.get("reservation","/reservation/"+param).then( resEmail => {
            setData(resEmail);
        });
    },[]);

    const gotoUsers = () => navigate('/Users');

    const ViewReservation = (email,rid) => navigate('/Reservation/'+email+'/'+rid);
    return (
        <>
            
            

            {/* Previous Page Navigation Bar */}
            <div className="NotificationHeader">
                    <div className="content">
                        <div>
                        <button onClick={(e)=>gotoUsers()} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                        <label>Order History</label> 
                        </div>
                    </div>
            </div>

            <div className="NotificationContent">
                                <div className="row font-weight-bold">
                                    <div className="col col1 ">Date </div>
                                    <div className="col col2"> Reservation No </div>
                                    <div className="col col2"> Order Status </div>
                                    <div className="col col2"> Action </div>
                                </div>
                            {data.map( (items,index) => (
                                <div key={index} className="row">
                                    <div className="col col1"> {items.requestdate} </div>
                                    <div className="col col2"> {items.reservationno} </div>
                                    <div className="col col3"> {items.status} </div>
                                    <div className="col col4"> <button onClick={(e)=> ViewReservation(items.email,items.reservationno)} className="btn btn-dark"> View </button></div>
                                </div>
                            ))}

                    </div>
        </>
            );
        
  }
  
  export default OrderHistory;