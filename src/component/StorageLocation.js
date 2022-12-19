import CreateTestEquipment from "./test/CreateTestEquipment";
import Item from "./Item";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function StorageLocation () {
    // CreateTestEquipment(20);
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const navigate = useNavigate();

    // const AddUser = e => {
    //     e.preventDefault();
    //     navigate('/CreateUser');
    // }

    useEffect( () => {
        // const items = await API.get('myCloudApi', '/items', );
        API.get("inventory","/items/").then( itemRes => {
            sortItems(itemRes);
        })},[]);

    const updateList = (serialno) => {
        API.del("inventory","/items/object/"+serialno);
        const updatedList = items.filter(item => item.serialno !== serialno);
        setItems(updatedList);
        setUnfilteredItems(updatedList);
       
    }

    const sortItems = (items) => {
        const updatedList = items.filter(item => item.location === "storage");
        setItems(updatedList);
        setUnfilteredItems(updatedList);
    } 
    const searchItem = (e) => {
        if (e.length > 0) {
            const searcedhItems = unfilteredItems.filter((items) => items.serialno.toLowerCase().includes(e) || 
                                                                    items.name.toLowerCase().includes(e) || 
                                                                    items.model.toLowerCase().includes(e) || 
                                                                    items.type.includes(e));
            setItems(searcedhItems);
        }else{
            setItems(unfilteredItems);
        }
       
    }  
    return (
        <div className="Users">
        <Sidebar />
        <Header />
        <div className="UserHeader">

            <div className="row">
                <div className="col fs-4 ms-5 fw-bold"> 
                    <i className="fa fa-users" aria-hidden="true">Storage Location</i>
                </div>

                <div className="col-sm-5 searchbar">
                    <input type="email" className="form-control" onChange={ (e)=> { searchItem(e.target.value)} } id="exampleFormControlInput1" placeholder="Search User"/>
                </div>

                <div className="col text-end adduser">
                    <button type="submit" className="btn" id="AddUser">Add User</button>
                </div>

                <div className="col auto dropdown">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Export
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">CSV</a></li>
                            <li><a className="dropdown-item" href="#">PDF</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="UserPane">
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
                {items.map( (itemRes,index) => <Item item={itemRes} key={index} updateList={updateList}/>)}
                   
        </div>
    </div>    
    )
}

export default StorageLocation;