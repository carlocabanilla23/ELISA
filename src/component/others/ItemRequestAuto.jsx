
import React from "react";

const ItemRequestAuto = ({item}) => {
    
    return ( 
        <>
            {/* <div className="ml--2"> */}
   
            <div className="row mt-4 p-3 fw-bold  bg-light">
                <div className="col fw-bold">Serial No</div>
                <div className="col fw-bold ">Type</div>
                <div className="col fw-bold">Model</div>
                <div className="col fw-bold">Manufacturer</div>
            </div>
            <div className="row mb-4 p-3">
                <div className="col ">{item.serialno}</div>
                <div className="col  ">{item.type}</div>
                <div className="col ">{item.model}</div>
                <div className="col ">{item.manufacturer}</div>
            </div>
            {/* </div> */}
        </>
    );
} 

export default ItemRequestAuto;