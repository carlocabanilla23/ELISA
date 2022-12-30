import React from "react";
import './styles/User.css';
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { API } from "aws-amplify";


const RoomCard = ( {item,updateList,itemCount} ) => {
        const navigate = useNavigate();
        const [items, setItems] = useState([]);
        useEffect( () => {
                API.get("inventory","/items").then( itemRes => {
                    sortItems(itemRes);
                })
               
            },[]);
    
        const sortItems = (items) => {
                let updatedList = items.filter(resItem => resItem.roomno === item.roomno);
                setItems(updatedList);
        } 
       
        const EditUser = (e) => {
                console.log(e);
                navigate('/EditUser',{
                        state: {
                                serialno : e
                        }
                });
        }

        const ViewItems = (roomParam,locationParam) => {
            let path = "/";
            if (locationParam === "Storage") {
                 path = "/StorageLocationItem";
            } 
            else if (locationParam === "Room") {
                 path = "/RoomLocationItem";
            }

            navigate(path,{
                    state: {
                            roomno : roomParam
                    }
            });

        }

        return (
             
        <div className="UserRowItems">
                <div className="container-fluid">
                        <div className="row ">
                                <div className="col" onClick={ () => ViewItems(item.roomno,item.location)}> {item.roomno}</div>
                                <div className="col" > Otto Miller </div>
                                <div className="col" > {itemCount} </div>
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
                                                                        <li><a className="dropdown-item" >View Information</a></li>
                                                                        <li><a className="dropdown-item" >View History</a></li>
                                                                        <li><a className="dropdown-item" >Change Role</a></li>
                                                                        <li><a className="dropdown-item" >Change Status</a></li>
                                                                </ul>
                                                        </div>
                                                </div>
                                                <div className="col actions-column">
                                                        <button className="btn" onClick={ () => EditUser(item.serialno)}>
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

export default RoomCard;