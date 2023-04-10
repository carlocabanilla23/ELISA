// import CreateTestEquipment from "../test/CreateTestEquipment";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "../assets/styles/Users.css";
import RoomList from "./List/RoomList";
import Pagination from "./Pagination";

function Location () {
    // CreateTestEquipment(20);
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [allRoom, setAllRoom] = useState([]);
    const [roomItems, setRoomItems] = useState([]);

    useEffect( () => {
        API.get('items','/items/allroom').then(res => sortItems(res));
    },[]);

    const updateList = (serialno) => {
        API.del("inventory","/items/object/"+serialno);
        const updatedList = items.filter(item => item.serialno !== serialno);
        setItems(updatedList);
        setUnfilteredItems(updatedList);
    }

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
                    unfilteredItems.filter((items) =>   items.serialno.toLowerCase().includes(e) || 
                                                        items.name.toLowerCase().includes(e) || 
                                                        items.model.toLowerCase().includes(e) || 
                                                        items.type.includes(e));
            setItems(searcedhItems);
        }else{
            setItems(unfilteredItems);
        }
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

    const ResortedList = (title, filtered) => {
        let curList = items;
        let curNum = 1;
        let nextNum = true;
        if(title === 'amount'){
            let newList = [];
            curList.map((item) => (
                API.post('items','/items/roomno/',{
                    body: {
                      roomno : item.roomno
                    }
                  }).then ( res => {
                    console.log(res);
                    setAllRoom([...allRoom,res[0].roomno]);
                    setRoomItems([...roomItems,res.length]);
                  })
            ));
            console.log(allRoom);
            console.log(roomItems);
            while(nextNum){
                nextNum = false;
                for(let i = 0; i < allRoom.length; i++){
                    if(roomItems[i] === curNum){
                        for(let o = 0; o < curList.length; o++){
                            if(allRoom[i] === curList[o]){
                                nextNum = true;
                                newList.push(curList[o]);
                                break;
                            }
                        }
                    }
                }
                if(nextNum){
                    curNum++;
                }
            }
            console.log(newList);
            newList = newList.reverse();
            console.log(newList);
        }else{
            curList.sort((a,b) => {
                var tA = Number.parseInt(a.title);
                var tB = Number.parseInt(b.title);
                if(isNaN(tA) && isNaN(tB)){
                    if(title === 'location'){
                        if(a.location.length > b.location.length){
                            return 1;
                        }else if(a.location.length < b.location.length){
                            return -1;
                        }else{
                            return a.location.localeCompare(b.location);
                        }
                    }else if(title === 'roomno'){
                        if(a.roomno.length > b.roomno.length){
                            return 1;
                        }else if(a.roomno.length < b.roomno.length){
                            return -1;
                        }else{
                            return a.roomno.localeCompare(b.roomno);
                        }
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
                                <li><button type="button" className="dropdown-item">CSV</button></li>
                                <li><button type="button" className="dropdown-item">PDF</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="UserPane">
            <RoomList items={currentList} updateList={updateList} ResortedList={ResortedList}/>
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