import React from "react";
import './ListUsers.css';
import { API } from 'aws-amplify';

const ListUsers = ( {user,updateList} ) => {

        // const { firstname, lastname, email, schoolID, phone, role,status } = user; 
      
        return (
             
        <div className="UserRowItems">
                <div className="container">
                        <div className="row ">
                                <div className="col"> {user.schoolID} </div>
                                <div className="col"> {user.firstname} </div>
                                <div className="col"> {user.lastname} </div>
                                <div className="col"> {user.role} </div>
                                <div className="col"> {user.email} </div>
                                <div className="col"> {user.phone} </div>
                                <div className="col"> Active {user.status} </div>
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
                                                                        <li><a className="dropdown-item" >View Information</a></li>
                                                                        <li><a className="dropdown-item" >View History</a></li>
                                                                        <li><a className="dropdown-item" >Change Role</a></li>
                                                                        <li><a className="dropdown-item" >Change Status</a></li>
                                                                </ul>
                                                        </div>
                                                </div>
                                                <div className="col actions-column">
                                                        <button className="btn">
                                                                <i className="fa fa-pencil"></i>
                                                        </button>
                                                </div>
                                                <div className="col actions-column">
                                                        <button className="btn" onClick={ () => updateList(user.email)}>
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