import RoomCard from "../card/RoomCard";
import React from "react";
import '../../assets/styles/List.css';

const RoomList = ({items,updateList}) => {

    return (
        <>
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">   
                        <div className="col"> Room No </div>
                        <div className="col"> Location </div>
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
                                    // updateList={updateList}      
                        />
                    </li>
                ))}
                
            </ul>

        </>
       
    )
}
export default RoomList;