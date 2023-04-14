import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "../assets/styles/Users.css";
import Pagination from "./Pagination";
import UnassignedItemList from './List/UnassignedItemList';
import OffCanvasCard from "./card/OffCanvasCard";
import { Generate } from "../Services/code-generator/qrcode";
import { GenerateBarcode } from "../Services/code-generator/barcode";
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function UnassignedItems () {
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    //OffCanvas variable
    const [offCanvasItem, setOffCanvasItem] = useState('');
    const [qrcode,setQRCode] = useState();
    const [barcode,setBarcode] = useState();
    const [roomList, setRoomList] = useState([]);
    const [storageList, setStorageList] = useState([]);
    const [actionName, setActionName] = useState('');
    const [refreshvalue, setRefreshValue] = useState('');

    useEffect( () => {
        API.post('items','/items/roomno/items',{
            body: { roomno : "Unassigned" }
        }).then ( res => {
            setItems(res);
        })
        API.get("items","/items").then(itemRes => {
            sortLocationList(itemRes);
        });
    },[]);

    const updateList = (serialno) => {
        API.del("inventory","/items/object/"+serialno);
        const updatedList = items.filter(item => item.serialno !== serialno);
     
        setItems(updatedList);
        setUnfilteredItems(updatedList);
    }

    const sortLocationList = (items) => {
        //Sort room list for change Location function
        const CurrentRoomList = items.filter(item => item.location === "Room");
        let updatedRoomList =  [...new Set(CurrentRoomList.map(room => room.roomno))];
        updatedRoomList.sort((a,b) => {
            var tA = Number.parseInt(a);
            var tB = Number.parseInt(b);
            if(isNaN(tA) && isNaN(tB)){
                return a.localeCompare(b);
            }else if(isNaN(tA)){
                return -1;
            }else if(isNaN(tB)){
                return 1;
            }else{
                return Math.sign(tA - tB);
            }
        });
        setRoomList(updatedRoomList);

        //Sort storage list for change Location function
        const CurrentStorageList = items.filter(item => item.location === "Storage");
        let updatedStorageList =  [...new Set(CurrentStorageList.map(storage => storage.roomno))];
        updatedStorageList.sort((a,b) => {
            var tA = Number.parseInt(a);
            var tB = Number.parseInt(b);
            if(isNaN(tA) && isNaN(tB)){
                return a.localeCompare(b);
            }else if(isNaN(tA)){
                return -1;
            }else if(isNaN(tB)){
                return 1;
            }else{
                return Math.sign(tA - tB);
            }
        });
        setStorageList(updatedStorageList);
    }

    const ViewInformation = async(item) => {
        let data = await API.get('items','/items/object/'+item.type + '/' +item.serialno);
        setActionName("Item Information");
        setOffCanvasItem(data);
        document.getElementById("item-info").style.display = "block";
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("barcode").style.display = "none";
        document.getElementById("Offstatus").style.display = "none";
        document.getElementById("changeLocation").style.display = "none";
    }

    const CreateQRCode = (serialno) => {
        setActionName("QRCode");
        document.getElementById("item-info").style.display = "none";
        document.getElementById("qrcode").style.display = "block";
        document.getElementById("barcode").style.display = "none";
        document.getElementById("Offstatus").style.display = "none";
        document.getElementById("changeLocation").style.display = "none";
      
        console.log(serialno);
        let svg = Generate(serialno);
        setQRCode(svg);
    }
    const CreateBarcode = (serialno) => {
        setActionName("Barcode");
        document.getElementById("item-info").style.display = "none";
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("barcode").style.display = "block";
        document.getElementById("Offstatus").style.display = "none";
        document.getElementById("changeLocation").style.display = "none";

        console.log(serialno);
        let svg = GenerateBarcode(serialno);
        setBarcode(svg);
    }

    const changeStatus = async(item) => {
        let data = await API.get('items','/items/object/'+item.type + '/' +item.serialno);
        setRefreshValue(Math.random());
        setActionName("Change Status");
        setOffCanvasItem(data);
        document.getElementById("item-info").style.display = "none";
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("barcode").style.display = "none";
        document.getElementById("Offstatus").style.display = "block";
        document.getElementById("changeLocation").style.display = "none";
    }

    const changeLocation=  async(item) => {
        let data = await API.get('items','/items/object/'+item.type + '/' +item.serialno);
        setRefreshValue(Math.random());
        setActionName("Change Location");
        setOffCanvasItem(data);
        document.getElementById("item-info").style.display = "none";
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("barcode").style.display = "none";
        document.getElementById("Offstatus").style.display = "none";
        document.getElementById("changeLocation").style.display = "block";
    }

    const searchItem = (e) => {
        if (e.length > 0) {
            const searcedhItems = 
                unfilteredItems.filter((items) => 
                    items.serialno.toLowerCase().includes(e) || 
                    items.name.toLowerCase().includes(e) || 
                    items.model.toLowerCase().includes(e) || 
                    items.type.includes(e));
                    
            setItems(searcedhItems);
        }else{
            setItems(unfilteredItems);
        }  
    }

    const CSV = () => {      
        // the data that you want to write to the CSV file
        const data = [];
        items.forEach(items => {
            // console.log(items.serialno);
            data.push([items.serialno, items.name, items.type,items.model]);
        });
  

        // generate the CSV file
        const csv = Papa.unparse({
            fields: ['SERIALNO', 'NAME', 'TYPE', 'MODEL'],
            data: data
        });

        // the CSV file
        const a = document.createElement('a');
        a.href = 'data:attachment/csv,' + csv;
        a.target = '_blank';
        a.download = 'UnassignedItemList.csv';
        document.body.appendChild(a);
        a.click();
    }
    const PDF = () => {     // Exporting to pdf 
        const doc = new jsPDF('p', 'mm', 'a4');
        
        const data = [['SERIALNO', 'NAME', 'TYPE', 'MODEL']];
        items.forEach(items => {
            data.push([items.serialno, items.name, items.type,items.model]);
        });

        doc.autoTable({
         //   head: [['firstName', 'lastName', 'schoolID', 'role']],
            body: data
        });
        
        const pdf = doc.output();
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,' + btoa(pdf);
        link.download = 'UnassignedItemList.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    const idxLastItem = currentPage * itemsPerPage;
    const idxFirstItem = idxLastItem - itemsPerPage;
    const currentList = items.slice(idxFirstItem,idxLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber !== 0 && pageNumber !==  Math.ceil(items.length / itemsPerPage) + 1 ) {

           var obj = document.getElementById(currentPage);
            obj.style.backgroundColor = "#F0F0EB";
            obj.style.color = "#3E2B2E";

            setCurrentPage(pageNumber);

            obj = document.getElementById(pageNumber);
            obj.style.backgroundColor = "#3E2B2E";
            obj.style.color = "#ffffff";
        }
    };

    const ResortedList= (title, filtered) => {
        let curList = items;
        curList.sort((a,b) => {
            var tA = Number.parseInt(a.title);
            var tB = Number.parseInt(b.title);
            if(isNaN(tA) && isNaN(tB)){
                if(title === 'serialno'){
                    return a.serialno.localeCompare(b.serialno);
                }else if(title === 'name'){
                    return a.name.localeCompare(b.name);
                }else if(title === 'type'){
                    return a.type.localeCompare(b.type);
                }else if(title === 'model'){
                    return a.model.localeCompare(b.model);
                }
            }else if(isNaN(tA)){
                return -1;
            }else if(isNaN(tB)){
                return 1;
            }else{
                return Math.sign(tA - tB);
            }
        });
        if(filtered){
            setItems([...curList]);
            setUnfilteredItems([...curList]);
        }else{
            curList = curList.reverse();
            setItems([...curList]);
            setUnfilteredItems([...curList]);
        }
    }

    return (
        <div className="Users">
        
        
        <div className="UserHeader">

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
            <div className="content">
                <div> 
                <span className="material-symbols-outlined">devices_other</span>
                    <span>Unassigned Items</span>

                    <div className="searchBar">
                        <input type="email" className="form-control" onChange={ (e)=> { searchItem(e.target.value)} } id="exampleFormControlInput1" placeholder="Search Item"/>
                    </div>
                    <div className="col-auto-dropdown">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Export
                            </button>
                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" onClick={CSV} >CSV</button></li>
                                <li><button className="dropdown-item" onClick={PDF} >PDF</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="UserPane">
            <UnassignedItemList   items={currentList} 
                        updateList={updateList}
                        ViewInformation={ViewInformation}
                        CreateQRCode={CreateQRCode} 
                        CreateBarcode={CreateBarcode}
                        changeStatus={changeStatus}
                        changeLocation={changeLocation}
                        ResortedList={ResortedList}
                        />
            <Pagination
                    PerPage={itemsPerPage} 
                    total={items.length} 
                    paginate={paginate}
                    currentPageLocation = {currentPage}
                    />
        </div>
        {/* OFf canvas */}
        <OffCanvasCard 
            item={offCanvasItem}
            qrcode={qrcode}
            barcode={barcode}
            roomList={roomList}
            storageList={storageList}
            actionName={actionName}
            refreshvalue={refreshvalue}/>
    </div>
    )
}

export default UnassignedItems;