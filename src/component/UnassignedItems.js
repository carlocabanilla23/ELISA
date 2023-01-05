import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./styles/Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import UnassignedItemList from './List/UnassignedItemList';

function UnassignedItems () {
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(10);

    const navigate = useNavigate();

    useEffect( () => {
        API.get("inventory","/items/").then( itemRes => {
          
            sortItems(itemRes);
        })
    },[]);

    const updateList = (serialno) => {
        API.del("inventory","/items/object/"+serialno);
        const updatedList = items.filter(item => item.serialno !== serialno);
     
        setItems(updatedList);
        setUnfilteredItems(updatedList);
    }

    const sortItems = (items) => {
        const updatedList = items.filter(item => item.location === "Unassigned");
        console.log(updatedList);
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

    return (
        <div className="Users">
        <Sidebar />
        <Header />
        <div className="UserHeader">

            <div className="row">
                <div className="col fs-4 ms-5 fw-bold"> 
                    <i className="fa fa-users" aria-hidden="true"> Room Location</i>
                </div>

                <div className="col-sm-5 searchbar">
                    <input type="email" className="form-control" onChange={ (e)=> { searchItem(e.target.value)} } id="exampleFormControlInput1" placeholder="Search Item"/>
                </div>

                <div className="col text-end "></div>
                <div className="col text-end "></div>
                <div className="col text-end "></div>

                <div className="col auto dropdown">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Export
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">CSV</a></li>
                            <li><a className="dropdown-item" href="#">PDF</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="UserPane">
            <UnassignedItemList   items={currentList} 
                        updateList={updateList}
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

export default UnassignedItems;