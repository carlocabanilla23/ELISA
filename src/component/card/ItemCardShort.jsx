import React from "react"

const ItemCardShort = ({item}) => {
    
    return ( 
        <>
            <div className="row mb-4 p-3">
                <div className="col"> {item.name} </div>
                <div className="col"> {item.type} </div>
                <div id="model" className="col "> {item.model} </div>
                <div id="status" className="col"> {item.manufacturer} </div>
            </div>
        </>
    );
} 

export default ItemCardShort;
