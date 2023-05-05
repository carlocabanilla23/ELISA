import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import "../../assets/styles/Signup.css";
import SendNotification from "../../Services/notification/Notification";
import { DefaultDeviceLogo } from "../../assets/base64/base64imgs";
import { GetDateToday } from "../../Services/etc/GetDateToday";

function Reader() {
  const [item, setItem] = useState({
    name: "",
    serialno: "",
    type: "",
    model: "",
    location: "Room",
    roomno: "101",
    status: "Available",
    cost: 200,
    acquiredate: GetDateToday(),
    createdate: GetDateToday(),
    lastupdated: GetDateToday(),
    rfidcode: "",
    image: DefaultDeviceLogo(),
    manufacturer: "",
    condition: "New",

    expiredate: "NA",

    assigndate: "NA",
    assignedto: "NA",

    returndate: "NA",
    reviewedby: "NA",

    prevroomno: "NA",
    prevlocation: "NA",
  });
  const [locRoomNo] = useState("ERICKSON 115");

  const ReadData = (e) => {
    if (e.length === 8) {
      console.log(e);
      API.post("items", "/items/rfid/", {
        body: {
          rfidcode: e,
        },
      }).then((res) => {
        if (res.length > 0) {
          res.forEach((element) => {
            setItem(element);
            console.log(element);
            if (element.roomno !== locRoomNo) {
              console.log(element.name + " is found in location " + locRoomNo);
              // element.roomno = locRoomNo;
              UpdateRoomLocation(element, locRoomNo);
              let item = {
                name: element.name,
                roomno: locRoomNo,
              };
              SendNotification("ITEM_MOVE", item);
            }
          });
        }
        // window.location.reload(true);
      });
      document.getElementById("reader").value = "";
    }
  };

  const UpdateRoomLocation = (item, roomno) => {
    // item.roomno = roomno;
    API.post("items", "/items/", {
      body: {
        name: item.name,
        serialno: item.serialno,
        type: item.type,
        model: item.model,
        location: item.location,
        roomno: locRoomNo,
        status: item.status,
        manufacturer: item.manufacturer,
        cost: item.cost,
        lastupdated: item.lastupdated,
        rfidcode: item.rfidcode,
      },
    });
  };

  const searchItem = (e) => {
    // console.log(e);
    if (e.length === 32) {
      console.log(e);
      window.reload = true;

      // const searchItem = unfilteredItems.filter(item => item.serialno.toLowerCase().includes(e))
      // if (searchItem.length === 1) {
      //    addItem(searchItem[0])
      //    document.getElementById('SearchBarInput').value= " " ;
      // }
    }
  };
  return (
      <div className="ReaderForm">
        <div className="FormReader">RFID Reader</div>
        <form>
          {/* Reader */}
          <div className="mb-3 row">
            <label htmlFor="reader" className="Attribute col-sm-3">
              RFID Code
            </label>
            <div className="col-sm-9">
              <input
                id="reader"
                onChange={(e) => ReadData(e.target.value)}
                className="form-control"
                type={"text"}
                autoFocus={true}
                onBlur={({ target }) => target.focus()}
              />
            </div>
          </div>
          {/* Details */}
          <div id="reader-item-info">
            {/* Image */}
            <div className="mb-3 row">
              <img src={item.image} width="130" height="150" alt="Device" id="DeviceImage"/>
            </div>
            {/* Name */}
            <div className="mb-3 row">
              <label className="Attribute col-sm-4">Name :</label>
              <div className="Information col-sm-8">{item.name}</div>
            </div>
            {/* Serial Number */}
            <div className="mb-3 row">
              <label className="Attribute col-sm-4">Serial #:</label>
              <div className="Information col-sm-8">{item.serialno}</div>
            </div>
            {/* Type */}
            <div className="mb-3 row">
              <label className="Attribute col-sm-4">Type:</label>
              <div className="Information col-sm-8">{item.type}</div>
            </div>
            {/* Model */}
            <div className="mb-3 row">
              <label className="Attribute col-sm-4">Model:</label>
              <div className="Information col-sm-8">{item.model}</div>
            </div>
            {/* Manufacturer */}
            <div className="mb-3 row">
              <label className="Attribute col-sm-4">Manufacturer:</label>
              <div className="Information col-sm-8">{item.manufacturer}</div>
            </div>
            {/* Location */}
            {/* <div className="mb-3 row">
              <label className="Attribute col-sm-4">Location:</label>
              <div className="Information col-sm-8">{item.location}</div>
            </div> */}
            {/* Room Number */}
            <div className="mb-3 row">
              <label className="Attribute col-sm-4">Room #:</label>
              <div className="Information col-sm-8">{item.roomno}</div>
            </div>
            {/* Status */}
            <div className="mb-3 row">
              <label className="Attribute col-sm-4">Status:</label>
              <div className="Information col-sm-8">{item.status}</div>
            </div>
            <div className="mb-3 row">
              <label className="Attribute col-sm-4">Condition:</label>
              <div className="Information col-sm-8">{item.condition}</div>
            </div>
            {/* Cost */}
            <div className="mb-3 row">
              <label className="Attribute col-sm-4">Cost:</label>
              <div className="Information col-sm-8">{item.cost}</div>
            </div>
          </div>
        </form>
      </div>
  );
}

export default Reader;
