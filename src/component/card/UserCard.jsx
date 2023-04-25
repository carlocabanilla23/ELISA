import React from "react";
import '../../assets/styles/User.css';
import { useNavigate } from "react-router-dom";

const User = ( {user,updateList,ViewInformation,ViewHistory,changeRole,changeStatus,deleteConfirm} ) => {
        const navigate = useNavigate();
        const EditUser = (e) => {
                console.log(e);
                navigate('/EditUser',{
                        state: {
                                email : e
                        }
                });
        }

        const ViewOrderHistory = (email) => {
                navigate('/OrderHistory/'+email)
        }

        return (
        <div className="UserRowItems">
                <div className="container-fluid">
                        <div className="row ">
                                <div className="col"> {user.schoolID} </div>
                                <div className="col"> {user.firstname} </div>
                                <div className="col"> {user.lastname} </div>
                                <div className="col"> {user.role} </div>
                                <div className="col"> {user.email} </div>
                                <div className="col"> {user.phone} </div>
                                <div className="col"> {user.status} </div>
                                <div className="col actions">
                                        <div className="row">
                                                <div className="col actions-column">
                                                        <div className="dropdown p-0 m-0 sm">
                                                                <button className="user-dropdown btn"
                                                                        type="button"
                                                                        data-bs-toggle="dropdown"
                                                                        aria-expanded="false">
                                                                        <i className="fa fa-ellipsis-h"></i>
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                        <li><button onClick={ (e) => ViewInformation(user)}
                                                                                className="dropdown-item"
                                                                                type="button"
                                                                                data-bs-toggle="offcanvas"
                                                                                data-bs-target="#offcanvasRight"
                                                                                aria-controls="offcanvasRight"
                                                                                >View Information</button>
                                                                        </li>
                                                                        <li><button onClick={ (e) => ViewOrderHistory(user.email)}
                                                                                className="dropdown-item"
                                                                                type="button"
                                                                                data-bs-toggle="offcanvas"
                                                                                data-bs-target="#offcanvasRight"
                                                                                aria-controls="offcanvasRight"
                                                                                >View History</button>
                                                                        </li>
                                                                        <li><button onClick={ (e) => changeRole(user)}
                                                                                className="dropdown-item"
                                                                                type="button"
                                                                                data-bs-toggle="offcanvas"
                                                                                data-bs-target="#offcanvasRight"
                                                                                aria-controls="offcanvasRight"
                                                                                >Change Role</button>
                                                                        </li>
                                                                        <li><button onClick = { (e) => changeStatus(user)}
                                                                                className="dropdown-item"
                                                                                type="button"
                                                                                data-bs-toggle="offcanvas"
                                                                                data-bs-target="#offcanvasRight"
                                                                                aria-controls="offcanvasRight"
                                                                                >Change Status</button>
                                                                        </li>
                                                                </ul>
                                                        </div>
                                                </div>
                                                <div className="col actions-column">
                                                        <button className="btn" onClick={ () => EditUser(user.email)}>
                                                                <i className="fa fa-pencil"></i>
                                                        </button>
                                                </div>
                                                <div className="col actions-column">
                                                        <button className="btn" onClick={ () => deleteConfirm(user.email)}>
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

export default User;