import React from "react"

const ItemCardShortWQty = ({item}) => {
    
    return ( 
        <>
            <div className="row mb-4 p-3">
                <div className="col"> {item.type} </div>
                <div id="model" className="col "> {item.model} </div>
                <div id="status" className="col"> {item.manufacturer} </div>
                <div className="col"> {item.roomno} </div>
                <div className="col"> {item.quantity} </div>
            </div>
        </>
    );
} 

export default ItemCardShortWQty;
