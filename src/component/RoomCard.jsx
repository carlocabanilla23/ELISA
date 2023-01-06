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
                 path = "/RoomLocation/StorageLocationItem";
            } 
            else if (locationParam === "Room") {
                 path = "/RoomLocation/RoomLocationItem";
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
                        </div>
                 </div>
                
        </div>    
    );

    

}

export default RoomCard;