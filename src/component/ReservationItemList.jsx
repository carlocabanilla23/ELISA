import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './styles/List.css';

const ReservationItemList = ({items,addItem,status}) => {
    const [display,setDisplay] = useState("btn btn-dark");
    useEffect( () => {
        if (status !== "Open") setDisplay("btn btn-dark hidden");
    },[]);

    return (
        <div className="ReservationItemList">
            <ul className="list-group">
                <li>
                    <div className="container-fluid">
                        <div className="row fw-bold bg-light">
                            <div className="col"></div>
                            <div className="col">Serial No</div>
                            <div className="col">Name</div>
                            <div className="col">Type</div>
                            <div className="col">Model</div>
                            <div className="col">Status</div>
                            
                        </div>
                    </div>
                </li>

                { items.map( (item,index) => (
                <li key={index}>
                        <div className="container-fluid">
                            <div className="row ">
                                <div className="col action">
                                    <button className={display} onClick={ () => addItem(item)}>Assign</button>
                                </div>
                                <div className="col"> {item.serialno} </div>
                                <div className="col"> {item.name} </div>
                                <div className="col"> {item.type} </div>
                                <div className="col"> {item.model} </div>
                                <div className="col"> {item.status} </div>
                                
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
       
    )
}

export default ReservationItemList;