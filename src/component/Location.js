// import CreateTestEquipment from "../test/CreateTestEquipment";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "../assets/styles/Users.css";
import RoomList from "./List/RoomList";
import Pagination from "./Pagination";
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Location () {
    // CreateTestEquipment(20);
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [itemAmount, setItemAmount] = useState([]);
    const [getAmount, setGetAmount] = useState('');

    useEffect( () => {
        setItemAmount([]);
        API.get('items','/items/allroom').then(res => sortItems(res));
    },[]);

    const updateList = (serialno) => {
        API.del("inventory","/items/object/"+serialno);
        const updatedList = items.filter(item => item.serialno !== serialno);
        setItems(updatedList);
        setUnfilteredItems(updatedList);
    }

    useEffect(() => {
        if(itemAmount.length < 1){
            items.forEach((item) => {
                API.post('items','/items/roomno/',{
                    body: {
                        roomno : item.roomno
                    }
                    }).then ( res => {
                        let curAmount = itemAmount;
                        curAmount.push(item.roomno + '--' + res.length);
                        setItemAmount([...curAmount]);
                })
            })
        }
    },[items])

    const sortItems = (items) => {
        const updatedList = items.filter(item => item.location === "Storage" || item.location === "Room");
        let updatedRoomList =  [...new Map(updatedList.map((room) => [room.roomno, room])).values()];
        updatedRoomList.sort((a,b) => {
            var tA = Number.parseInt(a.roomno);
            var tB = Number.parseInt(b.roomno);
            if(isNaN(tA) && isNaN(tB)){
                return a.roomno.localeCompare(b.roomno);
            }else if(isNaN(tA)){
                return -1;
            }else if(isNaN(tB)){
                return 1;
            }else{
                return Math.sign(tA - tB);
            }
        });
        setItems(updatedRoomList);
        setUnfilteredItems(updatedRoomList);
    } 
    const searchItem = (e) => {
        if (e.length > 0) {
            const searcedhItems = 
                    unfilteredItems.filter((items) =>   items.roomno.toLowerCase().includes(e) || 
                                                        items.location.toLowerCase().includes(e));
            setItems(searcedhItems);
        }else{
            setItems(unfilteredItems);
        }
    }

    const CSV = () => {
        // the data that you want to write to the CSV file
        const data = [];
        items.forEach(items => {
            let roomItemAmount = itemAmount.filter(item => item.split('--').at(0) === items.roomno);
            data.push([items.roomno, items.location, "Otto Miller", roomItemAmount[0].split('--').at(1)]);
        });
  

        // generate the CSV file
        const csv = Papa.unparse({
            fields: ['ROOM NO', 'LOCATION', 'BUILDING', 'NUMBER OF ITEMS'],
            data: data
        });

        // the CSV file
        const a = document.createElement('a');
        a.href = 'data:attachment/csv,' + csv;
        a.target = '_blank';
        a.download = 'AllLocation.csv';
        document.body.appendChild(a);
        a.click();
    }
    const PDF = () => {     // Exporting to pdf 
        const doc = new jsPDF('p', 'mm', 'a4');

        const data = [['ROOM NO', 'LOCATION', 'BUILDING', 'NUMBER OF ITEMS']];
        items.forEach(items => {
            let roomItemAmount = itemAmount.filter(item => item.split('--').at(0) === items.roomno);
            data.push([items.roomno, items.location, "Otto Miller", roomItemAmount[0].split('--').at(1)]);
        });

        doc.autoTable({
         //   head: [['firstName', 'lastName', 'schoolID', 'role']],
            body: data
        });
        
        const pdf = doc.output();
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,' + btoa(pdf);
        link.download = 'AllLocation.pdf';
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

    const sortAmountItem = (filtered) => {
        let curList = items;
        curList.sort((a,b) => {
            let roomItem1 = itemAmount.filter(item => item.split('--').at(0) === a.roomno);
            let roomItem2 = itemAmount.filter(item => item.split('--').at(0) === b.roomno);
            if(roomItem1[0].split('--').at(1) > roomItem2[0].split('--').at(1)){
                return 1;
            }else{
                return -1;
            }
        })
        if(filtered){
            setItems([...curList]);
            setUnfilteredItems([...curList]);
        }else{
            curList = curList.reverse();
            setItems([...curList]);
            setUnfilteredItems([...curList]);
        }
    }

    const ResortedList = (title, filtered) => {
        let curList = items;
        curList.sort((a,b) => {
            var tA = Number.parseInt(a.title);
            var tB = Number.parseInt(b.title);
            if(isNaN(tA) && isNaN(tB)){
                if(title === 'location'){
                    return a.location.localeCompare(b.location);
                }else if(title === 'roomno'){
                    return a.roomno.localeCompare(b.roomno);
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
                    <span className="material-symbols-outlined">door_open</span>
                    <span>Location</span>
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
            <RoomList items={currentList} updateList={updateList} ResortedList={ResortedList} sortAmountItem={sortAmountItem} />
            <Pagination
                    PerPage={itemsPerPage} 
                    total={items.length} 
                    paginate={paginate}
                    currentPageLocation = {currentPage}
                    />     
        </div>
    </div>    
    )
}

export default Location;