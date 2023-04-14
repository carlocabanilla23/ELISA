import RoomCard from "../card/RoomCard";
import React, { useState } from "react";
import '../../assets/styles/List.css';
import { NULL } from "mysql/lib/protocol/constants/types";

const RoomList = ({items,updateList,ResortedList,sortAmountItem}) => {
    const [location, setLocation] = useState(true);
    const [roomno, setRoomNo] = useState(true);
    const [building, setBuilding] = useState(true);
    const [amount, setAmount] = useState(true);

    const reset = (title) => {
        title === 'location' ? setLocation(!location) : setLocation(true);
        title === 'roomno' ? setRoomNo(!roomno) : setRoomNo(true);
        title === 'building' ? setBuilding(!building) : setBuilding(true);
        title === 'amount' ? setAmount(!amount) : setAmount(true);
    }

    return (
        <>
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">   
                        <div className="col" onClick={e => {ResortedList('roomno',roomno);reset('roomno')}} style={{'cursor': 'pointer'}}> Room No </div>
                        <div className="col" onClick={e => {ResortedList('location',location);reset('location')}} style={{'cursor': 'pointer'}}> Location </div>
                        <div className="col" onClick={e => {ResortedList('building',building);reset('building')}} style={{'cursor': 'pointer'}}> Building </div>
                        <div className="col" onClick={e => {sortAmountItem(amount);reset('amount')}} style={{'cursor': 'pointer'}}> Number of Items</div> 
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { items.map( (item,index) => (
                    <li key={index}>
                        <RoomCard   item={item} 
                                    key={index}
                                    // updateList={updateList}      
                        />
                    </li>
                ))}
                
            </ul>

        </>
       
    )
}
export default RoomList;