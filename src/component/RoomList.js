import RoomCard from "./RoomCard";
import React from "react";
import './styles/List.css';

const RoomList = ({items,updateList}) => {

    return (
        <>
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">   
                            <div className="col"> Room No </div>
                            <div className="col"> Building </div>
                            <div className="col"> Number of Items</div> 
                            <div className="col"> Actions</div>        
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { items.map( (items,index) => (
                    <li key={index}>
                        <RoomCard item={items} key={index} updateList={updateList} />
                    </li>
                ))}
                
            </ul>

        </>
       
    )
}
export default RoomList;