import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import '../../assets/styles/Reader.css';



function Reader () {
    const [data,setData] = useState();
    const [locRoomNo] = useState("2011");

        const ReadData = (e) => {
              if (e.length === 32) {
                        console.log(e)
                        API.post('items','/items/rfid/',{
                            body: {
                                rfidcode : e
                            }
                        })
                        .then (res => {
                            if (res.length > 0) {
                                res.forEach(element => {
                                    if (element.roomno !== locRoomNo ) {
                                        console.log(element.name + " is found in location " + locRoomNo);
                                        // element.roomno = locRoomNo;
                                        UpdateRoomLocation(element,locRoomNo);
                                        console.log(element);   
                                    }
                                    
                                });
                               
                            }
                            // window.location.reload(true);

                        })
                        document.getElementById('reader').value= "" ;
                    }
                    
               

        }
    
    const UpdateRoomLocation = (item,roomno) => {
        // item.roomno = roomno;
        API.post("items","/items/", {
            body : {
                name : item.name,
                serialno : item.serialno,
                type : item.type,
                model : item.model,
                location : item.location,
                roomno :locRoomNo,
                status : item.status,
                manufacturer: item.manufacturer,
                cost: item.cost,
                lastupdated: item.lastupdated,
                rfidcode : item.rfidcode
            }
        });
    }
   

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
    }
    return (
        <>
        <div className="Reader">

            <input id="reader" onChange={ e => ReadData(e.target.value) } className="reader-txt" type={'text'}  autoFocus={true} onBlur={({ target }) => target.focus()}/>
        </div>
        </>
    )
}

export default Reader;