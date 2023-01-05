import RoomCard from "./RoomCard";
import React from "react";
import './styles/List.css';
import { API } from 'aws-amplify';
import { useState, useEffect } from "react";

const RoomList = ({items,updateList}) => {

    const [allItems, setItems] = useState([]);

    useEffect( () => {
        API.get("inventory","/items").then( itemRes => {
            setItems(itemRes);
        })
    },[]);

    return (
        <>
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">   
                            <div className="col"> Room No </div>
                            <div className="col"> Building </div>
                            <div className="col"> Number of Items</div> 
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { items.map( (item,index) => (
                    <li key={index}>
                        <RoomCard   item={item} 
                                    key={index} 
                                    updateList={updateList} 
                                    itemCount={allItems.filter(e => e.roomno === item.roomno).length}
                                 
                        />
                    </li>
                ))}
                
            </ul>

        </>
       
    )
}
export default RoomList;