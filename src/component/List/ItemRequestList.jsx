import React from "react";
import ItemCardShort from "../card/ItemCardShort";
import '../../assets/styles/List.css';

const ItemRequestList = ({items,RemoveItem}) => {

    return (
        <>
            <div className="ReservationItemList">
                <div className="container-fluid">
                    <div className="row fw-bold bg-light">
                        <div className="col"></div>
                        <div className="col">Name</div>
                        <div className="col">Type</div>
                        <div className="col">Model</div>
                        <div className="col">Manufacurer</div>
                        {/* <div className="col">Status</div> */}
                    </div>
                </div>
                <ul className="list-group">
                    { items.map( (items,index) => (
                        <li key={index}>
                            <ItemCardShort RemoveItem={RemoveItem} item={items} key={index}/>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ItemRequestList;