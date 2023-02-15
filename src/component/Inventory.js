import CreateTestEquipment from "./test/CreateTestEquipment";
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import "./styles/Users.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import ItemList from "./ItemList";
import Pagination from "./Pagination";
import iInventory from "./icons/inventory.png";
import OffCanvasCard from "./card/OffCanvasCard";
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Generate } from "./code-generator/qrcode";
import { GenerateBarcode } from "./code-generator/barcode";



function Inventory () {
    // CreateTestEquipment(5);
    const [items, setItems] = useState([]);
    const [unfilteredItems, setUnfilteredItems] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(10);

    const [offCanvasItem, setOffCanvasItem] = useState('');
    const [qrcode,setQRCode] = useState();
    const [barcode,setBarcode] = useState();

    const navigate = useNavigate();

    const AddItem = e => {
        e.preventDefault();
        navigate('/AddItem');
    }

    useEffect( () => {
        API.get("inventory","/items").then( itemRes => {
            setItems([...items,...itemRes]);
            setUnfilteredItems([...items,...itemRes]);
        })
    },[]);

    const updateList = (serialno) => {
        API.del("inventory","/items/object/"+serialno);
        const updatedList = items.filter(item => item.serialno !== serialno);
        setItems(updatedList);
        setUnfilteredItems(updatedList);
    } 

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
            data.push([items.serialno, items.name, items.status,items.roomno, items.location ]);
        });
  

// generate the CSV file
const csv = Papa.unparse({
    fields: ['SERIALNO', 'NAME', 'STATUS', 'ROOM NO'],
    data: data
});

  // the CSV file
            const a = document.createElement('a');
            a.href = 'data:attachment/csv,' + csv;
             a.target = '_blank';
            a.download = 'output.csv';
            document.body.appendChild(a);
            a.click();
}
    const PDF = () => {     // Exporting to pdf 
        const doc = new jsPDF();
       // const users = [
       //   { firstName: 'John', lastName: 'Patrick', schoolID: '474593', role: 'student'}
       //   { firstName: 'Jane', lastName: 'Doe', schoolID: '987654', role: 'teacher' }
      //  ];
        const data = [['SERIALNO', 'NAME', 'STATUS', 'ROOM NO']];
        items.forEach(items => {
            data.push([items.serialno, items.name, items.status,items.roomno, items.location ]);
        });
        doc.autoTable({
         //   head: [['firstName', 'lastName', 'schoolID', 'role']],
            body: data
        });
        
        const pdf = doc.output();
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,' + btoa(pdf);
        link.download = 'users.pdf';
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

    return (
        <div className="Users">
        <Sidebar />
        <Header />
        <div className="UserHeader">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0" />
            <div className="content">
                <div>
                    <span class="material-symbols-outlined">inventory_2</span>
                    <span>Inventory</span>

                    <div className="searchBar">
                        <input type="email" className="form-control" onChange={ (e)=> { searchItem(e.target.value)} } id="exampleFormControlInput1" placeholder="Search Item"/>
                    </div>

                    <div className="AddUser">
                        <button type="submit" className="btn" id="AddUser" onClick={AddItem}>Add Item</button>
                    </div>

                    <div className="col-auto-dropdown">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Export
                            </button>
                            <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={CSV} >CSV</a></li> 
                                <li><a className="dropdown-item" onClick={PDF} >PDF</a></li>
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
          
                {/* {items.map( (itemRes,index) => <Item item={itemRes} key={index} updateList={updateList}/>)} */}

        </div>



        {/* OFf canvas */}
        <OffCanvasCard  item={offCanvasItem} qrcode={qrcode} barcode={barcode} />

       
    </div>    
    )
}

export default Inventory;