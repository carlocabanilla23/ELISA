import CreateTestEquipment from "./test/CreateTestEquipment";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./styles/Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate, Link, useParams } from "react-router-dom";
import Pagination from "./Pagination";
import ItemList from "./ItemList";
import OffCanvasCardRoom from "./card/OffCanvasCardRoom";
import { GenerateRoomQRCode } from "./code-generator/RoomQRCode";

function StorageLocationItem () {
    const {param} = useParams();
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(10);
    const [qrcode,setQRCode] = useState();
   

    const navigate = useNavigate();

    const AddItem = (locationParam,roomParam) => {
        navigate('/AddItemToLocation',{
            state: {
                    roomno : roomParam,
                    location : locationParam
            }
        });
    }

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
        const updatedList = items.filter(item => item.roomno === param);
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

    const printQRCode = (roomno) => {
        // document.getElementById("qrcode").style.display = "block";
        let svg = GenerateRoomQRCode(roomno);
        setQRCode(svg);

    }
    return (
        <div className="Users">
        <Sidebar />
        <Header />
        <div className="UserHeader">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
            <div className="content">
                <div>
                    <span class="material-symbols-outlined" style={{cursor: "pointer"}} onClick={() => navigate('/Location')}>arrow_back</span>
                    <Link to="/Location" className="text-dark">
                        <span >Storage Location </span>
                    </Link>
                    <span class="material-symbols-outlined">arrow_right</span>         
                    <span>{param}</span>

                    <div className="searchBar">
                        <input type="email" className="form-control" onChange={ (e)=> { searchItem(e.target.value)} } id="exampleFormControlInput1" placeholder="Search Item"/>
                    </div>

                    <div className="AddUser">
                        <button type="submit" className="btn" id="AddUser" onClick={ (e) => AddItem("Storage",param)}>Add Item</button>
                    </div>
                     {/* Print QR Code */}
                    <div className="PrintQRCode">
                        <button type="submit" className="btn" id="AddUser" 
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                            onClick={ (e) => printQRCode(param)}>Print QR</button>
                    </div>

                    <div className="col-auto-dropdown">
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
        </div>

        <div className="UserPane">
            <ItemList items={currentList} updateList={updateList} />
            <Pagination
                    PerPage={itemsPerPage} 
                    total={items.length} 
                    paginate={paginate}
                    currentPageLocation = {currentPage}
                    />     
            {/* OFf canvas */}
            <OffCanvasCardRoom  qrcode={qrcode}/>
        </div>
    </div>    
    )
}

export default StorageLocationItem;