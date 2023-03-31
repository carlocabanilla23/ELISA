import React, { useEffect,useState } from "react"
import { Amplify, API } from "aws-amplify";
import awsExport from '../aws-exports';
import { useNavigate } from 'react-router-dom'; 
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import "../component/styles/Notification.css"
Amplify.configure(awsExport);

function Notification() {
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    useEffect(()=>{
        let emailParam = decodeURIComponent(escape(window.atob( localStorage.getItem('email'))));
        API.get("notification","/notification/" + emailParam).then( resEmail => {
            console.log(resEmail)
            setData(resEmail);
        });
    },[]);

    const gotoDashboard = () => {
        navigate('/Home')
    }

    return (
        <>
            
            

            {/* Previous Page Navigation Bar */}
            <div className="NotificationHeader">
                    <div className="content">
                        <div>
                        <button onClick={(e)=>gotoDashboard()} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                        <label>Notifications</label> 
                        </div>
                    </div>
            </div>

            <div className="NotificationContent">
                                <div className="row font-weight-bold">
                                    <div className="col1 "> Date </div>
                                    <div className="col2"> Description </div>
                                </div>
                            {data.map( (items,index) => (
                                <div className="row">
                                    <div className="col1"> {items.date} </div>
                                    <div className="col2"> {items.message} </div>
                                </div>
                            ))}

                    </div>
        </>
            );
        
  }
  
  export default Notification;