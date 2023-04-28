import React from "react";
import "../../assets/styles/List.css";

const ItemCardShort = ({item, RemoveItem}) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col action">
            <button className="btn btn-dark" onClick={e => RemoveItem(item)}>Remove</button>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <button className="btn AddItemBtn" onClick={e => RemoveItem(item)}>
              <span className="material-icons">
                remove_circle_outline
              </span>
            </button>
          </div>
          <div className="col item-text"> {item.name} </div>
          <div className="col item-text"> {item.type} </div>
          <div className="col item-text"> {item.model} </div>
          <div className="col item-text"> {item.manufacturer} </div>
        </div>
      </div>
    </>
  );
};

export default ItemCardShort;
