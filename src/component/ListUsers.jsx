import React from "react";
import './ListUsers.css';


const ListUsers = (props) => {

        const { firstname, lastname, email, schoolID, phone, role,status } = props.user; 
        return (
        <div className="UserRowItems">
                <div className="container">
                        <div className="row ">
                                <div className="col"> {schoolID} </div>
                                <div className="col"> {firstname} </div>
                                <div className="col"> {lastname} </div>
                                <div className="col"> {role} </div>
                                <div className="col"> {email} </div>
                                <div className="col"> {phone} </div>
                                <div className="col"> Active {status} </div>
                                <div className="col actions"> 
                                        <div className="row"> 
                                                <div className="col actions-column">
                                                        <div class="dropdown p-0 m-0 sm">
                                                                <button className="user-dropdown btn"
                                                                        type="button"
                                                                        data-bs-toggle="dropdown"
                                                                        aria-expanded="false">
                                                                        <i className="fa fa-ellipsis-h"></i>
                                                                </button>
                                                                <ul class="dropdown-menu">
                                                                        <li><a className="dropdown-item" >Action</a></li>
                                                                        <li><a className="dropdown-item" >Another action</a></li>
                                                                        <li><a className="dropdown-item" >Something else here</a></li>
                                                                </ul>
                                                        </div>
                                                </div>
                                                <div className="col actions-column">
                                                        <button className="btn">
                                                                <i className="fa fa-pencil"></i>
                                                        </button>
                                                </div>
                                                <div className="col actions-column">
                                                        <button className="btn">
                                                                <i className="fa fa-trash"></i>
                                                        </button>
                                                </div>
                                        </div>
                                        

                               
                                
                                
                                </div>
                        </div>
                 </div>
                
        </div>    
    );

}

export default ListUsers;