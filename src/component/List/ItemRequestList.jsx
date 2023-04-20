
import React from "react";
import ItemCardShort from "../card/ItemCardShort";

const ItemRequestList = ({items}) => {
    
    return ( 
        <>
                    <div className="row row mt-4 p-3 fw-bold  bg-light">
                            <div className="col fw-bold"> Name </div>
                            <div className="col fw-bold"> Type </div>
                            <div id="model" className="col  fw-bold"> Model </div>
                            <div id="model" className="col fw-bold"> Manufacturer </div>
                            {/* <div id="status" className="col rmobile"> Status </div> */}
                    </div>
            <ul className="list-group">
                { items.map( (items,index) => (
                    <li key={index}>
                        <ItemCardShort item={items} key={index}/>
                    </li>
                ))}
                
            </ul>
        </>
    );
} 

export default ItemRequestList;