import './styles/Setting.css';
import { useNavigate } from 'react-router-dom'; 
import { Router,Link,Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import React,{ useState,useEffect } from 'react';
import { API } from 'aws-amplify';
import { useLocation } from "react-router-dom";


function Setting(){
    const loc = useLocation();
    const emailParam = "SPU.Elisa@gmail.com";
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [cpass,setCpass] = useState('');
    const [npass,setNpass] = useState('');
    const [rnpass,setRnpass] = useState('');
    const navigate = useNavigate();

    useEffect( () => {
        API.get("userapi","/email/object/"+emailParam).then( res => {
            // setEmail(res.email);
            setFname(res.firstname);
            setLname(res.lastname);
            // console.log("email" + email);
        })
    },[email]);



      

    const cancelEdit = () => {
        navigate('/Home');
    }
    const UpdateInfo = (e) => {
        e.preventDefault();
        // setEmail(emailParam);
        console.log(emailParam);
        console.log(email);
        API.get("userapi","/email/object/" + emailParam).then( res => {
            API.put("userapi","/email/", {
                body : {
                   email: emailParam,
                   firstname: fname,
                   lastname: lname,
                   role: res.role,
                   schoolID: res.schoolID,
                   status: res.status,
                   password: res.password
                }
            });
        })
        localStorage.setItem('name',fname);
        window.location.reload(true);

    }

    
    return(
        <>
            <Sidebar />
            <Header />
            <div className="UserHeader">
                <div className="content">
                    <div>
                    <button onClick={cancelEdit} className="PageHeaderBtn"><i className="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                    <label>Back</label> 
                    </div>
                </div>
            </div>
        
            <div className="setting">
                <div className="row">
                    <div className = "col">
                        <form onSubmit={UpdateInfo} className="setting-form"> 
                            <h3 className='heading'> Contact Information </h3>

                            <div className="form-input">
                                <label className = "input-label" htmlFor = "first-name">First Name</label>
                                <input className = "input-field" onChange={ (e) => setFname(e.target.value)} type = "text" id = "first-name" value={fname}/>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" htmlFor = "last-name">Last Name</label>
                                <input className = "input-field" onChange={ (e) => setLname(e.target.value)} type = "text" id = "last-name" value={lname}/>
                            </div>
                            {/* <div className="form-input">
                                <label className = "input-label">Email</label>
                                <label className="input-label" type = "text" id = "email"> {email} </label>
                            </div> */}

                            <div className="settings-button-wrapper">
                                <button className="button" type = "submit" >Save</button>
                            </div>
                        </form>
                        <form className="setting-form"> 
                        <h3 className='heading'> Change Password </h3>
                                <div className="form-input">
                                    <label className = "input-label" htmlFor = "current-password">Current Password</label>
                                    <input className = "input-field" type = "password" id = "current-password" defaultValue={cpass}/>
                                </div>
                                <div className="form-input">
                                    <label className = "input-label" htmlFor = "new-password">New Password</label>
                                    <input className = "input-field" type = "password" id = "new-password" defaultValue={npass} />
                                </div>
                                <div className="form-input">
                                    <label className = "input-label" htmlFor = "confirm-password">Confirm Password</label>
                                    <input className = "input-field" type = "password" id = "confirm-password" defaultValue={rnpass} />
                                </div>
                                <div className="settings-button-wrapper">
                                <button className="button" type = "submit" >Save item</button>
                            </div>
                            </form>
                    </div>

                    <div className="col">
                        <form className="setting-form">
                            <h3 className='heading'> Notifications </h3>
                            <div className="form-input">
                                <label className = "input-label" >New Item Added</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >New Member Added</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Out of Stock</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Report Email</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Reservation Request</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Send Notification to Email</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Send SMS to Phone</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Item Left Building</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="settings-button-wrapper">
                                <button className="button" type = "submit" >Save item</button>
                            </div>
                        </form>
                    </div>
            

                </div>
               
                            
                       

                        {/* <div className = "right-col">
                            
                         */}
                   
               
          </div>
        </>
    )

}

export default Setting;