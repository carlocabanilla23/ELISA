import React from "react";
import '../../assets/styles/User.css';
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { API } from "aws-amplify";


const RoomCard = ( {item} ) => {
        const navigate = useNavigate();
        const [items, setItems] = useState([]);
      
        useEffect(()=> {
                API.post('items','/items/roomno/',{
                  body: {
                    roomno : item.roomno
                  }
                }).then ( res => {
                  setItems(res);
                })
        },[]);


        const ViewItems = () => {
        //     let path = "/";
            if (item.location === "Storage") {
                navigate("/RoomLocation/StorageLocationItem/"+item.roomno);
                //  path = "/RoomLocation/StorageLocationItem";
            } 
            else if (item.location === "Room") {
                navigate("/RoomLocation/RoomLocationItem/"+item.roomno);
                //  path = "/RoomLocation/RoomLocationItem";
            }
        }

        return (
             
        <div className="UserRowItems">
                <div className="container-fluid">
                        <div className="row">
                                <div className="col">
                                        <div className="clickableCol" onClick={ () => ViewItems()}> {item.roomno}</div>
                                </div>
                                <div className="col"> {item.location} </div>
                                <div className="col" > Otto Miller </div>
                                <div className="col" > {items.length} </div>
                        </div>
                 </div>
                
        </div>    
    );

    

}

export default RoomCard;