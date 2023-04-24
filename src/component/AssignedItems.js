import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "../assets/styles/Users.css";
import Pagination from "./Pagination";
import AssignedItemList from './List/AssignedItemList';
import { csv } from '../Services/Export/csv';
import { pdf } from '../Services/Export/pdf'; 

function AssignedItems () {
    // CreateTestEquipment(20);
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect( () => {
        API.post('items','/items/roomno/items',{
            body: { roomno : "USER" }
        }).then ( res => {
            setItems(res);
            setUnfilteredItems(res);
        })
    },[]);

    const updateList = (serialno) => {
        API.del("inventory","/items/object/"+serialno);
        const updatedList = items.filter(item => item.serialno !== serialno);
     
        setItems(updatedList);
        setUnfilteredItems(updatedList);
    }
    const searchItem = (e) => {
        if (e.length > 0) {
            const searcedhItems = unfilteredItems.filter((items) => items.serialno.toLowerCase().includes(e) || 
                                                                    items.name.toLowerCase().includes(e) || 
                                                                    items.model.toLowerCase().includes(e) || 
                                                                    items.type.includes(e));
            if(searcedhItems.length < unfilteredItems.length){
                paginate(1);
            }
            setItems(searcedhItems);
        }else{
            setItems(unfilteredItems);
        }  
    }

    const CSV = () => {
        csv(items, "Assigned Items", []);
    }
    const PDF = () => {     // Exporting to pdf 
        pdf(items, "Assigned Items", []);
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
        if(title === 'assignedate'){
            curList.sort((a,b) => {
                if(a.assignedate.split('-').at(2) !== b.assignedate.split('-').at(2)){
                    return b.assignedate.split('-').at(2) - a.assignedate.split('-').at(2);
                }else{
                    if(a.assignedate.split('-').at(1) !== b.assignedate.split('-').at(1)){
                        return b.assignedate.split('-').at(1) - a.assignedate.split('-').at(1);
                    }else{
                        return b.assignedate.split('-').at(0) - a.assignedate.split('-').at(0);
                    }
                }
            })
        }else{
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
                    }else if(title === 'status'){
                        return a.status.localeCompare(b.status);
                    }else if(title === 'assignedto'){
                        return a.assignedto.localeCompare(b.assignedto);
                    }
                }else if(isNaN(tA)){
                    return -1;
                }else if(isNaN(tB)){
                    return 1;
                }else{
                    return Math.sign(tA - tB);
                }
            });
        }
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
                    <span className="material-symbols-outlined">checklist</span>
                    <span>Assigned Items</span>

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
            <AssignedItemList   items={currentList} 
                        updateList={updateList}
                        ResortedList={ResortedList}
                        />
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

export default AssignedItems;