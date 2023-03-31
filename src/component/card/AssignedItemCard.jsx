import React from "react";
import "../../assets/styles/User.css";

const AssignedItemCard = ({ item, updateList }) => {
 
  return (
    <div className="UserRowItems">
      <div className="container-fluid">
        <div className="row ">
          <div className="col"> {item.serialno} </div>
          <div className="col"> {item.name} </div>
          <div className="col"> {item.type} </div>
          <div className="col"> {item.model} </div>
          <div className="col"> {item.assignedto} </div>
          <div className="col"> {item.assignedate} </div>
          {/* <div className="col"> {item.returndate} </div> */}
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">{item.name}</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        
      </div>
    </div>
  );
};

export default AssignedItemCard;
