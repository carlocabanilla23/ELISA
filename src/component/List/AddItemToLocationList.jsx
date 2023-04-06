import AddItemToLocationCard from "../card/AddItemToLocationCard";
import React from "react";
import '../../assets/styles/List.css';
import { useLocation } from "react-router-dom";

const AddItemToLocationList = ({items,updateList}) => {
    const location = useLocation();
    const roomnoParam = location.state.roomno;
    const locationParam = location.state.location;

    return (
        <>
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">   
                    <div className="col"> Serial No </div>
                            <div className="col"> Name </div>
                            <div className="col"> Type </div>
                            <div className="col"> Model </div>
                            <div className="col"> Location </div>
                            <div className="col"> Room No </div>
                            <div className="col"> Status </div>
                            <div className="col"> Actions</div>        
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { items.map( (item,index) => (
                    <li key={index}>
                        <AddItemToLocationCard   
                                    item={item} 
                                    key={index} 
                                    roomno = {roomnoParam}
                                    location = {locationParam}
                                    updateList = {updateList}
                        />
                    </li>
                ))}
                
            </ul>

        </>
       
    )
}
export default AddItemToLocationList;