import ItemCard from "../card/ItemCard";
import React, { useState,useEffect } from "react";
import '../../assets/styles/List.css';

const ItemList = ({items,updateList,ViewInformation,CreateQRCode,CreateBarcode,
                        changeStatus,changeLocation,changeRFIDCode,ResortedList,deleteConfirm}) => {
                            
    const [serial, setSerial] = useState(true);
    const [name, setName] = useState(true);
    const [type, setType] = useState(true);
    const [model, setModel] = useState(true);
    const [location, setLocation] = useState(true);
    const [roomno, setRoomNo] = useState(true);
    const [status, setStatus] = useState(true);

    const reset = (title) => {
        title === 'serialno' ? setSerial(!serial) : setSerial(true);
        title === 'name' ? setName(!name) : setName(true);
        title === 'type' ? setType(!type) : setType(true);
        title === 'model' ? setModel(!model) : setModel(true);
        title === 'location' ? setLocation(!location) : setLocation(true);
        title === 'roomno' ? setRoomNo(!roomno) : setRoomNo(true);
        title === 'status' ? setStatus(!status) : setStatus(true);
    }
    return (
        
        <>
            <div className="UserRowTitle">
                <div className="container-fluid">
                    <div className="row">
                            <div className="col" onClick={e => {ResortedList('serialno',serial);reset('serialno')}} style={{'cursor': 'pointer'}}> Serial No </div>
                            <div className="col" onClick={e => {ResortedList('name',name);reset('name')}} style={{'cursor': 'pointer'}}> Name </div>
                            <div className="col" onClick={e => {ResortedList('type',type);reset('type')}} style={{'cursor': 'pointer'}}> Type </div>
                            <div id="model" className="col rmobile" onClick={e => {ResortedList('model',model);reset('model')}} style={{'cursor': 'pointer'}}> Model </div>
                            <div id="status" className="col rmobile" onClick={e => {ResortedList('status',status);reset('status')}} style={{'cursor': 'pointer'}}> Status </div>
                            <div id="location" className="col rmobile" onClick={e => {ResortedList('location',location);reset('location')}} style={{'cursor': 'pointer'}}> Location </div>
                            <div id="roomNumber" className="col rmobile" onClick={e => {ResortedList('roomno',roomno);reset('roomno')}} style={{'cursor': 'pointer'}}> Room No </div>
                            {/* <div id="status" className="col rmobile"> Status </div> */}
                            <div className="col actions rmobile"> Actions</div>        
                    </div>
                </div>
            </div>

            <ul className="list-group">
                { items.map( (items,index) => (
                    <li key={index}>
                        <ItemCard item={items} key={index}
                                updateList={updateList}
                                ViewInformation={ViewInformation}
                                CreateQRCode={CreateQRCode} 
                                CreateBarcode={CreateBarcode}
                                changeStatus={changeStatus}
                                changeLocation={changeLocation}
                                changeRFIDCode={changeRFIDCode}
                                deleteConfirm={deleteConfirm} />
                    </li>
                ))}
                
            </ul>

        </>
       
    )
}
export default ItemList;