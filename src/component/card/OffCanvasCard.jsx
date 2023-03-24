import { API } from 'aws-amplify';
import { useState } from 'react';

const OffCanvasCard = ({item,qrcode,barcode}) => {
    const [status,setStatus] = useState('');

    const setNewStatus = () => {
        const today = new Date();
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
            lastupdated: today, 
            }});     
        window.location.reload(true);

    }

    const Print = (e) => {
        const pContents = document.getElementById(e).innerHTML;
      
        const tmpContent = document.body.innerHTML;
        document.body.innerHTML = pContents;
        window.print();
        document.body.innerHTML = tmpContent;
    }
    return (
        <>
         <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel"></h5>
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
                    <img src={item.image} width="150" height="150" alt="Image of the device" />
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
                <p class="h3">QR Code</p>
                <button id="qrcode-print-btn" onClick={(e)=>Print("qrcode-img")}><i class="fa fa-print" aria-hidden="true"></i></button>
                <div id="qrcode-img">{qrcode}</div>
            </div>

            <div id="barcode">
                {barcode}
            </div>

            <div id="Offstatus">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {item.status}
                </button>
                <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={(e)=> setStatus ("New")} > New
                    </a>
                </li>
                <li><a className="dropdown-item" onClick={(e)=> setStatus ("Old")} > Old
                    </a>
                </li>
                <li><a className="dropdown-item" onClick={(e)=> setStatus ("Used")} > Used
                    </a>
                </li>
                <li><a className="dropdown-item" onClick={(e)=> setStatus ("Broken")} > Broken
                    </a>
                </li>
                </ul>
                <button  className="btn btn-secondary" type="button" onClick={(e)=> {setNewStatus()}}>
                  save
                </button>
            </div>
            </div>
        </div>
      </div>
            
        </>
    );
}

export default OffCanvasCard;