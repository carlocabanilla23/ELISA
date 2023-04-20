import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetDateToday } from '../../Services/etc/GetDateToday';

const OffCanvasCard = ({item,qrcode,barcode,roomList,storageList,actionName,refreshvalue,updateDataStatus,itemStatus}) => {
    const [status,setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [locationType, setLocationType] = useState('');
    const [RFIDCode, setRFIDCode] = useState('');
    const [RFIDCode2, setRFIDCode2] = useState('');
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [reservebtn,setReservebtn] = useState();
    const navigate = useNavigate();
    
    var today = GetDateToday();

    useEffect(() => {      
        setStatus(item.status);
        setLocation(item.roomno);
        setLocationType(item.location);
        if(item.rfidcode){
            setRFIDCode(item.rfidcode);
        }else{
            setRFIDCode('');
        }
        setRFIDCode2('');
    },[refreshvalue])

    useEffect(() => {
        if(error === '1'){
            setErrorMessage("Re-enter RFID Code does not match RFID Code");
        }
    },[error])

    useEffect ( ()=> {
        if (itemStatus === "Available") {
            setReservebtn();
        }

    },[])
    
    const updateStatus =( )=> {

        if ( status !== item.status) {
            updateDataStatus(item.serialno,status);
            setNewStatus() 

        }

    }
    const setNewStatus = () => {
        API.post("items","/items/", {
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
            rfidcode: item.rfidcode,
            lastupdated: today,
            }});
            
          
        // setTimeout(() => {
        //     window.location.reload(true);
        // },400)
    }

    const setNewLocation = () => {
        API.post("items","/items/", {
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
                rfidcode: item.rfidcode,
                lastupdated: today,
                }});
        setTimeout(() => {
            window.location.reload(true);
        },400)
    }

    const setNewRFIDCode = () => {
        if(RFIDCode !== RFIDCode2){
            throw new Error(setError('1'));
        }
        API.post("items","/items/", {
            body : {
                name : item.name,
                serialno : item.serialno,
                type : item.type,
                model : item.model,
                location : item.location,
                roomno : item.roomno,
                status : item.status,
                manufacturer: item.manufacturer,
                cost: item.cost,
                rfidcode: RFIDCode,
                lastupdated: today,
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

    const reserveItem = () => {
        if ( item.status === "Available") {
            navigate("/CreateReservation/"+item.type +"/"+item.serialno);

        } else {
            alert("The item is not Available !");
        }
    }

    return (
        <>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h3><strong>{actionName}</strong></h3>
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
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Condition:</label>
                        <div className = "Information col-sm-8">{item.condition}</div>
                    </div>
                    {/* Cost */}
                    <div className="mb-3 row">
                        <label  className = "Attribute col-sm-4">Cost:</label>
                        <div className = "Information col-sm-8">{item.cost}</div>
                    </div>

                    <button id="item-info-reserve-itm-btn" onClick={ e=> { reserveItem()}} 
                        className='btn btn-dark'>Reserve Item
                    </button>
                </div>
                {/* Print QRCode */}
                <div id="qrcode">
                    <button id="qrcode-print-btn" onClick={(e)=>Print("qrcode-img")}><i className="fa fa-print" aria-hidden="true"></i></button>
                    <div id="qrcode-img">{qrcode}</div>
                </div>
                {/* Print Barcode */}
                <div id="barcode">
                    {barcode}
                </div>
                {/* Change status */}
                <div id="Offstatus">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {status}
                        </button>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item" onClick={(e)=> setStatus ("Available")} > Available</li>
                            <li className="dropdown-item" onClick={(e)=> setStatus ("Reserved")} > Reserved</li>
                            <li className="dropdown-item" onClick={(e)=> setStatus ("In Repair")} > In Repair</li>
                            <li className="dropdown-item" onClick={(e)=> setStatus ("Unavailable")} > Unavailable</li>
                        </ul>
                        <button  className="btn btn-secondary" type="button" onClick={(e) => updateStatus()}>
                        save
                        </button>
                    </div>
                </div>
                {/* Change Location */}
                <div id="changeLocation">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {locationType}  {locationType !== "Room" && locationType !== "Storage" ? '' : location}
                    </button>
                    <ul className="dropdown-menu">
                        <div id="roomList">
                            <span className="dropdown-item fw-bold bg-light" id="itemRoomList" >Room List</span>
                            {/* Room list */}
                            {roomList.map((room,index) => (
                                <li key={index} className="dropdown-item" onClick={(e) => {setLocation(room);setLocationType("Room")}}>{room}</li>
                            ))}
                        </div>
                        {/* Storage list */}
                        <div id="roomList">
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
                {/* Change RFID Code */}
                <div id="changeRFIDCode">
                    {/* RFID Code */}
                    <div className="">
                        <label className="input-label" for="RFIDCode" >RFID Code</label>
                        <input type="text" className="text-input" id="RFIDCode" 
                        value={RFIDCode} onChange={(e) => {setRFIDCode(e.target.value);setErrorMessage(''); setError('')}}/>
                    </div>
                    {/* Re-enter RFID Code */}
                    <div className="">
                        <label className="input-label" for="RFIDCode2" style={{"fontSize":"10.8pt"}}>Re-enter RFID Code</label>
                        <input type="text" className="text-input" id="RFIDCode" 
                        value={RFIDCode2} onChange={(e) => {setRFIDCode2(e.target.value); setErrorMessage(''); setError('')}}/>
                    </div>
                    <br />
                    <div className="col">
                        <button  className="btn btn-secondary" id="RFIDButton" type="button" onClick={setNewRFIDCode}>
                            save
                        </button>
                        <br />
                        <span className="input-label">{errorMessage}</span>
                    </div>
                </div>
            </div>
        </div> 
        </>
    );
}

export default OffCanvasCard;