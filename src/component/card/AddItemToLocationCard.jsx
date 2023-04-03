import React from "react";
import '../../assets/styles/itemcard.css';
import { API } from "aws-amplify";


const AddItemToLocationCard = ( {item,updateList,itemCount,roomno,location} ) => {

        const AddItemToLocation = (e,serialno) => {
            e.preventDefault();
            API.put("items","/items", {
                body : {
                    name : item.name,
                    type : item.type,
                    model : item.model,
                    status : item.status, 
                    serialno : serialno,
                    location : location,
                    roomno : roomno,
                }
            });
            updateList(serialno);
        }
        return (    
        <div className="UserRowItems">
                <div className="container-fluid">
                        <div className="row ">
                            <div className="col"> {item.serialno} </div>
                            <div className="col"> {item.name} </div>
                            <div className="col"> {item.type} </div>
                            <div className="col"> {item.model} </div>
                            <div className="col"> {item.location} </div>
                            <div className="col"> {item.roomno} </div>
                            <div className="col"> {item.status} </div>
                            <div className="col actions-column">
                                <button className="btn addItem" onClick={ (e) => AddItemToLocation(e,item.serialno)}>
                                    Add
                                </button>
                            </div>
                        </div>
                 </div>
                
        </div>    
    );

}

export default AddItemToLocationCard;