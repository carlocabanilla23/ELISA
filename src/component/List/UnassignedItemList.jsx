import UnassignedItemCard from "../card/UnassignedItemCard";
import React from "react";
import './../styles/List.css';

const UnassignedItemList = ({items,updateList,ViewInformation,CreateQRCode,CreateBarcode,changeStatus,changeLocation}) => {

    return (
        <>
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">
                            <div className="col"> Serial No </div>
                            <div className="col"> Name </div>
                            <div className="col"> Type </div>
                            <div className="col"> Model </div>
                            {/* <div className="col"> Assigned To </div>
                            <div className="col"> Order Number</div>  */}
                            <div className="col"> Actions</div>        
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { items.map( (items,index) => (
                    <li key={index}>
                        <UnassignedItemCard
                            item={items}
                            key={index}
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
export default UnassignedItemList;