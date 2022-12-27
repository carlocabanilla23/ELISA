import './styles/Setting.css';
import { useNavigate } from 'react-router-dom'; 
import { Router,Link,Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function Setting(){

    const navigate = useNavigate();

    const cancelEdit = () => {
        navigate('/Home');
    }    

    return(
        <>
            <Sidebar />
            <Header />
            <div className="ItemHeader">
                <div className="fs-4 ms-5 fw-bold">
                    <button onClick={cancelEdit} className="PageHeaderBtn"><i class="PageHeaderBtn fa fa-arrow-left ms-2" aria-hidden="true"></i></button>
                    <label>Back</label> 
                </div>
            </div>
        
            <div className="setting">
                <form className="setting-form">
                    <div className="flex-container">
                        <div className = "left-col">
                            <h3 className='heading'> Contact Information </h3>
                            <div className="form-input">
                                <label className = "input-label" for = "first-name">First Name</label>
                                <input className = "input-field" type = "text" id = "first-name" />
                            </div>
                            <div className="form-input">
                                <label className = "input-label" for = "last-name">Last Name</label>
                                <input className = "input-field" type = "text" id = "last-name" />
                            </div>
                            <div className="form-input">
                                <label className = "input-label" for = "email1">Email 1</label>
                                <input className = "input-field" type = "email" id = "email1" />
                            </div>
                            <div className="form-input">
                                <label className = "input-label" for = "email2">Email 2</label>
                                <input className = "input-field" type = "email" id = "email2" />
                            </div> 
                            <div className="form-input">
                                <label className = "input-label" for = "phone1">Phone 1</label>
                                <input className = "input-field" type = "tel" id = "phone1" />
                            </div>
                            <div className="form-input">
                                <label className = "input-label" for = "phone2">Phone 2</label>
                                <input className = "input-field" type = "tel" id = "phone2" />
                            </div>
                            <h3 className='heading'> Change Password </h3>
                            <div className="form-input">
                                <label className = "input-label" for = "current-password">Current Password</label>
                                <input className = "input-field" type = "password" id = "current-password" />
                            </div>
                            <div className="form-input">
                                <label className = "input-label" for = "new-password">New Password</label>
                                <input className = "input-field" type = "password" id = "new-password" />
                            </div>
                            <div className="form-input">
                                <label className = "input-label" for = "confirm-password">Confirm Password</label>
                                <input className = "input-field" type = "password" id = "confirm-password" />
                            </div>
                        </div>
                        <div className = "right-col">
                            <h3 className='heading'> Notifications </h3>
                            <div className="form-input">
                                <label className = "input-label" >New Item Added</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span class="slider round">
                                        <span class="on">On</span>
                                        <span class="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >New Member Added</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span class="slider round">
                                        <span class="on">On</span>
                                        <span class="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Out of Stock</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span class="slider round">
                                        <span class="on">On</span>
                                        <span class="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Report Email</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span class="slider round">
                                        <span class="on">On</span>
                                        <span class="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Reservation Request</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span class="slider round">
                                        <span class="on">On</span>
                                        <span class="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Send Notification to Email</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span class="slider round">
                                        <span class="on">On</span>
                                        <span class="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Send SMS to Phone</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span class="slider round">
                                        <span class="on">On</span>
                                        <span class="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="form-input">
                                <label className = "input-label" >Item Left Building</label>
                                <label className = "switch">
                                    <input type="checkbox" />
                                    <span class="slider round">
                                        <span class="on">On</span>
                                        <span class="off">Off</span>
                                    </span> 
                                </label>
                            </div>
                            <div className="button-wrapper">
                                <button className="button" type = "submit" >Save item</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}

export default Setting;