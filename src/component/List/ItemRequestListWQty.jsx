
import React from "react";
import ItemCardShortWQty from "../card/ItemCardShortWQty";

const ItemRequestListWQty = ({items}) => {
    
    return ( 
        <>
                    <div className="row row mt-4 p-3 fw-bold  bg-light">
                            <div className="col fw-bold"> Type </div>
                            <div id="model" className="col  fw-bold"> Model </div>
                            <div id="model" className="col fw-bold"> Manufacturer </div>
                            <div id="model" className="col fw-bold"> Room No </div>
                            <div className="col fw-bold"> Quantity </div>
                            {/* <div id="status" className="col rmobile"> Status </div> */}
                    </div>
            <ul className="list-group">
                { items.map( (item,index) => (
                    <li key={index}>
                        <ItemCardShortWQty item={item} key={index}/>
                    </li>
                ))}
                
            </ul>
        </>
    );
} 

export default ItemRequestListWQty;