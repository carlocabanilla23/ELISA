import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "../assets/styles/Users.css";
import Pagination from "./Pagination";
import AssignedItemList from './List/AssignedItemList';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
            data.push([items.serialno, items.name, items.type,items.model, items.assignedto, items.assignedate ]);
        });
  

        // generate the CSV file
        const csv = Papa.unparse({
            fields: ['SERIALNO', 'NAME', 'TYPE', 'MODEL', 'ASSIGNED TO', 'DATE ASSIGNED'],
            data: data
        });

        // the CSV file
        const a = document.createElement('a');
        a.href = 'data:attachment/csv,' + csv;
        a.target = '_blank';
        a.download = 'AssignedItemList.csv';
        document.body.appendChild(a);
        a.click();
    }
    const PDF = () => {     // Exporting to pdf 
        const doc = new jsPDF('p', 'mm', 'a4');
        
        const data = [['SERIALNO', 'NAME', 'TYPE', 'MODEL', 'ASSIGNED TO', 'DATE ASSIGNED']];
        items.forEach(items => {
            data.push([items.serialno, items.name, items.type,items.model, items.assignedto, items.assignedate ]);
        });

        doc.autoTable({
         //   head: [['firstName', 'lastName', 'schoolID', 'role']],
            body: data
        });
        
        const pdf = doc.output();
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,' + btoa(pdf);
        link.download = 'AssignedItemList.pdf';
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

    const ResortedList = (title, filtered) => {
        let curList = items;
        if(title === 'assigndate'){
            curList.sort((a,b) => {
                if(a.assigndate.split('-').at(2) !== b.assigndate.split('-').at(2)){
                    return b.assigndate.split('-').at(2) - a.assigndate.split('-').at(2);
                }else{
                    if(a.assigndate.split('-').at(1) !== b.assigndate.split('-').at(1)){
                        return b.assigndate.split('-').at(1) - a.assigndate.split('-').at(1);
                    }else{
                        return b.assigndate.split('-').at(0) - a.assigndate.split('-').at(0);
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
                    }else if(title === 'assignto'){
                        return a.assignto.localeCompare(b.assignto);
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