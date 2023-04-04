import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import '../../assets/styles/Reader.css';



function Reader () {
    const [data,setData] = useState();
   

    // useEffect( () => {

    //     const reader = document.getElementById('reader')

    //     if (reader) {
    //         reader.addEventListener("keyup", function(event) {
    //             if (event.key === "Enter") {
    //                 let str = data.slice(data.length-2);
    //                 console.log(str.length)
    //                 // if (reader.value.length === 32) {
    //                 //     console.log(reader.value)
    //                 //     API.post("items","/items/rfid",{
    //                 //         body: {
    //                 //             rfidcode : reader.value
    //                 //         }
    //                 //     })
    //                 //     .then (res => {
    //                 //         console.log(res);
    //                 //     })
                       
    //                 // }
    //                 document.getElementById('reader').value= " " ;
    //             }
    //         })
    
    //     }

    // });

        const ReadData = (e) => {
              if (e.length === 32) {
                        console.log(e)
                        API.post('items','/items/rfid/',{
                            body: {
                                rfidcode : e
                            }
                        })
                        .then (res => {
                            console.log(res);
                            
                            // window.location.reload(true);

                        })
                        document.getElementById('reader').value= "" ;
                    }
                    
               

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