import CreateTestEquipment from "./test/CreateTestEquipment";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./styles/Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate, useLocation, Link,useParams } from "react-router-dom";
import Pagination from "./Pagination";
import ItemList from "./ItemList";
import OffCanvasCard from "./card/OffCanvasCard";
import { GenerateRoomQRCode } from "./code-generator/RoomQRCode";
import { Generate } from "./code-generator/qrcode";
import { GenerateBarcode } from "./code-generator/barcode";

function RoomLocationItem () {
    const {param} = useParams();
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(10);
    const [qrcode,setQRCode] = useState();
    const [barcode,setBarcode] = useState();
    const [offCanvasItem, setOffCanvasItem] = useState('');

    // let roomnoParam = location.state.roomno;

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
        updatedList.sort((a,b) => {
            var tA = Number.parseInt(a.type);
            var tB = Number.parseInt(b.type);
            if(isNaN(tA) && isNaN(tB)){
                return a.type.localeCompare(b.type);
            }else if(isNaN(tA)){
                return -1;
            }else if(isNaN(tB)){
                return 1;
            }else{
                return Math.sign(tA - tB);
            }
        });
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

    const ViewInformation = (item) => {
        setOffCanvasItem(item);
        document.getElementById("item-info").style.display = "block";
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("barcode").style.display = "none";
        document.getElementById("Offstatus").style.display = "none";
    }

    const CreateQRCode = (serialno) => {
        document.getElementById("item-info").style.display = "none";
        document.getElementById("qrcode").style.display = "block";
        document.getElementById("barcode").style.display = "none";
        document.getElementById("Offstatus").style.display = "none";
      
        console.log(serialno);
        let svg = Generate(serialno);
        setQRCode(svg);
    }
    const CreateBarcode = (serialno) => {
        document.getElementById("item-info").style.display = "none";
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("barcode").style.display = "block";
        document.getElementById("Offstatus").style.display = "none";
    
        console.log(serialno);
        let svg = GenerateBarcode(serialno);
        setBarcode(svg);
    }

    const changeStatus = (item) => {
        setOffCanvasItem(item);
        document.getElementById("item-info").style.display = "none";
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("barcode").style.display = "none";
        document.getElementById("Offstatus").style.display = "block";
    }

    const printQRCode = (roomno) => {
        // document.getElementById("qrcode").style.display = "block";
        document.getElementById("item-info").style.display = "none";
        document.getElementById("qrcode").style.display = "block";
        document.getElementById("barcode").style.display = "none";
        document.getElementById("Offstatus").style.display = "none";
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
                <div className="header-menu">
                    <span class="material-symbols-outlined" style={{cursor: "pointer"}} onClick={() => navigate('/Location')}>arrow_back</span>
                    <Link to="/Location" className="text-dark">
                        <span>Room Location</span>
                    </Link>  
                    <span class="material-symbols-outlined">arrow_right</span>  
                    <span>{param}</span>          
                       
                <div className="searchBar">
                    <input type="email" className="form-control" onChange={ (e)=> { searchItem(e.target.value)} } id="exampleFormControlInput1" placeholder="Search Item"/>
                </div>

                <div className="AddUser">
                <button type="submit" className="btn" id="AddUser" onClick={ (e) => AddItem("Room",param)}>Add Item</button>
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
            <ItemList items={currentList}
                    ViewInformation={ViewInformation}
                    updateList={updateList}
                    CreateQRCode={CreateQRCode}
                    CreateBarcode={CreateBarcode}
                    changeStatus={changeStatus} />
            <Pagination
                    PerPage={itemsPerPage} 
                    total={items.length} 
                    paginate={paginate}
                    currentPageLocation = {currentPage}
                    />     

              {/* OFf canvas */}
            <OffCanvasCard item={offCanvasItem} qrcode={qrcode} barcode={barcode} />
        </div>
    </div>    
    )
}

export default RoomLocationItem;