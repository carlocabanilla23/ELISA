import ItemCard from "./ItemCard";
import React from "react";
import './styles/List.css';

const ItemList = ({items,updateList}) => {

    return (
        <>
            <div className="UserRowTitle">
                <div className="container">
                    <div className="row">
                            <div className="col"> Serial No </div>
                            <div className="col"> Name </div>
                            <div className="col"> Type </div>
                            <div className="col"> Model </div>
                            <div className="col"> Location </div>
                            <div className="col"> Room No </div>
                            <div className="col"> Status </div>
                            <div className="col"> Actions</div>        
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { items.map( (items,index) => (
                    <li key={index}>
                        <ItemCard item={items} key={index} updateList={updateList} />
                    </li>
                ))}
                
            </ul>

        </>
       
    )
}
export default ItemList;