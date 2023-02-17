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
    // const emailParam = "SPU.Elisa@gmail.com";
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [cpass,setCpass] = useState('');
    const [npass,setNpass] = useState('');
    const [rnpass,setRnpass] = useState('');
    
    const [newItemChecked,setNewItemChecked] = useState(false);
    const [newMemberChecked,setNewMemberChecked] = useState(false);
    const [outOfStockChecked,setOutOfStockChecked] = useState(false);
    const [reservationRequestChecked,setReservationRequestChecked] = useState(false);
    const [emailNotificationChecked,setEmailNotificationChecked] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        let emailParam = decodeURIComponent(escape(window.atob( localStorage.getItem('email'))));
        API.get("userapi","/email/object/" + emailParam).then( res => {
            API.get("notificationapi","/sid/object/" + res.schoolID).then( resNotif => {
                setNewItemChecked(resNotif.newitem);
                setNewMemberChecked(resNotif.newmember);
                setOutOfStockChecked(resNotif.outofstock);
                setReservationRequestChecked(resNotif.reservationrequest);
                setEmailNotificationChecked(resNotif.emailnotification);
            });

            setEmail(res.email);
            setFname(res.firstname);
            setLname(res.lastname);
            // console.log("email" + email);
        })
    },[]);


    const handleChangeNewItem = () => {
        if (newItemChecked === true)
            setNewItemChecked(false);
        else
            setNewItemChecked(true)
        // console.log(checked);
    };

    const handleChangeNewMember = () => {
        if (newMemberChecked === true)
            setNewMemberChecked(false);
        else
            setNewMemberChecked(true)
        // console.log(checked);
    };
    
    const handleChangeOutOfStock = () => {
        if (outOfStockChecked === true)
            setOutOfStockChecked(false);
        else
            setOutOfStockChecked(true)
        // console.log(checked);
    };

    const handleChangeReservationRequest = () => {
        if (reservationRequestChecked === true)
            setReservationRequestChecked(false);
        else
            setReservationRequestChecked(true)
        // console.log(checked);
    };

    const handleChangeEmailNotification = () => {
        if (emailNotificationChecked === true)
            setEmailNotificationChecked(false);
        else
            setEmailNotificationChecked(true)
        // console.log(checked);
    };
    
    const UpdateNotification = (e) => {
        e.preventDefault();
        API.get("userapi","/email/object/" + email).then( res => {
            console.log(res.schoolID);
            API.post("notificationapi","/sid/", {
                body : {
                   sid : res.schoolID,
                   newitem : newItemChecked,
                   newmember : newMemberChecked,
                   outofstock : outOfStockChecked,
                   reservationrequest : reservationRequestChecked,
                   emailnotification : emailNotificationChecked       
                }
            });
        })
    }
    const cancelEdit = () => {
        navigate('/Home');
    }
    const UpdateInfo = (e) => {
        e.preventDefault();
        // setEmail(emailParam);
        console.log(email);
        console.log(email);
        API.get("userapi","/email/object/" + email).then( res => {
            API.put("userapi","/email/", {
                body : {
                   email: email,
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
    const UpdatePassword = (e) => {
        e.preventDefault();
        API.get("useraccounts","/email/object/" + email).then( res => {
            console.log(cpass);
            console.log(res.password);
            if (cpass !== res.password) {
                console.log("wrong passowrd");
            } else {
                if (npass !== rnpass ) {
                    console.log("New Password does not match");
                } else {
                    API.post("useraccounts","/email/",{
                        body:{
                            email:email,
                            password: npass
                        }
                    });
                    console.log("success !")
                }
            }
        })
    
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
                        <form onSubmit={UpdatePassword} className="setting-form"> 
                        <h3 className='heading'> Change Password </h3>
                                <div className="form-input">
                                    <label className = "input-label" htmlFor = "current-password">Current Password</label>
                                    <input className = "input-field" type = "password" id = "current-password" defaultValue={cpass} onChange={ (e) => setCpass(e.target.value)}/>
                                </div>
                                <div className="form-input">
                                    <label className = "input-label" htmlFor = "new-password">New Password</label>
                                    <input className = "input-field" type = "password" id = "new-password" defaultValue={npass} onChange={ (e) => setNpass(e.target.value)}/>
                                </div>
                                <div className="form-input">
                                    <label className = "input-label" htmlFor = "confirm-password">Confirm Password</label>
                                    <input className = "input-field" type = "password" id = "confirm-password" defaultValue={rnpass}  onChange={ (e) => setRnpass(e.target.value)}/>
                                </div>
                                <div className="settings-button-wrapper">
                                <button className="button" type = "submit" >Save item</button>
                            </div>
                            </form>
                    </div>

                    <div className="col">
                        <form onSubmit={UpdateNotification} className="setting-form">
                            <h3 className='heading'> Notifications </h3>
                            <div className="form-input">
                                <label className = "input-label" >New Item Added</label>
                                <label className = "switch">
                                    <input type="checkbox" 
                                        // value={newItemChecked}
                                        checked={newItemChecked}
                                        onChange={ (e) => handleChangeNewItem()}
                                    />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >New Member Added</label>
                                <label className = "switch">
                                    <input type="checkbox" 
                                          checked={newMemberChecked}
                                          onChange={handleChangeNewMember}
                                    />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Out of Stock</label>
                                <label className = "switch">
                                    <input type="checkbox"
                                         checked={outOfStockChecked}
                                         onChange={handleChangeOutOfStock}
                                    />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Reservation Request</label>
                                <label className = "switch">
                                    <input type="checkbox" 
                                        checked={reservationRequestChecked}
                                        onChange={handleChangeReservationRequest}
                                    />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Send Notification to Email</label>
                                <label className = "switch">
                                    <input type="checkbox" 
                                        checked={emailNotificationChecked}
                                        onChange={handleChangeEmailNotification}
                                    />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            {/* <div className="form-input">
                                <label className = "input-label" >Item Left Building</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span className="slider round">
                                        <span className="on">On</span>
                                        <span className="off">Off</span>
                                    </span> 
                                </label>
                            </div> */}
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