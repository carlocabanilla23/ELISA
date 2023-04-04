import '../assets/styles/Setting.css';
import { useNavigate } from 'react-router-dom'; 
import React,{ useState,useEffect } from 'react';
import { API } from 'aws-amplify';
import eyeSlashHide from '../assets/icons/eye-slash-hide.png';
import eyeSlashShow from '../assets/icons/eye-slash-show.png';


function Setting(){
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [cpass,setCpass] = useState('');
    const [npass,setNpass] = useState('');
    const [rnpass,setRnpass] = useState('');
    const [error,setError] = useState('');
    
    const [newItemChecked,setNewItemChecked] = useState(false);
    const [newMemberChecked,setNewMemberChecked] = useState(false);
    const [outOfStockChecked,setOutOfStockChecked] = useState(false);
    const [reservationRequestChecked,setReservationRequestChecked] = useState(false);
    const [emailNotificationChecked,setEmailNotificationChecked] = useState(false);

    const navigate = useNavigate();
 

    const [hidePassword,setHidePassword] = useState(true);
    const [hideNewPassword,setHideNewPassword] = useState(true);
    const [hideRNewPassword,setHideRNewPassword] = useState(true);

    const eyeShow = document.getElementById('eye-slash-show');
    const eyeHide = document.getElementById('eye-slash-hide');
    const eyeShow2 = document.getElementById('eye-slash-show2');
    const eyeHide2 = document.getElementById('eye-slash-hide2');
    const eyeShow3 = document.getElementById('eye-slash-show3');
    const eyeHide3 = document.getElementById('eye-slash-hide3');

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
                   email : email,
                   emailnotification : emailNotificationChecked       
                }
            });
        })

        ShowAlert();
    }
    const cancelEdit = () => {
        navigate('/Home');
    }
    const UpdateInfo = (e) => {
        e.preventDefault();
        // setEmail(emailParam);
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
        ShowAlert();
        window.location.reload(true);
    }
    const UpdatePassword = (e) => {
        e.preventDefault();
        API.get("useraccounts","/email/object/" + email).then( res => {
            if (cpass !== res.password) {
                setError("Wrong passowrd");
            }else if (npass.length === 0  || rnpass.length === 0  ) {
                setError("Input a new password !");
            }else {
                if (npass !== rnpass ) {
                    setError("New Password does not match");
                } else {
                    API.post("useraccounts","/email/",{
                        body:{
                            email:email,
                            password: npass
                        }
                    });
                    ShowAlert();
                }
            }
        })
    }
    const ShowAlert = () => {
        var alert = document.getElementById("alert");
        alert.style.display = "block";
        setTimeout( () =>{
             navigate("/Reservations");
        },1500);
    }

    const togglePassword = (e) => {
        if(hidePassword === false){
            eyeShow.style.display = 'none';
            eyeHide.style.display = 'block';
            setHidePassword(!hidePassword);
        }else if(hidePassword === true){
            eyeShow.style.display = 'block';
            eyeHide.style.display = 'none';
            setHidePassword(!hidePassword);
        }
    }

    const toggleNewPassword = (e) => {
        if(hideNewPassword === false){
            eyeShow2.style.display = 'none';
            eyeHide2.style.display = 'block';
            setHideNewPassword(!hideNewPassword);
        }else if(hideNewPassword === true){
            eyeShow2.style.display = 'block';
            eyeHide2.style.display = 'none';
            setHideNewPassword(!hideNewPassword);
        }
    }

    const toggleRNewPassword = (e) => {
        if(hideRNewPassword === false){
            eyeShow3.style.display = 'none';
            eyeHide3.style.display = 'block';
            setHideRNewPassword(!hideRNewPassword);
        }else if(hideRNewPassword === true){
            eyeShow3.style.display = 'block';
            eyeHide3.style.display = 'none';
            setHideRNewPassword(!hideRNewPassword);
        }
    }
    
    return(
        <>
        <div className="alert alert-success" id="alert" role="alert">
                The setting changed successfully!
            </div>

            <div className="SettingsHeader">
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

                            <div className="settings-button-wrapper">
                                <button className="button" type = "submit" >Save</button>
                            </div>
                        </form>
                        <form onSubmit={UpdatePassword} className="setting-form"> 
                        <h3 className='heading'> Change Password </h3>
                                <div className="form-input">
                                    <label className = "input-label" htmlFor = "current-password"></label>
                                    <p className='text-danger'>{error}</p>
                                </div>
                                <div className="form-input">
                                    <label className = "input-label" htmlFor = "current-password">Current Password</label>
                                    <div className="position-relative">
                                        <input className = "input-field" type={hidePassword ? 'password' : 'text'} id = "current-password" defaultValue={cpass} onChange={ (e) => setCpass(e.target.value)}/>
                                        <img src={eyeSlashHide} className="eye-slash" id="eye-slash-hide" alt="Hide" onClick={togglePassword} />
                                        <img src={eyeSlashShow} className="eye-slash" id="eye-slash-show" style={{display: 'none'}} alt="Show" onClick={togglePassword} />
                                    </div>
                                </div>
                                <div className="form-input">
                                    <label className = "input-label" htmlFor = "current-password">New Password</label>
                                    <div className="position-relative">
                                        <input className = "input-field" type={hideNewPassword ? 'password' : 'text'} id = "current-password" defaultValue={npass} onChange={ (e) => setNpass(e.target.value)}/>
                                        <img src={eyeSlashHide} className="eye-slash" id="eye-slash-hide2" alt="Hide" onClick={toggleNewPassword} />
                                        <img src={eyeSlashShow} className="eye-slash" id="eye-slash-show2" style={{display: 'none'}} alt="Show" onClick={toggleNewPassword} />
                                    </div>
                                </div>
                                <div className="form-input">
                                    <label className = "input-label" htmlFor = "current-password">Rewrite New Password</label>
                                    <div className="position-relative">
                                        <input className = "input-field" type={hideRNewPassword ? 'password' : 'text'} id = "current-password" defaultValue={rnpass} onChange={ (e) => setRnpass(e.target.value)}/>
                                        <img src={eyeSlashHide} className="eye-slash" id="eye-slash-hide3" alt="Hide" onClick={toggleRNewPassword} />
                                        <img src={eyeSlashShow} className="eye-slash" id="eye-slash-show3" style={{display: 'none'}} alt="Show" onClick={toggleRNewPassword} />
                                    </div>
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
          </div>
        </>
    )

}

export default Setting;