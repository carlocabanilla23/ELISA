import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';

const OffCanvasCard = ({item,qrcode,barcode,roomList,storageList,actionName,refreshvalue}) => {
    const [status,setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [locationType, setLocationType] = useState('');

    useEffect(() => {
        setStatus(item.status);
        setLocation(item.roomno);
        setLocationType(item.location)
    },[item,qrcode,barcode,refreshvalue])

    useEffect(() => {
        const roomCol =  document.getElementById("roomCol");
        const storageCol =  document.getElementById("storageCol");
        roomCol.style.float = 'left';
        storageCol.style.position = 'relative';
        storageCol.style.float = 'right';
        storageCol.style.borderBottom = '1px solid lightgrey'
        roomCol.style.borderBottom = '1px solid lightgrey';
        if(roomList.length >= storageList.length){
            roomCol.style.borderRight = '1px solid grey';
        }else{
            storageCol.style.borderLeft = '1px solid grey';
        }
    })

    const date = new Date();
    // const year = date.getFullYear();
    // const month = date.getMonth()+1;
    // const day = date.getDate();

    const setNewStatus = () => {
        console.log(item);
        API.post("inventory","/items/", {
        body : {
            name : item.name,
            serialno : item.serialno,
            type : item.type,
            model : item.model,
            location : item.location,
            roomno : item.roomno,
            status : status,
            manufacturer: item.manufacturer,
            cost: item.cost,
            lastupdated: date,
            }});
        setTimeout(() => {
            window.location.reload(true);
        },400)
    }

    const setNewLocation = () => {
        console.log(item);
        console.log(location);
        console.log(locationType);
        API.post("inventory","/items/", {
            body : {
                name : item.name,
                serialno : item.serialno,
                type : item.type,
                model : item.model,
                location : locationType,
                roomno : location,
                status : item.status,
                manufacturer: item.manufacturer,
                cost: item.cost,
                lastupdated: date,
                }});
        setTimeout(() => {
            window.location.reload(true);
        },400)
    }

    const Print = (e) => {
        const pContents = document.getElementById(e).innerHTML;
      
        // const tmpContent = document.body.innerHTML;
        document.body.innerHTML = pContents;
        window.print();
        window.location.reload(true);
        // document.body.innerHTML = tmpContent;
        // window.location.reload(true);
        // document.getElementById("off-canvas-close-btn").style.ariaExpanded = "False"
    }

    return (
        <>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h3><strong>{actionName}</strong></h3>
                {/* <h5 id="offcanvasRightLabel"></h5> */}
                <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body">
                <div id="item-info">
                    {/* Image */}
                    <div className="mb-3 row">
                        <img src={item.image} width="150" height="150" alt="Device" />
                    </div>
                    {/* Serial Number */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Serial #:</label>
                        <div className = "Information col-sm-8">{item.serialno}</div>
                    </div>
                    {/* Type */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Type:</label>
                        <div className = "Information col-sm-8">{item.type}</div>
                    </div>
                    {/* Model */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Model:</label>
                        <div className = "Information col-sm-8">{item.model}</div>
                    </div>
                    {/* Manufacturer */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Manufacturer:</label>
                        <div className = "Information col-sm-8">{item.manufacturer}</div>
                    </div>
                    {/* Location */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Location:</label>
                        <div className = "Information col-sm-8">{item.location}</div>
                    </div>
                    {/* Room Number */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Room #:</label>
                        <div className = "Information col-sm-8">{item.roomno}</div>
                    </div>
                    {/* Status */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Status:</label>
                        <div className = "Information col-sm-8">{item.status}</div>
                    </div>
                    {/* Cost */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Cost:</label>
                        <div className = "Information col-sm-8">{item.cost}</div>
                    </div>
                    {/* Date Created */}
                    <div className = "mb-3 row">
                        <label  className = "Attribute col-sm-4">Created:</label>
                        <div className = "Information col-sm-8">{item.createdate}</div>
                    </div>
                    {/* Last Updated */}
                    <div className = "mb-3 row">
                        <label  className = "Attribute col-sm-4">Updated:</label>
                        <div className = "Information col-sm-8">{item.lastupdated}</div>
                    </div>
                    {/* Dated Acquired */}
                    <div className = "mb-3 row">
                        <label  className = "Attribute col-sm-4">Acquired:</label>
                        <div className = "Information col-sm-8">{item.acquiredate}</div>
                    </div>
                    {/* Dated Expired */}
                    <div className = "mb-3 row">
                        <label  className = "Attribute col-sm-4">Expired:</label>
                        <div className = "Information col-sm-8">{item.expiredate}</div>
                    </div>
                </div>

                <div id="qrcode">
                    <button id="qrcode-print-btn" onClick={(e)=>Print("qrcode-img")}><i class="fa fa-print" aria-hidden="true"></i></button>
                    <div id="qrcode-img">{qrcode}</div>
                </div>

                <div id="barcode">
                    {barcode}
                </div>

                <div id="Offstatus">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {status}
                        </button>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item" onClick={(e)=> setStatus ("New")} > New</li>
                            <li className="dropdown-item" onClick={(e)=> setStatus ("Old")} > Old</li>
                            <li className="dropdown-item" onClick={(e)=> setStatus ("Used")} > Used</li>
                            <li className="dropdown-item" onClick={(e)=> setStatus ("Broken")} > Broken</li>
                        </ul>
                        <button  className="btn btn-secondary" type="button" onClick={(e) => status !== item.status ? setNewStatus() : ''}>
                        save
                        </button>
                    </div>
                </div>
                <div id="changeLocation">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {locationType}  {locationType !== "Room" && locationType !== "Storage" ? '' : location}
                    </button>
                    <ul className="dropdown-menu">
                        <div id="roomCol">
                            <span className="dropdown-item fw-bold bg-light" id="itemRoomList" >Room List</span>
                            {/* Room list */}
                            {roomList.map((room,index) => (
                                <li key={index} className="dropdown-item" onClick={(e) => {setLocation(room);setLocationType("Room")}}>{room}</li>
                            ))}
                        </div>
                        {/* Storage list */}
                        <div id="storageCol">
                            <span className="dropdown-item fw-bold bg-light" id="itemStorageList" >Storage List</span>
                            {/* Room list */}
                            {storageList.map((storage,index) => (
                                <li key={index} className="dropdown-item" onClick={(e) => {setLocation(storage);setLocationType("Storage")}}>{storage}</li>
                            ))}
                        </div>
                    </ul>
                    <button  className="btn btn-secondary" type="button" onClick={(e)=> location !== item.roomno ? setNewLocation() : ''}>
                    save
                    </button>
                </div>
            </div>
        </div> 
        </>
    );
}

export default OffCanvasCard;