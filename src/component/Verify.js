import '../assets/styles/Login.css';
import React, { useEffect }  from 'react';
import { useParams } from "react-router-dom";
import { API } from 'aws-amplify';
import logo from '../assets/icons/elisa_logo.png';
import elisa from '../assets/icons/elisa.png';
import SendNotification from '../Services/notification/Notification';


function Verify() {
    const {param} = useParams();

    useEffect( ()=>{
        API.get("userapi","/email/object/"+param).then( res => {
           API.post("userapi","/email/", {
            body : {
            firstname : res.firstname,
            lastname : res.lastname,
            role : res.role,
            schoolID : res.password,
            email : res.email,
            phone : res.phone,
            status : "verified",
            password : "password"
        }})
        SendNotification("VERIFIED_USER",res.email);
               
        });
    },[]);
    
  return (
    <div className="Verify">
        <div className='banner'>
            <img src={logo} className="img-fluid img-thumbnail" alt="Elisa Logo" />
            <img src={elisa} className="img-fluid img-thumbnail" alt="Elisa Logo" />
        </div>
        <h1> Your Account is verified. Please wait for the admin to grant you access to elisa</h1>
    </div>
  );
}



export default Verify;