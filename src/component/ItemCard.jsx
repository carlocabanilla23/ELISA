import React from "react";
import './styles/User.css';
import { useNavigate } from "react-router-dom";

const ItemCard = ( {item,updateList} ) => {
        const navigate = useNavigate();
        const EditItem = (e) => {
                console.log(e);
                navigate('/EditItem',{
                        state: {
                                serialno : e
                        }
                });
        }
        const ItemInformation = (e) => {
                console.log(e);
                navigate('/ItemInformation', {
                        state: {
                                serialno: e
                        }
                });
        }
        return (
             
        <div className="UserRowItems">
                <div className="container-fluid">
                        <div className="row ">
                                <div className="col"> {item.serialno} </div>
                                <div className="col"> {item.name} </div>
                                <div className="col"> {item.type} </div>
                                <div className="col"> {item.model} </div>
                                <div className="col"> {item.location} </div>
                                <div className="col"> {item.roomno} </div>
                                <div className="col"> {item.status} </div>
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
                                                                        <li><a className="dropdown-item" onClick={() => ItemInformation(item.serialno)}>View Information</a></li>
                                                                        <li><a className="dropdown-item" >View History</a></li>
                                                                        <li><a className="dropdown-item" >Change Role</a></li>
                                                                        <li><a className="dropdown-item" >Change Status</a></li>
                                                                </ul>
                                                        </div>
                                                </div>
                                                <div className="col actions-column">
                                                        <button className="btn" onClick={ () => EditItem(item.serialno)}>
                                                                <i className="fa fa-pencil"></i>
                                                        </button>
                                                </div>
                                                <div className="col actions-column">
                                                        <button className="btn" onClick={ () => updateList(item.serialno)}>
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

export default ItemCard;