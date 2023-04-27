import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import ItemList from "../List/ItemList";


const ItemRequestDropDown = ({setError,setErrorMessage,updateCart,reservationCart,setReservationCart,setFilteredItems,filteredItems}) => {
    const [types,setTypes] = useState();
    const [items,setItems] = useState([]);
    const [type, setType] = useState('Type');
    const [model,setModel] = useState('Model');
    const [models,setModels] = useState([]);
    const [quantity,setQuantity] = useState(0);
    const auth = localStorage.getItem('access');
    const [manufacturer,setManufacturer] = useState('Manufacturer');
    const [manufacturers,setManufacturers] = useState();
    const [roomno,setRoomno] = useState('Room No');
    const [roomnos,setRoomnos] = useState([]);
    const [name,setName] = useState("Name");
    const [names,setNames] = useState([]);
    const [cart,setCart] = useState([]);

    useEffect( ()=>{

        API.get("items","/items/createreservation").then( itemRes => {
            let temparr = []
            itemRes.forEach(element => {
                if (reservationCart.indexOf(element) === -1) {
                    temparr.push(element)
                }
            });

            // filter( i => !reservationCart.some(r =>  r !== i));
            const updatedTypes =  [...new Set(temparr.map( item => item.type))];
            setItems(temparr);
            setTypes(updatedTypes);
            setNames([]);
            setNames([]);
            setManufacturers([]);
            setRoomnos([]);

        })
    },[reservationCart,cart]);

    const sortItems = (items) => {
    }

    const setModelList = (typeParam) => {
        setType(typeParam);
        const filterItems = items.filter(item => item.type === typeParam);
        let arr = [];
        let arrNames = [];

        filterItems.forEach (e => {
            if (arr.indexOf(e.model) === -1) {
                arr.push(e.model);
            }
        })

        filterItems.forEach (e => {
            if (arr.indexOf(e.name) === -1) {
                arrNames.push(e.name);
            }
        })

        setModels(arr);
        setManufacturers([]);
        setRoomnos([]);
        setNames(arrNames);

        setModel('Model');
        setManufacturer('Manufacturer');
        setRoomno('Room No');
        setName('Name');

    }

    const setManufacturerList = (modelParam) => {
        setModel(modelParam);
        const filterItems = items.filter(item => item.model === modelParam);
        let arr = [];
        let arrNames = [];

        filterItems.forEach (e => {
            if (arr.indexOf(e.manufacturer) === -1) {
                arr.push(e.manufacturer);
            }
        })

        filterItems.forEach (e => {
            if (arr.indexOf(e.name) === -1) {
                arrNames.push(e.name);
            }
        })

        setManufacturers(arr);
        setRoomnos([]);
        setNames(arrNames);

        setManufacturer('Manufacturer');
        setRoomno('Room No');
        setName('Name');

    }

    const setRoomList = (manufacturerParam) => {
        setManufacturer(manufacturerParam);

        const filterItems = items.filter(item => item.manufacturer === manufacturerParam);
        let arr = [];
        let arrNames = [];

        filterItems.forEach (e => {
            if (arr.indexOf(e.roomno) === -1) {
                arr.push(e.roomno);
            }
        })

        filterItems.forEach (e => {
            if (arr.indexOf(e.name) === -1) {
                arrNames.push(e.name);
            }
        })

        setRoomnos(arr);
        setNames(arrNames);

        setRoomno('Room No');
        setName('Name');
    }

    const setNameList = (roomnoParam) => {
        setRoomno(roomnoParam);

        const filterItems = items.filter(item => item.roomno === roomnoParam);
        let arrNames = [];
        filterItems.forEach (e => {
            if (arrNames.indexOf(e.name) === -1) {
                arrNames.push(e.name);
            }
        })
    //     // console.log(arrNames)

        setNames(arrNames);

        setName('Name');
    }

    const addItem = (e) => {
        if (name === "Name") {
            console.log("error");
        } else {
            let idx = items.findIndex(item => item.name === name);

            setReservationCart([items[idx],...reservationCart]);
            setCart([items[idx],...cart]);

            let tmpitms = items.filter( i => i!== items[idx]);
            let tmpnames = names.filter( n => n !== items[idx].name );

            setNames(tmpnames);
            setItems(tmpitms);
            setName("Name");

            setFilteredItems((items) =>
                items.filter((i) => i.name !== name)
            );
        }
       

    }
    
     return (
            <>
                <div className="row" id="custom-dropdown-row">
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
                                    <li key={index} className="dropdown-item" onClick={(e)=> {setManufacturerList(modelRes); setError(''); setErrorMessage('')}}>{modelRes}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col manufacturer">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {manufacturer}
                            </button>
                            <ul className="dropdown-menu">
                                {manufacturers?.map( (manufacturerRes,index) => (
                                    <li key={index} className="dropdown-item" onClick={(e)=> {setRoomList(manufacturerRes); setError(''); setErrorMessage('')}}>{manufacturerRes}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col roomnos">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {roomno}
                            </button>
                            <ul className="dropdown-menu">
                                {roomnos?.map( (roomnoRes,index) => (
                                    <li key={index} className="dropdown-item" onClick={(e)=> {setNameList(roomnoRes); setError(''); setErrorMessage('')}}>{roomnoRes}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col name">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {name}
                            </button>
                            <ul className="dropdown-menu">
                                {names?.map( (nameRes,index) => (
                                    <li key={index} className="dropdown-item" onClick={(e)=> {setName(nameRes); setError(''); setErrorMessage('')}}>{nameRes}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                   
                    {/* <div className="col quantity">
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
                    </div> */}
                    <div className="col submit">
                        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                        <button className="btn AddItemBtn" onClick={e => addItem(e)}>
                            <span className="material-icons">
                            add_circle_outline
                            </span>
                        </button>
                    </div>
                </div> 



                    {/* <ItemList items={cart} 
                      /> */}


                

            </>);
}

export default ItemRequestDropDown;