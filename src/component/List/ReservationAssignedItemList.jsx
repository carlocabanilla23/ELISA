import React from "react";
import '../../assets/styles/List.css';

const ReservationAssignedItemList = ({items,removeItem}) => {

    return (
        <div className="ReservationItemList">
            <ul className="list-group">
                <li>
                    <div className="">
                        <div className="row fw-bold bg-light">
                            <div className="col">Serial No</div>
                            <div className="col">Name</div>
                            <div className="col">Type</div>
                            <div className="col">Model</div>
                            <div className="col  assignedItemListHeader"></div>
                        </div>
                    </div>
                </li>
            
                { items.map( (item,index) => (
                <li key={index}>
                        <div className="">
                            <div className="row ">
                                <div className="col"> {item.serialno} </div>
                                <div className="col"> {item.name} </div>
                                <div className="col"> {item.type} </div>
                                <div className="col"> {item.model} </div>
                                <div className="col action assignedItemListRemoveBtn ">
                                    <button className="btn btn-dark assignedItemListRemoveBtn"onClick={() => removeItem(item)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
       
    )
}

export default ReservationAssignedItemList;