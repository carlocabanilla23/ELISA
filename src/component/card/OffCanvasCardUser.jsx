import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';

const OffCanvasCardUser = ({user,actionName,refreshvalue}) => {
    const[role,setRole] = useState('');
    const[status,setStatus] = useState('');

    useEffect(() => {
        setRole(user.role);
        setStatus(user.status);
    },[user,actionName,refreshvalue])

    const setNewRole = () => {
        console.log(user);
        API.post("userapi","/email/", {
            body : {
            firstname : user.firstname,
            lastname : user.lastname,
            role : role,
            schoolID : user.schoolID,
            email : user.email,
            phone : user.phone,
            password : user.password,
            status: user.status
        }});
        setTimeout(() => {
            window.location.reload(true);
        },400)
    }

    const setNewStatus = () => {
        console.log(user);
        API.post("userapi","/email/", {
            body : {
            firstname : user.firstname,
            lastname : user.lastname,
            role : user.role,
            schoolID : user.schoolID,
            email : user.email,
            phone : user.phone,
            password : user.password,
            status: status
        }});
        setTimeout(() => {
            window.location.reload(true);
        },400)
    }

    return (
        <>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h3><strong>{actionName}</strong></h3>
                <h5 id="offcanvasRightLabel"></h5>
                <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body">
                <div id="user-info">
                    {/* Photo */}
                    <div className="mb-3 row">
                        <img src={user.photo} width="150" height="150" alt="Image of the device" />
                    </div>
                    {/* Serial Number */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">First Name:</label>
                        <div className = "Information col-sm-8">{user.firstname}</div>
                    </div>
                    {/* Type */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Last Name:</label>
                        <div className = "Information col-sm-8">{user.lastname}</div>
                    </div>
                    {/* Model */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Role: </label>
                        <div className = "Information col-sm-8">{user.role}</div>
                    </div>
                    {/* Manufacturer */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">School ID:</label>
                        <div className = "Information col-sm-8">{user.schoolID}</div>
                    </div>
                    {/* Location */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Email:</label>
                        <div className = "Information col-sm-8">{user.email}</div>
                    </div>
                    {/* Room Number */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Phone:</label>
                        <div className = "Information col-sm-8">{user.phone}</div>
                    </div>
                    {/* Status */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Status:</label>
                        <div className = "Information col-sm-8">{user.status}</div>
                    </div>
                    {/* Date Created */}
                    <div className = "mb-3 row">
                        <label  className = "Attribute col-sm-4">Created:</label>
                        <div className = "Information col-sm-8">{user.createdate !== undefined ? user.createdate : 'N/A'}</div>
                    </div>
                    {/* Last Updated */}
                    <div className = "mb-3 row">
                        <label  className = "Attribute col-sm-4">Updated:</label>
                        <div className = "Information col-sm-8">{user.lastupdated !== undefined ? user.lastupdated : 'N/A'}</div>
                    </div>
                </div>

                {/* Change Role */}
                <div id="changeRole">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {role}
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" onClick={(e) => setRole("Professor")}>Professor</a>
                            </li>
                            <li>
                                <a className="dropdown-item" onClick={(e) => setRole("TA")}>TA</a>
                            </li>
                            <li>
                                <a className="dropdown-item" onClick={(e) => setRole("Student")}>Student</a>
                            </li>
                        </ul>
                        <button className="btn btn-secondary" type="button" onClick={(e) => role !== user.role ? setNewRole() : ''}>
                            Save
                        </button>
                    </div>
                </div>

                {/* Change Status */}
                <div id="changeStatus">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {status}
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <a className="dropdown-item" onClick={(e) => setStatus("Verified")}>Verified</a>
                            </li>
                            <li>
                                <a className="dropdown-item" onClick={(e) => setStatus("Inactive")}>Inactive</a>
                            </li>
                        </ul>
                        <button className="btn btn-secondary" type="button" onClick={(e) => status !== user.status ? setNewStatus() : ''}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div> 
        </>
    );
}

export default OffCanvasCardUser;