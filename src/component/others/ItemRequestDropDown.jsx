import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";


const ItemRequestDropDown = ({setError,setErrorMessage,setReservationCart,reservationCart}) => {
    const [types,setTypes] = useState();
    const [items,setItems] = useState([]);
    const [type, setType] = useState('Type');
    const [model,setModel] = useState('Model');
    const [models,setModels] = useState([]);
    const [quantity,setQuantity] = useState(0);
    const auth = localStorage.getItem('access');

    useEffect( ()=>{
        API.get("items","/items").then( itemRes => {
            console.log(itemRes);
            // setTypes(itemRes)
            sortItems(itemRes);
            setItems(itemRes);
        })

    },[]);

    const setModelList = (typeParam) => {
        setType(typeParam);
        const filterItems = items.filter(item => item.type === typeParam);
        let arr = [];

        filterItems.forEach (e => {
            if (arr.indexOf(e.model) === -1) {
                arr.push(e.model);
            }
        })
        
        setModels(arr);
      
    }

    const sortItems = (items) => {
        const updatedTypes =  [...new Set(items.map( item => item.type))];
        setTypes(updatedTypes);

    }
    const addItem = (e) => {
        e.preventDefault();
        if(type === 'Type' && model === 'Model'){
            setError(1);
            // throw new Error(setError(1));
        }else if(type === 'Type'){
            setError(2);
            // throw new Error(setError(2));
        }else if (model === 'Model'){
            setError(3);
            // throw new Error(setError(3));
        }else if(quantity < 1 || quantity.length === 0){
            // throw new Error(setError(4));
            setError(4);
        }else if(auth === "Student" && quantity < 3){
            setError(7);
        }else {
            const order = {
                type : type,
                model : model,
                quantity : quantity
            }
            // console.log(order);
            setReservationCart([...reservationCart,order]);
            // console.log(reservationCart);
           
        }
        
    }
    // console.log(types);
    
     return (
            <>
                <div className="row">
                    <div className="col type">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {type}
                            </button>
                            <ul className="dropdown-menu">
                                {types?.map( (typeRes,index) => (
                                    <li key={index} className="dropdown-item" onClick={(e)=> {setModelList(typeRes); setError(''); setErrorMessage('')}}>{typeRes}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col model">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {model}
                            </button>
                            <ul className="dropdown-menu">
                                {models?.map( (modelRes,index) => (
                                    <li key={index} className="dropdown-item" onClick={(e)=> {setModel(modelRes); setError(''); setErrorMessage('')}}>{modelRes}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col quantity">
                        <div className="dropdown">
                            <input className="form-control"
                            type="text"
                            placeholder="Amount"
                            onChange={ (e) => {
                                setQuantity(e.target.value);
                                setError('');
                                setErrorMessage('');
                                e.target.validity.patternMismatch || e.target.value === '' ? e.target.setCustomValidity('Input amount of item you want to reserve') : e.target.setCustomValidity('')
                            }}
                            aria-describedby="inputGroup-sizing-default"
                            pattern='^([0-9]{1,})$'
                            onInvalid={(event) => {event.target.setCustomValidity('Input amount of item you want to reserve')}}
                            required={true} />
                        </div>
                    </div>
                    <div className="col submit">
                        <button className="btn AddItemBtn" onClick={ (e) => addItem(e)}>
                            <i className="fa fa-plus-circle" aria-hidden="true"> Add Item</i>
                        </button>
                    </div>
                </div> 

            </>);
}

export default ItemRequestDropDown;