import ItemCard from "./ItemCard";
import React from "react";
import './styles/List.css';
import { useEffect } from "react";

const ItemList = ({items,updateList,ViewInformation,CreateQRCode,CreateBarcode,changeStatus,changeLocation}) => {

    return (
        <>
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">
                            <div className="col"> Serial No </div>
                            <div className="col"> Name </div>
                            <div className="col"> Type </div>
                            <div id="model" className="col rmobile"> Model </div>
                            <div id="location" className="col rmobile"> Location </div>
                            <div id="roomNumber" className="col rmobile"> Room No </div>
                            {/* <div id="status" className="col rmobile"> Status </div> */}
                            <div className="col rmobile"> Actions</div>        
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { items.map( (items,index) => (
                    <li key={index}>
                        <ItemCard item={items} key={index}
                                updateList={updateList}
                                ViewInformation={ViewInformation}
                                CreateQRCode={CreateQRCode} 
                                CreateBarcode={CreateBarcode}
                                changeStatus={changeStatus}
                                changeLocation={changeLocation} />
                    </li>
                ))}
                
            </ul>

        </>
       
    )
}
export default ItemList;