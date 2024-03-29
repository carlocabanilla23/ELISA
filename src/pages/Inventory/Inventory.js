// import CreateTestEquipment from "../../test/CreateTestEquipment";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "../../assets/styles/Users.css";
import { useNavigate } from "react-router-dom";
import ItemList from "../../component/List/ItemList";
import Pagination from "../../component/secondMainComponents/Pagination";
import OffCanvasCard from "../../component/card/OffCanvasCard";
import { Generate } from "../../Services/code-generator/qrcode";
import { GenerateBarcode } from "../../Services/code-generator/barcode";
import { csv } from '../../Services/Export/csv';
import { pdf } from '../../Services/Export/pdf';

function Inventory () {
    // CreateTestEquipment(5);
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [offCanvasItem, setOffCanvasItem] = useState('');
    const [qrcode,setQRCode] = useState();
    const [barcode,setBarcode] = useState();
    const [roomList, setRoomList] = useState([]);
    const [storageList, setStorageList] = useState([]);
    const [actionName, setActionName] = useState('');
    const [refreshvalue, setRefreshValue] = useState('');

    const [deleteSerialNo, setDeleteSerialNo] = useState('');
    const [deleteType, setDeleteType] = useState('');

    const loggedUser = decodeURIComponent(escape(window.atob(localStorage.getItem('email'))));
    const access = localStorage.getItem('access');

    const navigate = useNavigate();

    const AddItem = e => {
        e.preventDefault();
        navigate('/AddItem');
    }

    useEffect( () => {
        API.get("items","/items").then( itemRes => {
            console.log(itemRes);
            itemRes.sort((a,b) => {
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
/**Change later to item status */
            if ( access !== "Admin") {
                document.getElementById('AddUser').style.display = "none";
                const nonAdminList = itemRes.filter(item => item.location === "Room");

                let e = document.getElementsByClassName('actions');

                for(var i = 0; i < e.length; i++) {
                  e[i].style.display = "none";
                }

                setItems([...items,...nonAdminList]);
                setUnfilteredItems([...items,...nonAdminList]);
            } else {
                setItems([...items,...itemRes]);
                setUnfilteredItems([...items,...itemRes]);
            }

            //Sort room list for change Location function
            const CurrentRoomList = itemRes.filter(item => item.location === "Room");
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
            const CurrentStorageList = itemRes.filter(item => item.location === "Storage");
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
        })
    },[]);

    const setConfirmForm = document.getElementById("deleteConfirmForm");

    const updateList = () => {
        const serialno = deleteSerialNo;
        const type = deleteType;
        API.del("items","/items/object/"+ type +'/'+serialno);
        const updatedList = items.filter(item => item.serialno !== serialno);
        const curPage = currentPage;
        if(updatedList.length % itemsPerPage === 0 && curPage > 1){
            paginate(curPage - 1);
        }
        setItems(updatedList);
        setUnfilteredItems(updatedList);
        setDeleteSerialNo('');
        setDeleteType('');
        setConfirmForm.style.display = "none";
    }

    const cancelDelete = (e) => {
        setDeleteSerialNo('');
        setDeleteType('');
        setConfirmForm.style.display = "none";
    }

    const deleteConfirm = (serialno,type) => {
        setDeleteSerialNo(serialno);
        setDeleteType(type);
        setConfirmForm.style.display = "block";
    }

    const ViewInformation = async(item) => {
        let data = await API.get('items','/items/object/'+item.type + '/' +item.serialno);
        console.log(data);
        setActionName("Item Information");
        setOffCanvasItem(data);
        document.getElementById("item-info").style.display = "block";
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("barcode").style.display = "none";
        document.getElementById("Offstatus").style.display = "none";
        document.getElementById("changeLocation").style.display = "none";
        document.getElementById("changeRFIDCode").style.display = "none";

        if (item.status === "Available") {
            document.getElementById("item-info-reserve-itm-btn").style.display = "block";
        } else {
            document.getElementById("item-info-reserve-itm-btn").style.display = "none";

        }
    }

    const CreateQRCode = async (serialno,type) => {
        let data = await API.get('items','/items/object/'+type + '/' +serialno);
        console.log(data);
        setActionName("QRCode");
        setOffCanvasItem(data);

        document.getElementById("item-info").style.display = "none";
        document.getElementById("qrcode").style.display = "block";
        document.getElementById("barcode").style.display = "none";
        document.getElementById("Offstatus").style.display = "none";
        document.getElementById("changeLocation").style.display = "none";
        document.getElementById("changeRFIDCode").style.display = "none";

        console.log(serialno);
        let svg = Generate(serialno,type);
        setQRCode(svg);
    }
    const CreateBarcode = (serialno) => {
        setActionName("Barcode");
        document.getElementById("item-info").style.display = "none";
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("barcode").style.display = "block";
        document.getElementById("Offstatus").style.display = "none";
        document.getElementById("changeLocation").style.display = "none";
        document.getElementById("changeRFIDCode").style.display = "none";

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
        document.getElementById("changeRFIDCode").style.display = "none";
    }

    const updateDataStatus = (serialno,status) => {
        let tmpItems = items;
        let idx = items.findIndex((itm => itm.serialno === serialno));
        // console.log(tmpItems[idx]);
        tmpItems[idx].status = status;
        // console.log(items[idx]);
        setItems(tmpItems);
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
        document.getElementById("changeRFIDCode").style.display = "none";
    }

    const changeRFIDCode = async(item) => {
        let data = await API.get('items','/items/object/'+item.type + '/' +item.serialno);
        setRefreshValue(Math.random());
        setActionName("Change RFID Code");
        setOffCanvasItem(data);
        document.getElementById("item-info").style.display = "none";
        document.getElementById("qrcode").style.display = "none";
        document.getElementById("barcode").style.display = "none";
        document.getElementById("Offstatus").style.display = "none";
        document.getElementById("changeLocation").style.display = "none";
        document.getElementById("changeRFIDCode").style.display = "block";
    }

    const searchItem = (e) => {
        if (e.length > 0) {
            const searcedhItems = unfilteredItems.filter((items) => items.serialno.toLowerCase().includes(e) ||
                                                            items.name.toLowerCase().includes(e) ||
                                                            items.model.toLowerCase().includes(e) ||
                                                            items.roomno.toLowerCase().includes(e) ||
                                                            items.status.toLowerCase().includes(e) ||
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
        csv(items, "Inventory",[]);
    }

    const PDF = () => {     // Exporting to pdf
        pdf(items, "Inventory",[]);
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
                    return a.location.localeCompare(b.status);
                }else{
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
        <div className="Users" id="container">
        <div className="UserHeader">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
            <div className="content">
                <div>
                    <span className="material-symbols-outlined">inventory_2</span>
                    <span>Inventory</span>

                    <div className="searchBar">
                        <input type="email" className="form-control" onChange={ (e)=> { searchItem(e.target.value)} } id="exampleFormControlInput1" placeholder="Search Item"/>
                    </div>

                    <div className="AddUser">
                        <button type="submit" className="btn" id="AddUser" onClick={AddItem}>Add Item</button>
                    </div>

                    <div className="col-auto-dropdown">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
            <div className="deleteConfirmationForm" id="deleteConfirmForm" style={{"display": "none"}}>
                <div className="FormHeader">
                    Do you want to delete {deleteSerialNo}?
                </div>
                <div className="confirmDeleteBtn">
                    <button className="btn btn-secondary" type="button" onClick={cancelDelete}>Cancel</button>
                    <button className="btn btn-secondary" id="confirmBtn" type="submit" onClick={updateList}>Confirm</button>
                </div>
            </div>
            <ItemList items={currentList}
                      ViewInformation={ViewInformation}
                      updateList={updateList}
                      CreateQRCode={CreateQRCode}
                      CreateBarcode={CreateBarcode}
                      changeStatus={changeStatus}
                      changeLocation={changeLocation}
                      changeRFIDCode={changeRFIDCode}
                      ResortedList={ResortedList}
                      deleteConfirm={deleteConfirm} />
            <Pagination
                    PerPage={itemsPerPage}
                    total={items.length}
                    paginate={paginate}
                    currentPageLocation = {currentPage}
                    />
                {/* {items.map( (itemRes,index) => <Item item={itemRes} key={index} updateList={updateList}/>)} */}

        </div>

        {/* OFf canvas */}
        <OffCanvasCard
            updateDataStatus ={updateDataStatus}
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

export default Inventory;