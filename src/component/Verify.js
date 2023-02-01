import './styles/Login.css';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import React, { useEffect }  from 'react';
import { useParams } from "react-router-dom";
import { API } from 'aws-amplify';
import logo from './icons/elisa_logo.png';
import elisa from './icons/elisa.png';

function Verify() {
    const {param} = useParams();
    useEffect( ()=>{
        API.get("userapi","/email/object/"+param).then( res => {
           console.log(res);
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