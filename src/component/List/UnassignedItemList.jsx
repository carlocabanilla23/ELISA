import UnassignedItemCard from "../card/UnassignedItemCard";
import React from "react";
import './../styles/List.css';

const UnassignedItemList = ({items,updateList}) => {

    return (
        <>
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">
                            <div className="col"> Serial No </div>
                            <div className="col"> Name </div>
                            <div className="col"> Type </div>
                            <div className="col"> Model </div>
                            <div className="col"> Assigned To </div>
                            <div className="col"> Date Assigned</div> 
                            <div className="col"> Return Date</div>        
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { items.map( (items,index) => (
                    <li key={index}>
                        <UnassignedItemCard item={items} key={index} updateList={updateList} />
                    </li>
                ))}
                
            </ul>

        </>
       
    )
}
export default UnassignedItemList;