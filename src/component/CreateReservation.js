import React from "react";
import { useState, useEffect } from "react";
import { API } from 'aws-amplify';

function CreateReservation () {
    const [model] = useState([]);
    const [type] = useState([]);
    const [filteredModel] =useState([]);
    
    useEffect( () => {
        API.get("inventory","/items/").then( itemRes => {
            sortItems(itemRes);
        })
    },[]);

    const sortItems = (items) => {
        items.forEach ( res => {
            if (!model.includes(res.model)) model.push(res);
            if (!type.includes(res.type)) type.push(res.type);
        });
    }

    const setModel = (type) => {
        model.forEach ( res => {
            if (model.type === type) filteredModel.push(res.model);
        });
    }

    // let order = {
    //     type: "",
    //     model: "",
    //     quantity: ""
    // }

    return (
        <>
            <h1> Test</h1>
            {console.log(model)}
            {console.log(type)}

            <div className="type">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Type
                    </button>
                    <ul className="dropdown-menu">
                        {type.map( typeRes => (
                            <li><a className="dropdown-item" onClick={(e)=> setModel(typeRes)} >{typeRes}</a></li>
                        ))}
                    </ul>
                </div>
            </div>


            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Model
                </button>
                <ul className="dropdown-menu">
                    {filteredModel.map( modelRes => (
                        <li><a className="dropdown-item" >{modelRes}</a></li>
                    ))}
                </ul>
            </div>
            <div className="model"></div>
          
        </>
    );
}

export default CreateReservation;