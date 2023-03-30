import './styles/Login.css';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import React, { useEffect, useState }  from 'react';
import { useParams } from "react-router-dom";
import { API } from 'aws-amplify';
import logo from './icons/elisa_logo.png';
import elisa from './icons/elisa.png';
import SendNotification from '../Services/notification/Notification';


function Verify() {
    const {param} = useParams();
    // const [email,setEmail] = useState('');


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